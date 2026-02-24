<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let singleSortGrid: any;
	let multiSortGrid: any;
	let serverSortGrid: any;
	let presortedGrid: any;
	let consoleOutput: string[] = $state([]);

	const employees = [
		{ id: 1, name: 'Alice Johnson', department: 'Engineering', salary: 95000, hireDate: '2020-03-15' },
		{ id: 2, name: 'Bob Smith', department: 'Marketing', salary: 72000, hireDate: '2019-07-22' },
		{ id: 3, name: 'Charlie Brown', department: 'Engineering', salary: 88000, hireDate: '2021-01-10' },
		{ id: 4, name: 'Diana Ross', department: 'Sales', salary: 67000, hireDate: '2022-05-03' },
		{ id: 5, name: 'Eve Wilson', department: 'Engineering', salary: 105000, hireDate: '2018-11-28' },
		{ id: 6, name: 'Frank Miller', department: 'Marketing', salary: 78000, hireDate: '2020-09-14' },
		{ id: 7, name: 'Grace Lee', department: 'Sales', salary: 82000, hireDate: '2019-04-07' }
	];

	function log(message: string) {
		const timestamp = new Date().toLocaleTimeString();
		consoleOutput = [`[${timestamp}] ${message}`, ...consoleOutput.slice(0, 9)];
	}

	function clearConsole() {
		consoleOutput = [];
	}

	onMount(async () => {
		await import('@keenmate/web-grid');
		const columns = [
			{ field: 'id', title: 'ID', width: '60px' },
			{ field: 'name', title: 'Name', width: '150px' },
			{ field: 'department', title: 'Department', width: '120px' },
			{ field: 'salary', title: 'Salary', width: '100px', horizontalAlign: 'right', formatCallback: (v: number) => '$' + v.toLocaleString() },
			{ field: 'hireDate', title: 'Hire Date', width: '110px' }
		];

		if (singleSortGrid) {
			singleSortGrid.columns = columns;
			singleSortGrid.items = employees;
			singleSortGrid.sortMode = 'single';
		}

		if (multiSortGrid) {
			multiSortGrid.columns = columns;
			multiSortGrid.items = employees;
			multiSortGrid.sortMode = 'multi';
		}

		if (serverSortGrid) {
			serverSortGrid.columns = columns;
			serverSortGrid.items = employees;
			serverSortGrid.sortMode = 'multi';
			serverSortGrid.ondatarequest = (e: any) => {
				if (e.trigger === 'sort') {
					if (e.sort.length === 0) {
						log('ondatarequest: sort cleared');
					} else {
						const sortDesc = e.sort.map((s: any) => `${s.column}:${s.direction}`).join(', ');
						log(`ondatarequest: sort=[${sortDesc}]`);
					}
				}
			};
		}

		if (presortedGrid) {
			// Simulate data coming pre-sorted from database (by department asc, then salary desc)
			const presortedEmployees = [...employees].sort((a, b) => {
				const deptCompare = a.department.localeCompare(b.department);
				if (deptCompare !== 0) return deptCompare;
				return b.salary - a.salary; // desc
			});

			presortedGrid.columns = columns;
			presortedGrid.items = presortedEmployees;
			presortedGrid.sortMode = 'multi';

			// Set sort state to show indicators (data is already sorted, grid won't re-sort)
			presortedGrid.sort = [
				{ column: 'department', direction: 'asc' },
				{ column: 'salary', direction: 'desc' }
			];
		}
	});
</script>

<DocLayout
	titleText="Sorting"
	descriptionText="Single and multi-column sorting with sortMode property">

	<div class="py-4">
		<!-- Single Column Sort -->
		<ShowcaseSection
			titleText="SO01 Single Column Sort"
			subtitleText="Sort by one column with ascending/descending toggle"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="How It Works">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={singleSortGrid}
						style="max-height: 350px;"
					></web-grid>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Single column sorting
grid.sortMode = 'single';

// sortMode options:
// - 'none'   - Sorting disabled (default)
// - 'single' - One column at a time
// - 'multi'  - Multiple columns with Ctrl+Click

// Disable sorting for specific column
grid.columns = [
  { field: 'id', title: 'ID', isSortable: false },
  { field: 'name', title: 'Name' }
];`}
					languageType="javascript"
					titleText="Enable Sorting"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Sort Behavior</h5>
					<p>Click the sort indicator in column headers to sort:</p>
					<ul>
						<li>First click: Ascending order</li>
						<li>Second click: Descending order</li>
						<li>Third click: Remove sort</li>
					</ul>
					<h5>Single Mode</h5>
					<p>Only one column can be sorted at a time. Clicking a new column replaces the current sort.</p>
					<p>Ctrl+Click behaves the same as regular click.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Multi-Column Sort -->
		<ShowcaseSection
			titleText="SO02 Multi-Column Sort"
			subtitleText="Sort by multiple columns with Ctrl+Click and priority indicators"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="How It Works">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={multiSortGrid}
						style="max-height: 350px;"
					></web-grid>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Multi-column sorting
grid.sortMode = 'multi';

// Access current sort state
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

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Multi-Column Sorting</h5>
					<p><strong>Ctrl+Click</strong> headers to add columns to sort:</p>
					<ul>
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
		</ShowcaseSection>

		<!-- Server-Side Sorting -->
		<ShowcaseSection
			titleText="SO03 Server-Side Sorting"
			subtitleText="Handle sort changes via ondatarequest event for API integration"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Console Output">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={serverSortGrid}
						style="max-height: 300px;"
					></web-grid>
					<p class="small text-muted mt-2">Click column headers to see ondatarequest events. Try Ctrl+Click for multi-sort.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`grid.sortMode = 'multi';

grid.ondatarequest = (e) => {
  if (e.trigger === 'sort') {
    // e.sort contains current sort state
    console.log('Sort changed:', e.sort);
    // Output: [
    //   { column: 'name', direction: 'asc' },
    //   { column: 'salary', direction: 'desc' }
    // ]

    // For server-side sorting:
    const params = new URLSearchParams();
    e.sort.forEach((s, i) => {
      params.set(\`sort[\${i}]\`,
        \`\${s.column}:\${s.direction}\`);
    });

    // fetch(\`/api/data?\${params}\`)
    //   .then(res => res.json())
    //   .then(data => grid.items = data);
  }
};`}
					languageType="javascript"
					titleText="ondatarequest Handler"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="console-output">
					<div class="d-flex justify-content-between align-items-center mb-2">
						<h6 class="mb-0">Event Log</h6>
						<button class="btn btn-sm btn-outline-secondary" onclick={clearConsole}>Clear</button>
					</div>
					<div class="console-log" style="font-family: monospace; font-size: 12px; background: #1e1e1e; color: #d4d4d4; padding: 8px; border-radius: 4px; height: 180px; overflow-y: auto;">
						{#if consoleOutput.length === 0}
							<div class="text-muted">Click column headers to see events...</div>
						{:else}
							{#each consoleOutput as line}
								<div style="color: #9cdcfe;">{line}</div>
							{/each}
						{/if}
					</div>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Programmatic Sort State -->
		<ShowcaseSection
			titleText="SO04 Programmatic Sort State"
			subtitleText="Display sort indicators for pre-sorted server data"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="How It Works">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={presortedGrid}
						style="max-height: 350px;"
					></web-grid>
					<p class="small text-muted mt-2">Data pre-sorted by Department (asc), then Salary (desc). Sort indicators reflect this.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Option 1: Set on initialization
grid.items = presortedData;
grid.sortMode = 'multi';
grid.sort = [
  { column: 'department', direction: 'asc' },
  { column: 'salary', direction: 'desc' }
];

// Option 2: Set in data request callback
// (grid.sort is reactive - updates UI anytime)
grid.ondatarequest = async (e) => {
  const res = await fetch(\`/api?sort=\${e.sort}\`);
  const { data, meta } = await res.json();

  grid.items = data;
  grid.sort = meta.sort; // Update indicators
};`}
					languageType="javascript"
					titleText="Pre-sorted Data"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>When to Use</h5>
					<p>When data is sorted server-side:</p>
					<ul>
						<li>SQL ORDER BY clause</li>
						<li>API with sort parameters</li>
						<li>Cached sorted results</li>
					</ul>
					<h5>Reactive Property</h5>
					<p><code>grid.sort</code> is reactive:</p>
					<ul>
						<li>Set anytime (init or callback)</li>
						<li>UI updates immediately</li>
						<li>Does NOT re-sort data</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>
		<!-- Sort Behavior Notes -->
		<div class="mt-5">
			<h2 class="mb-4">Sort Behavior</h2>
			<div class="alert alert-info">
				<h5>Sort Indicator vs Header Click</h5>
				<p>Sorting is triggered by clicking the <strong>sort indicator</strong> (arrow icon) in the column header, not by clicking the header text itself.</p>
				<p>Clicking the header body now <strong>selects the column</strong> (when cell selection is enabled). This matches Excel behavior where headers are used for selection.</p>
			</div>

			<h4>Multi-Sort via Context Menu</h4>
			<p>You can also sort columns via the header context menu using predefined actions:</p>

			<CodeBlock
				codeContent={`grid.headerContextMenu = [
  'sortAsc',         // Sort ascending
  'sortDesc',        // Sort descending
  'clearSort',       // Remove sort from column
  'hideColumn',      // Hide column
  'columnVisibility' // Show/hide columns submenu
];`}
				languageType="javascript"
				titleText="Header Context Menu Sort Actions"
			/>
		</div>
	</div>
</DocLayout>
