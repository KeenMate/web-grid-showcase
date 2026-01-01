<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let singleSortGrid: any;
	let multiSortGrid: any;

	const employees = [
		{ id: 1, name: 'Alice Johnson', department: 'Engineering', salary: 95000, hireDate: '2020-03-15' },
		{ id: 2, name: 'Bob Smith', department: 'Marketing', salary: 72000, hireDate: '2019-07-22' },
		{ id: 3, name: 'Charlie Brown', department: 'Engineering', salary: 88000, hireDate: '2021-01-10' },
		{ id: 4, name: 'Diana Ross', department: 'Sales', salary: 67000, hireDate: '2022-05-03' },
		{ id: 5, name: 'Eve Wilson', department: 'Engineering', salary: 105000, hireDate: '2018-11-28' },
		{ id: 6, name: 'Frank Miller', department: 'Marketing', salary: 78000, hireDate: '2020-09-14' },
		{ id: 7, name: 'Grace Lee', department: 'Sales', salary: 82000, hireDate: '2019-04-07' }
	];

	onMount(() => {
		const columns = [
			{ field: 'id', title: 'ID', width: '60px', sortable: true },
			{ field: 'name', title: 'Name', width: '150px', sortable: true },
			{ field: 'department', title: 'Department', width: '120px', sortable: true },
			{ field: 'salary', title: 'Salary', width: '100px', sortable: true, align: 'right', formatCallback: (v: number) => '$' + v.toLocaleString() },
			{ field: 'hireDate', title: 'Hire Date', width: '110px', sortable: true }
		];

		if (singleSortGrid) {
			singleSortGrid.columns = columns;
			singleSortGrid.items = employees;
			singleSortGrid.sortable = true;
		}

		if (multiSortGrid) {
			multiSortGrid.columns = columns;
			multiSortGrid.items = employees;
			multiSortGrid.sortable = true;
		}
	});
</script>

<DocLayout
	titleText="Sorting"
	descriptionText="Single and multi-column sorting with visual indicators">

	<div class="py-4">
		<!-- Single Column Sort -->
		<ShowcaseSection
			titleText="Single Column Sort"
			subtitleText="Click column headers to sort"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="How It Works"
			descriptionColumnTitle="Code">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={singleSortGrid}
						style="max-height: 350px;"
					></web-grid>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<div class="prose small">
					<h5>Click Behavior</h5>
					<p>Click any column header to sort:</p>
					<ul class="small">
						<li>First click: Ascending order</li>
						<li>Second click: Descending order</li>
						<li>Third click: Remove sort</li>
					</ul>
					<h5>Visual Indicators</h5>
					<p>Sorted columns show arrow indicators in the header.</p>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<CodeBlock
					codeContent={`// Enable sorting globally
grid.sortable = true;

// Or per-column
grid.columns = [
  { field: 'name', title: 'Name', sortable: true },
  { field: 'email', title: 'Email', sortable: false },
  { field: 'salary', title: 'Salary', sortable: true }
];`}
					languageType="javascript"
					titleText="Enable Sorting"
				/>
			{/snippet}
		</ShowcaseSection>

		<!-- Multi-Column Sort -->
		<ShowcaseSection
			titleText="Multi-Column Sort"
			subtitleText="Ctrl+Click to add columns to sort order"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="How It Works"
			descriptionColumnTitle="Code">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={multiSortGrid}
						style="max-height: 350px;"
					></web-grid>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<div class="prose small">
					<h5>Multi-Column Sorting</h5>
					<p><strong>Ctrl+Click</strong> headers to add columns to sort:</p>
					<ul class="small">
						<li>First column is primary sort</li>
						<li>Second column breaks ties</li>
						<li>And so on...</li>
					</ul>
					<h5>Priority Indicators</h5>
					<p>Numbers show sort priority (e.g., Name 1, Salary 2)</p>
					<h5>Clear All</h5>
					<p>Regular click clears multi-sort and starts fresh.</p>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<CodeBlock
					codeContent={`// Access current sort state
grid.ondatarequest = (e) => {
  console.log('Sort:', e.sort);
  // e.sort = [
  //   { column: 'department', direction: 'asc' },
  //   { column: 'salary', direction: 'desc' }
  // ]
};

// Set initial sort programmatically
grid.sort = [
  { column: 'department', direction: 'asc' },
  { column: 'salary', direction: 'desc' }
];`}
					languageType="javascript"
					titleText="Sort State"
				/>
			{/snippet}
		</ShowcaseSection>

		<!-- Server-Side Sorting -->
		<ShowcaseSection
			titleText="Server-Side Sorting"
			subtitleText="Handle sorting on the server"
			demoColumnTitle="Explanation"
			controlsColumnTitle="Event Details"
			descriptionColumnTitle="Code">

			{#snippet demoContent()}
				<div class="prose">
					<p>For large datasets, you may want to sort data on the server rather than client-side.</p>
					<p>The <code>ondatarequest</code> event fires whenever the user changes sort order, allowing you to:</p>
					<ul>
						<li>Fetch sorted data from an API</li>
						<li>Apply sort parameters to database queries</li>
						<li>Implement custom sort logic</li>
					</ul>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<div class="prose small">
					<h5>Event Properties</h5>
					<p><code>e.sort</code> - Array of sort columns</p>
					<p><code>e.trigger</code> - What caused the event ('sort', 'page', etc.)</p>
					<p><code>e.page</code> - Current page number</p>
					<p><code>e.pageSize</code> - Items per page</p>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<CodeBlock
					codeContent={`grid.ondatarequest = async (e) => {
  if (e.trigger === 'sort') {
    // Build query params from sort state
    const params = new URLSearchParams();
    e.sort.forEach((s, i) => {
      params.set(\`sort[\${i}]\`, \`\${s.column}:\${s.direction}\`);
    });

    // Fetch sorted data
    const response = await fetch(\`/api/data?\${params}\`);
    const data = await response.json();

    // Update grid
    grid.items = data.items;
  }
};`}
					languageType="javascript"
					titleText="Server-Side Handler"
				/>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
