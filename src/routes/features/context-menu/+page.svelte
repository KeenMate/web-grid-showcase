<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let contextMenuGrid: any;

	const employees = [
		{ id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'active', salary: 95000 },
		{ id: 2, name: 'Bob Smith', email: 'bob@example.com', status: 'pending', salary: 72000 },
		{ id: 3, name: 'Charlie Brown', email: 'charlie@example.com', status: 'inactive', salary: 88000 }
	];

	onMount(() => {
		if (contextMenuGrid) {
			contextMenuGrid.columns = [
				{ field: 'id', title: 'ID', width: '60px' },
				{ field: 'name', title: 'Name', width: '150px' },
				{ field: 'email', title: 'Email' },
				{ field: 'status', title: 'Status', width: '100px' }
			];
			contextMenuGrid.items = [...employees];
			contextMenuGrid.contextMenu = [
				{
					id: 'copy',
					label: 'Copy',
					icon: 'C',
					onclick: (ctx: any) => {
						navigator.clipboard.writeText(String(ctx.cellValue));
					}
				},
				{
					id: 'edit',
					label: 'Edit Row',
					icon: 'E'
				},
				{
					id: 'activate',
					label: (ctx: any) => ctx.row.status === 'active' ? 'Deactivate' : 'Activate',
					icon: 'A',
					dividerBefore: true
				},
				{
					id: 'delete',
					label: 'Delete',
					icon: 'X',
					danger: true,
					dividerBefore: true
				}
			];
		}
	});
</script>

<DocLayout
	titleText="Context Menu"
	descriptionText="Right-click menu for row actions">

	<div class="py-4">
		<!-- Basic Context Menu -->
		<ShowcaseSection
			titleText="Right-Click Menu"
			subtitleText="Custom actions on right-click"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Configuration"
			descriptionColumnTitle="Code">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={contextMenuGrid}
						style="max-height: 300px;"
					></web-grid>
					<p class="small text-muted mt-2">Right-click any cell to see the context menu.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<div class="prose small">
					<h5>Menu Item Properties</h5>
					<p><code>id</code> - Unique identifier</p>
					<p><code>label</code> - Display text (string or callback)</p>
					<p><code>icon</code> - Icon (string or callback)</p>
					<p><code>danger</code> - Red styling</p>
					<p><code>dividerBefore</code> - Add separator</p>
					<p><code>disabled</code> - Boolean or callback</p>
					<p><code>visible</code> - Boolean or callback</p>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<CodeBlock
					codeContent={`grid.contextMenu = [
  {
    id: 'copy',
    label: 'Copy',
    icon: 'C',
    onclick: (ctx) => {
      navigator.clipboard.writeText(
        String(ctx.cellValue)
      );
    }
  },
  {
    id: 'edit',
    label: 'Edit Row',
    icon: 'E',
    onclick: (ctx) => {
      openEditDialog(ctx.row);
    }
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: 'X',
    danger: true,
    dividerBefore: true,
    onclick: (ctx) => {
      grid.items = grid.items.filter(
        (_, i) => i !== ctx.rowIndex
      );
    }
  }
];`}
					languageType="javascript"
					titleText="Basic Menu"
				/>
			{/snippet}
		</ShowcaseSection>

		<!-- Dynamic Items -->
		<ShowcaseSection
			titleText="Dynamic Menu Items"
			subtitleText="Context-aware labels and visibility"
			demoColumnTitle="Context Object"
			controlsColumnTitle="Dynamic Properties"
			descriptionColumnTitle="Code">

			{#snippet demoContent()}
				<div class="prose">
					<p>The <code>onclick</code> callback receives a context object with:</p>
					<ul>
						<li><code>row</code> - The row data object</li>
						<li><code>rowIndex</code> - Index of the row</li>
						<li><code>colIndex</code> - Index of the column</li>
						<li><code>column</code> - Column definition</li>
						<li><code>cellValue</code> - Value of the clicked cell</li>
					</ul>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<div class="prose small">
					<h5>Callback Properties</h5>
					<p>These accept callbacks for dynamic behavior:</p>
					<ul class="small">
						<li><code>label: (ctx) => string</code></li>
						<li><code>icon: (ctx) => string</code></li>
						<li><code>disabled: (ctx) => boolean</code></li>
						<li><code>visible: (ctx) => boolean</code></li>
					</ul>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<CodeBlock
					codeContent={`grid.contextMenu = [
  {
    id: 'toggle',
    // Dynamic label based on current state
    label: (ctx) => ctx.row.status === 'active'
      ? 'Deactivate'
      : 'Activate',
    icon: (ctx) => ctx.row.status === 'active'
      ? 'X' : 'Y'
  },
  {
    id: 'promote',
    label: 'Promote',
    // Only show for certain departments
    visible: (ctx) =>
      ctx.row.department === 'Engineering',
    // Disable for max salary
    disabled: (ctx) =>
      ctx.row.salary >= 150000
  }
];

// Event before menu opens
grid.oncontextmenuopen = (ctx) => {
  console.log('Opening menu for:', ctx.row);
};`}
					languageType="javascript"
					titleText="Dynamic Items"
				/>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
