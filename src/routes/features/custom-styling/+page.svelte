<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let themedGrid: any;
	let labelsGrid: any;

	const employees = [
		{ id: 1, name: 'Alice Johnson', department: 'Engineering', salary: 95000 },
		{ id: 2, name: 'Bob Smith', department: 'Marketing', salary: 72000 },
		{ id: 3, name: 'Charlie Brown', department: 'Engineering', salary: 88000 },
		{ id: 4, name: 'Diana Ross', department: 'Sales', salary: 67000 }
	];

	onMount(async () => {
		await import('@keenmate/web-grid');
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

		// Labels/i18n grid with Czech translations
		if (labelsGrid) {
			labelsGrid.columns = [
				{ field: 'id', title: 'ID', width: '60px' },
				{ field: 'name', title: 'Jméno', width: '150px' },
				{ field: 'department', title: 'Oddělení', width: '120px' },
				{ field: 'salary', title: 'Plat', width: '100px', align: 'right', formatCallback: (v: number) => v.toLocaleString('cs-CZ') + ' Kč' }
			];
			labelsGrid.items = employees;
			labelsGrid.pagination = { pageSize: 2 };
			labelsGrid.labels = {
				rowActions: 'Akce řádku',
				inlineActionsHeader: 'Akce',
				keyboardShortcuts: 'Klávesové zkratky',
				paginationFirst: '⏮',
				paginationPrevious: '◀',
				paginationNext: '▶',
				paginationLast: '⏭',
				paginationPageInfo: 'Stránka {current} z {total}',
				paginationItemCount: '{count} položek',
				paginationPerPage: 'na stránku'
			};
		}
	});
</script>

<DocLayout
	titleText="Custom Styling"
	descriptionText="Customize appearance with 100+ CSS variables">

	<div class="py-4">
		<!-- Themed Grid -->
		<ShowcaseSection
			titleText="CS01 CSS Variables"
			subtitleText="Override colors, headers, and cells with 100+ CSS custom properties"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Key Variables">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={themedGrid}
						style="max-height: 300px; --wg-accent-color: #7c3aed; --wg-header-bg: #1e1b4b; --wg-header-color: #e0e7ff;"
					></web-grid>
					<p class="small text-muted mt-2">Custom purple theme applied via CSS variables.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Inline style -->
<web-grid style="
  --wg-accent-color: #7c3aed;
  --wg-header-bg: #1e1b4b;
  --wg-header-color: #e0e7ff;
"></web-grid>

<!-- Or in CSS -->
web-grid {
  --wg-accent-color: #7c3aed;
  --wg-header-bg: #1e1b4b;
  --wg-header-color: #e0e7ff;
}`}
					languageType="html"
					titleText="CSS Variables"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Color Variables</h5>
					<p><code>--wg-accent-color</code> - Primary accent</p>
					<p><code>--wg-text-color-1</code> - Primary text</p>
					<p><code>--wg-surface-1</code> - Background</p>
					<h5>Header Variables</h5>
					<p><code>--wg-header-bg</code></p>
					<p><code>--wg-header-color</code></p>
					<p><code>--wg-header-border</code></p>
					<h5>Cell Variables</h5>
					<p><code>--wg-cell-padding</code></p>
					<p><code>--wg-cell-border</code></p>
					<p><code>--wg-row-bg-hover</code></p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Theme Integration -->
		<ShowcaseSection
			titleText="CS02 Theme Integration"
			subtitleText="Integrate with @keenmate/theme-designer via --base-* variable fallbacks"
			col1Title="Explanation"
			col2Title="Code"
			col3Title="Base Variables">

			{#snippet demoContent()}
				<div class="prose">
					<p>Web Grid integrates with the <code>@keenmate/theme-designer</code> system through <code>--base-*</code> CSS variables.</p>
					<p>When you set base variables on <code>:root</code>, all KeenMate components (web-grid, web-multiselect, etc.) automatically use them.</p>
					<p>Each <code>--wg-*</code> variable falls back to a corresponding <code>--base-*</code> variable, then to a hardcoded default.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`/* Set base theme for all components */
:root {
  --base-accent-color: #e91e63;
  --base-font-family: 'Inter', sans-serif;
  --base-surface-1: #ffffff;
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

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Supported Base Variables</h5>
					<p><strong>Colors:</strong></p>
					<p><code>--base-accent-color</code></p>
					<p><code>--base-text-color-1</code></p>
					<p><code>--base-surface-1</code></p>
					<p><code>--base-border-color</code></p>
					<p><strong>Typography:</strong></p>
					<p><code>--base-font-family</code></p>
					<p><code>--base-font-size-base</code></p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- CSS Variables Manifest -->
		<ShowcaseSection
			titleText="CS03 CSS Variables Manifest"
			subtitleText="Machine-readable JSON manifest of all 155 CSS variables with categories"
			col1Title="What's Included"
			col2Title="Code"
			col3Title="Use Cases">

			{#snippet demoContent()}
				<div class="prose">
					<p>The package includes a machine-readable manifest documenting all 155 CSS variables:</p>
					<ul>
						<li><strong>34 base variables</strong> - <code>--base-*</code> consumed from theme layer</li>
						<li><strong>121 component variables</strong> - <code>--wg-*</code> with category and usage</li>
					</ul>
					<p>Each variable includes its category and a description of what it controls in the UI.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`import manifest from '@keenmate/web-grid/manifest'

// manifest.prefix = "wg"
// manifest.baseVariables = [
//   { name: "base-accent-color", required: true, usage: "..." }
// ]
// manifest.componentVariables = [
//   { name: "wg-header-bg", category: "header", usage: "..." }
// ]

// Example: List all header variables
const headerVars = manifest.componentVariables
  .filter(v => v.category === 'header')
  .map(v => '--' + v.name);

// Schema: keenmate/schemas/component-variables.schema.json`}
					languageType="javascript"
					titleText="Manifest Import"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Theme Designer</h5>
					<p>Build UI for customizing all variables</p>
					<h5>Documentation</h5>
					<p>Generate variable reference docs</p>
					<h5>Validation</h5>
					<p>Verify theme completeness</p>
					<h5>Tooling</h5>
					<p>IDE autocomplete, linting</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Dynamic Styling -->
		<ShowcaseSection
			titleText="CS04 Dynamic Cell Styling"
			subtitleText="Style cells and rows dynamically with cellClassCallback and rowClassCallback"
			col1Title="Methods"
			col2Title="Code"
			col3Title="Callbacks">

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

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>cellClassCallback</h5>
					<p>Return CSS class name based on cell value and row.</p>
					<h5>rowClassCallback</h5>
					<p>Return CSS class for entire row.</p>
					<h5>customStylesCallback</h5>
					<p>Return CSS string to inject. Useful for defining the classes used by callbacks.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Global Scaling -->
		<ShowcaseSection
			titleText="CS05 Global Scaling"
			subtitleText="Scale entire grid proportionally with --wg-rem base unit"
			col1Title="How It Works"
			col2Title="Code"
			col3Title="Benefits">

			{#snippet demoContent()}
				<div class="prose">
					<p>All sizes in web-grid are based on <code>--wg-rem</code> (default: 10px). This enables proportional scaling of the entire grid.</p>
					<p>Font sizes, spacing, button sizes, and icons all scale together when you change this single variable.</p>
					<p>The 10px base was chosen for clean math: <code>10 × 1.4 = 14px</code> (no rounding errors).</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`/* Scale grid up 20% */
web-grid {
  --wg-rem: 12px;
}

/* Scale grid down 20% */
web-grid {
  --wg-rem: 8px;
}

/* Use with Pure Admin's rem system */
web-grid {
  --wg-rem: 1rem; /* inherits from html */
}`}
					languageType="css"
					titleText="Global Scaling"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Proportional Scaling</h5>
					<p>All sizes use <code>calc(N × var(--wg-rem))</code></p>
					<h5>Clean Pixel Values</h5>
					<p>10px base avoids fractional pixels</p>
					<h5>Theme Designer</h5>
					<p>Pure Admin sets <code>html {'{'} font-size: 10px {'}'}</code> so <code>1rem = 10px</code></p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Labels/i18n -->
		<ShowcaseSection
			titleText="CS06 Labels / i18n"
			subtitleText="Translate pagination and UI labels with i18n placeholder syntax"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Available Labels">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={labelsGrid}
						style="max-height: 200px;"
					></web-grid>
					<p class="small text-muted mt-2">Grid with Czech translations. Navigate pagination to see translated labels.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Set labels (partial object merged with defaults)
grid.labels = {
  rowActions: 'Akce řádku',
  inlineActionsHeader: 'Akce',
  keyboardShortcuts: 'Klávesové zkratky',
  paginationPageInfo: 'Stránka {current} z {total}',
  paginationItemCount: '{count} položek',
  paginationPerPage: 'na stránku'
};

// Placeholder syntax:
// {current} - current page number
// {total} - total page count
// {count} - total item count`}
					languageType="javascript"
					titleText="Labels Configuration"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>UI Labels</h5>
					<p><code>rowActions</code> - Toolbar trigger tooltip</p>
					<p><code>inlineActionsHeader</code> - Inline actions column header</p>
					<p><code>keyboardShortcuts</code> - Shortcuts help title</p>
					<h5>Pagination Labels</h5>
					<p><code>paginationFirst</code></p>
					<p><code>paginationPrevious</code></p>
					<p><code>paginationNext</code></p>
					<p><code>paginationLast</code></p>
					<p><code>paginationPageInfo</code></p>
					<p><code>paginationItemCount</code></p>
					<p><code>paginationPerPage</code></p>
				</div>
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
							<tr><td><code>--wg-surface-1</code></td><td>Background</td></tr>
							<tr><td><code>--wg-surface-2</code></td><td>Alternate background</td></tr>
							<tr><td><code>--wg-border-color</code></td><td>Borders</td></tr>
							<tr><td><code>--wg-danger-color</code></td><td>Error/danger</td></tr>
						</tbody>
					</table>
				</div>
				<div class="col-md-6">
					<h5>Sizing</h5>
					<table class="table table-sm small">
						<tbody>
							<tr><td><code>--wg-rem</code></td><td>Base unit (default: 10px)</td></tr>
							<tr><td><code>--wg-spacing-*</code></td><td>Spacing (xs, sm, md, lg, xl)</td></tr>
							<tr><td><code>--wg-font-size-*</code></td><td>Font sizes</td></tr>
							<tr><td><code>--wg-border-radius-*</code></td><td>Border radii</td></tr>
						</tbody>
					</table>
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
