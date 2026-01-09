<script lang="ts">
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let grid: any;
	let fillLog = 'Drag the fill handle (small square at bottom-right of focused cell) to copy values...';

	const sampleData = [
		{ id: 1, name: 'Alice', department: 'Engineering', salary: 85000, status: 'Active' },
		{ id: 2, name: 'Bob', department: 'Marketing', salary: 72000, status: 'Pending' },
		{ id: 3, name: 'Carol', department: 'Sales', salary: 68000, status: 'Active' },
		{ id: 4, name: 'David', department: 'HR', salary: 65000, status: 'Pending' },
		{ id: 5, name: 'Eve', department: 'Finance', salary: 78000, status: 'Active' },
		{ id: 6, name: 'Frank', department: 'Engineering', salary: 92000, status: 'Active' },
		{ id: 7, name: 'Grace', department: 'Marketing', salary: 67000, status: 'Pending' },
		{ id: 8, name: 'Henry', department: 'Sales', salary: 71000, status: 'Active' }
	];

	const columns = [
		{ field: 'id', title: 'ID', width: '60px', editor: 'number' },
		{ field: 'name', title: 'Name', width: '120px', editor: 'text' },
		{ field: 'department', title: 'Department', width: '130px', editor: 'select',
			editorOptions: {
				options: [
					{ value: 'Engineering', label: 'Engineering' },
					{ value: 'Marketing', label: 'Marketing' },
					{ value: 'Sales', label: 'Sales' },
					{ value: 'HR', label: 'HR' },
					{ value: 'Finance', label: 'Finance' }
				]
			}
		},
		{ field: 'salary', title: 'Salary', width: '100px', editor: 'number', formatCallback: (v: number) => '$' + v?.toLocaleString() },
		{ field: 'status', title: 'Status', width: '100px', editor: 'select',
			editorOptions: {
				options: [
					{ value: 'Active', label: 'Active' },
					{ value: 'Pending', label: 'Pending' },
					{ value: 'Inactive', label: 'Inactive' }
				]
			}
		}
	];

	onMount(() => {
		if (grid) {
			grid.items = [...sampleData];
			grid.columns = columns;
			grid.editable = true;
			grid.editTrigger = 'navigate';
			grid.hoverable = true;
			grid.striped = true;
			grid.fillDirection = 'vertical';

			grid.onfilldrag = ({ sourceCell, targetCells, direction }: any) => {
				fillLog = `Filled ${targetCells.length} cell(s) ${direction} from "${sourceCell.field}" column`;
				return true;
			};

			grid.onrowchange = ({ field, oldValue, newValue }: any) => {
				console.log(`Changed ${field}: ${oldValue} → ${newValue}`);
			};
		}
	});

	function setFillDirection(dir: string) {
		if (grid) {
			grid.fillDirection = dir;
			fillLog = `Fill direction set to: ${dir}`;
		}
	}
</script>

<DocLayout
	titleText="Fill Handle"
	descriptionText="Excel-like drag-to-fill for copying cell values">

	<div class="py-4">
		<!-- Overview -->
		<section class="mb-5">
			<h2 class="mb-3">Overview</h2>
			<p class="lead">
				The fill handle appears as a small square at the bottom-right corner of a focused cell.
				Drag it to copy the cell's value to adjacent cells - just like in Excel.
			</p>
		</section>

		<!-- Demo -->
		<section class="mb-5">
			<h2 class="mb-4">Interactive Demo</h2>
			<p>Click a cell to focus it, then drag the small handle at the bottom-right corner to fill adjacent cells.</p>

			<div class="mb-3">
				<span class="me-2">Fill Direction:</span>
				<button class="btn btn-sm btn-outline-primary me-1" on:click={() => setFillDirection('vertical')}>Vertical Only</button>
				<button class="btn btn-sm btn-outline-primary" on:click={() => setFillDirection('all')}>All Directions</button>
			</div>

			<div class="demo-container mb-3">
				<web-grid bind:this={grid} style="max-width: 100%; max-height: 350px;"></web-grid>
			</div>

			<div class="alert alert-info">
				<strong>Fill Log:</strong> {fillLog}
			</div>

			<CodeBlock
				codeContent={`// Enable fill handle (appears when cell is focused and editable)
grid.editable = true;
grid.editTrigger = 'navigate';  // Excel-like mode

// Control fill direction
grid.fillDirection = 'vertical';  // Default: only same column
grid.fillDirection = 'all';       // Allow all directions

// Per-column override
columns = [
  { field: 'name', fillDirection: 'all' },      // Allow all
  { field: 'salary', fillDirection: 'vertical' } // Restrict to column
];

// Callback before fill (return false to cancel)
grid.onfilldrag = ({ sourceCell, targetCells, direction }) => {
  console.log(\`Filling \${targetCells.length} cells \${direction}\`);
  return true;  // Allow fill
};`}
				languageType="javascript"
				titleText="Fill Handle Setup"
			/>
		</section>

		<!-- Type Validation -->
		<section class="mb-5">
			<h2 class="mb-4">Type-Based Validation</h2>
			<p>Fill handle automatically validates values based on column type. Incompatible values are skipped.</p>

			<div class="row g-4">
				<div class="col-md-6">
					<div class="card h-100">
						<div class="card-header">Number Columns</div>
						<div class="card-body">
							<p class="card-text">Only accepts numeric values. Strings and other types are rejected.</p>
							<code>editor: 'number'</code>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="card h-100">
						<div class="card-header">Select / Combobox</div>
						<div class="card-body">
							<p class="card-text">Only accepts values that exist in the options list.</p>
							<code>editor: 'select' | 'combobox'</code>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="card h-100">
						<div class="card-header">Date Columns</div>
						<div class="card-body">
							<p class="card-text">Only accepts valid date strings, Date objects, or timestamps (2000-2100).</p>
							<code>editor: 'date'</code>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="card h-100">
						<div class="card-header">Text / Autocomplete</div>
						<div class="card-body">
							<p class="card-text">Accepts any value. Use <code>onfilldrag</code> callback for custom validation.</p>
							<code>editor: 'text' | 'autocomplete'</code>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- API Reference -->
		<section class="mb-5">
			<h2 class="mb-4">API Reference</h2>

			<h4>Grid Properties</h4>
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
							<td>Callback before fill - return false to cancel</td>
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

			<h4 class="mt-4">FillDragDetail Interface</h4>
			<CodeBlock
				codeContent={`interface FillDragDetail {
  sourceCell: {
    rowIndex: number;
    colIndex: number;
    field: string;
    value: unknown;
  };
  targetCells: Array<{
    rowIndex: number;
    colIndex: number;
    field: string;
  }>;
  direction: 'up' | 'down' | 'left' | 'right';
}`}
				languageType="typescript"
				titleText="TypeScript Types"
			/>
		</section>

		<!-- Notes -->
		<section class="mb-5">
			<div class="alert alert-secondary">
				<h5>Notes</h5>
				<ul class="mb-0">
					<li>Fill handle only appears when cell is focused and column is editable</li>
					<li>Non-editable cells are automatically skipped during fill</li>
					<li>Draft row values (recently edited) are used as source values</li>
					<li>Drag threshold (5px) prevents accidental fill on click</li>
					<li><code>onrowchange</code> fires for each modified cell after fill completes</li>
				</ul>
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
