# Spec: Build On GitHub, Host Static — Get The Docs Off The UAT Server

**Status:** Scoping only. Not scheduled. No code in this pass — this document defines the work.
**Problem owner:** the UAT server is being taken down by running the docs site.
**Author's note:** grounded in f0's actual internals (Nuxt 3 SSR, Nitro, the `server/` routes), not a generic CI template.

## 1. The problem, stated precisely

f0 is a **Nuxt 3 SSR application**, not a static site. Today the UAT server both *builds* it (`nuxt build`, memory-heavy) and *runs* it as a live Node process (`node .output/server/index.mjs`, port 3000). On a small UAT box, a live SSR Node server competing with the actual Voe UAT cell for RAM is what's causing the outages.

So "build on GitHub instead of on the server" is really two moves, and the second is the one that matters:

1. **Move the build to GitHub Actions.** Removes the build spike from the box. Necessary but not sufficient.
2. **Stop running an SSR server at all.** Serve the docs as pre-rendered static files from a CDN/static host. This is what actually frees the UAT box — nothing docs-related runs on it afterward.

f0 already ships a `generate` script (`nuxt generate`), so static generation is supported at the tooling level. The engineering is in what f0's *dynamic* server routes do that a static build cannot, and deciding each.

## 2. Recommended approach — Option A: static build in CI → static host

GitHub Actions runs `npm run validate` then `nuxt generate`, producing `.output/public/`, and deploys that folder to a static host. The UAT server runs nothing for docs.

```
push to main ──▶ GitHub Actions
                   │  npm ci
                   │  npm run validate -- ./content     (gate: broken content fails the build)
                   │  npm run generate                  (env: NUXT_PUBLIC_SITE_URL, SITE_NAME, …)
                   │  verify prerender emitted the critical routes (§5)
                   ▼
              deploy .output/public ──▶ GitHub Pages  (or Cloudflare Pages)
                                          served by CDN, no origin server
```

- **Host:** GitHub Pages is the literal reading of "on GitHub" — custom domain (`docs.runvoe.com`), free, zero extra vendor. **Caveat:** GitHub Pages sets its own headers; f0's Nitro `routeRules` cache-control/content-type rules do not carry over. `.txt`/`.xml` files still serve with correct content types by extension, so `/llms.txt` and `/sitemap.xml` are fine, but you cannot tune cache-control. **Cloudflare Pages** is the stronger alternative: same Git-driven flow, plus a `_headers` file to reproduce f0's caching rules, better large-site performance, and no Jekyll quirks. Recommend **GitHub Pages to start, Cloudflare Pages if header control or scale matters.**
- **Content updates:** a push triggers a rebuild; live in ~1–3 minutes. This **replaces** f0's GitHub content-sync webhook (`server/api/webhook.post.ts`) — the webhook is retired, CI rebuild-on-push is the sync.

This removes 100% of docs load from the UAT box and costs ~nothing to host.

## 3. Alternative — Option B: build container in CI → run SSR on a managed edge host

If f0's server features are needed later (see §4), keep SSR but move it off UAT: CI builds the Docker image (f0 already has a `Dockerfile`) or the Nitro `.output`, and deploys to a managed host that runs it for you — Cloudflare Workers (`nitro preset: cloudflare-pages`/`cloudflare-module`), Fly.io, or a container host. The UAT box still runs nothing; the platform runs the server.

- **Keeps:** live search, private/OTP mode, on-the-fly image processing, instant webhook sync.
- **Costs:** a running service (small managed cost), more moving parts, secrets in CI.

**Recommendation: Option A now.** The public builder docs use `AUTH_MODE=public` and have no feature that justifies a running server. Hold Option B in reserve for operator/private docs (§4.3).

## 4. What a static build changes — decide each

### 4.1 Search — the one real code task
`server/api/search.get.ts` and `server/api/agents/search.get.ts` scan the content filesystem live. A static site has no server to scan. **Resolution:** generate a search index (`/search-index.json`) at build time and switch the search UI to a client-side search (e.g. a small fuzzy matcher over the prebuilt index). This is the primary engineering item; everything else is config. If deferred, the site ships with search disabled until the index exists — not acceptable long-term, fine for a first cut.

### 4.2 Content-sync webhook — retired, not lost
`server/api/webhook.post.ts` exists so content updates without a redeploy. CI rebuild-on-push does the same thing. Retire it; document that content goes live on push, not instantly.

### 4.3 Private mode / operator docs — keep out of the static build
`AUTH_MODE=private`, OTP (`server/api/auth/*`), JWT, SES email, admin upload/audit are server-only and cannot be enforced on a static host. The **public builder docs don't use any of it.** If operator runbooks ever need to be private, they must not go in the static build — host them separately (a small access-controlled SSR instance, Option B, or keep them internal). Confirm the `content/` tree carries no `/private` material before going static.

### 4.4 Images — must prerender every variant
`server/api/content/assets/[...path]` processes images on the fly. Static generation must emit every referenced image and variant. The current site has few images (`og-docs.png`, `favicon.png`, a couple of brand assets), so this is low-risk, but the prerender output must be audited (§5).

### 4.5 Generated text/XML routes — must be in the prerender list
`/llms.txt`, `/llms-index.txt`, `/sitemap.xml`, `/feed.xml` are server routes. `nuxt generate` only emits them if they're crawlable or explicitly listed. They must be added to `nitro.prerender.routes` so they ship as files. **This is the single most likely thing to silently go missing** — the `/llms.txt` agent surface is a core promise of these docs.

### 4.6 Health/readiness probes — irrelevant on static
`/_health`, `/_ready` are for a running server. On a CDN the host's availability is the health check. Drop them.

## 5. Prerender completeness — the gate that matters

A static build that silently drops pages is worse than no change. CI must verify, after `generate`, that `.output/public/` contains:

- Every content page (all seven sections + every leaf) — cross-check count against `npm run validate`'s file count.
- `llms.txt`, `llms-index.txt`, `sitemap.xml`, `feed.xml`.
- The OG image and favicon.
- A `404.html` fallback.
- The search index (once §4.1 lands).

`nitro.prerender` should run with `crawlLinks: true` and `failOnError: true`, plus an explicit `routes` list for the non-linked text/XML endpoints. A missing critical file fails the deploy.

## 6. Task list (in order)

1. **Proof of concept.** Run `npm run generate` locally against current content. Audit `.output/public/` against the §5 checklist. Record what's present, what's missing, and whether content pages prerender via link crawling. *This decides whether Option A is a config job or needs prerender-route work.*
2. **Nuxt/Nitro config.** Add `nitro.prerender` with `crawlLinks`, `failOnError`, and explicit routes for `llms.txt`, `llms-index.txt`, `sitemap.xml`, `feed.xml`. Confirm `NUXT_PUBLIC_SITE_URL` drives canonical/OG/sitemap correctly in a static build.
3. **Client-side search (§4.1).** Build the search-index generation step and swap the search UI to it. Largest single item.
4. **CI workflow.** `.github/workflows/deploy.yml`: checkout → `npm ci` → `npm run validate -- ./content` → `npm run generate` → §5 verification → deploy to Pages. Gate on validate and prerender completeness.
5. **Host + domain.** Enable GitHub Pages (or Cloudflare Pages), point `docs.runvoe.com`, set the env for the build. If Cloudflare, add `_headers` to reproduce f0's cache rules.
6. **Retire the webhook (§4.2)** and confirm no `/private` content is in the static tree (§4.3).
7. **Cutover.** Verify the static site at the domain, then stop the docs SSR process on the UAT box. Confirm the box's load drops.

## 7. Risks and open decisions

- **Search regresses to client-side.** Prebuilt-index fuzzy search is less capable than a live server scan for a very large corpus. At this doc size it's a non-issue; note it as a known tradeoff.
- **Content latency.** Instant webhook → ~1–3 min CI rebuild. Acceptable for docs; state it plainly.
- **Header control on GitHub Pages.** Can't set custom cache-control. If that matters, use Cloudflare Pages. Decide at §5.
- **Operator/private docs.** Out of scope for the static site by construction. Decide separately whether they're ever published and how (§4.3).
- **f0 upstream drift.** These are config + one search change on top of f0; keep them minimal and upstream-friendly so an f0 update doesn't fight them.

## 8. Acceptance criteria

- Docs served entirely from a static host at `docs.runvoe.com`; **no docs process runs on the UAT server**, and its memory pressure visibly drops.
- A push to `main` rebuilds and redeploys automatically; a broken content file fails CI before deploy.
- `/llms.txt`, `/llms-index.txt`, `/sitemap.xml`, every content page, OG image, favicon, and `404.html` are present in the deployed output.
- Search works against the prebuilt index.
- No `/private` or operator material is reachable on the public static site.

## 9. Rollback

The current Docker/SSR path (`README.md` → Deployment) stays valid and unchanged. If the static site regresses, redeploy the SSR image to any host (not necessarily UAT) and repoint the domain. Nothing here is destructive to the existing deploy story.
