<script lang="ts">
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let gridRowBasic: any;
	let gridRowShortcuts: any;
	let gridCellClick: any;
	let gridCellShift: any;
	let gridCopy: any;

	let rowSelectionLog = 'Click row numbers to select rows...';
	let rowActionLog = 'Select rows and use shortcuts...';
	let cellClickLog = 'Click and drag on cells to select a range...';
	let cellShiftLog = 'Hold Shift and click two cells to select range...';
	let copyLog = 'Select rows or cells, then press Ctrl+C...';
	let copyWithHeaders = false;

	const sampleData = [
		{ id: 1001, name: 'Alice', department: 'Engineering', salary: 85000, status: 'Active' },
		{ id: 1002, name: 'Bob', department: 'Marketing', salary: 72000, status: 'Pending' },
		{ id: 1003, name: 'Carol', department: 'Sales', salary: 68000, status: 'Active' },
		{ id: 1004, name: 'David', department: 'HR', salary: 65000, status: 'Pending' },
		{ id: 1005, name: 'Eve', department: 'Finance', salary: 78000, status: 'Active' },
		{ id: 1006, name: 'Frank', department: 'Engineering', salary: 92000, status: 'Active' },
		{ id: 1007, name: 'Grace', department: 'Marketing', salary: 67000, status: 'Pending' },
		{ id: 1008, name: 'Henry', department: 'Sales', salary: 71000, status: 'Active' }
	];

	const columns = [
		{ field: 'id', title: 'ID', width: '70px' },
		{ field: 'name', title: 'Name', width: '120px' },
		{ field: 'department', title: 'Department', width: '120px' },
		{ field: 'salary', title: 'Salary', width: '100px', formatCallback: (v: number) => '$' + v?.toLocaleString() },
		{ field: 'status', title: 'Status', width: '100px' }
	];

	onMount(async () => {
		await import('@keenmate/web-grid');

		// RS01: Basic Row Selection
		if (gridRowBasic) {
			gridRowBasic.items = [...sampleData];
			gridRowBasic.columns = columns;
			gridRowBasic.isRowNumbersVisible = true;
			gridRowBasic.isHoverable = true;
			gridRowBasic.isStriped = true;

			setInterval(() => {
				const selected = gridRowBasic.selectedRows;
				if (selected.length === 0) {
					rowSelectionLog = 'No rows selected';
				} else {
					const names = selected.map((idx: number) => gridRowBasic.items[idx]?.name).filter(Boolean);
					rowSelectionLog = `Selected ${selected.length} row(s): ${names.join(', ')}`;
				}
			}, 100);
		}

		// RS02: Row Selection with Shortcuts
		if (gridRowShortcuts) {
			gridRowShortcuts.items = [...sampleData];
			gridRowShortcuts.columns = columns;
			gridRowShortcuts.isRowNumbersVisible = true;
			gridRowShortcuts.isHoverable = true;
			gridRowShortcuts.isStriped = true;

			gridRowShortcuts.rangeShortcuts = [
				{
					key: 'Ctrl+C',
					id: 'copy-rows',
					label: 'Copy to clipboard',
					action: async ({ rows }: { rows: any[] }) => {
						const success = await gridRowShortcuts.copySelectedRowsToClipboard();
						rowActionLog = success
							? `COPIED: ${rows.length} row(s) to clipboard`
							: 'FAILED: Could not copy to clipboard';
					}
				},
				{
					key: 'Delete',
					id: 'delete-selected',
					label: 'Delete selected rows',
					action: ({ rows, rowIndices }: { rows: any[], rowIndices: number[] }) => {
						rowActionLog = `DELETED: ${rows.length} row(s) - ${rows.map((r: any) => r.name).join(', ')}`;
						for (const idx of [...rowIndices].reverse()) {
							gridRowShortcuts.items.splice(idx, 1);
						}
						gridRowShortcuts.items = [...gridRowShortcuts.items];
						gridRowShortcuts.clearSelection();
					}
				}
			];
		}

		// CS01: Cell Range Selection (Click Mode)
		if (gridCellClick) {
			gridCellClick.items = [...sampleData];
			gridCellClick.columns = columns;
			gridCellClick.isRowNumbersVisible = true;
			gridCellClick.isHoverable = true;
			gridCellClick.cellSelectionMode = 'click';
			gridCellClick.mode = 'navigate';

			gridCellClick.rangeShortcuts = [
				{
					key: 'Delete',
					id: 'clear-cells',
					label: 'Clear selected cells',
					action: ({ cells, cellRange }: { cells: any[], cellRange: any }) => {
						if (!cellRange) return;
						cellClickLog = `CLEARED: ${cells.length} cell(s)`;
						cells.forEach(({ row, field }: { row: any, field: string }) => {
							row[field] = null;
						});
						gridCellClick.items = [...gridCellClick.items];
						gridCellClick.clearCellSelection();
					}
				}
			];

			setInterval(() => {
				const range = gridCellClick.selectedCellRange;
				if (!range) {
					cellClickLog = 'Click and drag on cells to select a range...';
				} else {
					const cells = gridCellClick.getSelectedCells();
					cellClickLog = `Selected ${cells.length} cell(s)`;
				}
			}, 100);
		}

		// CS02: Cell Range Selection (Shift Mode)
		if (gridCellShift) {
			gridCellShift.items = [...sampleData];
			gridCellShift.columns = columns;
			gridCellShift.isRowNumbersVisible = true;
			gridCellShift.isHoverable = true;
			gridCellShift.cellSelectionMode = 'shift';
			gridCellShift.editTrigger = 'click';

			setInterval(() => {
				const range = gridCellShift.selectedCellRange;
				if (!range) {
					cellShiftLog = 'Hold Shift and click two cells to define range...';
				} else {
					const cells = gridCellShift.getSelectedCells();
					cellShiftLog = `Selected ${cells.length} cell(s)`;
				}
			}, 100);
		}

		// COPY: Copy to Clipboard Demo
		if (gridCopy) {
			gridCopy.items = [...sampleData];
			gridCopy.columns = columns;
			gridCopy.isRowNumbersVisible = true;
			gridCopy.isHoverable = true;
			gridCopy.cellSelectionMode = 'click';
			gridCopy.mode = 'navigate';

			gridCopy.rangeShortcuts = [
				{
					key: 'Ctrl+C',
					id: 'copy-unified',
					label: 'Copy to clipboard',
					action: async ({ rows, cells, cellRange }: { rows: any[], cells: any[], cellRange: any }) => {
						let success = false;
						if (cellRange) {
							success = await gridCopy.copyCellSelectionToClipboard();
							copyLog = success
								? `COPIED: ${cells.length} cell(s) to clipboard${copyWithHeaders ? ' (with headers)' : ''}`
								: 'FAILED: Could not copy to clipboard';
						} else if (rows.length > 0) {
							success = await gridCopy.copySelectedRowsToClipboard();
							copyLog = success
								? `COPIED: ${rows.length} row(s) to clipboard${copyWithHeaders ? ' (with headers)' : ''}`
								: 'FAILED: Could not copy to clipboard';
						}
					}
				}
			];
		}
	});

	function toggleCopyHeaders() {
		copyWithHeaders = !copyWithHeaders;
		if (gridCopy) {
			gridCopy.shouldCopyWithHeaders = copyWithHeaders;
		}
	}
</script>

<DocLayout
	titleText="Selection"
	descriptionText="Row and cell range selection with keyboard shortcuts and copy to clipboard">

	<div class="py-4">
		<!-- Overview -->
		<section class="mb-5">
			<h2 class="mb-3">Overview</h2>
			<p class="lead">
				WebGrid supports two selection modes: <strong>row selection</strong> via row numbers and
				<strong>cell range selection</strong> via click+drag or shift+click. Both modes support
				keyboard shortcuts for batch operations and copying to clipboard.
			</p>
		</section>

		<!-- ============================================ -->
		<!-- ROW SELECTION -->
		<!-- ============================================ -->
		<h2 class="mb-4 mt-5 border-bottom pb-2">Row Selection</h2>

		<!-- RS01: Basic Row Selection -->
		<section class="mb-5">
			<h4 class="mb-3">RS01 Basic Row Selection</h4>
			<p>Click row numbers to select rows. Use Ctrl+Click to toggle, Shift+Click for range selection, or drag to select multiple rows.</p>

			<div class="demo-container mb-3">
				<web-grid bind:this={gridRowBasic} style="max-width: 100%; max-height: 300px;"></web-grid>
			</div>

			<div class="alert alert-secondary">
				<strong>Selection:</strong> {rowSelectionLog}
			</div>

			<div class="card mt-3">
				<div class="card-header">Selection Controls</div>
				<div class="card-body">
					<ul class="mb-0">
						<li><strong>Click</strong> row number - Select single row (clears others)</li>
						<li><strong>Ctrl+Click</strong> - Toggle row in selection</li>
						<li><strong>Shift+Click</strong> - Select range from last selected</li>
						<li><strong>Click+Drag</strong> - Select range while dragging</li>
						<li><strong>Escape</strong> - Clear selection</li>
					</ul>
				</div>
			</div>

			<CodeBlock
				codeContent={`// Enable row numbers (required for selection)
grid.isRowNumbersVisible = true;

// Read selected rows
console.log(grid.selectedRows);  // [0, 2, 4] - array of indices

// Get data for selected rows
const data = grid.getSelectedRowsData();

// Programmatic selection
grid.selectRow(0, 'replace');     // Select row 0
grid.selectRow(2, 'toggle');      // Toggle row 2
grid.selectRowRange(0, 4);        // Select rows 0-4
grid.clearSelection();            // Clear all`}
				languageType="javascript"
				titleText="Row Selection API"
			/>
		</section>

		<!-- RS02: Row Selection with Shortcuts -->
		<section class="mb-5">
			<h4 class="mb-3">RS02 Row Selection with Shortcuts</h4>
			<p>Select rows and press <kbd>Ctrl+C</kbd> to copy, or <kbd>Delete</kbd> to remove them.</p>

			<div class="demo-container mb-3">
				<web-grid bind:this={gridRowShortcuts} style="max-width: 100%; max-height: 280px;"></web-grid>
			</div>

			<div class="alert" class:alert-success={rowActionLog.includes('COPIED')} class:alert-danger={rowActionLog.includes('DELETED')} class:alert-secondary={!rowActionLog.includes('COPIED') && !rowActionLog.includes('DELETED')}>
				<strong>Action:</strong> {rowActionLog}
			</div>

			<CodeBlock
				codeContent={`grid.rangeShortcuts = [
  {
    key: 'Ctrl+C',
    id: 'copy-rows',
    label: 'Copy to clipboard',
    action: async ({ rows }) => {
      await grid.copySelectedRowsToClipboard();
    }
  },
  {
    key: 'Delete',
    id: 'delete-selected',
    label: 'Delete selected rows',
    action: ({ rows, rowIndices }) => {
      for (const idx of [...rowIndices].reverse()) {
        grid.items.splice(idx, 1);
      }
      grid.items = [...grid.items];
      grid.clearSelection();
    }
  }
];`}
				languageType="javascript"
				titleText="Range Shortcuts for Rows"
			/>
		</section>

		<!-- ============================================ -->
		<!-- CELL RANGE SELECTION -->
		<!-- ============================================ -->
		<h2 class="mb-4 mt-5 border-bottom pb-2">Cell Range Selection</h2>

		<!-- CS01: Cell Range Selection (Click Mode) -->
		<section class="mb-5">
			<h4 class="mb-3">CS01 Click+Drag Mode</h4>
			<p>Click and drag on cells to select a rectangular range. Press <kbd>Delete</kbd> to clear selected cells.</p>

			<div class="demo-container mb-3">
				<web-grid bind:this={gridCellClick} style="max-width: 100%; max-height: 280px;"></web-grid>
			</div>

			<div class="alert" class:alert-danger={cellClickLog.includes('CLEARED')} class:alert-secondary={!cellClickLog.includes('CLEARED')}>
				<strong>Selection:</strong> {cellClickLog}
			</div>

			<CodeBlock
				codeContent={`// Enable cell selection (click mode is default)
grid.cellSelectionMode = 'click';  // 'disabled' | 'click' | 'shift'

// Selection interactions:
// - Click+Drag → select rectangular range
// - Shift+Click → extend range to clicked cell
// - Escape → clear selection

// Read selected range
const range = grid.selectedCellRange;
// { startRowIndex, endRowIndex, startColIndex, endColIndex, startField, endField }

// Get selected cells data
const cells = grid.getSelectedCells();
// [{ row, rowIndex, colIndex, field, value }, ...]

// Programmatic selection
grid.selectCellRange({
  startRowIndex: 0, endRowIndex: 2,
  startColIndex: 1, endColIndex: 3,
  startField: 'name', endField: 'salary'
});
grid.clearCellSelection();`}
				languageType="javascript"
				titleText="Cell Selection API"
			/>
		</section>

		<!-- CS02: Cell Range Selection (Shift Mode) -->
		<section class="mb-5">
			<h4 class="mb-3">CS02 Shift+Click Mode</h4>
			<p>Use <code>cellSelectionMode: 'shift'</code> when <code>editTrigger: 'click'</code> to avoid conflicts. Hold Shift and click two cells to define a range.</p>

			<div class="demo-container mb-3">
				<web-grid bind:this={gridCellShift} style="max-width: 100%; max-height: 280px;"></web-grid>
			</div>

			<div class="alert alert-secondary">
				<strong>Selection:</strong> {cellShiftLog}
			</div>

			<CodeBlock
				codeContent={`// Use shift mode when editTrigger is 'click'
grid.editTrigger = 'click';
grid.cellSelectionMode = 'shift';

// Now:
// - Click → enters edit mode
// - Shift+Click → first click sets start, second click selects range
// - Shift+Drag → select range while dragging`}
				languageType="javascript"
				titleText="Shift Mode Configuration"
			/>
		</section>

		<!-- ============================================ -->
		<!-- COPY TO CLIPBOARD -->
		<!-- ============================================ -->
		<h2 class="mb-4 mt-5 border-bottom pb-2">Copy to Clipboard</h2>

		<section class="mb-5">
			<h4 class="mb-3">Excel-Compatible Copy</h4>
			<p>
				Copy selected rows or cell ranges to clipboard in TSV format (tab-separated values).
				Paste directly into Excel, Google Sheets, or any spreadsheet application.
			</p>

			<div class="mb-3">
				<label class="form-check">
					<input type="checkbox" class="form-check-input" checked={copyWithHeaders} on:change={toggleCopyHeaders}>
					<span class="form-check-label">Include column headers when copying</span>
				</label>
			</div>

			<div class="demo-container mb-3">
				<web-grid bind:this={gridCopy} style="max-width: 100%; max-height: 300px;"></web-grid>
			</div>

			<div class="alert" class:alert-success={copyLog.includes('COPIED')} class:alert-danger={copyLog.includes('FAILED')} class:alert-secondary={!copyLog.includes('COPIED') && !copyLog.includes('FAILED')}>
				<strong>Result:</strong> {copyLog}
			</div>

			<div class="card mt-3 mb-3">
				<div class="card-header">Try It</div>
				<div class="card-body">
					<ol class="mb-0">
						<li>Select rows (click row numbers) or cells (click+drag on cells)</li>
						<li>Press <kbd>Ctrl+C</kbd></li>
						<li>Open Excel/Google Sheets and paste</li>
						<li>Toggle "Include column headers" and try again</li>
					</ol>
				</div>
			</div>

			<CodeBlock
				codeContent={`// Configure copy behavior
grid.shouldCopyWithHeaders = true;  // Include headers (default: false)

// Copy methods
await grid.copyCellSelectionToClipboard();  // Copy selected cells
await grid.copySelectedRowsToClipboard();   // Copy selected rows

// Unified shortcut that handles both
grid.rangeShortcuts = [{
  key: 'Ctrl+C',
  id: 'copy',
  label: 'Copy to clipboard',
  action: async ({ rows, cells, cellRange }) => {
    if (cellRange) {
      await grid.copyCellSelectionToClipboard();
    } else if (rows.length > 0) {
      await grid.copySelectedRowsToClipboard();
    }
  }
}];`}
				languageType="javascript"
				titleText="Copy to Clipboard"
			/>

			<h5 class="mt-4">Output Format (TSV)</h5>
			<CodeBlock
				codeContent={`Without headers:
Alice	Engineering	85000
Bob	Marketing	72000
Carol	Sales	68000

With headers (shouldCopyWithHeaders: true):
Name	Department	Salary
Alice	Engineering	85000
Bob	Marketing	72000
Carol	Sales	68000`}
				languageType="text"
				titleText="Clipboard Format"
			/>
		</section>

		<!-- ============================================ -->
		<!-- API REFERENCE -->
		<!-- ============================================ -->
		<h2 class="mb-4 mt-5 border-bottom pb-2">API Reference</h2>

		<section class="mb-5">
			<h4>Properties</h4>
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
						<tr><td colspan="3" class="table-secondary"><strong>Row Selection</strong></td></tr>
						<tr>
							<td><code>selectedRows</code></td>
							<td><code>number[]</code></td>
							<td>Array of selected row indices (read-only, sorted ascending)</td>
						</tr>
						<tr><td colspan="3" class="table-secondary"><strong>Cell Selection</strong></td></tr>
						<tr>
							<td><code>cellSelectionMode</code></td>
							<td><code>'disabled' | 'click' | 'shift'</code></td>
							<td>Cell selection mode (default: 'click')</td>
						</tr>
						<tr>
							<td><code>selectedCellRange</code></td>
							<td><code>CellRange | null</code></td>
							<td>Current cell range selection (read-only)</td>
						</tr>
						<tr><td colspan="3" class="table-secondary"><strong>Copy</strong></td></tr>
						<tr>
							<td><code>shouldCopyWithHeaders</code></td>
							<td><code>boolean</code></td>
							<td>Include column headers when copying (default: false)</td>
						</tr>
						<tr><td colspan="3" class="table-secondary"><strong>Shortcuts</strong></td></tr>
						<tr>
							<td><code>rangeShortcuts</code></td>
							<td><code>RangeShortcut[]</code></td>
							<td>Keyboard shortcuts for selected rows/cells</td>
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
						<tr><td colspan="2" class="table-secondary"><strong>Row Selection</strong></td></tr>
						<tr>
							<td><code>selectRow(index, mode)</code></td>
							<td>Select a row. Mode: 'replace', 'toggle', or 'range'</td>
						</tr>
						<tr>
							<td><code>selectRowRange(from, to)</code></td>
							<td>Select a range of rows</td>
						</tr>
						<tr>
							<td><code>clearSelection()</code></td>
							<td>Clear all selected rows</td>
						</tr>
						<tr>
							<td><code>isRowSelected(index)</code></td>
							<td>Check if a row is selected</td>
						</tr>
						<tr>
							<td><code>getSelectedRowsData()</code></td>
							<td>Get the data objects for selected rows</td>
						</tr>
						<tr><td colspan="2" class="table-secondary"><strong>Cell Selection</strong></td></tr>
						<tr>
							<td><code>selectCellRange(range)</code></td>
							<td>Select a cell range programmatically</td>
						</tr>
						<tr>
							<td><code>clearCellSelection()</code></td>
							<td>Clear cell range selection</td>
						</tr>
						<tr>
							<td><code>getSelectedCells()</code></td>
							<td>Get array of selected cell info objects</td>
						</tr>
						<tr><td colspan="2" class="table-secondary"><strong>Copy</strong></td></tr>
						<tr>
							<td><code>copyCellSelectionToClipboard()</code></td>
							<td>Copy cell range as TSV. Returns Promise&lt;boolean&gt;</td>
						</tr>
						<tr>
							<td><code>copySelectedRowsToClipboard()</code></td>
							<td>Copy selected rows as TSV. Returns Promise&lt;boolean&gt;</td>
						</tr>
					</tbody>
				</table>
			</div>

			<h4 class="mt-4">TypeScript Types</h4>
			<CodeBlock
				codeContent={`interface CellRange {
  startRowIndex: number;
  startColIndex: number;
  endRowIndex: number;
  endColIndex: number;
  startField: string;
  endField: string;
}

interface RangeShortcut<T> {
  key: string;           // e.g., "Delete", "Ctrl+C"
  id: string;            // Unique identifier
  label: string;         // Display label
  action: (ctx: RangeShortcutContext<T>) => void | Promise<void>;
  disabled?: boolean | ((ctx: RangeShortcutContext<T>) => boolean);
}

interface RangeShortcutContext<T> {
  rows: T[];             // Selected row data (row selection mode)
  rowIndices: number[];  // Selected row indices
  cellRange?: CellRange; // Cell range (if cell selection)
  cells?: Array<{        // Selected cells (if cell selection)
    row: T;
    rowIndex: number;
    colIndex: number;
    field: string;
    value: unknown;
  }>;
}`}
				languageType="typescript"
				titleText="Types"
			/>
		</section>

		<!-- CSS Variables -->
		<section class="mb-5">
			<h4>CSS Variables</h4>
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Variable</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr><td colspan="3" class="table-secondary"><strong>Row Selection</strong></td></tr>
						<tr>
							<td><code>--wg-selection-bg</code></td>
							<td><code>color-mix(in srgb, var(--wg-accent-color) 15%, transparent)</code></td>
							<td>Background color of selected rows</td>
						</tr>
						<tr>
							<td><code>--wg-selection-row-number-bg</code></td>
							<td><code>var(--wg-accent-color)</code></td>
							<td>Background of selected row number cell</td>
						</tr>
						<tr>
							<td><code>--wg-selection-row-number-color</code></td>
							<td><code>white</code></td>
							<td>Text color of selected row number</td>
						</tr>
						<tr><td colspan="3" class="table-secondary"><strong>Cell Selection</strong></td></tr>
						<tr>
							<td><code>--wg-cell-selection-bg</code></td>
							<td><code>color-mix(in srgb, var(--wg-accent-color) 10%, transparent)</code></td>
							<td>Background of selected cells</td>
						</tr>
						<tr>
							<td><code>--wg-cell-selection-border</code></td>
							<td><code>var(--wg-accent-color)</code></td>
							<td>Border color of selection range</td>
						</tr>
						<tr>
							<td><code>--wg-cell-selection-border-width</code></td>
							<td><code>2px</code></td>
							<td>Border width of selection range</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	</div>
</DocLayout>

<style>
	.demo-container {
		border: 1px solid var(--bs-border-color);
		border-radius: 0.375rem;
	}
	kbd {
		background-color: #eee;
		border-radius: 3px;
		border: 1px solid #b4b4b4;
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
		color: #333;
		display: inline-block;
		font-size: 0.85em;
		font-weight: 700;
		line-height: 1;
		padding: 2px 4px;
		white-space: nowrap;
	}
</style>
