<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let contextMenuGrid: any;
	let lastAction = $state<{ command: string; row: number; cell: string; value: unknown } | null>(null);

	const employees = [
		{ id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'active', salary: 95000 },
		{ id: 2, name: 'Bob Smith', email: 'bob@example.com', status: 'pending', salary: 72000 },
		{ id: 3, name: 'Charlie Brown', email: 'charlie@example.com', status: 'inactive', salary: 88000 }
	];

	function logAction(command: string, ctx: any) {
		lastAction = {
			command,
			row: ctx.rowIndex,
			cell: ctx.column.field,
			value: ctx.cellValue
		};
	}

	onMount(async () => {
		await import('@keenmate/web-grid');
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
					icon: '📋',
					shortcut: 'C',
					onclick: (ctx: any) => {
						navigator.clipboard.writeText(String(ctx.cellValue));
						logAction('copy', ctx);
					}
				},
				{
					id: 'edit',
					label: 'Edit Row',
					icon: '✏️',
					shortcut: 'E',
					onclick: (ctx: any) => logAction('edit', ctx)
				},
				{
					id: 'activate',
					label: (ctx: any) => ctx.row.status === 'active' ? 'Deactivate' : 'Activate',
					shortcut: 'A',
					dividerBefore: true,
					onclick: (ctx: any) => logAction(ctx.row.status === 'active' ? 'deactivate' : 'activate', ctx)
				},
				{
					id: 'delete',
					label: 'Delete',
					icon: '🗑️',
					shortcut: 'Delete',
					danger: true,
					dividerBefore: true,
					onclick: (ctx: any) => logAction('delete', ctx)
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
			titleText="CM01 Right-Click Menu"
			subtitleText="Custom actions on right-click"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Configuration">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={contextMenuGrid}
						style="max-height: 300px;"
					></web-grid>
					<p class="small text-muted mt-2">Right-click any cell or use keyboard shortcuts.</p>
					{#if lastAction}
						<div class="console-log mt-2">
							<code>command: "{lastAction.command}", row: {lastAction.row}, cell: "{lastAction.cell}", value: "{lastAction.value}"</code>
						</div>
					{/if}
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`grid.contextMenu = [
  {
    id: 'copy',
    label: 'Copy',
    icon: '📋',
    shortcut: 'C',  // Press C to trigger
    onclick: (ctx) => {
      navigator.clipboard.writeText(
        String(ctx.cellValue)
      );
    }
  },
  {
    id: 'edit',
    label: 'Edit Row',
    icon: '✏️',
    shortcut: 'E',
    onclick: (ctx) => {
      openEditDialog(ctx.row);
    }
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: '🗑️',
    shortcut: 'Delete',
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

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Menu Item Properties</h5>
					<p><code>id</code> - Unique identifier</p>
					<p><code>label</code> - Display text (string or callback)</p>
					<p><code>icon</code> - Icon (string or callback)</p>
					<p><code>shortcut</code> - Keyboard shortcut (e.g., "C", "Delete")</p>
					<p><code>danger</code> - Red styling</p>
					<p><code>dividerBefore</code> - Add separator</p>
					<p><code>disabled</code> - Boolean or callback</p>
					<p><code>visible</code> - Boolean or callback</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Dynamic Items -->
		<ShowcaseSection
			titleText="CM02 Dynamic Menu Items"
			subtitleText="Context-aware labels and visibility"
			col1Title="Context Object"
			col2Title="Code"
			col3Title="Dynamic Properties">

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

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Callback Properties</h5>
					<p>These accept callbacks for dynamic behavior:</p>
					<ul>
						<li><code>label: (ctx) => string</code></li>
						<li><code>icon: (ctx) => string</code></li>
						<li><code>disabled: (ctx) => boolean</code></li>
						<li><code>visible: (ctx) => boolean</code></li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>

<style>
	.console-log {
		background: #1e1e1e;
		color: #9cdcfe;
		padding: 8px 12px;
		border-radius: 4px;
		font-family: 'Consolas', 'Monaco', monospace;
		font-size: 13px;
	}
</style>
