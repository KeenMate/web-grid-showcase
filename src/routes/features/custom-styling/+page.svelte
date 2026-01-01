<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let themedGrid: any;

	const employees = [
		{ id: 1, name: 'Alice Johnson', department: 'Engineering', salary: 95000 },
		{ id: 2, name: 'Bob Smith', department: 'Marketing', salary: 72000 },
		{ id: 3, name: 'Charlie Brown', department: 'Engineering', salary: 88000 },
		{ id: 4, name: 'Diana Ross', department: 'Sales', salary: 67000 }
	];

	onMount(() => {
		if (themedGrid) {
			themedGrid.columns = [
				{ field: 'id', title: 'ID', width: '60px' },
				{ field: 'name', title: 'Name', width: '150px' },
				{ field: 'department', title: 'Department', width: '120px' },
				{ field: 'salary', title: 'Salary', width: '100px', align: 'right', formatCallback: (v: number) => '$' + v.toLocaleString() }
			];
			themedGrid.items = employees;
			themedGrid.sortable = true;
		}
	});
</script>

<DocLayout
	titleText="Custom Styling"
	descriptionText="Customize appearance with 100+ CSS variables">

	<div class="py-4">
		<!-- Themed Grid -->
		<ShowcaseSection
			titleText="CSS Variables"
			subtitleText="Override default styles"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Key Variables"
			descriptionColumnTitle="Code">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={themedGrid}
						style="max-height: 300px; --wg-accent-color: #7c3aed; --wg-header-background: #1e1b4b; --wg-header-color: #e0e7ff;"
					></web-grid>
					<p class="small text-muted mt-2">Custom purple theme applied via CSS variables.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<div class="prose small">
					<h5>Color Variables</h5>
					<p><code>--wg-accent-color</code> - Primary accent</p>
					<p><code>--wg-text-color-1</code> - Primary text</p>
					<p><code>--wg-layer-1</code> - Background</p>
					<h5>Header Variables</h5>
					<p><code>--wg-header-background</code></p>
					<p><code>--wg-header-color</code></p>
					<p><code>--wg-header-border</code></p>
					<h5>Cell Variables</h5>
					<p><code>--wg-cell-padding</code></p>
					<p><code>--wg-cell-border</code></p>
					<p><code>--wg-row-background-hover</code></p>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<CodeBlock
					codeContent={`<!-- Inline style -->
<web-grid style="
  --wg-accent-color: #7c3aed;
  --wg-header-background: #1e1b4b;
  --wg-header-color: #e0e7ff;
"></web-grid>

<!-- Or in CSS -->
web-grid {
  --wg-accent-color: #7c3aed;
  --wg-header-background: #1e1b4b;
  --wg-header-color: #e0e7ff;
}`}
					languageType="html"
					titleText="CSS Variables"
				/>
			{/snippet}
		</ShowcaseSection>

		<!-- Theme Integration -->
		<ShowcaseSection
			titleText="Theme Integration"
			subtitleText="Use with @keenmate/theme-designer"
			demoColumnTitle="Explanation"
			controlsColumnTitle="Base Variables"
			descriptionColumnTitle="Code">

			{#snippet demoContent()}
				<div class="prose">
					<p>Web Grid integrates with the <code>@keenmate/theme-designer</code> system through <code>--base-*</code> CSS variables.</p>
					<p>When you set base variables on <code>:root</code>, all KeenMate components (web-grid, web-multiselect, etc.) automatically use them.</p>
					<p>Each <code>--wg-*</code> variable falls back to a corresponding <code>--base-*</code> variable, then to a hardcoded default.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<div class="prose small">
					<h5>Supported Base Variables</h5>
					<p><strong>Colors:</strong></p>
					<p><code>--base-accent-color</code></p>
					<p><code>--base-text-color-1</code></p>
					<p><code>--base-layer-1</code></p>
					<p><code>--base-stroke-color</code></p>
					<p><strong>Typography:</strong></p>
					<p><code>--base-font-family</code></p>
					<p><code>--base-font-size-base</code></p>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<CodeBlock
					codeContent={`/* Set base theme for all components */
:root {
  --base-accent-color: #e91e63;
  --base-font-family: 'Inter', sans-serif;
  --base-layer-1: #ffffff;
  --base-text-color-1: #1f2937;
}

/* web-grid automatically uses these
   via fallback chain:
   --wg-accent-color: var(--base-accent-color, #0078d4);
*/`}
					languageType="css"
					titleText="Theme Integration"
				/>
			{/snippet}
		</ShowcaseSection>

		<!-- Dynamic Styling -->
		<ShowcaseSection
			titleText="Dynamic Cell Styling"
			subtitleText="Style cells based on data"
			demoColumnTitle="Methods"
			controlsColumnTitle="Callbacks"
			descriptionColumnTitle="Code">

			{#snippet demoContent()}
				<div class="prose">
					<h5>Styling Options</h5>
					<ol>
						<li><code>cellClassCallback</code> - Per-cell CSS classes</li>
						<li><code>rowClassCallback</code> - Per-row CSS classes</li>
						<li><code>customStylesCallback</code> - Inject CSS into shadow DOM</li>
					</ol>
					<p>Use these for conditional formatting like heatmaps, status indicators, or highlighting.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<div class="prose small">
					<h5>cellClassCallback</h5>
					<p>Return CSS class name based on cell value and row.</p>
					<h5>rowClassCallback</h5>
					<p>Return CSS class for entire row.</p>
					<h5>customStylesCallback</h5>
					<p>Return CSS string to inject. Useful for defining the classes used by callbacks.</p>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<CodeBlock
					codeContent={`// Define custom styles
grid.customStylesCallback = () => \`
  .high-value { background: #d1fae5 !important; }
  .low-value { background: #fee2e2 !important; }
  .row-inactive { opacity: 0.5; }
\`;

// Apply to cells
grid.columns = [{
  field: 'salary',
  cellClassCallback: (val) => {
    if (val > 90000) return 'high-value';
    if (val < 50000) return 'low-value';
    return null;
  }
}];

// Apply to rows
grid.rowClassCallback = (row) => {
  return row.status === 'inactive'
    ? 'row-inactive'
    : null;
};`}
					languageType="javascript"
					titleText="Dynamic Styling"
				/>
			{/snippet}
		</ShowcaseSection>

		<!-- CSS Variables Reference -->
		<div class="mt-5">
			<h2 class="mb-4">CSS Variables Reference</h2>
			<div class="row g-4">
				<div class="col-md-6">
					<h5>Colors</h5>
					<table class="table table-sm small">
						<tbody>
							<tr><td><code>--wg-accent-color</code></td><td>Primary accent</td></tr>
							<tr><td><code>--wg-text-color-1</code></td><td>Primary text</td></tr>
							<tr><td><code>--wg-text-color-2</code></td><td>Secondary text</td></tr>
							<tr><td><code>--wg-layer-1</code></td><td>Background</td></tr>
							<tr><td><code>--wg-layer-2</code></td><td>Alternate background</td></tr>
							<tr><td><code>--wg-stroke-color</code></td><td>Borders</td></tr>
							<tr><td><code>--wg-error-color</code></td><td>Error/danger</td></tr>
						</tbody>
					</table>
				</div>
				<div class="col-md-6">
					<h5>Components</h5>
					<table class="table table-sm small">
						<tbody>
							<tr><td><code>--wg-header-*</code></td><td>Header styling</td></tr>
							<tr><td><code>--wg-cell-*</code></td><td>Cell styling</td></tr>
							<tr><td><code>--wg-row-*</code></td><td>Row styling</td></tr>
							<tr><td><code>--wg-pagination-*</code></td><td>Pagination</td></tr>
							<tr><td><code>--wg-toolbar-*</code></td><td>Row toolbar</td></tr>
							<tr><td><code>--wg-editor-*</code></td><td>Editor/input styling</td></tr>
							<tr><td><code>--wg-focus-*</code></td><td>Focus states</td></tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</DocLayout>
