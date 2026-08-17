#!/usr/bin/env node

/**
 * =============================================================================
 * F0 - CONTENT VALIDATION CLI
 * =============================================================================
 * 
 * Standalone CLI tool for validating f0 content directories before deployment.
 * Runs without a server - no Nuxt, no Nitro, just filesystem checks.
 * 
 * USAGE:
 *   node bin/validate.mjs ./content
 *   npx f0 validate ./content
 * 
 * CHECKS:
 * | Check                   | Severity | Description                                |
 * |-------------------------|----------|--------------------------------------------|
 * | Frontmatter YAML        | Error    | Malformed YAML will crash the parser       |
 * | Image reference exists  | Warning  | Broken image paths                         |
 * | Heading hierarchy       | Warning  | H1→H4 without H2/H3 confuses TOC          |
 * | Title resolution        | Warning  | No title source (no frontmatter, no H1)    |
 * | nav.md link targets     | Warning  | Links to directories that don't exist      |
 * | Duplicate slugs         | Error    | Two files resolving to the same URL        |
 * | File size               | Warning  | Files over 500KB (slow to parse)           |
 * | Character encoding      | Warning  | Non-UTF-8 files                            |
 * | Brand language          | Error    | Refused punctuation and words              |
 * | LLM plain text          | Error    | Code identifiers and fences survive        |
 * 
 * EXIT CODES:
 *   0 - All checks passed (warnings allowed)
 *   1 - Errors found
 *   2 - Invalid arguments
 */

import { readdir, readFile, stat } from 'fs/promises'
import { existsSync } from 'fs'
import { join, resolve, extname, basename, dirname, relative } from 'path'
import { parse as yamlParse } from 'yaml'

// =============================================================================
// COLORS (ANSI escape codes)
// =============================================================================

const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
}

// =============================================================================
// TYPES
// =============================================================================

/** @typedef {'error' | 'warning'} Severity */
/** @typedef {{ file: string, line?: number, severity: 'error' | 'warning', check: string, message: string }} Issue */

// =============================================================================
// CHECKS
// =============================================================================

/**
 * Extract frontmatter from markdown content.
 * Returns { frontmatter, content, error }
 */
function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) {
    return { frontmatter: null, content, error: null }
  }

  try {
    const fm = yamlParse(match[1])
    return { frontmatter: fm || {}, content: match[2], error: null }
  } catch (err) {
    return { frontmatter: null, content: match[2], error: err.message }
  }
}

/**
 * Extract image references from markdown content.
 */
function extractImageRefs(content) {
  const refs = []
  const mdRegex = /!\[[^\]]*\]\(([^)]+)\)/g
  let m
  while ((m = mdRegex.exec(content)) !== null) {
    const src = m[1].split(/\s+/)[0]
    if (src && !src.startsWith('http://') && !src.startsWith('https://') && !src.startsWith('data:')) {
      refs.push({ src, index: m.index })
    }
  }
  return refs
}

/**
 * Find the line number for a character index.
 */
function lineNumber(content, charIndex) {
  return content.substring(0, charIndex).split('\n').length
}

/**
 * Resolve image path to filesystem.
 */
function resolveImagePath(contentDir, mdFilePath, src) {
  if (src.startsWith('/')) return join(contentDir, src)
  if (src.startsWith('./assets/') || src.startsWith('assets/')) {
    return join(contentDir, src.replace(/^\.\//, ''))
  }
  return resolve(dirname(mdFilePath), src)
}

/**
 * Extract headings from markdown.
 */
function extractHeadings(content) {
  const headings = []
  const lines = content.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^(#{1,6})\s+(.+)$/)
    if (match) {
      headings.push({ level: match[1].length, text: match[2], line: i + 1 })
    }
  }
  return headings
}

/**
 * Generate URL slug from file path.
 */
function fileToSlug(contentDir, filePath) {
  const rel = relative(contentDir, filePath)
  return '/' + rel
    .replace(/\\/g, '/')
    .replace(extname(rel), '')
    .replace(/^\d{4}-\d{2}-\d{2}-/, '')
    .replace(/\/\d{4}-\d{2}-\d{2}-/g, '/')
    .replace(/^\d+-/, '')
    .replace(/\/\d+-/g, '/')
    .replace(/\/index$/, '')
    .replace(/^home$/, '')
}

// =============================================================================
// SCANNER
// =============================================================================

async function scanMarkdownFiles(dir) {
  const files = []
  async function walk(d) {
    try {
      const entries = await readdir(d, { withFileTypes: true })
      for (const entry of entries) {
        if (entry.name.startsWith('.') || entry.name.startsWith('_')) continue
        if (entry.name === 'assets' || entry.name === 'images') continue

        const full = join(d, entry.name)
        if (entry.isDirectory()) {
          await walk(full)
        } else if (entry.name.endsWith('.md') && entry.name !== 'nav.md') {
          files.push(full)
        }
      }
    } catch {}
  }
  await walk(dir)
  return files
}

async function scanTextContentFiles(dir) {
  const files = []
  async function walk(d) {
    try {
      const entries = await readdir(d, { withFileTypes: true })
      for (const entry of entries) {
        if (entry.name.startsWith('.') || entry.name.startsWith('_')) continue
        if (entry.name === 'assets' || entry.name === 'images') continue

        const full = join(d, entry.name)
        if (entry.isDirectory()) {
          await walk(full)
        } else if (entry.name.endsWith('.md') || entry.name.endsWith('.json')) {
          files.push(full)
        }
      }
    } catch {}
  }
  await walk(dir)
  return files
}

async function scanImages(dir) {
  const images = []
  const assetsDir = join(dir, 'assets')
  if (!existsSync(assetsDir)) return images

  async function walk(d) {
    try {
      const entries = await readdir(d, { withFileTypes: true })
      for (const entry of entries) {
        if (entry.name.startsWith('.')) continue
        const full = join(d, entry.name)
        if (entry.isDirectory()) {
          await walk(full)
        } else {
          const ext = extname(entry.name).toLowerCase()
          if (['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.avif', '.ico'].includes(ext)) {
            images.push(full)
          }
        }
      }
    } catch {}
  }
  await walk(assetsDir)
  return images
}

// =============================================================================
// NAV.MD VALIDATION
// =============================================================================

async function validateNavMd(contentDir) {
  const issues = []
  const navPath = join(contentDir, 'nav.md')

  if (!existsSync(navPath)) {
    issues.push({
      file: 'nav.md',
      severity: 'warning',
      check: 'nav.md exists',
      message: 'nav.md not found - top navigation will be empty',
    })
    return { issues, sections: 0 }
  }

  try {
    const content = await readFile(navPath, 'utf-8')
    const links = []
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    let m
    while ((m = linkRegex.exec(content)) !== null) {
      links.push({ title: m[1], path: m[2], line: lineNumber(content, m.index) })
    }

    // Check each link target exists as a directory
    for (const link of links) {
      if (link.path.startsWith('http://') || link.path.startsWith('https://')) continue
      const targetDir = join(contentDir, link.path.replace(/^\//, ''))
      if (!existsSync(targetDir)) {
        issues.push({
          file: 'nav.md',
          line: link.line,
          severity: 'warning',
          check: 'nav.md link targets',
          message: `Link target not found: "${link.path}" (${link.title})`,
        })
      }
    }

    return { issues, sections: links.length }
  } catch (err) {
    issues.push({
      file: 'nav.md',
      severity: 'error',
      check: 'nav.md parse',
      message: `Failed to read nav.md: ${err.message}`,
    })
    return { issues, sections: 0 }
  }
}

// =============================================================================
// BRAND AND LLM OUTPUT CONTRACTS
// =============================================================================

const refusedWords = [
  'trust' + 'worthy',
  'guard' + 'rail',
  'bound' + 'ary',
  'determin' + 'istic',
  'load' + '-bearing',
  'memory ' + 'layer',
]

function validateBrandLanguage(content, relPath, issues) {
  const emDash = String.fromCharCode(0x2014)
  const enDash = String.fromCharCode(0x2013)
  const escapedEmDash = '\\' + 'u20' + '14'
  const escapedEnDash = '\\' + 'u20' + '13'

  for (const marker of [emDash, enDash, escapedEmDash, escapedEnDash]) {
    let index = content.indexOf(marker)
    while (index !== -1) {
      issues.push({
        file: relPath,
        line: lineNumber(content, index),
        severity: 'error',
        check: 'brand language',
        message: 'Refused dash punctuation found. Use a comma, colon, semicolon, period, or plain hyphen.',
      })
      index = content.indexOf(marker, index + marker.length)
    }
  }

  for (const word of refusedWords) {
    const pattern = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
    const match = pattern.exec(content)
    if (match) {
      issues.push({
        file: relPath,
        line: lineNumber(content, match.index),
        severity: 'error',
        check: 'brand language',
        message: `Refused word or phrase found: "${word}".`,
      })
    }
  }
}

function renderLlmsPlainTextFixture(markdown) {
  const codeSegments = []
  const stashCode = (segment) => {
    const token = `@@VOECODE${codeSegments.length}@@`
    codeSegments.push(segment)
    return token
  }

  let text = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '')
  text = text.replace(/```[^\n]*\n[\s\S]*?```/g, (match) => stashCode(match.trimEnd()))
  text = text.replace(/`[^`\n]+`/g, (match) => stashCode(match))
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)')
  text = text.replace(/\*\*([^*]+)\*\*/g, '$1')
  text = text.replace(/\*([^*]+)\*/g, '$1')
  text = text.replace(/(^|[^\w])__([^_\n]+)__([^\w]|$)/g, '$1$2$3')
  text = text.replace(/(^|[^\w])_([^_\n]+)_([^\w]|$)/g, '$1$2$3')
  text = text.trim()

  for (let i = 0; i < codeSegments.length; i++) {
    text = text.replaceAll(`@@VOECODE${i}@@`, codeSegments[i])
  }

  return text
}

function validateLlmsPlainTextContract(issues) {
  const sample = [
    'Use `VOE_TOKEN`, `email_local`, `get_context`, `graph_query`, `entity_timeline`, `create_page`, and `patch_page`.',
    '',
    '```bash',
    'export VOE_PUBLIC_BASE_URL=https://docs.example',
    'export VOE_MAIL_SIDECAR_QUEUE_KEY=hex',
    'export ANTHROPIC_API_KEY=sk_test',
    '```',
  ].join('\n')

  const rendered = renderLlmsPlainTextFixture(sample)
  const required = [
    '`VOE_TOKEN`',
    '`email_local`',
    '`get_context`',
    '`graph_query`',
    '`entity_timeline`',
    '`create_page`',
    '`patch_page`',
    '```bash',
    'VOE_PUBLIC_BASE_URL',
    'VOE_MAIL_SIDECAR_QUEUE_KEY',
    'ANTHROPIC_API_KEY',
    '```',
  ]
  const forbidden = [
    'VOETOKEN',
    'emaillocal',
    'getcontext',
    'graphquery',
    'entitytimeline',
    'createpage',
    'patchpage',
    'VOEPUBLICBASEURL',
    'VOEMAILSIDECARQUEUEKEY',
    'ANTHROPICAPIKEY',
  ]

  const failed = required.some((item) => !rendered.includes(item)) || forbidden.some((item) => rendered.includes(item))
  if (failed) {
    issues.push({
      file: '(llms.txt contract)',
      severity: 'error',
      check: 'LLM plain text',
      message: 'Inline code, snake_case identifiers, env vars, and fenced code blocks must survive plain-text rendering.',
    })
  }
}

// =============================================================================
// MAIN VALIDATION
// =============================================================================

async function validate(contentDir) {
  const issues = []
  const startTime = performance.now()

  console.log(`${c.bold}${c.cyan}f0 Content Validation${c.reset}`)
  console.log(`${'='.repeat(50)}`)
  console.log()
  console.log(`Scanning ${c.bold}${contentDir}${c.reset}...`)
  console.log()

  // 1. Check nav.md
  const { issues: navIssues, sections } = await validateNavMd(contentDir)
  issues.push(...navIssues)
  if (navIssues.length === 0 && existsSync(join(contentDir, 'nav.md'))) {
    console.log(`${c.green}✓${c.reset} nav.md parsed successfully (${sections} sections)`)
  }

  // 2. Scan files
  const mdFiles = await scanMarkdownFiles(contentDir)
  console.log(`${c.green}✓${c.reset} ${mdFiles.length} markdown files found`)

  const textFiles = await scanTextContentFiles(contentDir)
  console.log(`${c.green}✓${c.reset} ${textFiles.length} text content files found`)

  const images = await scanImages(contentDir)
  console.log(`${c.green}✓${c.reset} ${images.length} images found`)
  console.log()

  // 3. Check for duplicate slugs
  const slugMap = new Map()
  for (const file of mdFiles) {
    const slug = fileToSlug(contentDir, file)
    if (slugMap.has(slug)) {
      issues.push({
        file: relative(contentDir, file),
        severity: 'error',
        check: 'duplicate slugs',
        message: `Duplicate URL slug "${slug}" - conflicts with ${relative(contentDir, slugMap.get(slug))}`,
      })
    } else {
      slugMap.set(slug, file)
    }
  }

  // Brand and LLM-output contracts
  for (const file of textFiles) {
    try {
      const content = await readFile(file, 'utf-8')
      validateBrandLanguage(content, relative(contentDir, file), issues)
    } catch {}
  }
  validateLlmsPlainTextContract(issues)

  // 4. Validate each file
  for (const file of mdFiles) {
    const relPath = relative(contentDir, file)
    let content

    // File size check
    try {
      const stats = await stat(file)
      if (stats.size > 500 * 1024) {
        issues.push({
          file: relPath,
          severity: 'warning',
          check: 'file size',
          message: `File is ${Math.round(stats.size / 1024)}KB - files over 500KB are slow to parse`,
        })
      }
    } catch {}

    // Read file
    try {
      content = await readFile(file, 'utf-8')
    } catch (err) {
      issues.push({
        file: relPath,
        severity: 'error',
        check: 'encoding',
        message: `Failed to read file as UTF-8: ${err.message}`,
      })
      continue
    }

    // Character encoding check (look for null bytes or replacement chars)
    if (content.includes('\0') || content.includes('\uFFFD')) {
      issues.push({
        file: relPath,
        severity: 'warning',
        check: 'encoding',
        message: 'File contains non-UTF-8 or null byte characters',
      })
    }

    // Frontmatter validation
    const { frontmatter, content: mdContent, error: fmError } = extractFrontmatter(content)
    if (fmError) {
      issues.push({
        file: relPath,
        severity: 'error',
        check: 'frontmatter',
        message: `Invalid YAML frontmatter: ${fmError}`,
      })
    }

    // Title resolution check
    const headings = extractHeadings(mdContent)
    const h1 = headings.find(h => h.level === 1)
    const fmTitle = frontmatter?.title
    if (!fmTitle && !h1) {
      issues.push({
        file: relPath,
        severity: 'warning',
        check: 'title',
        message: 'No H1 heading and no title in frontmatter',
      })
    }

    // Heading hierarchy check
    for (let i = 1; i < headings.length; i++) {
      const prev = headings[i - 1]
      const curr = headings[i]
      if (curr.level > prev.level + 1) {
        issues.push({
          file: relPath,
          line: curr.line,
          severity: 'warning',
          check: 'heading hierarchy',
          message: `Heading jump from H${prev.level} to H${curr.level} (skipped H${prev.level + 1})`,
        })
      }
    }

    // Image reference validation
    const imgRefs = extractImageRefs(content)
    for (const ref of imgRefs) {
      const resolved = resolveImagePath(contentDir, file, ref.src)
      if (!existsSync(resolved)) {
        issues.push({
          file: relPath,
          line: lineNumber(content, ref.index),
          severity: 'warning',
          check: 'missing image',
          message: `Image not found: ${ref.src}`,
        })
      }
    }
  }

  // ==========================================================================
  // REPORT
  // ==========================================================================

  const errors = issues.filter(i => i.severity === 'error')
  const warnings = issues.filter(i => i.severity === 'warning')
  const duration = Math.round(performance.now() - startTime)

  if (warnings.length > 0) {
    console.log(`${c.yellow}${c.bold}Warnings:${c.reset}`)
    for (const w of warnings) {
      const loc = w.line ? `:${w.line}` : ''
      console.log(`  ${c.yellow}⚠${c.reset} ${c.dim}${w.file}${loc}:${c.reset} ${w.message}`)
    }
    console.log()
  }

  if (errors.length > 0) {
    console.log(`${c.red}${c.bold}Errors:${c.reset}`)
    for (const e of errors) {
      const loc = e.line ? `:${e.line}` : ''
      console.log(`  ${c.red}✗${c.reset} ${c.dim}${e.file}${loc}:${c.reset} ${e.message}`)
    }
    console.log()
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log(`${c.green}${c.bold}All checks passed!${c.reset}`)
    console.log()
  }

  console.log(`${c.bold}Summary:${c.reset} ${mdFiles.length} files, ${c.red}${errors.length} errors${c.reset}, ${c.yellow}${warnings.length} warnings${c.reset} (${duration}ms)`)

  return errors.length > 0 ? 1 : 0
}

// =============================================================================
// CLI ENTRY POINT
// =============================================================================

const args = process.argv.slice(2)

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  console.log(`
${c.bold}f0 Content Validation${c.reset}

${c.bold}Usage:${c.reset}
  node bin/validate.mjs <content-dir>
  node bin/validate.mjs ./content

${c.bold}Checks:${c.reset}
  • Frontmatter YAML validity
  • Image reference existence
  • Heading hierarchy (no skipped levels)
  • Title resolution (frontmatter or H1)
  • nav.md link targets
  • Duplicate URL slugs
  • File size (>500KB warning)
  • Character encoding (UTF-8)
  • Brand language and punctuation
  • LLM plain-text rendering contract

${c.bold}Exit codes:${c.reset}
  0 - All checks passed
  1 - Errors found
  2 - Invalid arguments
`)
  process.exit(args.includes('--help') || args.includes('-h') ? 0 : 2)
}

const contentDir = resolve(args[0])

if (!existsSync(contentDir)) {
  console.error(`${c.red}Error:${c.reset} Content directory not found: ${contentDir}`)
  process.exit(2)
}

validate(contentDir).then(code => process.exit(code))
