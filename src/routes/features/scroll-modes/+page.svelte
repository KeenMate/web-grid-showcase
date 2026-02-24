<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let containerGrid: any;
	let pageGrid: any;
	let hybridGrid: any;

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

		// Container scroll grid (with max-height)
		if (containerGrid) {
			containerGrid.columns = columns;
			containerGrid.items = employees;
			containerGrid.isPageable = true;
			containerGrid.pageSize = 5;
			containerGrid.paginationPosition = 'top-left|bottom-left';
		}

		// Page scroll grid (no max-height, with pagination top+bottom)
		if (pageGrid) {
			pageGrid.columns = columns;
			pageGrid.items = employees;
			pageGrid.isPageable = true;
			pageGrid.pageSize = 5;
			pageGrid.paginationPosition = 'top-left|bottom-left';
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
		<!-- Container Scroll -->
		<ShowcaseSection
			titleText="SM01 Container Scroll"
			subtitleText="Self-contained grid with max-height and internal scrollbar"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="When to Use">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={containerGrid}
						style="max-height: 200px;"
					></web-grid>
					<p class="small text-muted mt-2">Grid with internal scrollbar. Scroll inside the grid.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Set max-height to constrain grid -->
<web-grid style="max-height: 300px;">
</web-grid>

/* How it works:
   .wg container uses:
   - max-height: inherit
   - overflow: auto

   This creates an internal scroll
   container for the grid content.
*/`}
					languageType="html"
					titleText="Container Scroll"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Best For</h5>
					<p>Dashboard widgets, modals, sidebars - anywhere grid needs a fixed height.</p>
					<h5>Benefits</h5>
					<p>Sticky headers stay visible while scrolling content.</p>
					<p>Grid is self-contained, doesn't affect page layout.</p>
					<h5>Note</h5>
					<p>This is the default/recommended mode for most use cases.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Page Scroll -->
		<ShowcaseSection
			titleText="SM02 Page Scroll"
			subtitleText="Full-height grid using browser's native page scrollbar"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="When to Use">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={pageGrid}
					></web-grid>
					<p class="small text-muted mt-2">Grid expands to full height. No internal scrollbar - use page scroll.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- No max-height = no internal scroll -->
<web-grid>
</web-grid>

/* How it works:
   Without max-height constraint,
   .wg has nothing to inherit.

   Grid expands to fit all content,
   page scrollbar handles overflow.
*/`}
					languageType="html"
					titleText="Page Scroll"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Best For</h5>
					<p>Full-page data tables where grid is the main content.</p>
					<h5>Benefits</h5>
					<p>Native page scroll feel - familiar UX.</p>
					<p>Works with browser's scroll restoration.</p>
					<p>Better for mobile - native momentum scrolling.</p>
					<h5>Trade-off</h5>
					<p>Headers scroll out of view (not sticky to viewport).</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Hybrid Mode -->
		<ShowcaseSection
			titleText="SM03 Hybrid Mode"
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
