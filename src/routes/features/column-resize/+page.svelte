<script lang="ts">
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let grid: any;
	let resizeLog = 'Drag the edge between column headers to resize...';

	const sampleData = [
		{ id: 1, name: 'Alice Johnson', email: 'alice@example.com', department: 'Engineering', salary: 85000 },
		{ id: 2, name: 'Bob Smith', email: 'bob@example.com', department: 'Marketing', salary: 72000 },
		{ id: 3, name: 'Carol Williams', email: 'carol@example.com', department: 'Sales', salary: 68000 },
		{ id: 4, name: 'David Brown', email: 'david@example.com', department: 'HR', salary: 65000 },
		{ id: 5, name: 'Eve Davis', email: 'eve@example.com', department: 'Finance', salary: 78000 },
		{ id: 6, name: 'Frank Miller', email: 'frank@example.com', department: 'Engineering', salary: 92000 }
	];

	const columns = [
		{ field: 'id', title: 'ID', width: '60px', isResizable: false },
		{ field: 'name', title: 'Name', width: '150px', minWidth: '100px', maxWidth: '300px' },
		{ field: 'email', title: 'Email', width: '200px', minWidth: '120px' },
		{ field: 'department', title: 'Department', width: '120px' },
		{ field: 'salary', title: 'Salary', width: '100px', formatCallback: (v: number) => '$' + v?.toLocaleString() }
	];

	onMount(async () => {
		await import('@keenmate/web-grid');
		if (grid) {
			grid.items = [...sampleData];
			grid.columns = columns;
			grid.isHoverable = true;
			grid.isStriped = true;

			grid.oncolumnresize = ({ field, oldWidth, newWidth, allWidths }: any) => {
				resizeLog = `Column "${field}" resized: ${oldWidth} → ${newWidth}`;
				console.log('All widths:', allWidths);
			};
		}
	});

	function resetWidths() {
		if (grid) {
			grid.setColumnWidths([
				{ field: 'name', width: '150px' },
				{ field: 'email', width: '200px' },
				{ field: 'department', width: '120px' },
				{ field: 'salary', width: '100px' }
			]);
			resizeLog = 'Column widths reset to defaults';
		}
	}

	function getWidths() {
		if (grid) {
			const widths = grid.getColumnWidthsState();
			resizeLog = `Current widths: ${JSON.stringify(widths)}`;
			console.log('Column widths:', widths);
		}
	}
</script>

<DocLayout
	titleText="Resizable Columns"
	descriptionText="Excel-like column resizing by dragging header edges">

	<div class="py-4">
		<!-- Overview -->
		<section class="mb-5">
			<h2 class="mb-3">Overview</h2>
			<p class="lead">
				Resize columns by dragging the edge between column headers - just like in Excel.
				Supports min/max constraints, per-column opt-out, and localStorage persistence.
			</p>
		</section>

		<!-- Demo -->
		<section class="mb-5">
			<h2 class="mb-4">CR01 Interactive Demo</h2>
			<p>Hover between column headers to see the resize cursor. Drag to resize. The ID column has <code>isResizable: false</code>.</p>

			<div class="mb-3">
				<button class="btn btn-sm btn-outline-primary me-2" on:click={resetWidths}>Reset Widths</button>
				<button class="btn btn-sm btn-outline-secondary" on:click={getWidths}>Log Current Widths</button>
			</div>

			<div class="demo-container mb-3">
				<web-grid bind:this={grid} style="max-width: 100%; max-height: 300px;"></web-grid>
			</div>

			<div class="alert alert-info">
				<strong>Resize Log:</strong> {resizeLog}
			</div>

			<CodeBlock
				codeContent={`// Columns are resizable by default
columns = [
  { field: 'id', title: 'ID', isResizable: false },  // Opt-out
  { field: 'name', title: 'Name',
    minWidth: '100px',   // Minimum constraint
    maxWidth: '300px'    // Maximum constraint
  },
  { field: 'email', title: 'Email', width: '200px' }
];

// Listen for resize events
grid.oncolumnresize = ({ field, oldWidth, newWidth, allWidths }) => {
  console.log(\`\${field} resized: \${oldWidth} → \${newWidth}\`);
  // Save to server if needed
};`}
				languageType="javascript"
				titleText="Column Resizing"
			/>
		</section>

		<!-- Persistence -->
		<section class="mb-5">
			<h2 class="mb-4">CR02 LocalStorage Persistence</h2>
			<p>Save column widths to localStorage so they persist across page reloads.</p>

			<CodeBlock
				codeContent={`// Enable persistence
grid.gridName = 'my-unique-grid';     // Required: unique identifier
grid.shouldPersistColumnWidths = true;       // Save widths to localStorage

// Widths are automatically:
// - Saved after each resize
// - Restored when grid initializes
// - Stored under key: "wg_{gridName}_columnWidths"`}
				languageType="javascript"
				titleText="Persistence Setup"
			/>
		</section>

		<!-- Programmatic API -->
		<section class="mb-5">
			<h2 class="mb-4">Programmatic API</h2>

			<CodeBlock
				codeContent={`// Set width of a single column
grid.setColumnWidth('name', '200px');

// Set widths of multiple columns
grid.setColumnWidths([
  { field: 'name', width: '200px' },
  { field: 'email', width: '250px' },
  { field: 'department', width: '150px' }
]);

// Get current widths of all columns
const widths = grid.getColumnWidthsState();
// Returns: [{ field: 'name', width: '200px' }, ...]`}
				languageType="javascript"
				titleText="Programmatic Control"
			/>
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
							<td>Callback after resize completes</td>
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
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>resizable</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Whether column can be resized</td>
						</tr>
						<tr>
							<td><code>minWidth</code></td>
							<td><code>string</code></td>
							<td>-</td>
							<td>Minimum width constraint (e.g., '100px')</td>
						</tr>
						<tr>
							<td><code>maxWidth</code></td>
							<td><code>string</code></td>
							<td>-</td>
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
							<td>Set width of a single column</td>
						</tr>
						<tr>
							<td><code>setColumnWidths(widths)</code></td>
							<td>Set widths of multiple columns (array of {`{ field, width }`})</td>
						</tr>
						<tr>
							<td><code>getColumnWidthsState()</code></td>
							<td>Get current widths of all columns</td>
						</tr>
					</tbody>
				</table>
			</div>

			<h4 class="mt-4">ColumnResizeDetail Interface</h4>
			<CodeBlock
				codeContent={`interface ColumnResizeDetail {
  field: string;              // Column field that was resized
  oldWidth: string;           // Previous width
  newWidth: string;           // New width
  allWidths: ColumnWidthState[];  // All column widths
}

interface ColumnWidthState {
  field: string;
  width: string;
}`}
				languageType="typescript"
				titleText="TypeScript Types"
			/>
		</section>
	</div>
</DocLayout>

<style>
	.demo-container {
		border: 1px solid var(--bs-border-color);
		border-radius: 0.375rem;
	}
</style>
