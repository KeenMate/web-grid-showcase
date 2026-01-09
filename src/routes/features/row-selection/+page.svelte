<script lang="ts">
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let grid: any;
	let grid2: any;
	let selectionLog = 'Click row numbers to select rows...';
	let actionLog = 'Select rows and use shortcuts...';

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

	onMount(() => {
		if (grid) {
			grid.items = [...sampleData];
			grid.columns = columns;
			grid.showRowNumbers = true;
			grid.hoverable = true;
			grid.striped = true;

			// Poll for selection changes
			setInterval(() => {
				const selected = grid.selectedRows;
				if (selected.length === 0) {
					selectionLog = 'No rows selected';
				} else {
					const names = selected.map((idx: number) => grid.items[idx]?.name).filter(Boolean);
					selectionLog = `Selected ${selected.length} row(s): ${names.join(', ')}`;
				}
			}, 100);
		}

		if (grid2) {
			grid2.items = [...sampleData];
			grid2.columns = columns;
			grid2.showRowNumbers = true;
			grid2.hoverable = true;
			grid2.striped = true;

			grid2.rangeShortcuts = [
				{
					key: 'Delete',
					id: 'delete-selected',
					label: 'Delete selected rows',
					action: ({ rows, rowIndices }: { rows: any[], rowIndices: number[] }) => {
						actionLog = `DELETED: ${rows.length} row(s) - ${rows.map((r: any) => r.name).join(', ')}`;
						for (const idx of [...rowIndices].reverse()) {
							grid2.items.splice(idx, 1);
						}
						grid2.items = [...grid2.items];
						grid2.clearSelection();
					}
				},
				{
					key: 'Ctrl+Alt+E',
					id: 'export-selected',
					label: 'Export selected rows',
					action: ({ rows }: { rows: any[] }) => {
						actionLog = `EXPORTED: ${rows.length} row(s) - ${rows.map((r: any) => r.name).join(', ')}`;
						console.log('Exporting rows:', rows);
					}
				}
			];
		}
	});
</script>

<DocLayout
	titleText="Row Selection"
	descriptionText="Multi-row selection via row numbers with range shortcuts">

	<div class="py-4">
		<!-- Overview -->
		<section class="mb-5">
			<h2 class="mb-3">Overview</h2>
			<p class="lead">
				Select multiple rows by clicking on row numbers. Use modifier keys for advanced selection,
				and define range shortcuts for batch operations on selected rows.
			</p>
		</section>

		<!-- Basic Selection Demo -->
		<section class="mb-5">
			<h2 class="mb-4">Basic Selection</h2>
			<p>Click row numbers to select rows. Use Ctrl+Click to toggle, Shift+Click for range selection, or drag to select multiple rows.</p>

			<div class="demo-container mb-3">
				<web-grid bind:this={grid} style="max-width: 100%; max-height: 350px;"></web-grid>
			</div>

			<div class="alert alert-secondary">
				<strong>Selection:</strong> {selectionLog}
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
grid.showRowNumbers = true;

// Read selected rows
console.log(grid.selectedRows);  // [0, 2, 4] - array of indices

// Get data for selected rows
const data = grid.getSelectedRowsData();

// Programmatic selection
grid.selectRow(0, 'replace');     // Select row 0
grid.selectRow(2, 'toggle');      // Toggle row 2
grid.selectRow(5, 'range');       // Select range to row 5
grid.selectRowRange(0, 4);        // Select rows 0-4
grid.clearSelection();            // Clear all`}
				languageType="javascript"
				titleText="Selection API"
			/>
		</section>

		<!-- Range Shortcuts Demo -->
		<section class="mb-5">
			<h2 class="mb-4">Range Shortcuts</h2>
			<p>Select rows and press Delete to remove them, or Ctrl+Alt+E to "export" (logs to console).</p>

			<div class="demo-container mb-3">
				<web-grid bind:this={grid2} style="max-width: 100%; max-height: 300px;"></web-grid>
			</div>

			<div class="alert" class:alert-danger={actionLog.includes('DELETED')} class:alert-success={actionLog.includes('EXPORTED')} class:alert-secondary={!actionLog.includes('DELETED') && !actionLog.includes('EXPORTED')}>
				<strong>Action:</strong> {actionLog}
			</div>

			<CodeBlock
				codeContent={`// Define range shortcuts (operate on selected rows)
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
    label: 'Export selected rows',
    action: ({ rows }) => {
      console.log('Exporting:', rows);
      exportToCSV(rows);
    }
  }
];`}
				languageType="javascript"
				titleText="Range Shortcuts"
			/>
		</section>

		<!-- API Reference -->
		<section class="mb-5">
			<h2 class="mb-4">API Reference</h2>

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
						<tr>
							<td><code>selectedRows</code></td>
							<td><code>number[]</code></td>
							<td>Array of selected row indices (read-only, sorted ascending)</td>
						</tr>
						<tr>
							<td><code>rangeShortcuts</code></td>
							<td><code>RangeShortcut[]</code></td>
							<td>Keyboard shortcuts that operate on selected rows</td>
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
					</tbody>
				</table>
			</div>

			<h4 class="mt-4">RangeShortcut Interface</h4>
			<CodeBlock
				codeContent={`interface RangeShortcut<T> {
  key: string;        // e.g., "Delete", "Ctrl+Alt+E"
  id: string;         // Unique identifier
  label: string;      // Display label for help overlay
  action: (ctx: RangeShortcutContext<T>) => void | Promise<void>;
  disabled?: boolean | ((ctx: RangeShortcutContext<T>) => boolean);
}

interface RangeShortcutContext<T> {
  rows: T[];          // Selected row data objects
  rowIndices: number[]; // Selected row indices (sorted)
}`}
				languageType="typescript"
				titleText="TypeScript Types"
			/>
		</section>

		<!-- CSS Variables -->
		<section class="mb-5">
			<h2 class="mb-4">CSS Variables</h2>
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
							<td>Text color of selected row number cell</td>
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
		overflow: hidden;
	}
</style>
