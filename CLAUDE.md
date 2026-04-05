# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **web-grid-showcase** — a static documentation/demo site for the `@keenmate/web-grid` data grid web component. Built with SvelteKit and deployed as pre-rendered static HTML via Docker/Nginx.

## Commands

```bash
# Development
make dev              # Start dev server on port 5174
make dev-host         # Dev server accessible on LAN

# Build & check
make build            # Production build (static HTML to /build)
make check            # TypeScript + Svelte type checking
make check:watch      # Type checking in watch mode

# Local library development (linked @keenmate/web-grid)
make link-lib         # Link local web-grid package
make setup-dev        # install + link
make rebuild-lib      # Rebuild and relink web-grid

# Docker
make docker-build     # Build Docker image
make docker-run       # Run on port 8080
```

No automated tests — `make check` (svelte-check) is the primary validation tool.

## Architecture

- **SvelteKit static site** using `@sveltejs/adapter-static` — all routes are pre-rendered
- **`@keenmate/svelte-docs`** provides the documentation layout framework (DocLayout, ShowcaseSection, CodeBlock, ConfigProvider)
- **`@keenmate/web-grid`** is the web component being showcased — imported client-side only via `onMount()` to avoid SSR issues

### Route Structure

- `src/routes/+page.svelte` — Landing page
- `src/routes/features/*/+page.svelte` — 19 feature demo pages (sorting, filtering, editing, etc.)
- `src/routes/api/*/+page.svelte` — API reference pages (component, columns, editors, events)
- `src/routes/getting-started/` — Setup guide
- `src/routes/+layout.server.ts` — Centralized site config (navigation, metadata, analytics, features)

### Key Patterns

- **ShowcaseSection** — Standard demo layout: live demo | code example | description
- **Client-only web component imports** — Always import `@keenmate/web-grid` inside `onMount()`, never at top level
- **Version injection** — `vite.config.ts` reads web-grid version from package-lock.json and exposes it as `__GRID_VERSION__` build constant
- **SSR theme styles** — Generated in `+layout.server.ts` to prevent FOUC

### Styling

- Bootstrap 5 + SCSS (`src/app.scss`)
- `@keenmate/svelte-docs` theme styles imported globally
- Demo-specific utility classes defined in `app.scss` (`.grid-demo`, `.grid-controls`, `.grid-state`, etc.)
- Theme set via `data-theme="docs"` attribute on `<html>`

## Deployment

- GitHub Actions CI/CD: branches `dev`, `uat`, `prod` trigger builds via shared workflow from `KeenMate/gha-shared`
- Docker: multi-stage build (Node Alpine builder -> Nginx Alpine production)
- Nginx serves static files with gzip, cache headers, security headers, and SvelteKit routing fallback
