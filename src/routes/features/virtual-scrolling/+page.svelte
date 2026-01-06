<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let virtualGrid: any;
	let infiniteGrid: any;

	// Generate large dataset
	const generateData = (count: number) => {
		const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
		return Array.from({ length: count }, (_, i) => ({
			id: i + 1,
			name: `Employee ${i + 1}`,
			email: `employee${i + 1}@example.com`,
			department: departments[i % departments.length],
			salary: 40000 + Math.floor(Math.random() * 80000)
		}));
	};

	onMount(async () => {
		await import('@keenmate/web-grid');
		const columns = [
			{ field: 'id', title: 'ID', width: '80px' },
			{ field: 'name', title: 'Name', width: '150px' },
			{ field: 'email', title: 'Email' },
			{ field: 'department', title: 'Department', width: '120px' },
			{ field: 'salary', title: 'Salary', width: '100px', align: 'right', formatCallback: (v: number) => '$' + v.toLocaleString() }
		];

		// Virtual Scrolling Grid - 10,000 rows
		if (virtualGrid) {
			virtualGrid.columns = columns;
			virtualGrid.items = generateData(10000);
			virtualGrid.virtualScroll = true;
			virtualGrid.virtualScrollRowHeight = 38;
		}

		// Infinite Scroll Grid
		if (infiniteGrid) {
			infiniteGrid.columns = columns;
			infiniteGrid.items = generateData(50);
			infiniteGrid.infiniteScroll = true;
			infiniteGrid.hasMoreItems = true;
		}
	});
</script>

<DocLayout
	titleText="Virtual Scrolling"
	descriptionText="Handle 10,000+ rows with smooth performance">

	<div class="py-4">
		<!-- Virtual Scrolling -->
		<ShowcaseSection
			titleText="VS01 Virtual Scrolling"
			subtitleText="Render only visible rows for 10,000+ item performance"
			col1Title="Live Demo (10,000 rows)"
			col2Title="Code"
			col3Title="Configuration">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={virtualGrid}
						style="max-height: 400px;"
					></web-grid>
					<p class="small text-muted mt-2">Scroll through 10,000 rows with smooth performance.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Manual enable
grid.virtualScroll = true;
grid.virtualScrollRowHeight = 38;

// Or auto-enable when items exceed threshold
grid.virtualScrollThreshold = 100;

// Load large dataset
grid.items = generateData(10000);`}
					languageType="javascript"
					titleText="Virtual Scrolling"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>How It Works</h5>
					<p>Only visible rows (plus buffer) are rendered to the DOM. As you scroll, rows are recycled.</p>
					<h5>Key Properties</h5>
					<p><code>virtualScroll</code> - Enable manually</p>
					<p><code>virtualScrollThreshold</code> - Auto-enable threshold (default: 100)</p>
					<p><code>virtualScrollRowHeight</code> - Row height in px (default: 38)</p>
					<p><code>virtualScrollBuffer</code> - Extra rows to render (default: 10)</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Infinite Scroll -->
		<ShowcaseSection
			titleText="VS02 Infinite Scroll"
			subtitleText="Load more data on scroll with ondatarequest and hasMoreItems"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Configuration">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={infiniteGrid}
						style="max-height: 350px;"
					></web-grid>
					<p class="small text-muted mt-2">Scroll to bottom to load more rows.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`grid.infiniteScroll = true;
grid.hasMoreItems = true;

let page = 1;

grid.ondatarequest = async (e) => {
  if (e.trigger === 'loadMore') {
    page++;
    const response = await fetch(
      \`/api/data?page=\${page}\`
    );
    const newData = await response.json();

    // Append to existing items
    grid.items = [...grid.items, ...newData.items];

    // Check if more available
    grid.hasMoreItems = newData.hasMore;
  }
};`}
					languageType="javascript"
					titleText="Infinite Scroll"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Infinite Scroll</h5>
					<p>Load data progressively as user scrolls to bottom.</p>
					<h5>Properties</h5>
					<p><code>infiniteScroll</code> - Enable infinite scroll</p>
					<p><code>hasMoreItems</code> - More data available</p>
					<p><code>infiniteScrollThreshold</code> - Pixels from bottom to trigger (default: 100)</p>
					<h5>Event</h5>
					<p><code>ondatarequest</code> with <code>trigger: 'loadMore'</code></p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Performance Tips -->
		<div class="mt-5">
			<h2 class="mb-4">Performance Tips</h2>
			<div class="row g-4">
				<div class="col-md-6">
					<div class="card h-100">
						<div class="card-body">
							<h5 class="card-title">Use Fixed Row Height</h5>
							<p class="card-text">Virtual scrolling requires knowing row heights upfront. Set <code>virtualScrollRowHeight</code> to match your actual row height for accurate scrollbar.</p>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="card h-100">
						<div class="card-body">
							<h5 class="card-title">Avoid Complex Cell Rendering</h5>
							<p class="card-text">Keep <code>formatCallback</code> and <code>templateCallback</code> fast. Avoid heavy computations in render paths.</p>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="card h-100">
						<div class="card-body">
							<h5 class="card-title">Use Appropriate Buffer</h5>
							<p class="card-text">The <code>virtualScrollBuffer</code> trades memory for smoother scrolling. Default of 10 works well for most cases.</p>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="card h-100">
						<div class="card-body">
							<h5 class="card-title">Combine with Pagination</h5>
							<p class="card-text">For extremely large datasets, consider server-side pagination with virtual scrolling for the current page.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</DocLayout>
