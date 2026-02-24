<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let summaryGrid: any;
	let serverSummaryGrid: any;

	const employees = [
		{ id: 1, name: 'Alice Johnson', department: 'Engineering', salary: 95000 },
		{ id: 2, name: 'Bob Smith', department: 'Marketing', salary: 72000 },
		{ id: 3, name: 'Charlie Brown', department: 'Engineering', salary: 88000 },
		{ id: 4, name: 'Diana Ross', department: 'Sales', salary: 67000 },
		{ id: 5, name: 'Eve Wilson', department: 'HR', salary: 65000 },
		{ id: 6, name: 'Frank Miller', department: 'Engineering', salary: 92000 },
		{ id: 7, name: 'Grace Lee', department: 'Marketing', salary: 78000 },
		{ id: 8, name: 'Henry Davis', department: 'Sales', salary: 71000 }
	];

	const columns = [
		{ field: 'id', title: 'ID', width: '60px' },
		{ field: 'name', title: 'Name', width: '150px' },
		{ field: 'department', title: 'Department', width: '120px' },
		{ field: 'salary', title: 'Salary', width: '100px', horizontalAlign: 'right', formatCallback: (v: number) => '$' + v.toLocaleString() }
	];

	let summaryPosition = 'bottom-left';

	$effect(() => {
		if (summaryGrid) {
			summaryGrid.summaryPosition = summaryPosition;
		}
	});

	onMount(async () => {
		await import('@keenmate/web-grid');

		// SU01: Basic Summary
		if (summaryGrid) {
			summaryGrid.columns = columns;
			summaryGrid.items = employees;
			summaryGrid.isPageable = true;
			summaryGrid.pageSize = 5;
			summaryGrid.paginationPosition = 'bottom-right';
			summaryGrid.summaryPosition = summaryPosition;
			summaryGrid.summaryContentCallback = (ctx: any) => {
				const total = ctx.allItems.reduce((sum: number, row: any) => sum + row.salary, 0);
				const avg = Math.round(total / ctx.allItems.length);
				return `<strong>Total:</strong> $${total.toLocaleString()} &nbsp;|&nbsp; <strong>Avg:</strong> $${avg.toLocaleString()} &nbsp;|&nbsp; <strong>Count:</strong> ${ctx.allItems.length}`;
			};
		}

		// SU02: Server-side Summary
		if (serverSummaryGrid) {
			serverSummaryGrid.columns = columns;
			serverSummaryGrid.items = employees.slice(0, 5);
			serverSummaryGrid.isPageable = true;
			serverSummaryGrid.pageSize = 5;
			serverSummaryGrid.paginationPosition = 'bottom-right';
			serverSummaryGrid.summaryPosition = 'bottom-left';
			serverSummaryGrid.summaryMetadata = { totalSalary: 628000, avgSalary: 78500, count: 8 };
			serverSummaryGrid.summaryContentCallback = (ctx: any) => {
				const meta = ctx.metadata;
				if (!meta) return '';
				return `<strong>Total:</strong> $${meta.totalSalary.toLocaleString()} &nbsp;|&nbsp; <strong>Avg:</strong> $${meta.avgSalary.toLocaleString()} &nbsp;|&nbsp; <strong>Count:</strong> ${meta.count}`;
			};
		}
	});
</script>

<DocLayout
	titleText="Summary Bar"
	descriptionText="Display totals, aggregates, and custom summary content alongside pagination">

	<div class="py-4">
		<!-- SU01: Basic Summary -->
		<ShowcaseSection
			titleText="SU01 Client-Side Summary"
			subtitleText="Calculate and display aggregates from grid data"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Configuration">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={summaryGrid}
						style="max-height: 350px;"
					></web-grid>
					<p class="small text-muted mt-2">Summary bar shows totals calculated from all items.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`grid.summaryPosition = '${summaryPosition}';

grid.summaryContentCallback = (ctx) => {
  const total = ctx.allItems.reduce(
    (sum, row) => sum + row.salary, 0
  );
  const avg = Math.round(
    total / ctx.allItems.length
  );

  return \`
    <strong>Total:</strong>
      \$\${total.toLocaleString()} |
    <strong>Avg:</strong>
      \$\${avg.toLocaleString()} |
    <strong>Count:</strong>
      \${ctx.allItems.length}
  \`;
};`}
					languageType="javascript"
					titleText="Summary Callback"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Position</h5>
					<div class="d-flex flex-wrap gap-1 mb-2">
						<button class="btn btn-sm" class:btn-primary={summaryPosition === 'bottom-left'} class:btn-outline-secondary={summaryPosition !== 'bottom-left'} onclick={() => summaryPosition = 'bottom-left'}>bottom-left</button>
						<button class="btn btn-sm" class:btn-primary={summaryPosition === 'bottom-right'} class:btn-outline-secondary={summaryPosition !== 'bottom-right'} onclick={() => summaryPosition = 'bottom-right'}>bottom-right</button>
						<button class="btn btn-sm" class:btn-primary={summaryPosition === 'top-left'} class:btn-outline-secondary={summaryPosition !== 'top-left'} onclick={() => summaryPosition = 'top-left'}>top-left</button>
						<button class="btn btn-sm" class:btn-primary={summaryPosition === 'top-right'} class:btn-outline-secondary={summaryPosition !== 'top-right'} onclick={() => summaryPosition = 'top-right'}>top-right</button>
					</div>
					<h5>Callback Context</h5>
					<p>The <code>summaryContentCallback</code> receives:</p>
					<ul>
						<li><code>items</code> &mdash; Current page items</li>
						<li><code>allItems</code> &mdash; All items (before pagination)</li>
						<li><code>totalItems</code> &mdash; Total count</li>
						<li><code>currentPage</code> / <code>pageSize</code></li>
						<li><code>metadata</code> &mdash; Server metadata</li>
					</ul>
					<p>Returns an HTML string displayed in the summary bar.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- SU02: Server-Side Summary -->
		<ShowcaseSection
			titleText="SU02 Server-Side Summary"
			subtitleText="Display server-provided aggregates via summaryMetadata"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Description">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={serverSummaryGrid}
						style="max-height: 350px;"
					></web-grid>
					<p class="small text-muted mt-2">Summary uses server-provided metadata instead of client calculation.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Server provides metadata
grid.summaryMetadata = {
  totalSalary: 628000,
  avgSalary: 78500,
  count: 8
};

grid.summaryContentCallback = (ctx) => {
  const meta = ctx.metadata;
  if (!meta) return '';
  return \`
    <strong>Total:</strong>
      \$\${meta.totalSalary.toLocaleString()}
  \`;
};

// Update on data request
grid.ondatarequest = async (e) => {
  const res = await fetch('/api/data');
  const data = await res.json();
  grid.items = data.items;
  grid.summaryMetadata = data.summary;
};`}
					languageType="javascript"
					titleText="Server Metadata"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Server-Side Aggregates</h5>
					<p>For server-side pagination, the client may not have all data for calculations. Use <code>summaryMetadata</code> to pass server-computed values.</p>
					<h5>How It Works</h5>
					<ol>
						<li>Server computes aggregates (totals, averages, etc.)</li>
						<li>Pass them to <code>grid.summaryMetadata</code></li>
						<li>Access via <code>ctx.metadata</code> in the callback</li>
					</ol>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- API Reference -->
		<section class="mb-5">
			<h2 class="mb-4">API Reference</h2>
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr><th>Property</th><th>Type</th><th>Default</th><th>Description</th></tr>
					</thead>
					<tbody>
						<tr>
							<td><code>summaryPosition</code></td>
							<td><code>string</code></td>
							<td>-</td>
							<td>Position(s): <code>'bottom-left'</code>, <code>'top-right'</code>, <code>'top-right|bottom-right'</code></td>
						</tr>
						<tr>
							<td><code>summaryContentCallback</code></td>
							<td><code>(ctx) =&gt; string</code></td>
							<td>-</td>
							<td>Callback returning HTML content for the summary bar</td>
						</tr>
						<tr>
							<td><code>summaryMetadata</code></td>
							<td><code>unknown</code></td>
							<td>-</td>
							<td>Server-provided metadata passed to <code>summaryContentCallback</code> as <code>ctx.metadata</code></td>
						</tr>
						<tr>
							<td><code>isSummaryInline</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>When <code>true</code>, summary shares the row with pagination. When <code>false</code>, gets its own row.</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	</div>
</DocLayout>
