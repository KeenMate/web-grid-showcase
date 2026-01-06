<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let contextMenuGrid: any;
	let cellAwareGrid: any;
	let positionGrid: any;
	let lastAction = $state<{ command: string; row: number; cell: string; value: unknown } | null>(null);
	let cellAwareAction = $state<{ command: string; column: string; value: unknown } | null>(null);

	// CM04 Position configuration
	let xOffset = $state(8);
	let yOffset = $state(0);

	$effect(() => {
		if (positionGrid) {
			positionGrid.contextMenuXOffset = xOffset;
			positionGrid.contextMenuYOffset = yOffset;
		}
	});

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

		// Cell-Aware Context Menu
		if (cellAwareGrid) {
			cellAwareGrid.columns = [
				{ field: 'id', title: 'ID', width: '60px' },
				{ field: 'name', title: 'Name', width: '150px' },
				{ field: 'email', title: 'Email' },
				{ field: 'status', title: 'Status', width: '100px' }
			];
			cellAwareGrid.items = [...employees];
			cellAwareGrid.contextMenu = [
				{
					id: 'copy',
					label: (ctx: any) => `Copy "${ctx.cellValue}"`,
					icon: '📋',
					onclick: (ctx: any) => {
						navigator.clipboard.writeText(String(ctx.cellValue));
						cellAwareAction = { command: 'copy', column: ctx.column.field, value: ctx.cellValue };
					}
				},
				{
					id: 'sendEmail',
					label: (ctx: any) => `Send email to ${ctx.cellValue}`,
					icon: '✉️',
					visible: (ctx: any) => ctx.column.field === 'email',
					disabled: (ctx: any) => !ctx.cellValue || !String(ctx.cellValue).includes('@'),
					onclick: (ctx: any) => {
						cellAwareAction = { command: 'sendEmail', column: ctx.column.field, value: ctx.cellValue };
					}
				},
				{
					id: 'setActive',
					label: 'Set Active',
					icon: '✓',
					visible: (ctx: any) => ctx.column.field === 'status' && ctx.cellValue !== 'active',
					onclick: (ctx: any) => {
						cellAwareAction = { command: 'setActive', column: ctx.column.field, value: ctx.cellValue };
					}
				},
				{
					id: 'setInactive',
					label: 'Set Inactive',
					icon: '✗',
					visible: (ctx: any) => ctx.column.field === 'status' && ctx.cellValue !== 'inactive',
					onclick: (ctx: any) => {
						cellAwareAction = { command: 'setInactive', column: ctx.column.field, value: ctx.cellValue };
					}
				},
				{
					id: 'clearValue',
					label: 'Clear Value',
					icon: '🗑️',
					dividerBefore: true,
					disabled: (ctx: any) => ctx.column.field === 'id' || !ctx.cellValue,
					onclick: (ctx: any) => {
						cellAwareAction = { command: 'clearValue', column: ctx.column.field, value: ctx.cellValue };
					}
				}
			];
		}

		// Position Grid
		if (positionGrid) {
			positionGrid.columns = [
				{ field: 'id', title: 'ID', width: '60px' },
				{ field: 'name', title: 'Name', width: '150px' },
				{ field: 'email', title: 'Email' },
				{ field: 'status', title: 'Status', width: '100px' }
			];
			positionGrid.items = [...employees];
			positionGrid.contextMenuXOffset = xOffset;
			positionGrid.contextMenuYOffset = yOffset;
			positionGrid.contextMenu = [
				{ id: 'action1', label: 'Action 1', icon: '📋' },
				{ id: 'action2', label: 'Action 2', icon: '✏️' },
				{ id: 'action3', label: 'Action 3', icon: '🗑️', danger: true, dividerBefore: true }
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
			subtitleText="Custom context menu with icons, keyboard shortcuts, and dividers"
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
			subtitleText="Dynamic labels, icons, disabled state, and visibility based on row data"
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

		<!-- Cell-Aware Actions -->
		<ShowcaseSection
			titleText="CM03 Cell-Aware Actions"
			subtitleText="Show different menu items based on clicked column and cell value"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Context Properties">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={cellAwareGrid}
						style="max-height: 300px;"
					></web-grid>
					<p class="small text-muted mt-2">Right-click different columns to see different menu items.</p>
					{#if cellAwareAction}
						<div class="console-log mt-2">
							<code>command: "{cellAwareAction.command}", column: "{cellAwareAction.column}", value: "{cellAwareAction.value}"</code>
						</div>
					{/if}
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`grid.contextMenu = [
  {
    id: 'copy',
    // Dynamic label shows cell value
    label: (ctx) => \`Copy "\${ctx.cellValue}"\`,
    icon: '📋',
    onclick: (ctx) => {
      navigator.clipboard.writeText(ctx.cellValue);
    }
  },
  {
    id: 'sendEmail',
    label: (ctx) => \`Send email to \${ctx.cellValue}\`,
    icon: '✉️',
    // Only visible on email column
    visible: (ctx) => ctx.column.field === 'email',
    // Disabled if not a valid email
    disabled: (ctx) => !ctx.cellValue?.includes('@')
  },
  {
    id: 'setActive',
    label: 'Set Active',
    // Only on status column, hide if already active
    visible: (ctx) =>
      ctx.column.field === 'status' &&
      ctx.cellValue !== 'active'
  },
  {
    id: 'clearValue',
    label: 'Clear Value',
    dividerBefore: true,
    // Disabled for ID column or empty cells
    disabled: (ctx) =>
      ctx.column.field === 'id' || !ctx.cellValue
  }
];`}
					languageType="javascript"
					titleText="Cell-Aware Menu"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Context Object</h5>
					<p><code>ctx.column.field</code> - Column field name</p>
					<p><code>ctx.cellValue</code> - Cell's current value</p>
					<p><code>ctx.colIndex</code> - Column index</p>
					<p><code>ctx.row</code> - Full row data</p>
					<p><code>ctx.rowIndex</code> - Row index</p>
					<h5>Use Cases</h5>
					<ul>
						<li>Email actions only on email column</li>
						<li>Status toggles only on status column</li>
						<li>Disable "Clear" for required fields</li>
						<li>Dynamic labels with cell values</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Menu Positioning -->
		<ShowcaseSection
			titleText="CM04 Menu Positioning"
			subtitleText="Adjust horizontal and vertical offset of the context menu from click position"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Configuration">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={positionGrid}
						style="max-height: 300px;"
					></web-grid>
					<p class="small text-muted mt-2">Right-click any cell to see the menu position.</p>
					<div class="offset-controls mt-3">
						<div class="offset-control">
							<label for="x-offset">X Offset: <strong>{xOffset}px</strong></label>
							<input
								type="range"
								id="x-offset"
								min="-50"
								max="50"
								bind:value={xOffset}
							/>
						</div>
						<div class="offset-control">
							<label for="y-offset">Y Offset: <strong>{yOffset}px</strong></label>
							<input
								type="range"
								id="y-offset"
								min="-50"
								max="50"
								bind:value={yOffset}
							/>
						</div>
					</div>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Horizontal offset (positive = right)
grid.contextMenuXOffset = ${xOffset};

// Vertical offset (positive = down)
grid.contextMenuYOffset = ${yOffset};

// The menu still uses floating-ui
// for screen edge handling, so it
// will flip/shift if needed to stay
// within viewport bounds.`}
					languageType="javascript"
					titleText="Offset Config"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Offset Properties</h5>
					<p><code>contextMenuXOffset</code> - Horizontal distance from click (default: 0)</p>
					<p><code>contextMenuYOffset</code> - Vertical distance from click (default: 4)</p>
					<h5>Values</h5>
					<ul>
						<li>Positive X = menu appears right of cursor</li>
						<li>Negative X = menu appears left of cursor</li>
						<li>Positive Y = menu appears below cursor</li>
						<li>Negative Y = menu appears above cursor</li>
					</ul>
					<h5>Edge Handling</h5>
					<p>The menu automatically flips or shifts to stay within viewport bounds.</p>
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

	.offset-controls {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.offset-control {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.offset-control label {
		font-size: 13px;
	}

	.offset-control input[type="range"] {
		width: 100%;
	}
</style>
