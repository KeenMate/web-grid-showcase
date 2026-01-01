<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let basicToolbarGrid: any;
	let customToolbarGrid: any;

	let employees = [
		{ id: 1, name: 'Alice Johnson', department: 'Engineering', salary: 95000 },
		{ id: 2, name: 'Bob Smith', department: 'Marketing', salary: 72000 },
		{ id: 3, name: 'Charlie Brown', department: 'Engineering', salary: 88000 }
	];

	onMount(() => {
		const columns = [
			{ field: 'id', title: 'ID', width: '60px' },
			{ field: 'name', title: 'Name', width: '150px' },
			{ field: 'department', title: 'Department', width: '120px' },
			{ field: 'salary', title: 'Salary', width: '100px', align: 'right', formatCallback: (v: number) => '$' + v.toLocaleString() }
		];

		// Basic Toolbar
		if (basicToolbarGrid) {
			basicToolbarGrid.columns = columns;
			basicToolbarGrid.items = [...employees];
			basicToolbarGrid.showRowToolbar = true;
			basicToolbarGrid.rowToolbar = ['add', 'duplicate', 'delete'];
			basicToolbarGrid.ontoolbarclick = (e: any) => {
				console.log('Toolbar clicked:', e.item.id, 'Row:', e.rowIndex);
			};
		}

		// Custom Toolbar
		if (customToolbarGrid) {
			customToolbarGrid.columns = columns;
			customToolbarGrid.items = [...employees];
			customToolbarGrid.showRowToolbar = true;
			customToolbarGrid.toolbarTrigger = 'hover';
			customToolbarGrid.rowToolbar = [
				{ id: 'edit', icon: 'E', title: 'Edit', label: 'Edit' },
				{ id: 'archive', icon: 'A', title: 'Archive', group: 2 },
				{ id: 'delete', icon: 'X', title: 'Delete', danger: true, group: 2 }
			];
		}
	});
</script>

<DocLayout
	titleText="Row Toolbar"
	descriptionText="Floating action toolbar for row operations">

	<div class="py-4">
		<!-- Basic Toolbar -->
		<ShowcaseSection
			titleText="Predefined Actions"
			subtitleText="Built-in toolbar actions"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Configuration"
			descriptionColumnTitle="Code">

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
				<div class="prose small">
					<h5>Predefined Actions</h5>
					<ul class="small">
						<li><code>'add'</code> - Add new row</li>
						<li><code>'delete'</code> - Delete row</li>
						<li><code>'duplicate'</code> - Clone row</li>
						<li><code>'moveUp'</code> - Move row up</li>
						<li><code>'moveDown'</code> - Move row down</li>
					</ul>
					<h5>Trigger Modes</h5>
					<p><code>toolbarTrigger</code>:</p>
					<ul class="small">
						<li><code>hover</code> - Show on hover (default)</li>
						<li><code>click</code> - Show on row click</li>
						<li><code>button</code> - Show via button</li>
					</ul>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<CodeBlock
					codeContent={`grid.showRowToolbar = true;
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
		</ShowcaseSection>

		<!-- Custom Toolbar -->
		<ShowcaseSection
			titleText="Custom Actions"
			subtitleText="Define your own toolbar items"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Configuration"
			descriptionColumnTitle="Code">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={customToolbarGrid}
						style="max-height: 300px;"
					></web-grid>
					<p class="small text-muted mt-2">Custom Edit, Archive, and Delete actions.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<div class="prose small">
					<h5>Custom Item Properties</h5>
					<p><code>id</code> - Unique identifier</p>
					<p><code>icon</code> - Emoji or text icon</p>
					<p><code>title</code> - Tooltip text</p>
					<p><code>label</code> - Button text</p>
					<p><code>danger</code> - Red styling</p>
					<p><code>group</code> - Group number for dividers</p>
					<p><code>disabled</code> - Boolean or callback</p>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<CodeBlock
					codeContent={`grid.showRowToolbar = true;
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
		</ShowcaseSection>

		<!-- Positioning -->
		<ShowcaseSection
			titleText="Toolbar Positioning"
			subtitleText="Control where the toolbar appears"
			demoColumnTitle="Explanation"
			controlsColumnTitle="Options"
			descriptionColumnTitle="Code">

			{#snippet demoContent()}
				<div class="prose">
					<p>The toolbar automatically positions itself based on available space:</p>
					<ul>
						<li><strong>Left/Right</strong> - Based on horizontal space</li>
						<li><strong>Top</strong> - When insufficient vertical space</li>
					</ul>
					<p>Use <code>toolbarAlign</code> and <code>toolbarTopPosition</code> to customize.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<div class="prose small">
					<h5>toolbarAlign</h5>
					<ul class="small">
						<li><code>center</code> - Vertically centered (default)</li>
						<li><code>top</code> - Aligned to top of row</li>
					</ul>
					<h5>toolbarTopPosition</h5>
					<p>When positioned above row:</p>
					<ul class="small">
						<li><code>start</code> - Left edge</li>
						<li><code>center</code> - Centered (default)</li>
						<li><code>end</code> - Right edge</li>
						<li><code>cursor</code> - At mouse position</li>
					</ul>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<CodeBlock
					codeContent={`grid.showRowToolbar = true;
grid.toolbarAlign = 'center';
grid.toolbarTopPosition = 'center';

// Multi-row layout
grid.rowToolbar = [
  { id: 'view', icon: 'V', row: 1 },
  { id: 'edit', icon: 'E', row: 1 },
  { id: 'delete', icon: 'X', row: 2, danger: true }
];`}
					languageType="javascript"
					titleText="Positioning"
				/>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
