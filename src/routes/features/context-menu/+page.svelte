<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let contextMenuGrid: any;
	let cellAwareGrid: any;
	let positionGrid: any;
	let headerMenuGrid: any;
	let columnVisibilityGrid: any;
	let customHeaderGrid: any;
	let multiSortGrid: any;
	let lastAction = $state<{ command: string; row: number; cell: string; value: unknown } | null>(null);
	let cellAwareAction = $state<{ command: string; column: string; value: unknown } | null>(null);
	let headerAction = $state<{ action: string; column: string } | null>(null);
	let sortState = $state<{ column: string; direction: string }[]>([]);

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

		// CM05 Header Context Menu Grid
		if (headerMenuGrid) {
			headerMenuGrid.columns = [
				{ field: 'id', title: 'ID', width: '60px' },
				{ field: 'name', title: 'Name', width: '150px' },
				{ field: 'email', title: 'Email' },
				{ field: 'status', title: 'Status', width: '100px' },
				{ field: 'salary', title: 'Salary', width: '100px', horizontalAlign: 'right' }
			];
			headerMenuGrid.items = [...employees];
			headerMenuGrid.sortMode = 'single';
			headerMenuGrid.headerContextMenu = [
				'sortAsc',
				'sortDesc',
				'clearSort',
				{ dividerBefore: true },
				'freezeColumn',
				'unfreezeColumn',
				{ dividerBefore: true },
				'hideColumn'
			];
			headerMenuGrid.onheadercontextmenuopen = (ctx: any) => {
				headerAction = { action: 'menu opened', column: ctx.column.field };
			};
		}

		// CM06 Column Visibility Grid
		if (columnVisibilityGrid) {
			columnVisibilityGrid.columns = [
				{ field: 'id', title: 'ID', width: '60px' },
				{ field: 'name', title: 'Name', width: '150px' },
				{ field: 'email', title: 'Email' },
				{ field: 'status', title: 'Status', width: '100px' },
				{ field: 'salary', title: 'Salary', width: '100px', horizontalAlign: 'right' }
			];
			columnVisibilityGrid.items = [...employees];
			columnVisibilityGrid.headerContextMenu = [
				'sortAsc',
				'sortDesc',
				{ dividerBefore: true },
				'columnVisibility',
				'hideColumn'
			];
		}

		// CM07 Custom Header Actions Grid
		if (customHeaderGrid) {
			customHeaderGrid.columns = [
				{ field: 'id', title: 'ID', width: '60px', isSortable: false },
				{ field: 'name', title: 'Name', width: '150px' },
				{ field: 'email', title: 'Email' },
				{ field: 'status', title: 'Status', width: '100px' }
			];
			customHeaderGrid.items = [...employees];
			customHeaderGrid.sortMode = 'single';
			customHeaderGrid.headerContextMenu = [
				'sortAsc',
				'sortDesc',
				{ dividerBefore: true },
				{
					id: 'copyColumnName',
					label: 'Copy Column Name',
					icon: '📋',
					onclick: (ctx: any) => {
						navigator.clipboard.writeText(ctx.column.title);
						headerAction = { action: 'copied', column: ctx.column.title };
					}
				},
				{
					id: 'columnInfo',
					label: (ctx: any) => `Info: ${ctx.column.field}`,
					icon: 'ℹ️',
					onclick: (ctx: any) => {
						headerAction = { action: 'info', column: ctx.column.field };
					}
				},
				{
					id: 'resetWidth',
					label: 'Reset Column Width',
					icon: '↔️',
					visible: (ctx: any) => ctx.column.width !== undefined,
					onclick: (ctx: any) => {
						headerAction = { action: 'reset width', column: ctx.column.field };
					}
				}
			];
		}

		// CM08 Multi-Sort Grid
		if (multiSortGrid) {
			multiSortGrid.columns = [
				{ field: 'id', title: 'ID', width: '60px' },
				{ field: 'name', title: 'Name', width: '150px' },
				{ field: 'email', title: 'Email' },
				{ field: 'status', title: 'Status', width: '100px' },
				{ field: 'salary', title: 'Salary', width: '100px', horizontalAlign: 'right' }
			];
			multiSortGrid.items = [...employees];
			multiSortGrid.sortMode = 'multi';
			multiSortGrid.headerContextMenu = [
				'sortAsc',
				'sortDesc',
				'clearSort'
			];
			// Track sort state changes
			const updateSortState = () => {
				sortState = [...multiSortGrid.sort];
			};
			multiSortGrid.ondatarequest = updateSortState;
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

		<!-- Header Context Menu Section Divider -->
		<div class="my-5 pt-4 border-top">
			<h2 class="h4 mb-3">Header Context Menu</h2>
			<p class="text-muted">Right-click menus for column headers with predefined and custom actions.</p>
		</div>

		<!-- CM05 Header Context Menu -->
		<ShowcaseSection
			titleText="CM05 Header Context Menu"
			subtitleText="Right-click on column headers for sorting, freezing, and hiding columns"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Predefined Actions">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={headerMenuGrid}
						style="max-height: 300px; max-width: 700px;"
					></web-grid>
					<p class="small text-muted mt-2">Right-click any column header to see the context menu.</p>
					{#if headerAction}
						<div class="console-log mt-2">
							<code>action: "{headerAction.action}", column: "{headerAction.column}"</code>
						</div>
					{/if}
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`grid.headerContextMenu = [
  'sortAsc',
  'sortDesc',
  'clearSort',
  { dividerBefore: true },
  'freezeColumn',
  'unfreezeColumn',
  { dividerBefore: true },
  'hideColumn'
];

// Callback before menu opens
grid.onheadercontextmenuopen = (ctx) => {
  console.log('Column:', ctx.column.field);
  // Return false to prevent opening
};`}
					languageType="javascript"
					titleText="Header Menu Config"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Predefined Actions</h5>
					<ul>
						<li><code>'sortAsc'</code> - Sort ascending</li>
						<li><code>'sortDesc'</code> - Sort descending</li>
						<li><code>'clearSort'</code> - Clear sort (auto-hidden if not sorted)</li>
						<li><code>'freezeColumn'</code> - Freeze up to this column</li>
						<li><code>'unfreezeColumn'</code> - Unfreeze (auto-hidden if not frozen)</li>
						<li><code>'hideColumn'</code> - Hide this column</li>
						<li><code>'columnVisibility'</code> - Submenu to show/hide columns</li>
					</ul>
					<h5>Auto-Visibility</h5>
					<p>Some actions auto-hide based on state (clearSort, freeze/unfreeze).</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- CM06 Column Visibility -->
		<ShowcaseSection
			titleText="CM06 Column Visibility"
			subtitleText="Show/hide columns via submenu with 'Show all' option"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Features">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={columnVisibilityGrid}
						style="max-height: 300px; max-width: 700px;"
					></web-grid>
					<p class="small text-muted mt-2">Right-click a header → Column Visibility to toggle columns.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`grid.headerContextMenu = [
  'sortAsc',
  'sortDesc',
  { dividerBefore: true },
  'columnVisibility',  // Submenu
  'hideColumn'
];

// The submenu shows:
// - "Show all" option at the top
// - All columns with checkboxes
// - Hidden columns show unchecked
// - Menu stays open for toggling

// Columns use 'hidden' property:
grid.columns = [
  { field: 'id', title: 'ID' },
  { field: 'name', title: 'Name', isHidden: true }
];`}
					languageType="javascript"
					titleText="Column Visibility"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Submenu Features</h5>
					<ul>
						<li><strong>Show all</strong> - Unhide all columns at once</li>
						<li><strong>Checkboxes</strong> - ☑ visible, ☐ hidden</li>
						<li><strong>Stays open</strong> - Toggle multiple columns</li>
						<li><strong>Reactive</strong> - Updates after each toggle</li>
					</ul>
					<h5>column.hidden Property</h5>
					<p>Hidden columns stay in the array but are excluded from rendering. They can be shown again via the submenu.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- CM07 Custom Header Actions -->
		<ShowcaseSection
			titleText="CM07 Custom Header Actions"
			subtitleText="Mix predefined actions with custom menu items"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="HeaderMenuContext">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={customHeaderGrid}
						style="max-height: 300px; max-width: 600px;"
					></web-grid>
					<p class="small text-muted mt-2">Right-click headers. Note: ID column has isSortable: false.</p>
					{#if headerAction}
						<div class="console-log mt-2">
							<code>action: "{headerAction.action}", column: "{headerAction.column}"</code>
						</div>
					{/if}
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Column with isSortable: false
columns = [
  { field: 'id', title: 'ID', isSortable: false },
  { field: 'name', title: 'Name' }
];

grid.headerContextMenu = [
  'sortAsc',  // Hidden if isSortable: false
  'sortDesc',
  { dividerBefore: true },
  {
    id: 'copyColumnName',
    label: 'Copy Column Name',
    icon: '📋',
    onclick: (ctx) => {
      navigator.clipboard.writeText(ctx.column.title);
    }
  },
  {
    id: 'columnInfo',
    // Dynamic label using context
    label: (ctx) => \`Info: \${ctx.column.field}\`,
    icon: 'ℹ️'
  },
  {
    id: 'resetWidth',
    label: 'Reset Column Width',
    // Only show if column has width set
    visible: (ctx) => ctx.column.width !== undefined
  }
];`}
					languageType="javascript"
					titleText="Custom Actions"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>HeaderMenuContext</h5>
					<p>The context object passed to callbacks:</p>
					<ul>
						<li><code>column</code> - Column definition</li>
						<li><code>field</code> - Column field name</li>
						<li><code>columnIndex</code> - Visual index</li>
						<li><code>sortDirection</code> - 'asc' | 'desc' | null</li>
						<li><code>isFrozen</code> - Is column frozen</li>
						<li><code>allColumns</code> - All columns array</li>
						<li><code>labels</code> - For translations</li>
					</ul>
					<h5>isSortable: false</h5>
					<p>Hides sort options in header context menu.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- CM08 Multi-Sort via Menu -->
		<ShowcaseSection
			titleText="CM08 Multi-Sort via Menu"
			subtitleText="Ctrl+click Sort Ascending/Descending to add to existing sort"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="How It Works">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={multiSortGrid}
						style="max-height: 300px; max-width: 700px;"
					></web-grid>
					<p class="small text-muted mt-2">Try: Right-click → Sort Asc on Name, then Ctrl+Right-click → Sort Asc on Status.</p>
					{#if sortState.length > 0}
						<div class="console-log mt-2">
							<code>sort: [{sortState.map(s => `{column: "${s.column}", direction: "${s.direction}"}`).join(', ')}]</code>
						</div>
					{:else}
						<div class="console-log mt-2">
							<code>sort: []</code>
						</div>
					{/if}
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Enable multi-sort mode
grid.sortMode = 'multi';

grid.headerContextMenu = [
  'sortAsc',   // Click = replace sort
  'sortDesc',  // Ctrl+click = add to sort
  'clearSort'
];

// Behavior:
// - Normal click: Replaces existing sort
// - Ctrl+click: Adds column to sort
//   (or updates if already sorted)

// Same behavior as Ctrl+clicking
// directly on column headers.`}
					languageType="javascript"
					titleText="Multi-Sort"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Requirements</h5>
					<p><code>sortMode = 'multi'</code> must be set.</p>
					<h5>Behavior</h5>
					<ul>
						<li><strong>Normal click</strong> - Replaces all existing sorts with single column</li>
						<li><strong>Ctrl+click</strong> - Adds column to existing sort order</li>
					</ul>
					<h5>Consistency</h5>
					<p>This matches the Ctrl+click behavior when clicking directly on column headers.</p>
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
