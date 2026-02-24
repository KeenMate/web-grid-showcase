<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let basicFilterGrid: any;
	let perColumnGrid: any;

	const employees = [
		{ id: 1, name: 'Alice Johnson', department: 'Engineering', salary: 95000, email: 'alice@example.com' },
		{ id: 2, name: 'Bob Smith', department: 'Marketing', salary: 72000, email: 'bob@example.com' },
		{ id: 3, name: 'Charlie Brown', department: 'Engineering', salary: 88000, email: 'charlie@example.com' },
		{ id: 4, name: 'Diana Ross', department: 'Sales', salary: 67000, email: 'diana@example.com' },
		{ id: 5, name: 'Eve Wilson', department: 'HR', salary: 65000, email: 'eve@example.com' },
		{ id: 6, name: 'Frank Miller', department: 'Engineering', salary: 92000, email: 'frank@example.com' },
		{ id: 7, name: 'Grace Lee', department: 'Marketing', salary: 78000, email: 'grace@example.com' },
		{ id: 8, name: 'Henry Davis', department: 'Sales', salary: 71000, email: 'henry@example.com' }
	];

	const columns = [
		{ field: 'id', title: 'ID', width: '60px' },
		{ field: 'name', title: 'Name', width: '150px' },
		{ field: 'email', title: 'Email', width: '180px' },
		{ field: 'department', title: 'Department', width: '120px' },
		{ field: 'salary', title: 'Salary', width: '100px', horizontalAlign: 'right', formatCallback: (v: number) => '$' + v?.toLocaleString() }
	];

	const perColumnColumns = [
		{ field: 'id', title: 'ID', width: '60px', isFilterable: false },
		{ field: 'name', title: 'Name', width: '150px' },
		{ field: 'email', title: 'Email', width: '180px' },
		{ field: 'department', title: 'Department', width: '120px' },
		{ field: 'salary', title: 'Salary', width: '100px', horizontalAlign: 'right', isFilterable: false, formatCallback: (v: number) => '$' + v?.toLocaleString() }
	];

	onMount(async () => {
		await import('@keenmate/web-grid');

		// FI01: Basic Filtering
		if (basicFilterGrid) {
			basicFilterGrid.columns = columns;
			basicFilterGrid.items = employees;
			basicFilterGrid.isFilterable = true;
			basicFilterGrid.isHoverable = true;
			basicFilterGrid.isStriped = true;
		}

		// FI02: Per-Column Filtering
		if (perColumnGrid) {
			perColumnGrid.columns = perColumnColumns;
			perColumnGrid.items = employees;
			perColumnGrid.isFilterable = true;
			perColumnGrid.isHoverable = true;
			perColumnGrid.isStriped = true;
		}
	});
</script>

<DocLayout
	titleText="Filtering"
	descriptionText="Filter grid data with text inputs below column headers">

	<div class="py-4">
		<!-- FI01: Basic Filtering -->
		<ShowcaseSection
			titleText="FI01 Basic Filtering"
			subtitleText="Enable text filter inputs below column headers"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Description">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={basicFilterGrid}
						style="max-height: 400px;"
					></web-grid>
					<p class="small text-muted mt-2">Type in any filter input to filter rows. Try typing "eng" in the Department filter.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Enable filtering for the whole grid
grid.isFilterable = true;

// Filtering is case-insensitive
// and matches substrings
// e.g. "eng" matches "Engineering"

// Filters work with sorting and
// pagination — filtered results
// are sorted, then paginated`}
					languageType="javascript"
					titleText="Basic Filtering"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>How It Works</h5>
					<p>Setting <code>isFilterable = true</code> adds a row of text inputs below the column headers.</p>
					<ul>
						<li><strong>Case-insensitive</strong> substring matching</li>
						<li>Values are converted to strings before comparison</li>
						<li>Multiple column filters combine with <strong>AND</strong> logic</li>
						<li>Empty filter inputs match all rows</li>
					</ul>
					<h5>Data Pipeline</h5>
					<p>Items flow through: <code>items</code> &rarr; <code>filter</code> &rarr; <code>sort</code> &rarr; <code>paginate</code></p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- FI02: Per-Column Filtering -->
		<ShowcaseSection
			titleText="FI02 Per-Column Control"
			subtitleText="Enable or disable filtering on individual columns"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Description">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={perColumnGrid}
						style="max-height: 400px;"
					></web-grid>
					<p class="small text-muted mt-2">ID and Salary columns have filtering disabled. Only Name, Email, and Department can be filtered.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`grid.isFilterable = true;

grid.columns = [
  {
    field: 'id',
    title: 'ID',
    isFilterable: false  // No filter input
  },
  {
    field: 'name',
    title: 'Name'
    // Inherits grid-level isFilterable
  },
  {
    field: 'salary',
    title: 'Salary',
    isFilterable: false  // No filter input
  }
];`}
					languageType="javascript"
					titleText="Per-Column isFilterable"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Column-Level Control</h5>
					<p>Use <code>isFilterable: false</code> on a column to hide its filter input while keeping other columns filterable.</p>
					<p>This is useful for:</p>
					<ul>
						<li>ID columns where filtering doesn't make sense</li>
						<li>Numeric columns where substring matching isn't helpful</li>
						<li>Action or display-only columns</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Styling -->
		<section class="mb-5">
			<h2 class="mb-4">Styling Filter Inputs</h2>
			<p>Filter inputs can be customized with CSS variables:</p>

			<CodeBlock
				codeContent={`/* Customize filter input appearance */
web-grid {
  --wg-filter-input-padding: 0.4rem 0.8rem;
  --wg-filter-input-bg: var(--wg-input-bg);
  --wg-filter-input-border: 1px solid #ccc;
  --wg-filter-input-border-focus: 1px solid #0078d4;
  --wg-filter-input-border-radius: 4px;
  --wg-filter-input-font-size: 0.85rem;
}`}
				languageType="css"
				titleText="CSS Variables"
			/>
		</section>

		<!-- API Reference -->
		<section class="mb-5">
			<h2 class="mb-4">API Reference</h2>
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr><th>Property</th><th>Level</th><th>Type</th><th>Default</th><th>Description</th></tr>
					</thead>
					<tbody>
						<tr>
							<td><code>isFilterable</code></td>
							<td>Grid</td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Show filter text inputs below column headers</td>
						</tr>
						<tr>
							<td><code>isFilterable</code></td>
							<td>Column</td>
							<td><code>boolean</code></td>
							<td>inherits</td>
							<td>Override grid-level filtering for a specific column. Set to <code>false</code> to hide the filter input.</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Notes -->
		<section class="mb-5">
			<div class="alert alert-secondary">
				<h5>Notes</h5>
				<ul class="mb-0">
					<li>Filtering is <strong>client-side only</strong> &mdash; all items must be loaded in the grid</li>
					<li>Filters use <strong>case-insensitive substring</strong> matching on the string representation of each value</li>
					<li>Multiple column filters are combined with <strong>AND</strong> logic (all must match)</li>
					<li>Filtering integrates with <strong>sorting</strong> and <strong>pagination</strong> &mdash; filtered results are sorted, then paginated</li>
				</ul>
			</div>
		</section>
	</div>
</DocLayout>

<style>
	.grid-demo {
		border: 1px solid var(--bs-border-color);
		border-radius: 0.375rem;
	}
</style>
