<script lang="ts">
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let grid: any;
	let reorderLog = 'Drag column headers to reorder...';

	const sampleData = [
		{ id: 1, name: 'Alice Johnson', email: 'alice@example.com', department: 'Engineering', salary: 85000 },
		{ id: 2, name: 'Bob Smith', email: 'bob@example.com', department: 'Marketing', salary: 72000 },
		{ id: 3, name: 'Carol Williams', email: 'carol@example.com', department: 'Sales', salary: 68000 },
		{ id: 4, name: 'David Brown', email: 'david@example.com', department: 'HR', salary: 65000 },
		{ id: 5, name: 'Eve Davis', email: 'eve@example.com', department: 'Finance', salary: 78000 },
		{ id: 6, name: 'Frank Miller', email: 'frank@example.com', department: 'Engineering', salary: 92000 }
	];

	const columns = [
		{ field: 'id', title: 'ID', width: '60px' },
		{ field: 'name', title: 'Name', width: '150px' },
		{ field: 'email', title: 'Email', width: '200px' },
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
			grid.isColumnReorderAllowed = true;

			grid.oncolumnreorder = ({ field, fromIndex, toIndex, allOrder }: any) => {
				reorderLog = `Column "${field}" moved from position ${fromIndex} to ${toIndex}`;
				console.log('New order:', allOrder);
			};
		}
	});

	function resetOrder() {
		if (grid) {
			grid.setColumnOrder([
				{ field: 'id', order: 0 },
				{ field: 'name', order: 1 },
				{ field: 'email', order: 2 },
				{ field: 'department', order: 3 },
				{ field: 'salary', order: 4 }
			]);
			reorderLog = 'Column order reset to default';
		}
	}

	function moveEmailFirst() {
		if (grid) {
			grid.moveColumn('email', 0);
			reorderLog = 'Moved "Email" column to first position';
		}
	}

	function getOrder() {
		if (grid) {
			const order = grid.getColumnOrderState();
			const fieldNames = order.sort((a: any, b: any) => a.order - b.order).map((o: any) => o.field);
			reorderLog = `Current order: ${fieldNames.join(', ')}`;
			console.log('Column order:', order);
		}
	}
</script>

<DocLayout
	titleText="Column Reordering"
	descriptionText="Drag column headers to rearrange columns">

	<div class="py-4">
		<!-- Overview -->
		<section class="mb-5">
			<h2 class="mb-3">Overview</h2>
			<p class="lead">
				Drag column headers to rearrange the order of columns. Supports localStorage persistence
				and programmatic control. A drag threshold prevents accidental reorder when clicking to sort.
			</p>
		</section>

		<!-- Demo -->
		<section class="mb-5">
			<h2 class="mb-4">CO01 Interactive Demo</h2>
			<p>Drag any column header left or right to reorder columns.</p>

			<div class="mb-3">
				<button class="btn btn-sm btn-outline-primary me-2" on:click={resetOrder}>Reset Order</button>
				<button class="btn btn-sm btn-outline-secondary me-2" on:click={moveEmailFirst}>Move Email First</button>
				<button class="btn btn-sm btn-outline-secondary" on:click={getOrder}>Log Current Order</button>
			</div>

			<div class="demo-container mb-3">
				<web-grid bind:this={grid} style="max-width: 100%; max-height: 300px;"></web-grid>
			</div>

			<div class="alert alert-info">
				<strong>Reorder Log:</strong> {reorderLog}
			</div>

			<CodeBlock
				codeContent={`// Enable column reordering
grid.isColumnReorderAllowed = true;

// Listen for reorder events
grid.oncolumnreorder = ({ field, fromIndex, toIndex, allOrder }) => {
  console.log(\`\${field} moved: \${fromIndex} → \${toIndex}\`);
  console.log('New order:', allOrder);
  // Save to server if needed
};`}
				languageType="javascript"
				titleText="Column Reordering"
			/>
		</section>

		<!-- Persistence -->
		<section class="mb-5">
			<h2 class="mb-4">CO02 LocalStorage Persistence</h2>
			<p>Save column order to localStorage so it persists across page reloads.</p>

			<CodeBlock
				codeContent={`// Enable persistence
grid.gridName = 'my-unique-grid';     // Required: unique identifier
grid.shouldPersistColumnOrder = true;        // Save order to localStorage

// Order is automatically:
// - Saved after each reorder
// - Restored when grid initializes
// - Stored under key: "wg_{gridName}_columnOrder"`}
				languageType="javascript"
				titleText="Persistence Setup"
			/>
		</section>

		<!-- Programmatic API -->
		<section class="mb-5">
			<h2 class="mb-4">Programmatic API</h2>

			<CodeBlock
				codeContent={`// Set column order (array of { field, order })
grid.setColumnOrder([
  { field: 'id', order: 0 },
  { field: 'email', order: 1 },
  { field: 'name', order: 2 },
  { field: 'department', order: 3 },
  { field: 'salary', order: 4 }
]);

// Move a single column to a specific index
grid.moveColumn('email', 0);  // Move email to first position
grid.moveColumn('salary', 2); // Move salary to third position

// Get current column order
const order = grid.getColumnOrderState();
// Returns: [{ field: 'id', order: 0 }, { field: 'email', order: 1 }, ...]`}
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
							<td><code>isColumnReorderAllowed</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Enable column drag-to-reorder</td>
						</tr>
						<tr>
							<td><code>gridName</code></td>
							<td><code>string</code></td>
							<td>-</td>
							<td>Unique name for localStorage persistence</td>
						</tr>
						<tr>
							<td><code>shouldPersistColumnOrder</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Save column order to localStorage</td>
						</tr>
						<tr>
							<td><code>oncolumnreorder</code></td>
							<td><code>function</code></td>
							<td>-</td>
							<td>Callback after reorder completes</td>
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
							<td>Set column order (array of {`{ field, order }`})</td>
						</tr>
						<tr>
							<td><code>moveColumn(field, toIndex)</code></td>
							<td>Move a specific column to a target index</td>
						</tr>
						<tr>
							<td><code>getColumnOrderState()</code></td>
							<td>Get current column order (array of {`{ field, order }`})</td>
						</tr>
					</tbody>
				</table>
			</div>

			<h4 class="mt-4">ColumnReorderDetail Interface</h4>
			<CodeBlock
				codeContent={`interface ColumnReorderDetail {
  field: string;           // Column field that was moved
  fromIndex: number;       // Original position
  toIndex: number;         // New position
  allOrder: ColumnOrderState[];  // Complete column order after reorder
}

interface ColumnOrderState {
  field: string;
  order: number;
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
					<li><strong>Frozen columns</strong> cannot be reordered</li>
					<li><strong>Drag threshold</strong> (5px) prevents accidental reorder when clicking to sort</li>
					<li>Grab cursor only shown when <code>isColumnReorderAllowed</code> is enabled</li>
					<li>Works together with column resizing - both can be enabled simultaneously</li>
				</ul>
			</div>
		</section>
	</div>
</DocLayout>

<style>
	.demo-container {
		border: 1px solid var(--bs-border-color);
		border-radius: 0.375rem;
	}
</style>
