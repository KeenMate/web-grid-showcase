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
							<td><code>'excel'</code></td>
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
							<td><code>isStriped</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Alternating row background colors</td>
						</tr>
						<tr>
							<td><code>isHoverable</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Highlight rows on hover</td>
						</tr>
						<tr>
							<td><code>isRowNumbersVisible</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Show row number column on the left</td>
						</tr>
						<tr>
							<td><code>isDirtyIndicatorVisible</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Show visual indicator on cells with unsaved changes (orange tint + corner triangle). Row numbers get an orange left border when any cell in the row is dirty</td>
						</tr>
						<tr>
							<td><code>isFilterable</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Show filter inputs below column headers</td>
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
							<td><code>shouldPersistColumnWidths</code></td>
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
							<td><code>isResizable</code></td>
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
grid.shouldPersistColumnWidths = true;

// Column with constraints
columns = [
  { field: 'name', title: 'Name', minWidth: '100px', maxWidth: '300px' },
  { field: 'id', title: 'ID', isResizable: false }  // Opt-out
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
							<td><code>isColumnReorderAllowed</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Enable column drag-to-reorder</td>
						</tr>
						<tr>
							<td><code>shouldPersistColumnOrder</code></td>
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
							<td>Move a column to a specific index (internal - available on WebGrid, not directly on the web component element)</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`// Enable column reordering
grid.isColumnReorderAllowed = true;

// With persistence
grid.gridName = 'my-grid';
grid.shouldPersistColumnOrder = true;

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
							<td><code>fillDragCallback</code></td>
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
grid.fillDragCallback = ({ sourceCell, targetCells, direction }) => {
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
					<li><strong>Text/Autocomplete:</strong> Any value (use fillDragCallback for custom validation)</li>
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
							<td><code>isStickyRowNumbers</code></td>
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
							<td><code>isFrozen</code></td>
							<td><code>boolean</code></td>
							<td>Mark column as frozen (moves to left automatically)</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`// Enable sticky row numbers
grid.isRowNumbersVisible = true;
grid.isStickyRowNumbers = true;

// Freeze first 2 columns
grid.freezeColumns = 2;

// Or mark individual columns as frozen
columns = [
  { field: 'id', title: 'ID', width: '80px' },
  { field: 'name', title: 'Name', width: '150px' },
  { field: 'status', title: 'Status', width: '100px', isFrozen: true }
];
// Status will appear first (after row numbers) due to isFrozen: true`}
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
							<td><code>isPageable</code></td>
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
							<td><code>true</code></td>
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
							<td><code>isEditable</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Enable editing on all columns with editors</td>
						</tr>
						<tr>
							<td><code>editTrigger</code></td>
							<td><code>EditTrigger</code></td>
							<td><code>'dblclick'</code></td>
							<td>How editing is triggered: 'click', 'dblclick', 'button', 'always', 'navigate'</td>
						</tr>
						<tr>
							<td><code>dropdownToggleVisibility</code></td>
							<td><code>'always' | 'on-focus'</code></td>
							<td><code>'always'</code></td>
							<td>When to show dropdown toggle button</td>
						</tr>
						<tr>
							<td><code>shouldOpenDropdownOnEnter</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Enter opens dropdown (true) or moves down (false)</td>
						</tr>
						<tr>
							<td><code>isCheckboxAlwaysEditable</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Make checkboxes always interactive</td>
						</tr>
						<tr>
							<td><code>invalidCells</code></td>
							<td><code>CellValidationState[]</code></td>
							<td><code>[]</code></td>
							<td>Currently invalid cells (for external/server-side validation)</td>
						</tr>
						<tr>
							<td><code>editStartSelection</code></td>
							<td><code>'selectAll' | 'cursorAtStart' | 'cursorAtEnd' | 'mousePosition'</code></td>
							<td><code>'mousePosition'</code></td>
							<td>Cursor position when entering edit mode</td>
						</tr>
						<tr>
							<td><code>shouldShowDropdownOnFocus</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Show dropdown when cell receives focus</td>
						</tr>
						<tr>
							<td><code>focusedRowIndex</code></td>
							<td><code>number | null</code></td>
							<td><code>null</code></td>
							<td>Currently focused row index (read-only)</td>
						</tr>
						<tr>
							<td><code>validationTooltipCallback</code></td>
							<td><code>function</code></td>
							<td>-</td>
							<td>Grid-level callback returning HTML for validation error tooltips</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Pagination Mode -->
		<section class="mb-5">
			<h2 class="mb-4">Pagination Mode</h2>
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr><th>Property</th><th>Type</th><th>Default</th><th>Description</th></tr>
					</thead>
					<tbody>
						<tr><td><code>paginationMode</code></td><td><code>'client' | 'server'</code></td><td><code>'client'</code></td><td>Client-side pagination (grid paginates items) or server-side (you manage pages via ondatarequest)</td></tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Cell Selection Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Cell Selection Properties</h2>
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr><th>Property</th><th>Type</th><th>Default</th><th>Description</th></tr>
					</thead>
					<tbody>
						<tr><td><code>cellSelectionMode</code></td><td><code>'disabled' | 'click' | 'shift'</code></td><td><code>'click'</code></td><td>Cell selection behavior</td></tr>
						<tr><td><code>shouldCopyWithHeaders</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Include column headers when copying to clipboard</td></tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Paste Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Paste Properties</h2>
			<p>Configure how <kbd>Ctrl+V</kbd> paste operations work in editable grids.</p>
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr><th>Property</th><th>Type</th><th>Default</th><th>Description</th></tr>
					</thead>
					<tbody>
						<tr><td><code>pasteMode</code></td><td><code>'skip-non-editable' | 'all-columns' | 'editable-only'</code></td><td><code>'skip-non-editable'</code></td><td>How to handle non-editable cells during paste: skip over them, paste to all columns, or only paste to editable columns</td></tr>
						<tr><td><code>shouldValidateOnPaste</code></td><td><code>boolean</code></td><td><code>true</code></td><td>Run column validation (beforeCommitCallback) on pasted values</td></tr>
						<tr><td><code>createRowCallback</code></td><td><code>(pastedData, rowIndex) =&gt; T</code></td><td>-</td><td>Callback to create new rows when pasting beyond existing data. Receives the parsed paste data and target row index.</td></tr>
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
							<td><code>isRowToolbarVisible</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Enable row toolbar</td>
						</tr>
						<tr>
							<td><code>rowToolbar</code></td>
							<td><code>RowToolbarConfig[]</code></td>
							<td><code>['add', 'delete', 'duplicate']</code></td>
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
						<tr>
							<td><code>toolbarFollowsCursor</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Toolbar tracks mouse cursor horizontally</td>
						</tr>
						<tr>
							<td><code>cellToolbar</code></td>
							<td><code>function</code></td>
							<td>-</td>
							<td>Callback returning cell-specific toolbar items</td>
						</tr>
						<tr>
							<td><code>toolbarColumn</code></td>
							<td><code>string | number</code></td>
							<td>-</td>
							<td>Pin toolbar over a specific column</td>
						</tr>
						<tr>
							<td><code>cellToolbarOffset</code></td>
							<td><code>number | string</code></td>
							<td><code>0.2</code></td>
							<td>Horizontal offset for cell-specific toolbar</td>
						</tr>
						<tr>
							<td><code>toolbarBtnMinWidth</code></td>
							<td><code>string</code></td>
							<td>-</td>
							<td>Minimum width for toolbar buttons (e.g., '80px')</td>
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
							<td><code>isShortcutsHelpVisible</code></td>
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
grid.isShortcutsHelpVisible = true;`}
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
grid.isRowNumbersVisible = true;

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

			<h4 class="mt-4">Focus & Editing Methods</h4>
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr><th>Method</th><th>Description</th></tr>
					</thead>
					<tbody>
						<tr><td><code>focusCell(rowIndex, colIndex)</code></td><td>Focus a specific cell</td></tr>
						<tr><td><code>startEditing(rowIndex, colIndex)</code></td><td>Start editing a specific cell</td></tr>
						<tr><td><code>openCustomEditor(rowIndex, colIndex)</code></td><td>Open custom editor for a cell</td></tr>
					</tbody>
				</table>
			</div>

			<h4 class="mt-4">Draft Management Methods</h4>
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr><th>Method</th><th>Description</th></tr>
					</thead>
					<tbody>
						<tr><td><code>getRowDraft(rowIndex)</code></td><td>Get the draft (edited) state of a row</td></tr>
						<tr><td><code>hasRowDraft(rowIndex)</code></td><td>Check if row has unsaved edits</td></tr>
						<tr><td><code>discardRowDraft(rowIndex)</code></td><td>Discard edits for a specific row</td></tr>
						<tr><td><code>discardCellDraft(rowIndex, field)</code></td><td>Discard edits for a specific cell (internal - available on WebGrid, not directly on the web component element)</td></tr>
						<tr><td><code>getDraftRowIndices()</code></td><td>Get indices of all rows with unsaved edits</td></tr>
						<tr><td><code>discardAllDrafts()</code></td><td>Discard all unsaved edits</td></tr>
						<tr><td><code>isCellDirty(rowIndex, field)</code></td><td>Check if a specific cell has been modified (draft value differs from original)</td></tr>
						<tr><td><code>isRowDirty(rowIndex)</code></td><td>Check if any cell in a row has been modified</td></tr>
					</tbody>
				</table>
			</div>

			<h4 class="mt-4">Validation Methods</h4>
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr><th>Method</th><th>Description</th></tr>
					</thead>
					<tbody>
						<tr><td><code>isCellInvalid(rowIndex, field)</code></td><td>Check if a cell has a validation error</td></tr>
						<tr><td><code>getCellValidationError(rowIndex, field)</code></td><td>Get the validation error message for a cell</td></tr>
						<tr><td><code>canEditCell(rowIndex, field)</code></td><td>Check if a cell is editable (not locked, column is editable). Second parameter is the field name string</td></tr>
					</tbody>
				</table>
			</div>

			<h4 class="mt-4">Row Identification Methods</h4>
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr><th>Method</th><th>Description</th></tr>
					</thead>
					<tbody>
						<tr><td><code>getRowId(row)</code></td><td>Get the ID of a row data object (uses idValueMember or idValueCallback)</td></tr>
						<tr><td><code>findRowById(id)</code></td><td>Find row index by ID</td></tr>
						<tr><td><code>updateRowById(id, changes)</code></td><td>Merge changes into a row identified by ID</td></tr>
						<tr><td><code>replaceRowById(id, newRow)</code></td><td>Replace entire row data by ID</td></tr>
					</tbody>
				</table>
			</div>

			<h4 class="mt-4">Row Locking Methods</h4>
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr><th>Method</th><th>Description</th></tr>
					</thead>
					<tbody>
						<tr><td><code>isRowLocked(rowOrId)</code></td><td>Check if a row is locked. Takes a row data object or row ID</td></tr>
						<tr><td><code>getRowLockInfo(rowOrId)</code></td><td>Get lock info for a row. Takes a row data object or row ID</td></tr>
						<tr><td><code>lockRowById(id, lockInfo?)</code></td><td>Lock a row externally (for WebSocket scenarios)</td></tr>
						<tr><td><code>unlockRowById(id)</code></td><td>Unlock an externally locked row</td></tr>
						<tr><td><code>getExternalLocks()</code></td><td>Get all external locks</td></tr>
						<tr><td><code>clearExternalLocks()</code></td><td>Clear all external locks</td></tr>
					</tbody>
				</table>
			</div>

			<h4 class="mt-4">Cell Selection Methods</h4>
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr><th>Method</th><th>Description</th></tr>
					</thead>
					<tbody>
						<tr><td><code>selectCellRange(range)</code></td><td>Select a range of cells. Takes a CellRange object with startRowIndex, startColIndex, endRowIndex, endColIndex</td></tr>
						<tr><td><code>clearCellSelection()</code></td><td>Clear cell selection</td></tr>
						<tr><td><code>getSelectedCells()</code></td><td>Get all selected cell coordinates</td></tr>
						<tr><td><code>copyCellSelectionToClipboard()</code></td><td>Copy selected cells to clipboard as TSV</td></tr>
						<tr><td><code>copySelectedRowsToClipboard()</code></td><td>Copy selected rows to clipboard</td></tr>
					</tbody>
				</table>
			</div>
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
  dropdownSearching: 'Searching...',

  // Header context menu (nested object)
  contextMenu: {
    sortAsc: 'Sort Ascending',
    sortDesc: 'Sort Descending',
    clearSort: 'Clear Sort',
    hideColumn: 'Hide Column',
    freezeColumn: 'Freeze Column',
    unfreezeColumn: 'Unfreeze Column',
    columnVisibility: 'Column Visibility',
    showAll: 'Show all'
  }
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
							<td><code>isVirtualScrollEnabled</code></td>
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
							<td><code>isInfiniteScrollEnabled</code></td>
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

		<!-- Scroll Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Scroll Properties</h2>
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr><th>Property</th><th>Type</th><th>Default</th><th>Description</th></tr>
					</thead>
					<tbody>
						<tr><td><code>isScrollable</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Constrain grid to viewport height</td></tr>
						<tr><td><code>scrollMaxHeight</code></td><td><code>string</code></td><td><code>'100vh'</code></td><td>Custom max-height for the grid container</td></tr>
						<tr><td><code>tableBorderOnly</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Show border only around the table, not the full container</td></tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Tooltip Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Tooltip Properties</h2>
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr><th>Property</th><th>Type</th><th>Default</th><th>Description</th></tr>
					</thead>
					<tbody>
						<tr><td><code>tooltipShowDelay</code></td><td><code>number</code></td><td><code>400</code></td><td>Delay in ms before showing tooltip</td></tr>
						<tr><td><code>tooltipHideDelay</code></td><td><code>number</code></td><td><code>100</code></td><td>Delay in ms before hiding tooltip</td></tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Context Menu & Summary -->
		<section class="mb-5">
			<h2 class="mb-4">Context Menu & Summary</h2>

			<h4 class="mt-4">Row Context Menu</h4>
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
							<td>Right-click menu items for cells/rows (supports <code>shortcut</code> property)</td>
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
					</tbody>
				</table>
			</div>

			<h4 class="mt-4">Header Context Menu</h4>
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
							<td><code>headerContextMenu</code></td>
							<td><code>HeaderMenuConfig[]</code></td>
							<td>-</td>
							<td>Right-click menu items for column headers. Accepts predefined strings or custom items.</td>
						</tr>
						<tr>
							<td><code>onheadercontextmenuopen</code></td>
							<td><code>function</code></td>
							<td>-</td>
							<td>Callback before header menu opens: <code>(ctx: HeaderMenuContext) => void | false</code>. Return false to prevent opening.</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`// Header context menu with predefined actions
grid.headerContextMenu = [
  'sortAsc',           // Sort ascending
  'sortDesc',          // Sort descending
  'clearSort',         // Clear sort (auto-hidden if not sorted)
  { dividerBefore: true },
  'freezeColumn',      // Freeze up to this column
  'unfreezeColumn',    // Unfreeze (auto-hidden if not frozen)
  { dividerBefore: true },
  'columnVisibility',  // Submenu to show/hide columns
  'hideColumn',        // Hide this column
  {
    id: 'custom',
    label: 'Custom Action',
    icon: '⚡',
    onclick: (ctx) => console.log(ctx.column.field)
  }
];

// Predefined actions:
// 'sortAsc' | 'sortDesc' | 'clearSort' |
// 'hideColumn' | 'freezeColumn' | 'unfreezeColumn' |
// 'columnVisibility'

// Multi-sort: Ctrl+click Sort Asc/Desc adds to sort
// (when sortMode = 'multi')`}
				languageType="javascript"
				titleText="Header Context Menu"
			/>

			<h4 class="mt-4">Summary</h4>
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
							<td><code>isSummaryInline</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Share row with pagination</td>
						</tr>
						<tr>
							<td><code>summaryMetadata</code></td>
							<td><code>unknown</code></td>
							<td>-</td>
							<td>Server-provided metadata passed to summaryContentCallback</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- New Empty Row (Experimental) -->
		<section class="mb-5">
			<h2 class="mb-4">New Empty Row <span class="badge bg-warning text-dark">Experimental</span></h2>
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr><th>Property</th><th>Type</th><th>Default</th><th>Description</th></tr>
					</thead>
					<tbody>
						<tr><td><code>isNewRowEnabled</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Show an empty row for adding new data</td></tr>
						<tr><td><code>newRowPosition</code></td><td><code>'top' | 'bottom'</code></td><td><code>'bottom'</code></td><td>Position of the new row</td></tr>
						<tr><td><code>newRowIndicator</code></td><td><code>string</code></td><td><code>'+'</code></td><td>Indicator shown in row number cell</td></tr>
						<tr><td><code>createEmptyRowCallback</code></td><td><code>() => T</code></td><td>-</td><td>Callback to create a new empty row object</td></tr>
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
grid.isEditable = true;
grid.editTrigger = 'navigate';
grid.isHoverable = true;`}
				languageType="javascript"
				titleText="Grid Mode"
			/>
		</section>

		<!-- Callbacks (on Component page) -->
		<section class="mb-5">
			<h2 class="mb-4">Callbacks</h2>
			<p>See <a href="/api/events">Events API</a> for full details. Key callbacks not listed in other sections:</p>
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr><th>Callback</th><th>Description</th></tr>
					</thead>
					<tbody>
						<tr><td><code>onrowfocus</code></td><td>Fired when focused row changes (master/detail)</td></tr>
						<tr><td><code>onrowlockchange</code></td><td>Fired when a row's lock state changes</td></tr>
						<tr><td><code>oncellselectionchange</code></td><td>Fired when cell selection changes</td></tr>
						<tr><td><code>onbeforepaste</code></td><td>Fired before paste operation - return false to cancel</td></tr>
						<tr><td><code>onpaste</code></td><td>Fired after paste operation completes</td></tr>
						<tr><td><code>idValueCallback</code></td><td>Callback to compute row ID (alternative to idValueMember)</td></tr>
					</tbody>
				</table>
			</div>
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
				<li><strong>CSS Variables:</strong> Customize appearance with 170+ CSS variables</li>
				<li><strong>Events vs Callbacks:</strong> Events use <code>on*</code> naming, callbacks use <code>*Callback</code> suffix</li>
			</ul>
		</div>
	</div>
</DocLayout>
