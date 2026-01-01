# Changelog

All notable changes to web-multiselect-showcase will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- **Updated @keenmate/web-multiselect** to `^1.8.0`
  - v1.8.0: **BREAKING** - CSS variable naming consolidation (`background` → `bg` for shorter names)
    - All `--ms-*-background*` variables renamed to `--ms-*-bg*` (35+ variables)
    - All `--base-*-background*` variables renamed to `--base-*-bg*` (8 variables)
    - `--ms-text-on-accent` → `--ms-text-color-on-accent`
    - `--base-text-on-accent` → `--base-text-color-on-accent`
  - v1.7.0: Generic border variable, checkbox/option/badge color fixes
  - v1.6.1: Complete theming variable cascade fix (`--base-*` variables now properly cascade)
  - v1.6.0: SCSS to CSS migration, new features

- **Restructured navigation** - Moved all pages from `/examples/*` to `/features/*` to match web-daterangepicker-showcase structure
  - Removed "Examples" navigation section
  - All example pages now under "Features" section: Basic Usage, Groups, Flexible Data, Value Format, Form Integration, Async Search, Virtual Scrolling, Display Modes, RTL Support, Advanced Features, Custom Styling
  - Custom Styling page restructured with live demos (CS01-CS05 sections)
  - Deleted old `api/styling` page (merged into Custom Styling)
  - Updated all internal links to use `/features/*` routes

- **Updated API Reference documentation** to match current component API
  - `/api/component`: Added missing callbacks (getBadgeDisplayCallback, getBadgeClassCallback, renderGroupLabelContentCallback, beforeSearchCallback, customStylesCallback), new Rendering Callbacks section, Tooltip Callbacks section, Action Buttons section, updated version example to 1.8.0
  - `/api/properties`: Fixed attribute names (`pills-*` → `badges-*`), removed non-existent attributes (allow-select-all, allow-clear-all), added missing attributes (dropdown-max-width, keep-options-on-search, should-keep-search-on-close, search-mode, actions-layout, remove-button-tooltip-text), added Virtual Scrolling section
  - `/api/events`: Fixed component selector in examples (`multi-select` → `web-multiselect`)

### Added
- **Compile-time version badge** - Version now displayed in navbar, extracted from package-lock.json at build time via Vite's `define` feature
  - Handles both normal npm dependencies and `file:` links for local development
  - Badge moved into navbar on mount for consistent positioning

- **Example Index System** - Added prefix codes to all 51 examples across 11 pages for quick reference
  - Created `EXAMPLES.md` with complete lookup table and prefix reference
  - Prefixes: BU (Basic Usage), GR (Groups), FD (Flexible Data), VF (Value Format), FI (Form Integration), AS (Async Search), VS (Virtual Scrolling), CS (Custom Styling), DM (Display Modes), RTL (RTL Support), AF (Advanced Features)
  - Each `ShowcaseSection` title now includes its example code (e.g., "BU01 Basic Multiselect", "DM05 Compact Mode")

### Changed
- **Updated @keenmate/svelte-docs** from `1.0.0-rc08` to `1.0.0-rc09`
  - Migrated Plausible analytics from `app.html` to `analyticsScripts` config option

### Added
- **Groups Example Page** - New dedicated `/examples/groups` page documenting group customization features
  - Custom Group Labels section demonstrating `renderGroupLabelContentCallback` with string returns (emoji + uppercase)
  - Group Styling section showcasing all CSS variables for group appearance customization
  - Advanced Customization section combining callbacks + styling with HTMLElement returns (colored dot indicators)
  - Complete CSS variables reference for groups (`--ms-group-*` properties)
  - Code examples for both string and HTMLElement callback return patterns
