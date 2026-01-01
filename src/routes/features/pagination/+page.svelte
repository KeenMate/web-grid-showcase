<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let basicPagination: any;
	let customPagination: any;

	// Generate sample data
	const generateData = (count: number) => {
		return Array.from({ length: count }, (_, i) => ({
			id: i + 1,
			name: `Employee ${i + 1}`,
			email: `employee${i + 1}@example.com`,
			department: ['Engineering', 'Marketing', 'Sales', 'HR'][i % 4],
			salary: 50000 + Math.floor(Math.random() * 50000)
		}));
	};

	const employees = generateData(50);

	onMount(() => {
		const columns = [
			{ field: 'id', title: 'ID', width: '60px' },
			{ field: 'name', title: 'Name', width: '150px' },
			{ field: 'email', title: 'Email' },
			{ field: 'department', title: 'Department', width: '120px' }
		];

		if (basicPagination) {
			basicPagination.columns = columns;
			basicPagination.items = employees;
			basicPagination.pageable = true;
			basicPagination.pageSize = 10;
		}

		if (customPagination) {
			customPagination.columns = columns;
			customPagination.items = employees;
			customPagination.pageable = true;
			customPagination.pageSize = 5;
			customPagination.pageSizes = [5, 10, 25, 50];
			customPagination.paginationPosition = 'bottom-right';
		}
	});
</script>

<DocLayout
	titleText="Pagination"
	descriptionText="Navigate through large datasets with page controls">

	<div class="py-4">
		<!-- Basic Pagination -->
		<ShowcaseSection
			titleText="Basic Pagination"
			subtitleText="Enable page navigation"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Configuration"
			descriptionColumnTitle="Code">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={basicPagination}
						style="max-height: 450px;"
					></web-grid>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<div class="prose small">
					<h5>Basic Setup</h5>
					<p><code>pageable</code> - Enable pagination</p>
					<p><code>pageSize</code> - Items per page (default: 10)</p>
					<h5>Navigation</h5>
					<ul class="small">
						<li>Previous/Next buttons</li>
						<li>Page info display</li>
						<li>Keyboard: Page Up/Down</li>
					</ul>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<CodeBlock
					codeContent={`grid.pageable = true;
grid.pageSize = 10;

// Access current page
console.log(grid.currentPage); // 1-based

// Navigate programmatically
grid.currentPage = 3;`}
					languageType="javascript"
					titleText="Enable Pagination"
				/>
			{/snippet}
		</ShowcaseSection>

		<!-- Custom Pagination -->
		<ShowcaseSection
			titleText="Customization Options"
			subtitleText="Configure page sizes and layout"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Configuration"
			descriptionColumnTitle="Code">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={customPagination}
						style="max-height: 350px;"
					></web-grid>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<div class="prose small">
					<h5>Page Size Options</h5>
					<p><code>pageSizes</code> - Array of available sizes</p>
					<h5>Position Options</h5>
					<p><code>paginationPosition</code>:</p>
					<ul class="small">
						<li>bottom-center (default)</li>
						<li>bottom-left</li>
						<li>bottom-right</li>
						<li>top-center</li>
						<li>top-right</li>
					</ul>
					<h5>Auto-Hide</h5>
					<p><code>showPagination="auto"</code> hides when only 1 page</p>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<CodeBlock
					codeContent={`grid.pageable = true;
grid.pageSize = 5;
grid.pageSizes = [5, 10, 25, 50];
grid.paginationPosition = 'bottom-right';

// Auto-hide when single page
grid.showPagination = 'auto';

// Custom layout order
grid.paginationLayout = 'pageSize|previous|pageInfo|next';`}
					languageType="javascript"
					titleText="Customization"
				/>
			{/snippet}
		</ShowcaseSection>

		<!-- Server-Side Pagination -->
		<ShowcaseSection
			titleText="Server-Side Pagination"
			subtitleText="Handle pagination on the server"
			demoColumnTitle="Explanation"
			controlsColumnTitle="Event Details"
			descriptionColumnTitle="Code">

			{#snippet demoContent()}
				<div class="prose">
					<p>For large datasets, implement server-side pagination by:</p>
					<ol>
						<li>Set <code>totalItems</code> to enable page calculation</li>
						<li>Listen to <code>ondatarequest</code> for page changes</li>
						<li>Fetch and replace data for each page</li>
					</ol>
					<p>The grid calculates page count from <code>totalItems / pageSize</code>.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<div class="prose small">
					<h5>Key Properties</h5>
					<p><code>totalItems</code> - Total count from server</p>
					<p><code>currentPage</code> - Current page (1-based)</p>
					<h5>Event Properties</h5>
					<p><code>e.page</code> - Requested page</p>
					<p><code>e.pageSize</code> - Items per page</p>
					<p><code>e.skip</code> - Offset for DB queries</p>
					<p><code>e.trigger</code> - 'page' or 'pageSize'</p>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<CodeBlock
					codeContent={`// Set total items for page calculation
grid.totalItems = 1000;

grid.ondatarequest = async (e) => {
  if (e.trigger === 'page' || e.trigger === 'pageSize') {
    // Calculate offset
    const skip = (e.page - 1) * e.pageSize;

    // Fetch page from server
    const response = await fetch(
      \`/api/data?skip=\${skip}&take=\${e.pageSize}\`
    );
    const data = await response.json();

    // Update grid
    grid.items = data.items;
    grid.totalItems = data.totalCount;
  }
};`}
					languageType="javascript"
					titleText="Server-Side Handler"
				/>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
