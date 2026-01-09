<script lang="ts">
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
</script>

<DocLayout
	titleText="Component API"
	descriptionText="Complete API reference for the Web Grid component">

	<div class="py-4">
		<!-- Overview -->
		<section class="mb-5">
			<h2 class="mb-3">Overview</h2>
			<p class="lead">
				The <code>&lt;web-grid&gt;</code> web component provides a high-performance data grid with editing, sorting, pagination, and Excel-like navigation.
			</p>
		</section>

		<!-- Core Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Core Properties</h2>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>items</code></td>
							<td><code>T[]</code></td>
							<td><code>[]</code></td>
							<td>Array of data objects to display</td>
						</tr>
						<tr>
							<td><code>columns</code></td>
							<td><code>Column&lt;T&gt;[]</code></td>
							<td><code>[]</code></td>
							<td>Column definitions (see <a href="/api/columns">Columns API</a>)</td>
						</tr>
						<tr>
							<td><code>mode</code></td>
							<td><code>'read-only' | 'excel' | 'input-matrix'</code></td>
							<td>-</td>
							<td>Grid mode - sets sensible defaults for common use cases</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`const grid = document.querySelector('web-grid');

// Set data
grid.items = [
  { id: 1, name: 'Alice', department: 'Engineering' },
  { id: 2, name: 'Bob', department: 'Marketing' }
];

// Set columns
grid.columns = [
  { field: 'id', title: 'ID', width: '60px' },
  { field: 'name', title: 'Name', width: '150px' },
  { field: 'department', title: 'Department' }
];`}
				languageType="javascript"
				titleText="Basic Setup"
			/>
		</section>

		<!-- Display Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Display Properties</h2>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>striped</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Alternating row background colors</td>
						</tr>
						<tr>
							<td><code>hoverable</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Highlight rows on hover</td>
						</tr>
						<tr>
							<td><code>showRowNumbers</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Show row number column on the left</td>
						</tr>
						<tr>
							<td><code>class</code></td>
							<td><code>string</code></td>
							<td>-</td>
							<td>Custom CSS class(es) on host element</td>
						</tr>
						<tr>
							<td><code>style</code></td>
							<td><code>string</code></td>
							<td>-</td>
							<td>Inline styles on host element</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Resizable Columns Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Resizable Columns Properties</h2>
			<p>Excel-like column resizing by dragging header edges.</p>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>gridName</code></td>
							<td><code>string</code></td>
							<td>-</td>
							<td>Unique name for localStorage persistence</td>
						</tr>
						<tr>
							<td><code>persistColumnWidths</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Save column widths to localStorage</td>
						</tr>
						<tr>
							<td><code>oncolumnresize</code></td>
							<td><code>function</code></td>
							<td>-</td>
							<td>Callback after column resize: <code>(detail) => void</code></td>
						</tr>
					</tbody>
				</table>
			</div>

			<h4 class="mt-4">Column Properties</h4>
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>resizable</code></td>
							<td><code>boolean</code></td>
							<td>Per-column opt-out (default: true)</td>
						</tr>
						<tr>
							<td><code>minWidth</code></td>
							<td><code>string</code></td>
							<td>Minimum width constraint (e.g., '50px')</td>
						</tr>
						<tr>
							<td><code>maxWidth</code></td>
							<td><code>string</code></td>
							<td>Maximum width constraint (e.g., '300px')</td>
						</tr>
					</tbody>
				</table>
			</div>

			<h4 class="mt-4">Methods</h4>
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Method</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>setColumnWidth(field, width)</code></td>
							<td>Set width of a specific column</td>
						</tr>
						<tr>
							<td><code>setColumnWidths(widths)</code></td>
							<td>Set widths of multiple columns</td>
						</tr>
						<tr>
							<td><code>getColumnWidthsState()</code></td>
							<td>Get current widths of all columns</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`// Enable persistence
grid.gridName = 'my-grid';
grid.persistColumnWidths = true;

// Column with constraints
columns = [
  { field: 'name', title: 'Name', minWidth: '100px', maxWidth: '300px' },
  { field: 'id', title: 'ID', resizable: false }  // Opt-out
];

// Listen for resize events
grid.oncolumnresize = ({ field, oldWidth, newWidth, allWidths }) => {
  console.log(\`\${field} resized: \${oldWidth} → \${newWidth}\`);
};

// Programmatic API
grid.setColumnWidth('name', '200px');
const widths = grid.getColumnWidthsState();`}
				languageType="javascript"
				titleText="Column Resizing"
			/>
		</section>

		<!-- Reorderable Columns Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Reorderable Columns Properties</h2>
			<p>Drag column headers to rearrange columns.</p>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>allowColumnReorder</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Enable column drag-to-reorder</td>
						</tr>
						<tr>
							<td><code>persistColumnOrder</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Save column order to localStorage (requires gridName)</td>
						</tr>
						<tr>
							<td><code>oncolumnreorder</code></td>
							<td><code>function</code></td>
							<td>-</td>
							<td>Callback after reorder: <code>(detail) => void</code></td>
						</tr>
					</tbody>
				</table>
			</div>

			<h4 class="mt-4">Methods</h4>
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Method</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>setColumnOrder(order)</code></td>
							<td>Set column order by field names array</td>
						</tr>
						<tr>
							<td><code>getColumnOrderState()</code></td>
							<td>Get current column order</td>
						</tr>
						<tr>
							<td><code>moveColumn(field, toIndex)</code></td>
							<td>Move a column to a specific index</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`// Enable column reordering
grid.allowColumnReorder = true;

// With persistence
grid.gridName = 'my-grid';
grid.persistColumnOrder = true;

// Listen for reorder events
grid.oncolumnreorder = ({ field, fromIndex, toIndex, allOrder }) => {
  console.log(\`\${field} moved: \${fromIndex} → \${toIndex}\`);
};

// Programmatic API
grid.setColumnOrder(['id', 'name', 'email', 'department']);
grid.moveColumn('email', 1);  // Move email to second position
const order = grid.getColumnOrderState();`}
				languageType="javascript"
				titleText="Column Reordering"
			/>

			<div class="alert alert-info mt-3">
				<strong>Note:</strong> Frozen columns cannot be reordered. Drag threshold (5px) prevents accidental reorder when clicking to sort.
			</div>
		</section>

		<!-- Fill Handle Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Fill Handle Properties</h2>
			<p>Excel-like drag-to-fill for copying values to adjacent cells.</p>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>fillDirection</code></td>
							<td><code>'vertical' | 'all'</code></td>
							<td><code>'vertical'</code></td>
							<td>Allowed fill directions (grid-level default)</td>
						</tr>
						<tr>
							<td><code>onfilldrag</code></td>
							<td><code>function</code></td>
							<td>-</td>
							<td>Callback before fill: return false to cancel</td>
						</tr>
					</tbody>
				</table>
			</div>

			<h4 class="mt-4">Column Properties</h4>
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>fillDirection</code></td>
							<td><code>'vertical' | 'all'</code></td>
							<td>Per-column override for fill direction</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`// Grid-level: allow filling in all directions
grid.fillDirection = 'all';

// Column-level: restrict specific column to vertical only
columns = [
  { field: 'name', title: 'Name', fillDirection: 'all' },
  { field: 'salary', title: 'Salary', fillDirection: 'vertical' }
];

// Callback to validate or cancel fill
grid.onfilldrag = ({ sourceCell, targetCells, direction }) => {
  console.log(\`Filling \${targetCells.length} cells \${direction}\`);
  // Return false to cancel the fill operation
  return true;
};`}
				languageType="javascript"
				titleText="Fill Handle"
			/>

			<div class="alert alert-info mt-3">
				<strong>Type-based validation:</strong> Fill handle automatically validates values by column type:
				<ul class="mb-0 mt-2">
					<li><strong>Number columns:</strong> Only numeric values accepted</li>
					<li><strong>Select/Combobox:</strong> Only values from options accepted</li>
					<li><strong>Date columns:</strong> Only valid dates accepted</li>
					<li><strong>Text/Autocomplete:</strong> Any value (use onfilldrag for custom validation)</li>
				</ul>
			</div>
		</section>

		<!-- Freeze Panes Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Freeze Panes Properties</h2>
			<p>Excel-like frozen columns that stay visible while scrolling horizontally.</p>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>stickyRowNumbers</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Make row number column sticky (frozen)</td>
						</tr>
						<tr>
							<td><code>freezeColumns</code></td>
							<td><code>number</code></td>
							<td><code>0</code></td>
							<td>Number of columns to freeze from the left</td>
						</tr>
					</tbody>
				</table>
			</div>

			<h4 class="mt-4">Column Properties</h4>
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>frozen</code></td>
							<td><code>boolean</code></td>
							<td>Mark column as frozen (moves to left automatically)</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`// Enable sticky row numbers
grid.showRowNumbers = true;
grid.stickyRowNumbers = true;

// Freeze first 2 columns
grid.freezeColumns = 2;

// Or mark individual columns as frozen
columns = [
  { field: 'id', title: 'ID', width: '80px' },
  { field: 'name', title: 'Name', width: '150px' },
  { field: 'status', title: 'Status', width: '100px', frozen: true }
];
// Status will appear first (after row numbers) due to frozen: true`}
				languageType="javascript"
				titleText="Freeze Panes"
			/>
		</section>

		<!-- Sorting Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Sorting Properties</h2>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>sortMode</code></td>
							<td><code>'none' | 'single' | 'multi'</code></td>
							<td><code>'none'</code></td>
							<td>Sorting mode: disabled, single column, or multi-column with Ctrl+Click</td>
						</tr>
						<tr>
							<td><code>sort</code></td>
							<td><code>SortState[]</code></td>
							<td><code>[]</code></td>
							<td>Current sort state (for initial/controlled sort)</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`// Enable multi-column sorting
grid.sortMode = 'multi';

// SortState type
type SortState = {
  column: string;      // Field name
  direction: 'asc' | 'desc';
}

// Set initial sort
grid.sort = [
  { column: 'name', direction: 'asc' }
];

// Multi-column sort (Ctrl+Click)
grid.sort = [
  { column: 'department', direction: 'asc' },
  { column: 'name', direction: 'asc' }
];`}
				languageType="typescript"
				titleText="Sort State"
			/>
		</section>

		<!-- Pagination Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Pagination Properties</h2>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>pageable</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Enable pagination</td>
						</tr>
						<tr>
							<td><code>pageSize</code></td>
							<td><code>number</code></td>
							<td><code>10</code></td>
							<td>Items per page</td>
						</tr>
						<tr>
							<td><code>currentPage</code></td>
							<td><code>number</code></td>
							<td><code>1</code></td>
							<td>Current page (1-based)</td>
						</tr>
						<tr>
							<td><code>totalItems</code></td>
							<td><code>number</code></td>
							<td>-</td>
							<td>Total items (for server-side pagination)</td>
						</tr>
						<tr>
							<td><code>pageSizes</code></td>
							<td><code>number[]</code></td>
							<td><code>[10, 25, 50, 100]</code></td>
							<td>Available page size options</td>
						</tr>
						<tr>
							<td><code>showPagination</code></td>
							<td><code>boolean | 'auto'</code></td>
							<td><code>'auto'</code></td>
							<td>When to show: true=always, false=never, 'auto'=hide when 1 page</td>
						</tr>
						<tr>
							<td><code>paginationPosition</code></td>
							<td><code>string</code></td>
							<td><code>'bottom-center'</code></td>
							<td>Position(s): "bottom-center", "top-right|bottom-right"</td>
						</tr>
						<tr>
							<td><code>paginationLayout</code></td>
							<td><code>string</code></td>
							<td>-</td>
							<td>Element order: "pageSize|previous|pageInfo|next"</td>
						</tr>
						<tr>
							<td><code>paginationLabelsCallback</code></td>
							<td><code>function</code></td>
							<td>-</td>
							<td>Callback to customize pagination text</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Editing Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Editing Properties</h2>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>editable</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Enable editing on all columns with editors</td>
						</tr>
						<tr>
							<td><code>editTrigger</code></td>
							<td><code>EditTrigger</code></td>
							<td><code>'click'</code></td>
							<td>How editing is triggered: 'click', 'dblclick', 'button', 'always', 'navigate'</td>
						</tr>
						<tr>
							<td><code>dropdownToggleVisibility</code></td>
							<td><code>'always' | 'on-focus'</code></td>
							<td><code>'on-focus'</code></td>
							<td>When to show dropdown toggle button</td>
						</tr>
						<tr>
							<td><code>openDropdownOnEnter</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Enter opens dropdown (true) or moves down (false)</td>
						</tr>
						<tr>
							<td><code>checkboxAlwaysEditable</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Make checkboxes always interactive</td>
						</tr>
						<tr>
							<td><code>invalidCells</code></td>
							<td><code>CellValidationState[]</code></td>
							<td><code>[]</code></td>
							<td>Currently invalid cells (for external tracking)</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Row Toolbar Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Row Toolbar Properties</h2>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>showRowToolbar</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Enable row toolbar</td>
						</tr>
						<tr>
							<td><code>rowToolbar</code></td>
							<td><code>RowToolbarConfig[]</code></td>
							<td><code>[]</code></td>
							<td>Toolbar items: strings ('add', 'delete', etc.) or custom objects</td>
						</tr>
						<tr>
							<td><code>toolbarTrigger</code></td>
							<td><code>'hover' | 'click' | 'button'</code></td>
							<td><code>'hover'</code></td>
							<td>How to show toolbar</td>
						</tr>
						<tr>
							<td><code>toolbarPosition</code></td>
							<td><code>'auto' | 'left' | 'right' | 'top' | 'inline'</code></td>
							<td><code>'auto'</code></td>
							<td>Toolbar position. 'inline' renders as fixed column</td>
						</tr>
						<tr>
							<td><code>toolbarVerticalAlign</code></td>
							<td><code>'top' | 'center' | 'bottom'</code></td>
							<td><code>'bottom'</code></td>
							<td>Vertical alignment of toolbar rows</td>
						</tr>
						<tr>
							<td><code>toolbarHorizontalAlign</code></td>
							<td><code>'start' | 'center' | 'end' | 'cursor'</code></td>
							<td><code>'center'</code></td>
							<td>Horizontal alignment (for top position)</td>
						</tr>
						<tr>
							<td><code>inlineActionsTitle</code></td>
							<td><code>string</code></td>
							<td><code>''</code></td>
							<td>Column header for inline toolbar mode</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Keyboard Shortcuts Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Keyboard Shortcuts Properties</h2>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>rowShortcuts</code></td>
							<td><code>RowShortcut[]</code></td>
							<td><code>[]</code></td>
							<td>Keyboard shortcuts for row operations (work on focused or hovered row)</td>
						</tr>
						<tr>
							<td><code>showShortcutsHelp</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Show info icon with available shortcuts overlay</td>
						</tr>
						<tr>
							<td><code>shortcutsHelpPosition</code></td>
							<td><code>'top-right' | 'top-left'</code></td>
							<td><code>'top-right'</code></td>
							<td>Position of shortcuts help icon</td>
						</tr>
						<tr>
							<td><code>shortcutsHelpContentCallback</code></td>
							<td><code>() => string</code></td>
							<td>-</td>
							<td>Custom HTML content for shortcuts overlay</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`// Define keyboard shortcuts
grid.rowShortcuts = [
  {
    key: 'Delete',
    id: 'delete',
    label: 'Delete row',
    action: (ctx) => deleteRow(ctx.rowIndex)
  },
  {
    key: 'e',
    id: 'edit',
    label: 'Edit row',
    action: (ctx) => openEditDialog(ctx.row)
  }
];

// Show help overlay
grid.showShortcutsHelp = true;`}
				languageType="javascript"
				titleText="Row Shortcuts"
			/>
		</section>

		<!-- Row Selection Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Row Selection Properties</h2>
			<p>Multi-row selection via row number cells with keyboard shortcuts for batch operations.</p>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>selectedRows</code></td>
							<td><code>number[]</code></td>
							<td><code>[]</code></td>
							<td>Array of selected row indices (read-only, sorted ascending)</td>
						</tr>
						<tr>
							<td><code>rangeShortcuts</code></td>
							<td><code>RangeShortcut[]</code></td>
							<td><code>[]</code></td>
							<td>Keyboard shortcuts that operate on all selected rows</td>
						</tr>
					</tbody>
				</table>
			</div>

			<h4 class="mt-4">Selection Methods</h4>
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Method</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>selectRow(index, mode)</code></td>
							<td>Select a row. Mode: 'replace' (default), 'toggle', or 'range'</td>
						</tr>
						<tr>
							<td><code>selectRowRange(from, to)</code></td>
							<td>Select all rows in a range (inclusive)</td>
						</tr>
						<tr>
							<td><code>clearSelection()</code></td>
							<td>Clear all selected rows</td>
						</tr>
						<tr>
							<td><code>isRowSelected(index)</code></td>
							<td>Check if a specific row is selected</td>
						</tr>
						<tr>
							<td><code>getSelectedRowsData()</code></td>
							<td>Get the data objects for all selected rows</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`// Enable row numbers (required for row selection)
grid.showRowNumbers = true;

// Selection interactions:
// - Click row number → select (clears others)
// - Ctrl+Click → toggle row in selection
// - Shift+Click → select range from last selected
// - Click+Drag → select range while dragging
// - Escape → clear selection

// Define range shortcuts (operate on selected rows)
grid.rangeShortcuts = [
  {
    key: 'Delete',
    id: 'delete-selected',
    label: 'Delete selected rows',
    action: ({ rows, rowIndices }) => {
      // Delete from end to preserve indices
      for (const idx of [...rowIndices].reverse()) {
        grid.items.splice(idx, 1);
      }
      grid.items = [...grid.items];
      grid.clearSelection();
    }
  },
  {
    key: 'Ctrl+Alt+E',
    id: 'export-selected',
    label: 'Export selected',
    action: ({ rows }) => exportToCSV(rows)
  }
];

// Programmatic selection
grid.selectRow(5, 'replace');       // Select row 5
grid.selectRow(7, 'toggle');        // Toggle row 7
grid.selectRowRange(0, 4);          // Select rows 0-4
console.log(grid.selectedRows);     // [0, 1, 2, 3, 4, 5, 7]
console.log(grid.getSelectedRowsData());  // Array of row objects
grid.clearSelection();`}
				languageType="javascript"
				titleText="Row Selection"
			/>
		</section>

		<!-- Labels/i18n Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Labels/i18n Properties</h2>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>labels</code></td>
							<td><code>Partial&lt;GridLabels&gt;</code></td>
							<td>Translatable UI strings (merged with defaults)</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`// Customize labels for translations
grid.labels = {
  // Toolbar
  rowActions: 'Row actions',
  inlineActionsHeader: 'Actions',

  // Shortcuts help
  keyboardShortcuts: 'Keyboard shortcuts',

  // Pagination (use {placeholders})
  paginationFirst: '⏮',
  paginationPrevious: '◀',
  paginationNext: '▶',
  paginationLast: '⏭',
  paginationPageInfo: 'Page {current} of {total}',
  paginationItemCount: '{count} items',
  paginationPerPage: 'per page',

  // Dropdown editors
  dropdownNoOptions: 'No options',
  dropdownSearching: 'Searching...'
};`}
				languageType="javascript"
				titleText="Labels Configuration"
			/>
		</section>

		<!-- Virtual Scroll Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Virtual Scroll Properties</h2>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>virtualScroll</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Enable virtual scrolling</td>
						</tr>
						<tr>
							<td><code>virtualScrollThreshold</code></td>
							<td><code>number</code></td>
							<td><code>100</code></td>
							<td>Auto-enable when items >= threshold</td>
						</tr>
						<tr>
							<td><code>virtualScrollRowHeight</code></td>
							<td><code>number</code></td>
							<td><code>38</code></td>
							<td>Fixed row height in pixels</td>
						</tr>
						<tr>
							<td><code>virtualScrollBuffer</code></td>
							<td><code>number</code></td>
							<td><code>10</code></td>
							<td>Extra rows above/below viewport</td>
						</tr>
						<tr>
							<td><code>infiniteScroll</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Enable infinite scroll (load more)</td>
						</tr>
						<tr>
							<td><code>infiniteScrollThreshold</code></td>
							<td><code>number</code></td>
							<td><code>100</code></td>
							<td>Pixels from bottom to trigger load</td>
						</tr>
						<tr>
							<td><code>hasMoreItems</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Set to false when no more data</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Context Menu & Summary -->
		<section class="mb-5">
			<h2 class="mb-4">Context Menu & Summary</h2>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>contextMenu</code></td>
							<td><code>ContextMenuItem[]</code></td>
							<td>-</td>
							<td>Right-click menu items (supports <code>shortcut</code> property)</td>
						</tr>
						<tr>
							<td><code>contextMenuXOffset</code></td>
							<td><code>number</code></td>
							<td><code>8</code></td>
							<td>Horizontal offset from click position (pixels)</td>
						</tr>
						<tr>
							<td><code>contextMenuYOffset</code></td>
							<td><code>number</code></td>
							<td><code>0</code></td>
							<td>Vertical offset from click position (pixels)</td>
						</tr>
						<tr>
							<td><code>summaryPosition</code></td>
							<td><code>string</code></td>
							<td>-</td>
							<td>Position(s): "bottom-left", "top-right|bottom-right"</td>
						</tr>
						<tr>
							<td><code>summaryContentCallback</code></td>
							<td><code>function</code></td>
							<td>-</td>
							<td>Callback returning HTML content for summary</td>
						</tr>
						<tr>
							<td><code>summaryInline</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Share row with pagination</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Row Locking Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Row Locking Properties</h2>
			<p>Lock rows to prevent editing (useful for collaborative scenarios).</p>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>idValueMember</code></td>
							<td><code>string</code></td>
							<td>Property name for row ID (e.g., 'id')</td>
						</tr>
						<tr>
							<td><code>idValueCallback</code></td>
							<td><code>(row) => unknown</code></td>
							<td>Callback to compute row ID</td>
						</tr>
						<tr>
							<td><code>rowLocking</code></td>
							<td><code>RowLockingOptions</code></td>
							<td>Row locking configuration (see below)</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`// Row identification
grid.idValueMember = 'id';

// Row locking configuration
grid.rowLocking = {
  // Option 1: Property-based
  lockedMember: 'isLocked',           // boolean property
  lockInfoMember: 'lockInfo',         // or full info object

  // Option 2: Callback-based
  getLockInfoCallback: (row) => ({
    isLocked: row.status === 'editing',
    lockedBy: row.editingUser
  }),

  // Edit behavior when locked
  lockedEditBehavior: 'block'  // 'block' | 'allow' | 'callback'
};

// External API (for WebSocket scenarios)
grid.lockRowById('row-123', { lockedBy: 'John' });
grid.unlockRowById('row-123');

// Update row data
grid.updateRowById('row-123', { name: 'Updated' });
grid.replaceRowById('row-123', newRowData);`}
				languageType="javascript"
				titleText="Row Locking"
			/>
		</section>

		<!-- Styling Callbacks -->
		<section class="mb-5">
			<h2 class="mb-4">Styling Callbacks</h2>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>customStylesCallback</code></td>
							<td><code>() => string</code></td>
							<td>Return custom CSS to inject into shadow DOM</td>
						</tr>
						<tr>
							<td><code>rowClassCallback</code></td>
							<td><code>(row, rowIndex) => string | null</code></td>
							<td>Dynamic CSS class for rows</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`// Inject custom styles into shadow DOM
grid.customStylesCallback = () => \`
  .high-value { background: #d1fae5 !important; }
  .low-value { background: #fee2e2 !important; }
  .row-inactive { opacity: 0.5; }
\`;

// Dynamic row classes
grid.rowClassCallback = (row, index) => {
  if (row.status === 'inactive') return 'row-inactive';
  return null;
};`}
				languageType="javascript"
				titleText="Styling Callbacks"
			/>
		</section>

		<!-- Grid Modes -->
		<section class="mb-5">
			<h2 class="mb-4">Grid Modes</h2>
			<p>The <code>mode</code> property sets sensible defaults for common use cases:</p>

			<div class="row g-4 mb-4">
				<div class="col-md-4">
					<div class="card h-100">
						<div class="card-body">
							<h5 class="card-title"><code>read-only</code></h5>
							<p class="card-text">Display-only grid. Editing disabled, optimized for viewing data.</p>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="card h-100">
						<div class="card-body">
							<h5 class="card-title"><code>excel</code></h5>
							<p class="card-text">Excel-like behavior. Navigate mode with arrow keys, type to edit, Enter/Tab to commit.</p>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="card h-100">
						<div class="card-body">
							<h5 class="card-title"><code>input-matrix</code></h5>
							<p class="card-text">Form-like behavior. All cells editable, Tab moves between cells.</p>
						</div>
					</div>
				</div>
			</div>

			<CodeBlock
				codeContent={`// Excel-like spreadsheet behavior
grid.mode = 'excel';

// Equivalent to:
grid.editable = true;
grid.editTrigger = 'navigate';
grid.hoverable = true;`}
				languageType="javascript"
				titleText="Grid Mode"
			/>
		</section>

		<!-- TypeScript Support -->
		<section class="mb-5">
			<h2 class="mb-4">TypeScript Support</h2>
			<p>The component is fully typed with generic support:</p>

			<CodeBlock
				codeContent={`import type { GridElement, Column } from '@keenmate/web-grid';

interface Employee {
  id: number;
  name: string;
  department: string;
  salary: number;
}

const grid = document.querySelector<GridElement<Employee>>('web-grid');

if (grid) {
  const columns: Column<Employee>[] = [
    { field: 'id', title: 'ID' },
    { field: 'name', title: 'Name', editor: 'text' },
    { field: 'department', title: 'Department' },
    {
      field: 'salary',
      title: 'Salary',
      formatCallback: (value) => '$' + value.toLocaleString()
    }
  ];

  grid.columns = columns;
  grid.items = employees;
}`}
				languageType="typescript"
				titleText="TypeScript Example"
			/>
		</section>

		<!-- Global API -->
		<section class="mb-5">
			<h2 class="mb-4">Global API</h2>
			<p class="lead">
				Access component functionality through <code>window.keenmate.grid</code>:
			</p>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Method / Property</th>
							<th>Returns</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>version()</code></td>
							<td>string</td>
							<td>Returns the component version</td>
						</tr>
						<tr>
							<td><code>config</code></td>
							<td>object</td>
							<td>Package metadata (name, version, author, etc.)</td>
						</tr>
						<tr>
							<td><code>register()</code></td>
							<td>void</td>
							<td>Manually register the custom element</td>
						</tr>
						<tr>
							<td><code>getInstances()</code></td>
							<td>HTMLElement[]</td>
							<td>Get all active grid instances on the page</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`// Get component version
const version = window.keenmate.grid.version();
console.log('Web Grid Version:', version);

// Get all grid instances
const allGrids = window.keenmate.grid.getInstances();
allGrids.forEach(grid => {
  console.log('Grid has', grid.items.length, 'items');
});`}
				languageType="javascript"
				titleText="Global API Usage"
			/>
		</section>

		<!-- Important Notes -->
		<div class="mt-5 p-4 bg-light border rounded">
			<h3 class="h5 mb-3">Important Notes</h3>
			<ul class="mb-0">
				<li><strong>Generic Types:</strong> Component supports any data structure via <code>T</code> parameter</li>
				<li><strong>Reactive:</strong> All properties are reactive - changes update the UI automatically</li>
				<li><strong>Shadow DOM:</strong> Component uses Shadow DOM for style encapsulation</li>
				<li><strong>CSS Variables:</strong> Customize appearance with 100+ CSS variables</li>
				<li><strong>Events vs Callbacks:</strong> Events use <code>on*</code> naming, callbacks use <code>*Callback</code> suffix</li>
			</ul>
		</div>
	</div>
</DocLayout>
