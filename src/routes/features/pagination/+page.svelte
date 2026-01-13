<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let basicPagination: any;
	let customPagination: any;
	let serverPagination: any;
	let consoleOutput: string[] = $state([]);

	// PG02 Configuration state
	let posVertical = $state('bottom');
	let posHorizontal = $state('right');
	let layoutElements = $state(['first', 'previous', 'pageInfo', 'next', 'last']);
	let inactiveElements = $state(['pageSize']);
	let summaryPosition = $state('bottom-right');
	let summaryInline = $state(true);

	$effect(() => {
		if (customPagination) {
			// Update pagination position
			let pos = posVertical === 'both'
				? `top-${posHorizontal}|bottom-${posHorizontal}`
				: `${posVertical}-${posHorizontal}`;
			customPagination.paginationPosition = pos;
		}
	});

	$effect(() => {
		if (customPagination) {
			customPagination.paginationLayout = layoutElements.join('|');
		}
	});

	$effect(() => {
		if (customPagination) {
			customPagination.summaryPosition = summaryPosition || undefined;
		}
	});

	$effect(() => {
		if (customPagination) {
			customPagination.isSummaryInline = summaryInline;
		}
	});

	function toggleElement(el: string) {
		if (layoutElements.includes(el)) {
			layoutElements = layoutElements.filter(e => e !== el);
			inactiveElements = [...inactiveElements, el];
		} else {
			inactiveElements = inactiveElements.filter(e => e !== el);
			layoutElements = [...layoutElements, el];
		}
	}

	function getPaginationPositionString() {
		return posVertical === 'both'
			? `top-${posHorizontal}|bottom-${posHorizontal}`
			: `${posVertical}-${posHorizontal}`;
	}

	// Generate sample data
	const generateData = (count: number) => {
		const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Legal', 'Operations'];
		const statuses = ['Active', 'Inactive', 'On Leave'];
		const locations = ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Seattle', 'Boston', 'Denver'];

		return Array.from({ length: count }, (_, i) => ({
			id: i + 1,
			name: `Employee ${i + 1}`,
			department: departments[i % departments.length],
			salary: 50000 + Math.floor(Math.random() * 100000),
			status: statuses[i % statuses.length],
			location: locations[i % locations.length]
		}));
	};

	const allEmployees = generateData(100);

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
			{ field: 'id', title: 'ID', width: '60px', horizontalAlign: 'center' },
			{ field: 'name', title: 'Name', width: '140px' },
			{ field: 'department', title: 'Department', width: '120px' },
			{ field: 'salary', title: 'Salary', width: '100px', horizontalAlign: 'right', formatCallback: (v: number) => '$' + v.toLocaleString() },
			{ field: 'status', title: 'Status', width: '100px' },
			{ field: 'location', title: 'Location', width: '120px' }
		];

		// PG01: Basic Pagination
		if (basicPagination) {
			basicPagination.columns = columns;
			basicPagination.items = allEmployees.slice(0, 50);
			basicPagination.sortMode = 'multi';
			basicPagination.isPageable = true;
			basicPagination.pageSize = 10;
		}

		// PG02: Custom Pagination
		if (customPagination) {
			customPagination.columns = columns;
			customPagination.items = allEmployees.slice(0, 50);
			customPagination.sortMode = 'multi';
			customPagination.isPageable = true;
			customPagination.pageSize = 10;
			customPagination.pageSizes = [5, 10, 25, 50];
			customPagination.paginationPosition = 'bottom-right';
			customPagination.paginationLayout = 'first|previous|pageInfo|next|last';
			// Summary
			customPagination.summaryPosition = 'bottom-right';
			customPagination.isSummaryInline = true;
			customPagination.summaryContentCallback = ({ allItems }: any) => {
				const totalSalary = allItems.reduce((sum: number, item: any) => sum + item.salary, 0);
				const avgSalary = Math.round(totalSalary / allItems.length);
				return `<strong>Total:</strong> $${totalSalary.toLocaleString()} | <strong>Avg:</strong> $${avgSalary.toLocaleString()}`;
			};
		}

		// PG03: Server-Side Pagination
		if (serverPagination) {
			serverPagination.columns = columns;
			serverPagination.sortMode = 'multi';
			serverPagination.isPageable = true;
			serverPagination.pageSize = 10;
			serverPagination.pageSizes = [10, 25, 50, 100];
			serverPagination.paginationPosition = 'bottom-right';
			// Custom labels (Czech translation example)
			serverPagination.paginationLabelsCallback = ({ currentPage, totalPages, totalItems }: any) => ({
				previous: '← Předchozí',
				next: 'Další →',
				pageInfo: `Strana ${currentPage} z ${totalPages}`,
				itemCount: `(${totalItems} položek)`,
				perPage: 'na stránku'
			});
			// Give all data - grid handles client-side pagination
			serverPagination.items = allEmployees;

			serverPagination.ondatarequest = (e: any) => {
				if (e.trigger === 'page' || e.trigger === 'pageSize' || e.trigger === 'sort') {
					const sortStr = e.sort.length > 0
						? e.sort.map((s: any) => `${s.column}:${s.direction}`).join(', ')
						: 'none';
					log(`[${e.trigger.toUpperCase()}] page=${e.page}, pageSize=${e.pageSize}, sort=[${sortStr}]`);
				}
			};
		}
	});
</script>

<style>
	.config-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.config-group {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
	.config-group label {
		font-weight: 600;
		color: #374151;
	}
	.radio-groups {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.radio-group {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	.radio-group-label {
		color: #6b7280;
		font-size: 13px;
		min-width: 70px;
	}
	.radio-group label {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		font-weight: normal;
		cursor: pointer;
	}
	.config-output {
		margin-top: 0.25rem;
		padding: 0.4rem 0.6rem;
		background: #f3f4f6;
		border-radius: 4px;
		font-family: monospace;
		font-size: 13px;
	}
	.config-output code {
		color: #1f2937;
	}
	.config-output span {
		color: #059669;
	}
	.layout-elements {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding: 0.6rem;
		background: #f9fafb;
		border: 2px dashed #e5e7eb;
		border-radius: 6px;
		min-height: 40px;
	}
	.layout-chip {
		padding: 0.3rem 0.6rem;
		background: #667eea;
		color: white;
		border-radius: 4px;
		font-size: 13px;
		cursor: pointer;
		user-select: none;
		transition: opacity 0.2s, transform 0.2s;
	}
	.layout-chip:hover {
		transform: scale(1.05);
	}
	.layout-chip.inactive {
		background: #d1d5db;
		color: #6b7280;
	}
	.config-hint {
		font-size: 12px;
		color: #9ca3af;
	}
	.config-group select {
		padding: 0.4rem;
		border: 1px solid #d1d5db;
		border-radius: 4px;
		font-size: 14px;
		max-width: 280px;
	}
	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
	}
	.checkbox-label small {
		color: #9ca3af;
		font-weight: normal;
	}
</style>

<DocLayout
	titleText="Pagination"
	descriptionText="Navigate through large datasets with page controls">

	<div class="py-4">
		<!-- Basic Pagination -->
		<ShowcaseSection
			titleText="PG01 Basic Pagination"
			subtitleText="Enable client-side pagination with page size and navigation controls"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Configuration">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={basicPagination}
						style="max-height: 450px;"
					></web-grid>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`grid.isPageable = true;
grid.pageSize = 10;

// Access current page
console.log(grid.currentPage); // 1-based

// Navigate programmatically
grid.currentPage = 3;`}
					languageType="javascript"
					titleText="Enable Pagination"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Basic Setup</h5>
					<p><code>isPageable</code> - Enable pagination</p>
					<p><code>pageSize</code> - Items per page (default: 10)</p>
					<h5>Navigation</h5>
					<ul>
						<li>Previous/Next buttons</li>
						<li>Page info display</li>
						<li>Keyboard: Page Up/Down</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Custom Pagination -->
		<ShowcaseSection
			titleText="PG02 Customization Options"
			subtitleText="Configure position, layout elements, page sizes, and summary row"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Configuration">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={customPagination}
						style="max-height: 350px;"
					></web-grid>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`grid.isPageable = true;
grid.pageSize = 10;
grid.pageSizes = [5, 10, 25, 50];
grid.paginationPosition = '${getPaginationPositionString()}';
grid.paginationLayout = '${layoutElements.join('|')}';

// Summary (totals, aggregates)
grid.summaryPosition = '${summaryPosition}';
grid.isSummaryInline = ${summaryInline};
grid.summaryContentCallback = ({ allItems }) => {
  const total = allItems.reduce((s, r) => s + r.salary, 0);
  return \`<strong>Total:</strong> $\${total.toLocaleString()}\`;
};`}
					languageType="javascript"
					titleText="Customization"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="config-section">
					<div class="config-group">
						<label>Position:</label>
						<div class="radio-groups">
							<div class="radio-group">
								<span class="radio-group-label">Vertical:</span>
								<label><input type="radio" bind:group={posVertical} value="top"> Top</label>
								<label><input type="radio" bind:group={posVertical} value="bottom"> Bottom</label>
								<label><input type="radio" bind:group={posVertical} value="both"> Both</label>
							</div>
							<div class="radio-group">
								<span class="radio-group-label">Horizontal:</span>
								<label><input type="radio" bind:group={posHorizontal} value="left"> Left</label>
								<label><input type="radio" bind:group={posHorizontal} value="center"> Center</label>
								<label><input type="radio" bind:group={posHorizontal} value="right"> Right</label>
							</div>
						</div>
						<div class="config-output">
							<code>paginationPosition = "<span>{getPaginationPositionString()}</span>"</code>
						</div>
					</div>

					<div class="config-group">
						<label>Layout Elements: <small class="config-hint">(click to toggle)</small></label>
						<div class="layout-elements">
							{#each layoutElements as el}
								<span class="layout-chip" onclick={() => toggleElement(el)}>{el}</span>
							{/each}
							{#each inactiveElements as el}
								<span class="layout-chip inactive" onclick={() => toggleElement(el)}>{el}</span>
							{/each}
						</div>
						<div class="config-output">
							<code>paginationLayout = "<span>{layoutElements.join('|')}</span>"</code>
						</div>
					</div>

					<div class="config-group">
						<label>Summary Position:</label>
						<select bind:value={summaryPosition}>
							<option value="">None</option>
							<option value="top-left">Top Left</option>
							<option value="top-right">Top Right</option>
							<option value="bottom-left">Bottom Left</option>
							<option value="bottom-right">Bottom Right (same as pagination)</option>
						</select>
					</div>

					<div class="config-group">
						<label class="checkbox-label">
							<input type="checkbox" bind:checked={summaryInline}>
							<strong>Summary Inline</strong>
							<small>(share row with pagination)</small>
						</label>
					</div>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Server-Side Pagination -->
		<ShowcaseSection
			titleText="PG03 Server-Side Pagination"
			subtitleText="Server-side pagination with ondatarequest and custom translated labels"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Console Output">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={serverPagination}
						style="max-height: 350px;"
					></web-grid>
					<p class="small text-muted mt-2">Navigate pages, change page size, or sort columns. Note Czech pagination labels.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Custom/translated labels
grid.paginationLabelsCallback = (ctx) => ({
  previous: '← Předchozí',
  next: 'Další →',
  pageInfo: \`Strana \${ctx.currentPage} z \${ctx.totalPages}\`,
  itemCount: \`(\${ctx.totalItems} položek)\`,
  perPage: 'na stránku'
});

// Server-side pagination
grid.totalItems = 500;  // From server
grid.ondatarequest = async (e) => {
  // e.trigger: 'page' | 'pageSize' | 'sort'
  const res = await fetch(
    \`/api?skip=\${e.skip}&take=\${e.pageSize}\`
  );
  const data = await res.json();
  grid.items = data.items;
  grid.totalItems = data.total;
};`}
					languageType="javascript"
					titleText="Custom Labels & Server-Side"
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
							<div class="text-muted">Navigate pages or sort to see events...</div>
						{:else}
							{#each consoleOutput as line}
								<div style="color: #9cdcfe;">{line}</div>
							{/each}
						{/if}
					</div>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
