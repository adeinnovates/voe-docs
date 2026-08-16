---
title: Run Voe As A Cell
description: One container, one volume, one database — the deployment unit.
---

# Run Voe as a cell

A **cell** is one self-contained Voe deployment: one OCI container supervising the API, MCP servers, workers, SMTP receiver, mail sidecar, and Postgres, with one `/data` volume for raw material, page repositories, and WAL archive.

```bash
docker run -d --name voe \
  -p 8080:8080 -p 8081:8081 -p 25:25 \
  -v voe_data:/data \
  --env-file voe.env \
  voe:latest
```

Startup order inside the container: Postgres, then migrations (`voe-migrate` retries until clean — including the standing reconcile), then the services. The container is healthy when `GET /healthz` answers.

Ports: `8080` API + dashboard, `8081` MCP HTTP (where exposed), `25` SMTP intake.

Scaling model: cells scale by adding cells, not by sharing databases — one cell's tenants never share a blast radius with another's.

Next: [Required services](/deploy/required-services) · [Environment variables](/deploy/environment-variables)
