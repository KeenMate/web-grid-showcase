<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let basicGrid: any;

	const employees = [
		{ id: 1, name: 'Alice Johnson', email: 'alice@example.com', department: 'Engineering', salary: 95000 },
		{ id: 2, name: 'Bob Smith', email: 'bob@example.com', department: 'Marketing', salary: 72000 },
		{ id: 3, name: 'Charlie Brown', email: 'charlie@example.com', department: 'Engineering', salary: 88000 },
		{ id: 4, name: 'Diana Ross', email: 'diana@example.com', department: 'Sales', salary: 67000 },
		{ id: 5, name: 'Eve Wilson', email: 'eve@example.com', department: 'Engineering', salary: 105000 }
	];

	onMount(async () => {
		await import('@keenmate/web-grid');
		if (basicGrid) {
			basicGrid.columns = [
				{ field: 'id', title: 'ID', width: '60px', horizontalAlign: 'center' },
				{ field: 'name', title: 'Name', width: '150px' },
				{ field: 'email', title: 'Email' },
				{ field: 'department', title: 'Department', width: '120px' },
				{
					field: 'salary',
					title: 'Salary',
					width: '120px',
					horizontalAlign: 'right',
					formatCallback: (val: number) => '$' + val.toLocaleString(),
					cellClassCallback: (val: number) => val > 90000 ? 'high-salary' : null
				}
			];
			basicGrid.items = employees;
			basicGrid.isStriped = true;
			basicGrid.isHoverable = true;
			basicGrid.isRowNumbersVisible = true;
			basicGrid.customStylesCallback = () => `
				.high-salary { background-color: #d1fae5 !important; color: #065f46; font-weight: 600; }
			`;
		}
	});
</script>

<DocLayout
	titleText="Basic Usage"
	descriptionText="Essential examples to get started with the web-grid component">

	<div class="py-4">
		<!-- Basic Grid -->
		<ShowcaseSection
			titleText="BU01 Basic Grid"
			subtitleText="Display tabular data with columns, formatting, and styling"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Key Features">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={basicGrid}
						style="max-height: 350px;"
					></web-grid>
					<p class="small text-muted mt-2">Striped rows, row numbers, formatted salary, and high-value highlighting.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`grid.columns = [
  { field: 'id', title: 'ID', width: '60px', horizontalAlign: 'center' },
  { field: 'name', title: 'Name', width: '150px' },
  { field: 'email', title: 'Email' },
  { field: 'department', title: 'Department', width: '120px' },
  {
    field: 'salary',
    title: 'Salary',
    width: '120px',
    horizontalAlign: 'right',
    formatCallback: (val) => '$' + val.toLocaleString(),
    cellClassCallback: (val) => val > 90000 ? 'high-salary' : null
  }
];

grid.items = employees;
grid.isStriped = true;
grid.isHoverable = true;
grid.isRowNumbersVisible = true;

grid.customStylesCallback = () => \`
  .high-salary {
    background-color: #d1fae5 !important;
    color: #065f46;
    font-weight: 600;
  }
\`;`}
					languageType="javascript"
					titleText="Complete Example"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Required Properties</h5>
					<p><code>columns</code> - Array of column definitions</p>
					<p><code>items</code> - Array of data objects</p>

					<h5>Column Definition</h5>
					<ul>
						<li><code>field</code> - Property name in data</li>
						<li><code>title</code> - Header text</li>
						<li><code>width</code> / <code>minWidth</code> / <code>maxWidth</code></li>
						<li><code>horizontalAlign</code> - left, center, right, justify</li>
						<li><code>verticalAlign</code> - top, middle, bottom</li>
						<li><code>headerHorizontalAlign</code> / <code>headerVerticalAlign</code></li>
						<li><code>headerInfo</code> - tooltip icon next to header</li>
						<li><code>textOverflow</code> - 'wrap' | 'ellipsis'</li>
						<li><code>maxLines</code> - line-clamp (with textOverflow: 'wrap')</li>
						<li><code>cellClass</code> - static CSS class per column</li>
					</ul>

					<h5>Display Options</h5>
					<p><code>isStriped</code> - Alternate row colors</p>
					<p><code>isHoverable</code> - Highlight on hover</p>
					<p><code>isRowNumbersVisible</code> - Show row index</p>
					<p><code>isStickyRowNumbers</code> - Freeze row numbers</p>
					<p><code>isFilterable</code> - Enable column filtering</p>
					<p><code>freezeColumns</code> - Freeze N columns from left</p>
					<p><code>tableBorderOnly</code> - Border only around table</p>
					<p><code>focusedRowIndex</code> - Track focused row</p>
					<p><code>sortMode</code> - 'none' | 'single' | 'multi'</p>

					<h5>Content Rendering</h5>
					<p><code>formatCallback(value, row)</code> - Return display string</p>
					<p><code>templateCallback(row)</code> - Return HTML string for the cell</p>
					<p><code>renderCallback(row, element)</code> - Imperative DOM rendering into the element</p>

					<h5>Styling</h5>
					<p><code>cellClassCallback(value, row)</code> - Dynamic CSS classes</p>
					<p><code>rowClassCallback(row, index)</code> - Dynamic row classes</p>
					<p><code>customStylesCallback</code> - Inject CSS into shadow DOM</p>

					<h5>Grid Modes</h5>
					<p>Use <code>mode</code> for quick setup: <code>'read-only'</code>, <code>'excel'</code>, or <code>'input-matrix'</code></p>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
