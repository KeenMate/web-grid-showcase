<script lang="ts">
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let grid: any = $state(null);
	let hiddenFields: string[] = $state([]);

	const sampleData = [
		{ id: 1847, name: 'Alice Johnson', email: 'alice@example.com', department: 'Engineering', salary: 85000, location: 'New York', phone: '555-0101' },
		{ id: 2391, name: 'Bob Smith', email: 'bob@example.com', department: 'Marketing', salary: 72000, location: 'Los Angeles', phone: '555-0102' },
		{ id: 1052, name: 'Carol Williams', email: 'carol@example.com', department: 'Engineering', salary: 92000, location: 'New York', phone: '555-0103' },
		{ id: 3764, name: 'David Brown', email: 'david@example.com', department: 'Sales', salary: 68000, location: 'Chicago', phone: '555-0104' },
		{ id: 2908, name: 'Eva Martinez', email: 'eva@example.com', department: 'HR', salary: 65000, location: 'Miami', phone: '555-0105' },
		{ id: 1523, name: 'Frank Lee', email: 'frank@example.com', department: 'Engineering', salary: 88000, location: 'New York', phone: '555-0106' },
		{ id: 4281, name: 'Grace Kim', email: 'grace@example.com', department: 'Marketing', salary: 75000, location: 'Los Angeles', phone: '555-0107' },
		{ id: 3156, name: 'Henry Chen', email: 'henry@example.com', department: 'Sales', salary: 71000, location: 'Chicago', phone: '555-0108' }
	];

	const columns: any[] = [
		{ field: 'id', title: 'ID', width: '70px', horizontalAlign: 'center' },
		{ field: 'name', title: 'Name', width: '160px' },
		{ field: 'email', title: 'Email', width: '200px' },
		{ field: 'department', title: 'Department', width: '140px' },
		{ field: 'salary', title: 'Salary', width: '110px', horizontalAlign: 'right', formatCallback: (v: number) => v != null ? `$${v.toLocaleString()}` : '' },
		{ field: 'location', title: 'Location', width: '130px' },
		{ field: 'phone', title: 'Phone', width: '120px' }
	];

	function syncHiddenState() {
		if (!grid) return;
		hiddenFields = grid.columns
			.filter((c: any) => c.isHidden)
			.map((c: any) => String(c.field));
	}

	function toggleColumn(field: string) {
		if (!grid) return;
		const col = grid.columns.find((c: any) => String(c.field) === field);
		if (!col) return;
		col.isHidden = !col.isHidden;
		grid.columns = [...grid.columns];
		syncHiddenState();
	}

	function showAll() {
		if (!grid) return;
		grid.columns.forEach((c: any) => (c.isHidden = false));
		grid.columns = [...grid.columns];
		syncHiddenState();
	}

	function hideAllExceptFirst() {
		if (!grid) return;
		grid.columns.forEach((c: any, i: number) => (c.isHidden = i > 0));
		grid.columns = [...grid.columns];
		syncHiddenState();
	}

	onMount(async () => {
		await import('@keenmate/web-grid');
		if (grid) {
			grid.items = [...sampleData];
			grid.columns = columns;
			grid.isStriped = true;
			grid.isHoverable = true;
			grid.isRowNumbersVisible = true;
			grid.sortMode = 'single';
			grid.headerContextMenu = [
				'sortAsc',
				'sortDesc',
				'clearSort',
				{ dividerBefore: true },
				'hideColumn',
				'columnVisibility'
			];
		}

		// The grid has no dedicated event for visibility changes, so we sync
		// after any click inside the grid (catches context menu actions).
		grid?.addEventListener('click', () => setTimeout(syncHiddenState, 0));
	});
</script>

<DocLayout
	titleText="Column Visibility"
	descriptionText="Hide and show columns via the header context menu or programmatically">

	<div class="py-4">
		<section class="mb-5">
			<h2 class="mb-3">Overview</h2>
			<p class="lead">
				Columns can be hidden with the <code>isHidden</code> flag. The grid ships with built-in header menu
				items — <code>'hideColumn'</code> (hide the right-clicked column) and <code>'columnVisibility'</code>
				(submenu with a toggle per column) — or you can drive it entirely from code.
			</p>
		</section>

		<section class="mb-5">
			<h2 class="mb-4">CV01 Interactive Demo</h2>
			<p>Right-click any header for the <strong>Hide Column</strong> or <strong>Column Visibility</strong> menu, or use the buttons below.</p>

			<div class="mb-3 d-flex flex-wrap gap-2 align-items-center">
				<button class="btn btn-sm btn-outline-primary" onclick={showAll}>Show All</button>
				<button class="btn btn-sm btn-outline-secondary" onclick={hideAllExceptFirst}>Hide All Except First</button>

				<div class="ms-3 d-flex flex-wrap gap-2">
					{#each columns as col (col.field)}
						{@const isHidden = hiddenFields.includes(String(col.field))}
						<button
							class="btn btn-sm {isHidden ? 'btn-outline-secondary' : 'btn-outline-primary'}"
							onclick={() => toggleColumn(String(col.field))}
							title={isHidden ? 'Show column' : 'Hide column'}
						>
							{isHidden ? '☐' : '☑'} {col.title}
						</button>
					{/each}
				</div>
			</div>

			<div class="demo-container mb-3">
				<web-grid bind:this={grid} style="max-width: 100%; max-height: 320px;"></web-grid>
			</div>

			<div class="alert alert-info">
				<strong>Hidden columns:</strong>
				{#if hiddenFields.length === 0}
					<em class="text-muted">None</em>
				{:else}
					{#each hiddenFields as field}
						<code class="ms-1">{field}</code>
					{/each}
				{/if}
			</div>
		</section>

		<section class="mb-5">
			<h2 class="mb-4">CV02 Context Menu</h2>
			<p>Add the predefined items to <code>headerContextMenu</code>:</p>

			<CodeBlock
				codeContent={`grid.headerContextMenu = [
  'sortAsc',
  'sortDesc',
  'clearSort',
  { dividerBefore: true },
  'hideColumn',         // hide the right-clicked column
  'columnVisibility'    // submenu: toggle any column, plus "Show all"
];`}
				languageType="javascript"
				titleText="Enabling the Menu"
			/>

			<p class="mt-3">
				The <code>'columnVisibility'</code> submenu is built dynamically from the current columns. Each entry
				shows <code>☐</code> / <code>☑</code> based on <code>column.isHidden</code>.
			</p>
		</section>

		<section class="mb-5">
			<h2 class="mb-4">CV03 Programmatic API</h2>
			<p>Mutate <code>column.isHidden</code> and reassign the array to trigger a re-render:</p>

			<CodeBlock
				codeContent={`// Hide a specific column
const email = grid.columns.find(c => c.field === 'email');
email.isHidden = true;
grid.columns = [...grid.columns];  // reassign to trigger re-render

// Show everything
grid.columns.forEach(c => c.isHidden = false);
grid.columns = [...grid.columns];

// Toggle one column
function toggle(field) {
  const col = grid.columns.find(c => c.field === field);
  col.isHidden = !col.isHidden;
  grid.columns = [...grid.columns];
}`}
				languageType="javascript"
				titleText="Toggle Visibility from Code"
			/>

			<div class="alert alert-warning mt-3">
				<strong>Why reassign?</strong> The grid tracks changes via the <code>columns</code> setter. Mutating a column in place won't
				trigger a render — spreading the array (<code>[...grid.columns]</code>) and reassigning does.
			</div>
		</section>

		<section class="mb-5">
			<h2 class="mb-4">API Reference</h2>
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr><th>Property</th><th>Type</th><th>Description</th></tr>
					</thead>
					<tbody>
						<tr>
							<td><code>column.isHidden</code></td>
							<td><code>boolean</code></td>
							<td>Hide a column while keeping it in the <code>columns</code> array so visibility toggles can still reference it.</td>
						</tr>
						<tr>
							<td><code>grid.headerContextMenu</code></td>
							<td><code>(string | object)[]</code></td>
							<td>Predefined items and custom entries. Include <code>'hideColumn'</code> and/or <code>'columnVisibility'</code> to expose visibility control.</td>
						</tr>
						<tr>
							<td><code>'hideColumn'</code></td>
							<td><code>string</code></td>
							<td>Predefined menu item — hides the column the menu was opened on.</td>
						</tr>
						<tr>
							<td><code>'columnVisibility'</code></td>
							<td><code>string</code></td>
							<td>Predefined submenu — auto-generates one toggle per column plus a <em>Show all</em> row.</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	</div>
</DocLayout>
