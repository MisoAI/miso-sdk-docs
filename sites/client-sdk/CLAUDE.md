# CLAUDE.md - Client SDK Docs Site

## Overview

Documentation site for Miso Client SDK (browser JavaScript). Built with 11ty v3, Nunjucks templating, and markdown-it. Deployed to `MisoAI/miso-client-js-sdk` repo via GitHub Actions.

## Packages Covered

This doc site covers the following npm packages, all from the same monorepo [`MisoAI/miso-client-js-sdk`](https://github.com/MisoAI/miso-client-js-sdk):

- `@miso.ai/client-sdk` - Core client SDK. Provides `MisoClient` for calling Miso APIs, managing anonymous IDs, capturing page info/UTM parameters, and UI workflows (ask, explore, search, recommendation) with custom elements.
- `@miso.ai/client-sdk-algolia` - Algolia plugin. Adapter for using Miso as a backend with Algolia InstantSearch.js and Autocomplete.
- `@miso.ai/client-sdk-gtm` - Google Tag Manager plugin. Bridges Miso interactions with GTM ecommerce events.
- `@miso.ai/progressive-markdown` - Standalone utility for transforming markdown to HTML and rendering it incrementally (typewriter effect).

The Shopify plugin is also documented (`page/plugins/shopify/`) but is distributed as a Shopify App rather than a standalone npm package.

The source repo contains a demo project with many pages that can serve as useful references when writing documentation.

## Development

```bash
# From repo root
npm run client        # Start dev server (port 10101)

# From this directory
npm start             # Same as above
npm run build         # Full production build
```

## Directory Structure

- `page/` - Source content (markdown + Nunjucks templates)
  - `page/_shared/` - Reusable markdown partials (prefixed with `_`)
  - `page/answers/` - Answers feature docs (ask, explore, hybrid-search)
  - `page/search/` - Search feature docs (api, ui)
  - `page/recommendation/` - Recommendation feature docs (api, ui)
  - `page/elements/` - Custom HTML elements docs (containers, components, collections)
  - `page/plugins/` - Plugin docs (Algolia, GTM, Shopify)
  - `page/advanced/` - Advanced topics (performance, progressive markdown)
  - `page/demo/` - Live demo pages (Nunjucks + JS + CSS, passthrough-copied)
  - `page/system/` - System pages (syntax reference)
- `_data/` - Data files consumed by 11ty and Nunjucks
  - `chapters.yml` - Top-level navigation chapters
  - `sitemap/` - Per-chapter sitemap YAML files defining page metadata and ordering
  - `intro.yml` - Landing page content
  - `prop/` - YAML property definitions (helpers, query API)
  - `comparison/` - Feature comparison data (e.g., Algolia)
  - `tech.yml` - Technology stack info
  - `tools.yml` - Tools configuration
  - `redirects.yml` - URL redirects
  - `eleventyComputed.js` - 11ty computed data
- `src/` - Client-side JavaScript (bundled via Rollup to `dist/js/main.js`)
- `scss/` - Site-specific SCSS (compiled to `dist/css/`)
- `asset/` - Static assets (images)
- `dist/` - Build output (static files, CSS, JS, favicons)
- `_site/` - 11ty output directory

## Key Files

- `.eleventy.js` - 11ty config; registers the shared plugin (`@miso.ai/eleventy-plugin-miso-docs`), sets `pathPrefix` to `/miso-client-js-sdk/`, and exposes a `data` global to Nunjucks
- `data.js` - Computes site data (props, tech stack, comparisons, page metadata) from `_data/` YAML files
- `rollup.config.js` - Bundles `src/index.js` into `dist/js/main.js` (IIFE, minified)

## Content Conventions

- Doc chapters are defined in `_data/chapters.yml`: answers, search, recommendation, elements, plugins
- Each chapter's page structure is defined in `_data/sitemap/<chapter>.yml`
- Markdown files prefixed with `_` (e.g., `_container-attributes.md`) are partials, included by other pages
- Nunjucks templates (`.njk`) are used for the landing page and demo pages
- The shared 11ty plugin (`packages/plugin/`) provides layouts, shortcodes, and markdown-it config

## Shared Dependencies

- `@miso.ai/eleventy-plugin-miso-docs` (`packages/plugin/`) - 11ty plugin with layouts, includes, and utilities
- `@miso.ai/miso-specs` (`packages/specs/`) - API spec data
- `sites/shared/` - Shared SCSS and layouts (copied to `dist/` during build)
