<script lang="ts">
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let grid: any;
	let grid2: any;
	let freezeCount = 2;
	let stickyRowNumbers = true;
	let showRowNumbers = true;

	// Wide dataset to demonstrate horizontal scrolling
	const wideData = Array.from({ length: 30 }, (_, i) => ({
		id: 1000 + i,
		name: ['Alice', 'Bob', 'Carol', 'David', 'Eve', 'Frank', 'Grace', 'Henry'][i % 8] + ' ' + ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'][i % 5],
		email: `user${i}@example.com`,
		department: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'][i % 5],
		role: ['Manager', 'Senior', 'Junior', 'Lead', 'Director'][i % 5],
		location: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][i % 5],
		salary: 50000 + (i * 1000),
		startDate: `202${i % 4}-0${(i % 9) + 1}-${10 + (i % 20)}`,
		status: i % 7 === 0 ? 'On Leave' : 'Active',
		phone: `555-${String(i).padStart(4, '0')}`
	}));

	const columns = [
		{ field: 'id', title: 'ID', width: '80px' },
		{ field: 'name', title: 'Name', width: '150px' },
		{ field: 'email', title: 'Email', width: '200px' },
		{ field: 'department', title: 'Department', width: '120px' },
		{ field: 'role', title: 'Role', width: '100px' },
		{ field: 'location', title: 'Location', width: '120px' },
		{ field: 'salary', title: 'Salary', width: '100px', formatCallback: (v: number) => '$' + v?.toLocaleString() },
		{ field: 'startDate', title: 'Start Date', width: '110px' },
		{ field: 'status', title: 'Status', width: '100px' },
		{ field: 'phone', title: 'Phone', width: '120px' }
	];

	// Columns with frozen property
	const columnsWithFrozen = [
		{ field: 'id', title: 'ID', width: '80px' },
		{ field: 'name', title: 'Name', width: '150px' },
		{ field: 'email', title: 'Email', width: '200px' },
		{ field: 'department', title: 'Department', width: '120px' },
		{ field: 'role', title: 'Role', width: '100px' },
		{ field: 'location', title: 'Location', width: '120px' },
		{ field: 'salary', title: 'Salary', width: '100px', formatCallback: (v: number) => '$' + v?.toLocaleString() },
		{ field: 'status', title: 'Status', width: '100px', frozen: true }  // Moves to left
	];

	onMount(() => {
		if (grid) {
			grid.items = [...wideData];
			grid.columns = columns;
			grid.showRowNumbers = true;
			grid.stickyRowNumbers = true;
			grid.freezeColumns = 2;
			grid.striped = true;
			grid.hoverable = true;
		}

		if (grid2) {
			grid2.items = wideData.slice(0, 15);
			grid2.columns = columnsWithFrozen;
			grid2.showRowNumbers = true;
			grid2.stickyRowNumbers = true;
			grid2.striped = true;
			grid2.hoverable = true;
		}
	});

	function updateFreezeColumns() {
		if (grid) {
			grid.freezeColumns = freezeCount;
		}
	}

	function updateStickyRowNumbers() {
		if (grid) {
			grid.stickyRowNumbers = stickyRowNumbers;
		}
	}

	function updateShowRowNumbers() {
		if (grid) {
			grid.showRowNumbers = showRowNumbers;
		}
	}
</script>

<DocLayout
	titleText="Freeze Panes"
	descriptionText="Excel-like frozen columns that stay visible while scrolling">

	<div class="py-4">
		<!-- Overview -->
		<section class="mb-5">
			<h2 class="mb-3">Overview</h2>
			<p class="lead">
				Freeze columns to keep them visible while scrolling horizontally - just like Excel's freeze panes.
				Supports sticky row numbers, freezing first N columns, or marking individual columns as frozen.
			</p>
		</section>

		<!-- Demo -->
		<section class="mb-5">
			<h2 class="mb-4">Frozen Columns Demo</h2>
			<p>Scroll horizontally to see frozen columns stay in place. The row numbers and first columns are frozen.</p>

			<div class="mb-3 d-flex gap-3 flex-wrap align-items-center">
				<div class="form-check">
					<input class="form-check-input" type="checkbox" id="showRowNumbersCheck" bind:checked={showRowNumbers} on:change={updateShowRowNumbers}>
					<label class="form-check-label" for="showRowNumbersCheck">Show Row Numbers</label>
				</div>
				<div class="form-check">
					<input class="form-check-input" type="checkbox" id="stickyCheck" bind:checked={stickyRowNumbers} on:change={updateStickyRowNumbers}>
					<label class="form-check-label" for="stickyCheck">Sticky Row Numbers</label>
				</div>
				<div class="d-flex align-items-center gap-2">
					<label for="freezeSelect">Freeze Columns:</label>
					<select class="form-select form-select-sm" style="width: auto;" id="freezeSelect" bind:value={freezeCount} on:change={updateFreezeColumns}>
						<option value={0}>0</option>
						<option value={1}>1</option>
						<option value={2}>2</option>
						<option value={3}>3</option>
						<option value={4}>4</option>
					</select>
				</div>
			</div>

			<div class="demo-container mb-3">
				<web-grid bind:this={grid} style="max-width: 100%; max-height: 350px;"></web-grid>
			</div>

			<CodeBlock
				codeContent={`// Enable row numbers and make them sticky
grid.showRowNumbers = true;
grid.stickyRowNumbers = true;

// Freeze first N columns
grid.freezeColumns = 2;  // ID and Name columns stay fixed

// Columns should have explicit widths for best results
columns = [
  { field: 'id', title: 'ID', width: '80px' },
  { field: 'name', title: 'Name', width: '150px' },
  { field: 'email', title: 'Email', width: '200px' },
  // ... more columns
];`}
				languageType="javascript"
				titleText="Freeze First N Columns"
			/>
		</section>

		<!-- Column-Level Frozen -->
		<section class="mb-5">
			<h2 class="mb-4">Column-Level Frozen Property</h2>
			<p>Individual columns can be marked as <code>frozen: true</code>. Frozen columns automatically move to the left side, regardless of their definition order.</p>

			<div class="demo-container mb-3">
				<web-grid bind:this={grid2} style="max-width: 100%; max-height: 300px;"></web-grid>
			</div>

			<div class="alert alert-info">
				<strong>Visual Reorder:</strong> In this example, the "Status" column is defined last in the columns array but has <code>frozen: true</code>, so it appears first (after row numbers).
			</div>

			<CodeBlock
				codeContent={`// Mark individual columns as frozen
columns = [
  { field: 'id', title: 'ID', width: '80px' },
  { field: 'name', title: 'Name', width: '150px' },
  { field: 'email', title: 'Email', width: '200px' },
  { field: 'department', title: 'Department', width: '120px' },
  // Status defined last but will appear first due to frozen: true
  { field: 'status', title: 'Status', width: '100px', frozen: true }
];

// Visual order will be: Row Numbers → Status → ID → Name → ...`}
				languageType="javascript"
				titleText="Column-Level Frozen"
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
							<td><code>showRowNumbers</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Show row number column on the left</td>
						</tr>
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
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>frozen</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Mark column as frozen (moves to left automatically)</td>
						</tr>
						<tr>
							<td><code>width</code></td>
							<td><code>string</code></td>
							<td>-</td>
							<td>Explicit width recommended for frozen columns</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Best Practices -->
		<section class="mb-5">
			<div class="alert alert-secondary">
				<h5>Best Practices</h5>
				<ul class="mb-0">
					<li><strong>Explicit widths:</strong> Always set explicit widths on frozen columns for consistent behavior</li>
					<li><strong>Shadow indicator:</strong> A subtle shadow appears on the right edge of frozen columns when scrolling</li>
					<li><strong>Frozen columns cannot be reordered:</strong> Drag-to-reorder is disabled for frozen columns</li>
					<li><strong>Row numbers:</strong> When <code>stickyRowNumbers</code> is enabled, row numbers are always frozen regardless of <code>freezeColumns</code></li>
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
