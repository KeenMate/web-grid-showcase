<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let basicToolbarGrid: any;
	let customToolbarGrid: any;
	let positioningGrid: any;
	let inlineToolbarGrid: any;

	let toolbarPosition = $state('auto');
	let toolbarVerticalAlign = $state('bottom');
	let toolbarHorizontalAlign = $state('center');

	let employees = [
		{ id: 1, name: 'Alice Johnson', department: 'Engineering', salary: 95000 },
		{ id: 2, name: 'Bob Smith', department: 'Marketing', salary: 72000 },
		{ id: 3, name: 'Charlie Brown', department: 'Engineering', salary: 88000 }
	];

	onMount(async () => {
		await import('@keenmate/web-grid');
		const columns = [
			{ field: 'id', title: 'ID', width: '60px' },
			{ field: 'name', title: 'Name', width: '150px' },
			{ field: 'department', title: 'Department', width: '120px' },
			{ field: 'salary', title: 'Salary', width: '100px', horizontalAlign: 'right', formatCallback: (v: number) => '$' + v.toLocaleString() }
		];

		// Basic Toolbar
		if (basicToolbarGrid) {
			basicToolbarGrid.columns = columns;
			basicToolbarGrid.items = [...employees];
			basicToolbarGrid.isRowToolbarVisible = true;
			basicToolbarGrid.rowToolbar = ['add', 'duplicate', 'delete'];
			basicToolbarGrid.ontoolbarclick = (e: any) => {
				console.log('Toolbar clicked:', e.item.id, 'Row:', e.rowIndex);
			};
		}

		// Custom Toolbar with Keyboard Shortcuts
		if (customToolbarGrid) {
			customToolbarGrid.columns = columns;
			customToolbarGrid.items = [...employees];
			customToolbarGrid.isRowToolbarVisible = true;
			customToolbarGrid.toolbarTrigger = 'hover';
			customToolbarGrid.rowToolbar = [
				{ id: 'edit', icon: 'E', title: 'Edit (E)', label: 'Edit' },
				{ id: 'archive', icon: 'A', title: 'Archive (A)', group: 2 },
				{ id: 'delete', icon: 'X', title: 'Delete (Delete)', danger: true, group: 2 }
			];
			// Keyboard shortcuts work while hovering (toolbar visible)
			customToolbarGrid.rowShortcuts = [
				{
					key: 'e',
					id: 'edit',
					label: 'Edit row',
					action: (ctx: any) => {
						console.log('Edit shortcut:', ctx.row.name);
						alert(`Edit: ${ctx.row.name}`);
					}
				},
				{
					key: 'a',
					id: 'archive',
					label: 'Archive row',
					action: (ctx: any) => {
						console.log('Archive shortcut:', ctx.row.name);
						alert(`Archive: ${ctx.row.name}`);
					}
				},
				{
					key: 'Delete',
					id: 'delete',
					label: 'Delete row',
					action: (ctx: any) => {
						console.log('Delete shortcut:', ctx.row.name);
						if (confirm(`Delete ${ctx.row.name}?`)) {
							customToolbarGrid.items = customToolbarGrid.items.filter(
								(_: any, i: number) => i !== ctx.rowIndex
							);
						}
					}
				}
			];
		}

		// Positioning Toolbar - more rows to demonstrate top positioning
		if (positioningGrid) {
			const moreEmployees = [
				...employees,
				{ id: 4, name: 'Diana Ross', department: 'Sales', salary: 67000 },
				{ id: 5, name: 'Eve Wilson', department: 'Engineering', salary: 105000 },
				{ id: 6, name: 'Frank Miller', department: 'Marketing', salary: 78000 },
				{ id: 7, name: 'Grace Lee', department: 'Sales', salary: 82000 }
			];
			positioningGrid.columns = columns;
			positioningGrid.items = moreEmployees;
			positioningGrid.isRowToolbarVisible = true;
			positioningGrid.toolbarTrigger = 'hover';
			positioningGrid.toolbarPosition = toolbarPosition;
			positioningGrid.toolbarVerticalAlign = toolbarVerticalAlign;
			positioningGrid.toolbarHorizontalAlign = toolbarHorizontalAlign;
			// Multi-row toolbar with groups
			positioningGrid.rowToolbar = [
				// Row 1: Move actions (group 1) | CRUD actions (group 2)
				{ id: 'moveUp', type: 'moveUp', icon: '↑', title: 'Move up', row: 1, group: 1 },
				{ id: 'moveDown', type: 'moveDown', icon: '↓', title: 'Move down', row: 1, group: 1 },
				{ id: 'add', type: 'add', icon: '+', title: 'Add', row: 1, group: 2 },
				{ id: 'duplicate', type: 'duplicate', icon: '⧉', title: 'Duplicate', row: 1, group: 2 },
				{ id: 'delete', type: 'delete', icon: '−', title: 'Delete', danger: true, row: 1, group: 2 },
				// Row 2: Custom actions
				{ id: 'view', icon: '👁', title: 'Preview', label: 'View', row: 2, group: 1 },
				{ id: 'export', icon: '📤', title: 'Export row', row: 2, group: 1 },
				{ id: 'archive', icon: '📦', title: 'Archive', row: 2, group: 2 }
			];
		}

		// Inline Actions Column
		if (inlineToolbarGrid) {
			const inlineEmployees = [
				{ id: 1, name: 'Alice Johnson', department: 'Engineering', status: 'Active' },
				{ id: 2, name: 'Bob Smith', department: 'Marketing', status: 'Done' },
				{ id: 3, name: 'Charlie Brown', department: 'Engineering', status: 'Active' },
				{ id: 4, name: 'Diana Ross', department: 'Sales', status: 'Protected' }
			];
			inlineToolbarGrid.columns = [
				{ field: 'id', title: 'ID', width: '50px' },
				{ field: 'name', title: 'Name', width: '140px' },
				{ field: 'department', title: 'Department', width: '110px' },
				{ field: 'status', title: 'Status', width: '80px' }
			];
			inlineToolbarGrid.items = inlineEmployees;
			inlineToolbarGrid.isRowToolbarVisible = true;
			inlineToolbarGrid.toolbarPosition = 'inline';
			inlineToolbarGrid.inlineActionsTitle = 'Actions';
			inlineToolbarGrid.rowToolbar = [
				{
					id: 'edit',
					icon: '✏️',
					title: 'Edit',
					disabled: (row: any) => row.status === 'Done'
				},
				{
					id: 'delete',
					icon: '🗑️',
					title: 'Delete',
					danger: true,
					hidden: (row: any) => row.status === 'Protected'
				},
				{
					id: 'archive',
					icon: '📦',
					title: 'Archive'
				}
			];
			// Keyboard shortcuts work on hovered row
			inlineToolbarGrid.rowShortcuts = [
				{
					key: 'Delete',
					id: 'delete',
					label: 'Delete row',
					action: (ctx: any) => {
						if (ctx.row.status === 'Protected') {
							alert('Cannot delete protected rows');
							return;
						}
						if (confirm(`Delete ${ctx.row.name}?`)) {
							inlineToolbarGrid.items = inlineToolbarGrid.items.filter(
								(_: any, i: number) => i !== ctx.rowIndex
							);
						}
					}
				},
				{
					key: 'a',
					id: 'archive',
					label: 'Archive row',
					action: (ctx: any) => alert(`Archive: ${ctx.row.name}`)
				}
			];
			inlineToolbarGrid.ontoolbarclick = (e: any) => {
				if (e.item.id === 'edit') alert(`Edit: ${e.row.name}`);
				if (e.item.id === 'archive') alert(`Archive: ${e.row.name}`);
				if (e.item.id === 'delete') {
					if (confirm(`Delete ${e.row.name}?`)) {
						inlineToolbarGrid.items = inlineToolbarGrid.items.filter(
							(_: any, i: number) => i !== e.rowIndex
						);
					}
				}
			};
		}
	});

	function updateToolbarPosition(value: string) {
		toolbarPosition = value;
		if (positioningGrid) {
			positioningGrid.toolbarPosition = value;
		}
	}

	function updateToolbarVerticalAlign(value: string) {
		toolbarVerticalAlign = value;
		if (positioningGrid) {
			positioningGrid.toolbarVerticalAlign = value;
		}
	}

	function updateToolbarHorizontalAlign(value: string) {
		toolbarHorizontalAlign = value;
		if (positioningGrid) {
			positioningGrid.toolbarHorizontalAlign = value;
		}
	}
</script>

<DocLayout
	titleText="Row Toolbar"
	descriptionText="Floating action toolbar for row operations">

	<div class="py-4">
		<!-- Basic Toolbar -->
		<ShowcaseSection
			titleText="TB01 Predefined Actions"
			subtitleText="Built-in add, delete, duplicate, and move actions with trigger modes"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Configuration">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={basicToolbarGrid}
						style="max-height: 300px;"
					></web-grid>
					<p class="small text-muted mt-2">Hover over rows to see the toolbar.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`grid.isRowToolbarVisible = true;
grid.rowToolbar = ['add', 'duplicate', 'delete'];

// Handle clicks
grid.ontoolbarclick = (e) => {
  console.log('Action:', e.item.id);
  console.log('Row index:', e.rowIndex);
  console.log('Row data:', e.row);

  if (e.item.id === 'delete') {
    grid.items = grid.items.filter(
      (_, i) => i !== e.rowIndex
    );
  }
};`}
					languageType="javascript"
					titleText="Predefined Actions"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Predefined Actions</h5>
					<ul>
						<li><code>'add'</code> - Add new row</li>
						<li><code>'delete'</code> - Delete row</li>
						<li><code>'duplicate'</code> - Clone row</li>
						<li><code>'moveUp'</code> - Move row up</li>
						<li><code>'moveDown'</code> - Move row down</li>
					</ul>
					<h5>Trigger Modes</h5>
					<p><code>toolbarTrigger</code>:</p>
					<ul>
						<li><code>hover</code> - Show on hover (default)</li>
						<li><code>click</code> - Show on row click</li>
						<li><code>button</code> - Show via button</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Custom Toolbar -->
		<ShowcaseSection
			titleText="TB02 Custom Actions"
			subtitleText="Custom toolbar items with icons, groups, danger styling, and keyboard shortcuts"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Configuration">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={customToolbarGrid}
						style="max-height: 300px;"
					></web-grid>
					<p class="small text-muted mt-2">Hover over a row and press E, A, or Delete key.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`grid.isRowToolbarVisible = true;
grid.toolbarTrigger = 'hover';

grid.rowToolbar = [
  {
    id: 'edit',
    icon: 'E',
    title: 'Edit this row',
    label: 'Edit',
    onclick: ({ row, rowIndex }) => {
      openEditDialog(row);
    }
  },
  {
    id: 'archive',
    icon: 'A',
    title: 'Archive',
    group: 2, // Creates divider
    disabled: (row) => row.status === 'archived'
  },
  {
    id: 'delete',
    icon: 'X',
    title: 'Delete',
    danger: true,
    group: 2
  }
];`}
					languageType="javascript"
					titleText="Custom Actions"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Custom Item Properties</h5>
					<p><code>id</code> - Unique identifier</p>
					<p><code>icon</code> - Emoji or text icon</p>
					<p><code>title</code> - Tooltip text</p>
					<p><code>label</code> - Button text</p>
					<p><code>danger</code> - Red styling</p>
					<p><code>group</code> - Group number for dividers</p>
					<p><code>disabled</code> - Boolean or callback</p>
					<h5>Keyboard Shortcuts</h5>
					<p>When toolbar is visible, <code>rowShortcuts</code> work on the hovered row - no cell focus required!</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Positioning & Multi-Row -->
		<ShowcaseSection
			titleText="TB03 Multi-Row & Positioning"
			subtitleText="Multi-row toolbars with groups, position, and alignment options"
			col1Title="Live Demo"
			col2Title="Configuration"
			col3Title="Options">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={positioningGrid}
						style="max-height: 250px;"
					></web-grid>
					<p class="small text-muted mt-2">Hover to see 2-row toolbar with grouped buttons.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<div class="mb-3">
					<label class="form-label fw-bold">toolbarPosition</label>
					<div class="btn-group d-flex" role="group">
						<button
							type="button"
							class="btn btn-sm {toolbarPosition === 'auto' ? 'btn-primary' : 'btn-outline-secondary'}"
							onclick={() => updateToolbarPosition('auto')}>auto</button>
						<button
							type="button"
							class="btn btn-sm {toolbarPosition === 'left' ? 'btn-primary' : 'btn-outline-secondary'}"
							onclick={() => updateToolbarPosition('left')}>left</button>
						<button
							type="button"
							class="btn btn-sm {toolbarPosition === 'right' ? 'btn-primary' : 'btn-outline-secondary'}"
							onclick={() => updateToolbarPosition('right')}>right</button>
						<button
							type="button"
							class="btn btn-sm {toolbarPosition === 'top' ? 'btn-primary' : 'btn-outline-secondary'}"
							onclick={() => updateToolbarPosition('top')}>top</button>
					</div>
					<p class="small text-muted mt-1">Preferred side (falls back if no space)</p>
				</div>

				<div class="mb-3">
					<label class="form-label fw-bold">toolbarVerticalAlign</label>
					<div class="btn-group d-flex" role="group">
						<button
							type="button"
							class="btn btn-sm {toolbarVerticalAlign === 'top' ? 'btn-primary' : 'btn-outline-secondary'}"
							onclick={() => updateToolbarVerticalAlign('top')}>top</button>
						<button
							type="button"
							class="btn btn-sm {toolbarVerticalAlign === 'center' ? 'btn-primary' : 'btn-outline-secondary'}"
							onclick={() => updateToolbarVerticalAlign('center')}>center</button>
						<button
							type="button"
							class="btn btn-sm {toolbarVerticalAlign === 'bottom' ? 'btn-primary' : 'btn-outline-secondary'}"
							onclick={() => updateToolbarVerticalAlign('bottom')}>bottom</button>
					</div>
					<p class="small text-muted mt-1">Vertical alignment: top (rows above), center, bottom (rows below)</p>
				</div>

				<div class="mb-3">
					<label class="form-label fw-bold">toolbarHorizontalAlign</label>
					<div class="btn-group d-flex flex-wrap" role="group">
						<button
							type="button"
							class="btn btn-sm {toolbarHorizontalAlign === 'start' ? 'btn-primary' : 'btn-outline-secondary'}"
							onclick={() => updateToolbarHorizontalAlign('start')}>start</button>
						<button
							type="button"
							class="btn btn-sm {toolbarHorizontalAlign === 'center' ? 'btn-primary' : 'btn-outline-secondary'}"
							onclick={() => updateToolbarHorizontalAlign('center')}>center</button>
						<button
							type="button"
							class="btn btn-sm {toolbarHorizontalAlign === 'end' ? 'btn-primary' : 'btn-outline-secondary'}"
							onclick={() => updateToolbarHorizontalAlign('end')}>end</button>
						<button
							type="button"
							class="btn btn-sm {toolbarHorizontalAlign === 'cursor' ? 'btn-primary' : 'btn-outline-secondary'}"
							onclick={() => updateToolbarHorizontalAlign('cursor')}>cursor</button>
					</div>
					<p class="small text-muted mt-1">Horizontal alignment (top position only)</p>
				</div>

				<CodeBlock
					codeContent={`// Multi-row toolbar with groups
grid.rowToolbar = [
  // Row 1: Move | CRUD
  { id: 'moveUp', icon: '↑', row: 1, group: 1 },
  { id: 'moveDown', icon: '↓', row: 1, group: 1 },
  { id: 'add', icon: '+', row: 1, group: 2 },
  { id: 'delete', icon: '−', row: 1, group: 2 },
  // Row 2: Custom actions
  { id: 'view', icon: '👁', row: 2, group: 1 },
  { id: 'archive', icon: '📦', row: 2, group: 2 }
];

grid.toolbarPosition = '${toolbarPosition}';
grid.toolbarVerticalAlign = '${toolbarVerticalAlign}';`}
					languageType="javascript"
					titleText="Multi-Row Config"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Multi-Row & Groups</h5>
					<p>Use <code>row</code> and <code>group</code> properties:</p>
					<ul>
						<li><code>row: 1</code> - First row of buttons</li>
						<li><code>row: 2</code> - Second row</li>
						<li><code>group: 1, 2...</code> - Creates dividers</li>
					</ul>
					<h5>toolbarPosition</h5>
					<ul>
						<li><code>auto</code> - Auto-detect (default)</li>
						<li><code>left</code> / <code>right</code> / <code>top</code></li>
					</ul>
					<h5>toolbarVerticalAlign</h5>
					<ul>
						<li><code>top</code> - Rows stack above</li>
						<li><code>center</code> - Centered on row</li>
						<li><code>bottom</code> - Rows stack below (default)</li>
					</ul>
					<h5>toolbarHorizontalAlign</h5>
					<ul>
						<li><code>start</code> / <code>center</code> / <code>end</code> / <code>cursor</code></li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Inline Actions Column -->
		<ShowcaseSection
			titleText="TB04 Inline Actions Column"
			subtitleText="Always-visible actions column with per-row disabled/hidden callbacks"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Features">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={inlineToolbarGrid}
						style="max-height: 300px;"
					></web-grid>
					<p class="small text-muted mt-2">Actions always visible. Hover row and press Delete or A key.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`grid.isRowToolbarVisible = true;
grid.toolbarPosition = 'inline';
grid.inlineActionsTitle = 'Actions';

grid.rowToolbar = [
  {
    id: 'edit',
    icon: '✏️',
    title: 'Edit',
    // Disable for completed rows
    disabled: (row) => row.status === 'Done'
  },
  {
    id: 'delete',
    icon: '🗑️',
    title: 'Delete',
    danger: true,
    // Hide for protected rows
    hidden: (row) => row.status === 'Protected'
  },
  {
    id: 'archive',
    icon: '📦',
    title: 'Archive'
  }
];

// Shortcuts work on hovered row
grid.rowShortcuts = [
  {
    key: 'Delete',
    id: 'delete',
    label: 'Delete row',
    action: (ctx) => deleteRow(ctx.rowIndex)
  }
];`}
					languageType="javascript"
					titleText="Inline Configuration"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>When to Use</h5>
					<p>Use <code>inline</code> when actions should always be visible, not hidden behind hover.</p>
					<h5>Key Properties</h5>
					<ul>
						<li><code>toolbarPosition: 'inline'</code></li>
						<li><code>inlineActionsTitle</code> - Column header</li>
					</ul>
					<h5>Per-Row Callbacks</h5>
					<ul>
						<li><code>disabled: (row) => boolean</code> - Grayed out</li>
						<li><code>hidden: (row) => boolean</code> - Not rendered</li>
					</ul>
					<h5>Keyboard Shortcuts</h5>
					<p><code>rowShortcuts</code> work when hovering over a row - no floating toolbar needed!</p>
					<h5>Comparison</h5>
					<table class="table table-sm small">
						<thead><tr><th>Floating</th><th>Inline</th></tr></thead>
						<tbody>
							<tr><td>Appears on hover</td><td>Always visible</td></tr>
							<tr><td>Saves space</td><td>Uses column width</td></tr>
							<tr><td>Good for many actions</td><td>Good for few actions</td></tr>
						</tbody>
					</table>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
