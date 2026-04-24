# Changelog

All notable changes to web-grid-showcase will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - v1.0.5 Showcase Update

### Added

- **Custom Editors page** (`/features/custom-editors`) — `editor: 'custom'` + `cellEditCallback` showcase
  - CE01: Simple prompt editor — the minimum viable custom editor
  - CE02: Product search dialog — modal lookup with keyboard nav, highlighted matches, and the `items = [...rows]` trick in `onrowchange` to refresh sibling cells that derive their display from the edited field
  - CE03: Inline color picker popover — floating panel anchored to the cell via `gridElement.shadowRoot.querySelector('td[data-row=…][data-field=…]')`
  - Reference table for `CustomEditorContext<T>` and a note on the legacy positional-callback trap
- **Dirty Indicator page** (`/features/dirty-indicator`) — shipped in v1.0.4, previously uncovered
  - DI01: Basic indicator with live `isDirtyIndicatorVisible` toggle
  - DI02: Save / Discard workflow using `getDraftRowIndices`, `getRowDraft`, `discardRowDraft`, `discardAllDrafts`, with live "N rows / M cells dirty" stats
  - DI03: Custom theming via `--wg-dirty-indicator-color`, `--wg-dirty-cell-bg`, `--wg-dirty-indicator-size`
  - Full API reference table for the dirty / draft methods
- **Callbacks API page** (`/api/callbacks`) — reference for every `*Callback` grouped by aspect, with `Purpose & when it fires` per row
  - Eight tables: cell content rendering, editing & validation, tooltips, styling hooks, clipboard, row locking, dropdown option resolvers, and data / summary / pagination / fill
  - Introduction contrasts callbacks (return value affects behavior) with events (`on*`, fire-and-forget) per the project naming convention
- **Navigation** — added *Custom Editors* and *Dirty Indicator* entries under Features, and *Callbacks* under API Reference
- **EXAMPLES.md** refresh — added every previously-missing section code (CE01-03, DI01-03, GM01-04, SU01-02, FI01-02, ED04, SO04, TB04-05, KN03, CS06) and prefix-table entries for CE, DI, GM, SU, FI

### Changed

- **`@keenmate/svelte-docs`** bumped from `^1.0.0-rc09` to `^1.0.0-rc11`
- **npm overrides** added to `package.json` for clean `npm audit` — forces patched versions of `cookie` (`^1.0.2`), `uuid` (`^14.0.0`), and `picomatch` (`^4.0.0`). Reduces audit from 8 vulnerabilities to 0.

### Fixed

- **CE03 color picker**
  - Use `templateCallback` (raw HTML) instead of `formatCallback` (which escapes the return value); the swatch preview was showing literal `<span>` markup in the cell
  - Anchor the popover to the color grid's own `shadowRoot` instead of `document.querySelector('web-grid')` (which was hitting CE01's grid)
  - Use the correct cell attribute `data-row` on `<td>` (not `data-row-index`, which lives on `<tr>`)
  - Clamp the popover position so it stays on-screen near viewport edges
  - Fold drafts back into `items` in `onrowchange` so the new color renders immediately — `templateCallback` receives the original row, not the draft

---

## [Unreleased] - v1.0.4 Showcase Update

### Added

- **Dirty Indicator** - `isDirtyIndicatorVisible` property in API Component Display Properties
- **Dirty Indicator methods** - `isCellDirty()`, `isRowDirty()` in API Component Draft Management Methods
- **Dirty Indicator CSS variables** - 4 new variables in Custom Styling CSS Variables Reference
- **Column Visibility page** (`/features/column-visibility`) - New dedicated page for column show/hide
  - CV01: Interactive demo with per-column toggle buttons, Show All / Hide All controls
  - CV02: Context Menu setup using predefined `'hideColumn'` and `'columnVisibility'` items
  - CV03: Programmatic API showing `column.isHidden` usage and the `grid.columns = [...grid.columns]` re-render pattern
  - API Reference table for `isHidden`, `headerContextMenu`, and the predefined menu item strings
- **Scroll Modes - Interactive Demo** (`/features/scroll-modes`) - SM01 section replaces the separate Container/Page static demos
  - Live toggle between Container mode (`max-height`) and Full Height mode (`height: 100%` + `tableBorderOnly`)
  - Pager, Height, and Rows inputs
  - Explains why Full Height uses `tableBorderOnly = true` to let wheel events pass through to the page
- **Navigation** - Added Column Visibility entry to sidebar under Features

### Changed

- **CDN URLs** pinned to `@1.0.4` in Getting Started page
- **Scroll Modes page** - Removed redundant SM01 Container Scroll and SM02 Page Scroll sections (now covered interactively by the new SM01). SM03 Hybrid Mode renumbered to SM02.

---

## [Unreleased] - v1.0.0 Showcase Update

Comprehensive update bringing the showcase up to date with `@keenmate/web-grid@1.0.0`.

### Added

- **Filtering feature page** (`/features/filtering`) - New dedicated page for filtering
  - FI01: Basic Filtering demo with `isFilterable = true`
  - FI02: Per-Column Control demo with `isFilterable: false` on specific columns
  - CSS Variables section for filter input styling
  - API Reference table (grid-level and column-level `isFilterable`)
- **Summary Bar feature page** (`/features/summary`) - New dedicated page for summary bar
  - SU01: Client-Side Summary with `summaryContentCallback` and position controls
  - SU02: Server-Side Summary with `summaryMetadata` for server-provided aggregates
  - API Reference table (`summaryPosition`, `summaryContentCallback`, `summaryMetadata`, `isSummaryInline`)
- **Navigation** - Added Filtering and Summary Bar to sidebar navigation

### Changed

- **Updated @keenmate/web-grid** dependency from local file reference to `^1.0.0` (npm)

### Fixed

- **Editing page (ED01)** - `editStartSelection` default corrected from `'selectAll'` to `'mousePosition'` in both CodeBlock example and description list
- **Selection page (CS01, Copy)** - Replaced invalid `mode = 'navigate'` with correct `isEditable = true; editTrigger = 'navigate'` (`'navigate'` is not a valid grid mode)
- **Context Menu page (CM04)** - `contextMenuYOffset` default corrected from `4` to `0`

---

## [0.0.4] - rc14 Showcase Update

Comprehensive update bringing the showcase up to date with `@keenmate/web-grid@1.0.0-rc14`.

### Added

- **Home page** - 6 new feature cards: Grid Modes, Copy & Paste, Frozen Columns, Row Locking, Summary Bar, i18n & Labels
- **Getting Started** - Grid Modes and Paste Support explanations; CDN pinned to `@1.0.0-rc14`
- **Basic Features** - Expanded column property reference: `verticalAlign`, `headerHorizontalAlign`/`headerVerticalAlign`, `headerInfo`, `textOverflow`, `maxLines`, `cellClass`; display options: `isStickyRowNumbers`, `isFilterable`, `freezeColumns`, `tableBorderOnly`, `focusedRowIndex`, `sortMode`; content rendering section (`formatCallback`, `templateCallback`, `renderCallback`); styling callbacks; Grid Modes quick reference
- **Editing** - Code examples for all 8 editors (checkbox, combobox, autocomplete, date, custom); Shared Dropdown Options section (`loadOptions`, `optionsLoadTrigger`, `renderOptionCallback`, `dropdownMinWidth`, `subtitleMember`, `disabledMember`)
- **Sorting** - Sort Behavior section explaining sort indicator vs header click (rc12); multi-sort via context menu code example
- **Pagination** - `paginationMode`, `showPagination`, `totalItems` in Additional Properties table
- **Row Selection** - Column Selection section with API; Select All section; Paste from Clipboard section with `onbeforepaste`/`onpaste`; Row Focus / Master-Detail section; `--wg-selection-border-width`/`--wg-selection-border-color` CSS variables
- **Toolbar** - TB05 Advanced Toolbar Features section (`toolbarFollowsCursor`, `cellToolbar`, `cellToolbarOffset`, `toolbarColumn`, `toolbarBtnMinWidth`); `'inline'` option in TB03 position switcher
- **Context Menu** - `children` property in Menu Item Properties; Behavior Notes section (header filler, close on scroll, viewport awareness)
- **Fill Handle** - Behavior Notes section (Escape cancels, row locking skips locked rows)
- **Column Reorder** - Column Drag Selection section; `isMovable` column property section
- **Freeze Panes** - CSS Variables section (`--wg-frozen-column-shadow-gradient`, `--wg-frozen-column-shadow-width`); accent tint note; context menu freeze/unfreeze note
- **Keyboard Navigation** - Clipboard Operations table (Ctrl+V paste, Ctrl+A select all); Column Selection shortcuts; Checkbox Editor keyboard table; Date Picker keyboard table
- **Scroll Modes** - `isScrollable`, `scrollMaxHeight`, `tableBorderOnly` in Additional Properties
- **Custom Styling** - New CSS variable categories in reference: Selection & Focus, Row Locking, New in rc14 (7 variables); `--wg-checkbox-scale`, dropdown/tooltip/frozen column variables; context menu labels (`labels.contextMenu.*`) and dropdown labels in CS06 with code example and live demo
- **Row Locking** - `lockTooltipCallback` in config table; `--wg-row-locked-bg`/`--wg-row-locked-opacity` CSS vars; Integration Notes (fill handle, paste, read-only toggles)
- **Virtual Scrolling** - Wired up infinite scroll demo (VS02) with `ondatarequest` handler
- **API Component** - ~25 new methods (focus, drafts, validation, row ID, row updates, row locking, cell/row selection); New property sections (Cell Selection, Scroll, Tooltip, New Empty Row, Pagination Mode); `validationTooltipCallback`, `summaryMetadata`; toolbar properties; callbacks section
- **API Columns** - `verticalAlign`, `headerHorizontalAlign`/`headerVerticalAlign`, `maxLines`, `isMovable`, `isResizable`, `isFrozen`, `validationTooltipCallback`, `shouldOpenDropdownOnEnter`, `dropdownToggleVisibility`; `'justify'` added to `horizontalAlign`; clipboard callbacks section
- **API Editors** - `loadOptions`, `optionsLoadTrigger`, `dropdownMinWidth` for combobox; `allowEmpty`/`emptyLabel` for combobox/autocomplete
- **API Events** - `onheadercontextmenuopen`, `onbeforepaste`/`onpaste`, `onrowaction`, `oncolumnresize`, `oncolumnreorder`, `fillDragCallback` sections; `shortcutsHelpContentCallback`, `validationTooltipCallback`, `idValueCallback`, `renderCallback` in quick reference

### Changed

- **Updated @keenmate/web-grid** to 1.0.0-rc14
- **Home page** - "8 Editor Types" (was 7), "170+ CSS Variables" (was 100+), "3 Grid Modes" replaces "0 Dependencies"
- **Getting Started** - Editor types list includes `'custom'`; CDN URLs pinned to rc14
- **Sorting** - Description updated from "Click any column header" to "Click the sort indicator"
- **Custom Styling** - CSS variable counts updated to 215 (37 base + 178 component)

### Fixed

- **All pages** - 16 property name renames applied across showcase (`pageable` → `isPageable`, `sortable` → `isSortable`, `hidden` → `isHidden`, `align` → `horizontalAlign`, `onfilldrag` → `fillDragCallback`, `onSearchCallback` → `searchCallback`, etc.)
- **API Component** - `editTrigger` default corrected from `'click'` to `'dblclick'`; `editStartSelection` default corrected to `'selectAll'`
- **Fill Handle** - `onfilldrag` → `fillDragCallback` in API reference table and text
- **Context Menu** - `hidden` → `isHidden` in column visibility section

## [0.0.3] - Unreleased (rc11)

### Added
- **Expanded Selection feature page** (`/features/row-selection`) - Unified page for all selection features
  - RS01: Basic Row Selection - Click, Ctrl+Click, Shift+Click, drag to select
  - RS02: Row Selection with Shortcuts - Ctrl+C to copy, Delete to remove rows
  - CS01: Cell Range Selection (Click+Drag Mode) - Click and drag to select cells
  - CS02: Cell Range Selection (Shift Mode) - Click then Shift+Click to select range
  - Copy to Clipboard demo - Copy cell ranges or selected rows as TSV (Excel-compatible)
  - Full API reference with properties, methods, TypeScript types, and CSS variables

### Changed
- **Updated @keenmate/web-grid** to 1.0.0-rc11
  - New copy to clipboard feature: `copyCellSelectionToClipboard()`, `copySelectedRowsToClipboard()`
  - New `shouldCopyWithHeaders` property for including headers when copying
  - Bug fixes for cell selection border alignment and focus timing
- **Navigation** - Renamed "Row Selection" to "Selection" for the expanded feature page

### Changed (rc10)
- **Updated @keenmate/web-grid** to 1.0.0-rc10 with breaking API changes
- **Property Renames** - All property names updated to match new `is*`/`should*` naming convention:
  - `striped` → `isStriped`
  - `hoverable` → `isHoverable`
  - `editable` → `isEditable`
  - `showRowNumbers` → `isRowNumbersVisible`
  - `stickyRowNumbers` → `isStickyRowNumbers`
  - `virtualScroll` → `isVirtualScrollEnabled`
  - `persistColumnWidths` → `shouldPersistColumnWidths`
  - `persistColumnOrder` → `shouldPersistColumnOrder`
  - `allowColumnReorder` → `isColumnReorderAllowed`
  - `sortable` → `isSortable`
- **Column Property Renames**:
  - `frozen` → `isFrozen`
  - `hidden` → `isHidden`
  - `resizable` → `isResizable`
  - `sortable` → `isSortable`
  - `filterable` → `isFilterable`
  - `editable` → `isEditable`

---

## [0.0.2] - 2026-01-11

### Added
- **Header Context Menu examples** (CM05-CM08) in `/features/context-menu`
  - CM05: Basic header right-click menu with predefined actions
  - CM06: Column Visibility submenu with show/hide toggles
  - CM07: Custom header actions with dynamic visibility
  - CM08: Multi-sort via Ctrl+click in context menu
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
- **Updated @keenmate/web-grid** to 1.0.0-rc09
- **API Component page** - Added headerContextMenu property, onheadercontextmenuopen callback, labels.contextMenu.* documentation
- **API Columns page** - Added hidden and sortable (with header context menu note) column properties
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
