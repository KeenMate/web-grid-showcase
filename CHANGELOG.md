# Changelog

All notable changes to web-grid-showcase will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Row Selection feature page** (`/features/row-selection`) - Multi-row selection via row numbers
  - Basic selection demo with live selection log
  - Range shortcuts demo with Delete and Ctrl+Alt+E actions
  - Full API reference with methods and TypeScript types
  - CSS variables documentation
- **Fill Handle feature page** (`/features/fill-handle`) - Excel-like drag-to-fill
  - Interactive demo with direction toggle
  - Type-based validation explanation
  - Full API reference
- **Column Resizing feature page** (`/features/column-resize`) - Drag to resize columns
  - Interactive demo with min/max constraints
  - LocalStorage persistence guide
  - Programmatic API examples
- **Column Reordering feature page** (`/features/column-reorder`) - Drag to reorder columns
  - Interactive demo with move buttons
  - LocalStorage persistence guide
  - Programmatic API examples
- **Freeze Panes feature page** (`/features/freeze-panes`) - Frozen columns
  - Interactive demo with controls
  - Column-level frozen property demo
  - API reference

### Changed
- **Updated @keenmate/web-grid** to 1.0.0-rc08
- **API Component page** - Added new sections:
  - Row Selection Properties (selectedRows, rangeShortcuts, selection methods)
  - Resizable Columns Properties (gridName, persistColumnWidths, resize methods)
  - Reorderable Columns Properties (allowColumnReorder, persistColumnOrder, reorder methods)
  - Fill Handle Properties (fillDirection, onfilldrag, type-based validation)
  - Freeze Panes Properties (stickyRowNumbers, freezeColumns, column frozen)
- **Navigation** - Added new feature pages:
  - Fill Handle
  - Column Resizing
  - Column Reordering
  - Freeze Panes
  - Row Selection

---

## [Previous]

### Changed
- **Complete repository conversion** from web-multiselect-showcase to web-grid-showcase
  - Renamed package from `web-multiselect-showcase` to `web-grid-showcase`
  - Replaced `@keenmate/web-multiselect` dependency with `@keenmate/web-grid`
  - Updated all branding, metadata, and site configuration

### Added
- **New feature pages** showcasing web-grid capabilities:
  - `/features/basic` - Basic grid setup, columns, formatting, row numbers, cell styling
  - `/features/sorting` - Single and multi-column sorting, server-side sorting
  - `/features/pagination` - Client/server pagination, page sizes, position customization
  - `/features/editing` - 7 editor types (text, number, checkbox, select, combobox, date, autocomplete)
  - `/features/toolbar` - Row toolbar with predefined and custom actions
  - `/features/context-menu` - Right-click context menu with dynamic items
  - `/features/keyboard-navigation` - Excel-like navigation, shortcuts, clipboard support
  - `/features/virtual-scrolling` - Virtual scroll for large datasets, infinite scroll
  - `/features/custom-styling` - CSS variables, theme integration, dynamic styling callbacks

- **New API reference pages**:
  - `/api/component` - Complete component API with all properties grouped by category
  - `/api/columns` - Column interface documentation with formatting, editing, and validation
  - `/api/editors` - Detailed documentation for all 7 editor types plus custom editors
  - `/api/events` - Events vs callbacks naming convention, all event types with TypeScript definitions

- **Home page** with feature highlights:
  - Framework agnostic web component
  - 7 built-in editor types
  - Multi-column sorting
  - Excel-like keyboard navigation
  - Row toolbar and context menu
  - Virtual scrolling for 10,000+ rows

- **Getting started page** with:
  - Installation instructions
  - Basic usage example
  - Editable grid example
  - Framework integration guides (Svelte, React, Vue, Angular)
  - TypeScript support documentation

### Removed
- **Deleted multiselect-specific feature pages**:
  - `/features/groups`
  - `/features/flexible-data`
  - `/features/value-format`
  - `/features/form-integration`
  - `/features/async-search`
  - `/features/display-modes`
  - `/features/rtl`
  - `/features/advanced-features`

- **Deleted obsolete API pages**:
  - `/api/properties` (replaced by `/api/columns`)
  - `/api/logging`

### Technical
- Updated `vite.config.ts` to inject `__GRID_VERSION__` instead of `__MULTISELECT_VERSION__`
- Updated `app.scss` with grid-specific demo classes
- Updated navigation structure in `+layout.server.ts`
- Updated CSS import to `@keenmate/web-grid/dist/style.css`
