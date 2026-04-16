<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let hybridGrid: any;
	let interactiveGrid: any = $state(null);

	// Interactive demo state
	let mode: 'container' | 'full' = $state('container');
	let isPageable = $state(false);
	let height = $state(350);
	let rowCount = $state(40);

	const firstNames = ['Alice', 'Bob', 'Carol', 'David', 'Eva', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack', 'Karen', 'Leo', 'Mia', 'Noah', 'Olivia', 'Paul', 'Quinn', 'Rita', 'Sam', 'Tina'];
	const lastNames = ['Johnson', 'Smith', 'Williams', 'Brown', 'Martinez', 'Lee', 'Kim', 'Chen', 'Wang', 'Davis', 'Wilson', 'Garcia', 'Taylor', 'Anderson'];
	const depts = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Design', 'Support'];
	const statuses = ['Active', 'On Leave', 'Inactive'];

	function buildRows(count: number) {
		const rows: any[] = [];
		for (let i = 0; i < count; i++) {
			const first = firstNames[i % firstNames.length];
			const last = lastNames[(i * 3) % lastNames.length];
			rows.push({
				id: 1000 + i,
				name: `${first} ${last}`,
				email: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
				department: depts[i % depts.length],
				salary: 55000 + (i * 1371) % 55000,
				status: statuses[i % statuses.length]
			});
		}
		return rows;
	}

	const interactiveColumns = [
		{ field: 'id', title: 'ID', width: '70px', horizontalAlign: 'center' },
		{ field: 'name', title: 'Name', width: '160px' },
		{ field: 'email', title: 'Email', width: '220px' },
		{ field: 'department', title: 'Department', width: '140px' },
		{ field: 'salary', title: 'Salary', width: '110px', horizontalAlign: 'right', formatCallback: (v: number) => v != null ? `$${v.toLocaleString()}` : '' },
		{ field: 'status', title: 'Status', width: '110px' }
	];

	const employees = [
		{ id: 1, name: 'Alice Johnson', department: 'Engineering', salary: 95000 },
		{ id: 2, name: 'Bob Smith', department: 'Marketing', salary: 72000 },
		{ id: 3, name: 'Charlie Brown', department: 'Engineering', salary: 88000 },
		{ id: 4, name: 'Diana Ross', department: 'Sales', salary: 67000 },
		{ id: 5, name: 'Eve Wilson', department: 'HR', salary: 65000 },
		{ id: 6, name: 'Frank Miller', department: 'Engineering', salary: 92000 },
		{ id: 7, name: 'Grace Lee', department: 'Marketing', salary: 78000 },
		{ id: 8, name: 'Henry Davis', department: 'Sales', salary: 71000 },
		{ id: 9, name: 'Ivy Chen', department: 'Engineering', salary: 96000 },
		{ id: 10, name: 'Jack Taylor', department: 'Finance', salary: 85000 },
		{ id: 11, name: 'Karen White', department: 'HR', salary: 68000 },
		{ id: 12, name: 'Leo Martinez', department: 'Engineering', salary: 91000 }
	];

	const columns = [
		{ field: 'id', title: 'ID', width: '60px' },
		{ field: 'name', title: 'Name', width: '150px' },
		{ field: 'department', title: 'Department', width: '120px' },
		{ field: 'salary', title: 'Salary', width: '100px', horizontalAlign: 'right', formatCallback: (v: number) => '$' + v.toLocaleString() }
	];

	$effect(() => {
		if (!interactiveGrid) return;
		if (mode === 'container') {
			interactiveGrid.style.maxHeight = `${height}px`;
			interactiveGrid.style.height = '';
			interactiveGrid.tableBorderOnly = false;
		} else {
			interactiveGrid.style.height = '100%';
			interactiveGrid.style.maxHeight = '';
			interactiveGrid.tableBorderOnly = true;
		}
	});

	$effect(() => {
		if (!interactiveGrid) return;
		interactiveGrid.items = buildRows(rowCount);
	});

	$effect(() => {
		if (!interactiveGrid) return;
		interactiveGrid.isPageable = isPageable;
	});

	const wideColumns = [
		{ field: 'id', title: 'ID', width: '80px' },
		{ field: 'name', title: 'Full Name', width: '200px' },
		{ field: 'department', title: 'Department', width: '150px' },
		{ field: 'salary', title: 'Annual Salary', width: '150px', horizontalAlign: 'right', formatCallback: (v: number) => '$' + v.toLocaleString() },
		{ field: 'department', title: 'Division', width: '150px' },
		{ field: 'name', title: 'Manager', width: '200px' }
	];

	onMount(async () => {
		await import('@keenmate/web-grid');

		// Interactive demo grid
		if (interactiveGrid) {
			interactiveGrid.columns = interactiveColumns;
			interactiveGrid.pageSize = 10;
			interactiveGrid.paginationPosition = 'top-center|bottom-center';
			interactiveGrid.isStriped = true;
			interactiveGrid.isHoverable = true;
			interactiveGrid.isRowNumbersVisible = true;
			interactiveGrid.sortMode = 'single';
		}

		// Hybrid grid (max-width only, wide columns)
		if (hybridGrid) {
			hybridGrid.columns = wideColumns;
			hybridGrid.items = employees;
			hybridGrid.isPageable = true;
			hybridGrid.pageSize = 5;
			hybridGrid.paginationPosition = 'top-left|bottom-left';
		}
	});
</script>

<DocLayout
	titleText="Scroll Modes"
	descriptionText="Control whether grid uses its own scrollbar or the page scrollbar">

	<div class="py-4">
		<!-- Interactive Height Modes -->
		<ShowcaseSection
			titleText="SM01 Interactive Demo"
			subtitleText="Toggle between container and full-height modes live"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="How it works">

			{#snippet demoContent()}
				<div class="grid-demo">
					<div class="d-flex flex-wrap gap-3 align-items-center mb-3">
						<div class="btn-group btn-group-sm" role="group">
							<button
								type="button"
								class="btn {mode === 'container' ? 'btn-primary' : 'btn-outline-primary'}"
								onclick={() => (mode = 'container')}
							>Container</button>
							<button
								type="button"
								class="btn {mode === 'full' ? 'btn-primary' : 'btn-outline-primary'}"
								onclick={() => (mode = 'full')}
							>Full Height</button>
						</div>

						<div class="form-check form-check-inline mb-0">
							<input class="form-check-input" type="checkbox" id="sm00Pager" bind:checked={isPageable} />
							<label class="form-check-label small" for="sm00Pager">Pager</label>
						</div>

						<label class="small d-flex align-items-center gap-1 mb-0" style="opacity: {mode === 'container' ? 1 : 0.4};">
							Height:
							<input
								type="number"
								class="form-control form-control-sm"
								style="width: 80px;"
								min="100"
								max="900"
								step="25"
								bind:value={height}
								disabled={mode !== 'container'}
							/>
							px
						</label>

						<label class="small d-flex align-items-center gap-1 mb-0">
							Rows:
							<input
								type="number"
								class="form-control form-control-sm"
								style="width: 80px;"
								min="0"
								max="500"
								step="5"
								bind:value={rowCount}
							/>
						</label>
					</div>

					<web-grid bind:this={interactiveGrid}></web-grid>

					<p class="small text-muted mt-2">
						{#if mode === 'container'}
							Grid caps at <strong>{height}px</strong> and scrolls internally when content exceeds it.
						{:else}
							Grid sizes to its full content — the page scroll handles overflow. <code>tableBorderOnly = true</code> removes the outer scroll container so wheel events pass through to the page.
						{/if}
					</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={mode === 'container'
						? `<!-- Container mode: self-contained scroll -->\n<web-grid style="max-height: ${height}px">\n</web-grid>`
						: `<!-- Full Height mode: page handles scroll -->\n<web-grid style="height: 100%">\n</web-grid>\n\ngrid.tableBorderOnly = true`}
					languageType="html"
					titleText={mode === 'container' ? 'Container Mode' : 'Full Height Mode'}
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Container</h5>
					<p>Grid caps itself with a pixel <code>max-height</code>. The shadow DOM's <code>.wg</code> uses <code>max-height: inherit</code>, so the host constraint propagates into the scroll container.</p>

					<h5>Full Height</h5>
					<p><code>height: 100%</code> against an unbounded parent resolves to <code>auto</code>, so the grid sizes to its content and the page layout grows to wrap it.</p>
					<p><code>tableBorderOnly = true</code> moves the scroll container to <code>.wg__table-container</code> and leaves the outer <code>.wg</code> with <code>overflow: visible</code>. Side effect: wheel events are no longer captured by the grid, so page scroll works naturally over it.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Hybrid Mode -->
		<ShowcaseSection
			titleText="SM02 Hybrid Mode"
			subtitleText="Horizontal grid scrollbar with vertical page scrollbar for wide tables"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="When to Use">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={hybridGrid}
						style="max-width: 400px;"
					></web-grid>
					<p class="small text-muted mt-2">Wide table with horizontal scroll. Vertical uses page scroll.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Constrain width only -->
<web-grid style="max-width: 100%;">
</web-grid>

/* Result:
   - Horizontal: grid scrollbar
     (columns wider than container)
   - Vertical: page scrollbar
     (no height constraint)

   Good for wide tables that should
   feel like native page content.
*/`}
					languageType="html"
					titleText="Hybrid Mode"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Best For</h5>
					<p>Wide data tables with many columns in content-focused pages.</p>
					<h5>Benefits</h5>
					<p>Horizontal scroll contained to grid.</p>
					<p>Vertical scroll feels native.</p>
					<h5>Common Pattern</h5>
					<p>Use <code>max-width: 100%</code> to fit container width while allowing horizontal scroll for wide content.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Summary -->
		<div class="mt-5">
			<h2 class="mb-4">Quick Reference</h2>
			<div class="row g-4">
				<div class="col-12">
					<table class="table table-sm">
						<thead>
							<tr>
								<th>Mode</th>
								<th>CSS</th>
								<th>Vertical Scroll</th>
								<th>Horizontal Scroll</th>
								<th>Use Case</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><strong>Container</strong></td>
								<td><code>max-height: 300px</code></td>
								<td>Grid</td>
								<td>Grid</td>
								<td>Widgets, modals, fixed layouts</td>
							</tr>
							<tr>
								<td><strong>Page</strong></td>
								<td><em>(none)</em></td>
								<td>Page</td>
								<td>Page</td>
								<td>Full-page tables, main content</td>
							</tr>
							<tr>
								<td><strong>Hybrid</strong></td>
								<td><code>max-width: 100%</code></td>
								<td>Page</td>
								<td>Grid</td>
								<td>Wide tables in content pages</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>

		<!-- Additional Scroll Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Additional Properties</h2>
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr><th>Property</th><th>Type</th><th>Default</th><th>Description</th></tr>
					</thead>
					<tbody>
						<tr>
							<td><code>isScrollable</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Constrain grid height to viewport. Enables vertical scrolling within a calculated max-height.</td>
						</tr>
						<tr>
							<td><code>scrollMaxHeight</code></td>
							<td><code>string</code></td>
							<td>-</td>
							<td>Custom max-height for the grid container (e.g., <code>'500px'</code>, <code>'80vh'</code>).</td>
						</tr>
						<tr>
							<td><code>tableBorderOnly</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Only show border around the table, not the outer container (pagination/toolbar area).</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	</div>
</DocLayout>
