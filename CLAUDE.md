# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Monorepo for Miso JavaScript SDK documentation sites. Generates static documentation for Client SDK (browser) and Server SDK (Node.js) using 11ty (Eleventy).

## Development Commands

```bash
# Start development server for client-sdk docs (with live reload)
npm run client

# Start development server for server-sdk docs
npm run server

# Full production build of all sites
npm run build

# Update version across all workspaces (semantic versioning)
npm run version [version]
```

Development servers run on port 10101.

## Architecture

**Monorepo structure using npm workspaces:**

- `packages/specs/` - YAML-based API specifications (rollup-bundled)
- `packages/plugin/` - Custom 11ty plugin that configures doc sites
- `sites/shared/` - Shared SCSS, layouts, and includes
- `sites/client-sdk/` - Client SDK documentation site
- `sites/server-sdk/` - Server SDK documentation site

**Build flow:**
1. Build specs package (rollup) and shared styles (SASS)
2. Compile site-specific SASS and JavaScript
3. 11ty generates static HTML from markdown/Nunjucks templates

**Site structure (both client-sdk and server-sdk):**
- `page/` - Source content (markdown, Nunjucks)
- `_data/` - YAML configuration and content data
- `dist/` - Generated static output

**Tech stack:** 11ty v3, Nunjucks templating, markdown-it, SASS, Rollup

## Deployment

GitHub Actions (`publish.yml`) deploys generated docs to external repositories:
- Client SDK docs → `MisoAI/miso-client-js-sdk`
- Server SDK docs → `MisoAI/miso-server-js-sdk`

Triggered by `workflow_dispatch` or GitHub release events.

## Version Management

The `bin/version.js` script synchronizes versions across workspaces. Accepts semantic versioning pattern: `X.Y.Z` or `X.Y.Z-beta.N`.
