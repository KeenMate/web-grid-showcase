<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let basicGrid: any;
	let formattedGrid: any;
	let styledGrid: any;

	const employees = [
		{ id: 1, name: 'Alice Johnson', email: 'alice@example.com', department: 'Engineering', salary: 95000 },
		{ id: 2, name: 'Bob Smith', email: 'bob@example.com', department: 'Marketing', salary: 72000 },
		{ id: 3, name: 'Charlie Brown', email: 'charlie@example.com', department: 'Engineering', salary: 88000 },
		{ id: 4, name: 'Diana Ross', email: 'diana@example.com', department: 'Sales', salary: 67000 },
		{ id: 5, name: 'Eve Wilson', email: 'eve@example.com', department: 'Engineering', salary: 105000 }
	];

	onMount(() => {
		// Basic Grid
		if (basicGrid) {
			basicGrid.columns = [
				{ field: 'id', title: 'ID', width: '60px' },
				{ field: 'name', title: 'Name', width: '150px' },
				{ field: 'email', title: 'Email' },
				{ field: 'department', title: 'Department', width: '120px' }
			];
			basicGrid.items = employees;
		}

		// Formatted Grid
		if (formattedGrid) {
			formattedGrid.columns = [
				{ field: 'id', title: 'ID', width: '60px', align: 'center' },
				{ field: 'name', title: 'Name', width: '150px' },
				{ field: 'department', title: 'Department', width: '120px' },
				{
					field: 'salary',
					title: 'Salary',
					width: '120px',
					align: 'right',
					formatCallback: (val: number) => '$' + val.toLocaleString()
				}
			];
			formattedGrid.items = employees;
			formattedGrid.striped = true;
			formattedGrid.hoverable = true;
		}

		// Styled Grid with row numbers
		if (styledGrid) {
			styledGrid.columns = [
				{ field: 'name', title: 'Name', width: '150px' },
				{ field: 'email', title: 'Email' },
				{
					field: 'salary',
					title: 'Salary',
					width: '120px',
					align: 'right',
					formatCallback: (val: number) => '$' + val.toLocaleString(),
					cellClassCallback: (val: number) => val > 90000 ? 'high-salary' : null
				}
			];
			styledGrid.items = employees;
			styledGrid.showRowNumbers = true;
			styledGrid.customStylesCallback = () => `
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
			titleText="Basic Grid"
			subtitleText="Display tabular data with columns"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Configuration"
			descriptionColumnTitle="Code">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={basicGrid}
						style="max-height: 300px;"
					></web-grid>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<div class="prose small">
					<h5>Key Properties</h5>
					<p><code>columns</code> - Array of column definitions</p>
					<p><code>items</code> - Array of data objects</p>
					<p>Each column needs at minimum:</p>
					<ul class="small">
						<li><code>field</code> - Property name in data</li>
						<li><code>title</code> - Header text</li>
					</ul>
					<h5>Optional Column Properties</h5>
					<p><code>width</code> - Fixed width (px, %, etc.)</p>
					<p><code>align</code> - left, center, right</p>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<CodeBlock
					codeContent={`grid.columns = [
  { field: 'id', title: 'ID', width: '60px' },
  { field: 'name', title: 'Name', width: '150px' },
  { field: 'email', title: 'Email' },
  { field: 'department', title: 'Department' }
];

grid.items = [
  { id: 1, name: 'Alice', email: 'alice@example.com', department: 'Engineering' },
  { id: 2, name: 'Bob', email: 'bob@example.com', department: 'Marketing' }
];`}
					languageType="javascript"
					titleText="Basic Setup"
				/>
			{/snippet}
		</ShowcaseSection>

		<!-- Formatted Grid -->
		<ShowcaseSection
			titleText="Formatting & Display"
			subtitleText="Format values and add visual enhancements"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Configuration"
			descriptionColumnTitle="Code">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={formattedGrid}
						style="max-height: 300px;"
					></web-grid>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<div class="prose small">
					<h5>Display Options</h5>
					<p><code>striped</code> - Alternate row colors</p>
					<p><code>hoverable</code> - Highlight on hover</p>
					<h5>Column Formatting</h5>
					<p><code>formatCallback</code> - Transform display values</p>
					<p><code>align</code> - Text alignment</p>
					<p>Use formatCallback for:</p>
					<ul class="small">
						<li>Currency formatting</li>
						<li>Date formatting</li>
						<li>Percentage display</li>
						<li>Any value transformation</li>
					</ul>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<CodeBlock
					codeContent={`grid.columns = [
  { field: 'id', title: 'ID', align: 'center' },
  { field: 'name', title: 'Name' },
  {
    field: 'salary',
    title: 'Salary',
    align: 'right',
    formatCallback: (val) => '$' + val.toLocaleString()
  }
];

grid.striped = true;
grid.hoverable = true;`}
					languageType="javascript"
					titleText="Formatting"
				/>
			{/snippet}
		</ShowcaseSection>

		<!-- Row Numbers & Cell Styling -->
		<ShowcaseSection
			titleText="Row Numbers & Cell Styling"
			subtitleText="Add row numbers and conditional cell styles"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Configuration"
			descriptionColumnTitle="Code">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={styledGrid}
						style="max-height: 300px;"
					></web-grid>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<div class="prose small">
					<h5>Row Numbers</h5>
					<p><code>showRowNumbers</code> - Display row index</p>
					<h5>Cell Styling</h5>
					<p><code>cellClassCallback</code> - Dynamic CSS classes per cell</p>
					<p><code>customStylesCallback</code> - Inject CSS into shadow DOM</p>
					<p>Use for:</p>
					<ul class="small">
						<li>Highlighting values</li>
						<li>Conditional formatting</li>
						<li>Visual indicators</li>
					</ul>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<CodeBlock
					codeContent={`grid.showRowNumbers = true;

grid.columns = [
  { field: 'name', title: 'Name' },
  {
    field: 'salary',
    title: 'Salary',
    cellClassCallback: (val) =>
      val > 90000 ? 'high-salary' : null
  }
];

grid.customStylesCallback = () => \`
  .high-salary {
    background-color: #d1fae5 !important;
    color: #065f46;
    font-weight: 600;
  }
\`;`}
					languageType="javascript"
					titleText="Conditional Styling"
				/>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
