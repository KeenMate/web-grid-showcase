<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	// GM01 - Grid Modes Overview
	let modesGrid: any;
	let activeMode = $state('excel');

	// GM02 - Edit Triggers
	let triggerGrid: any;
	let activeTrigger = $state('dblclick');

	// GM03 - Edit Start Selection
	let selectionGrid: any;
	let activeSelection = $state('selectAll');

	// GM04 - Dropdown Behavior
	let dropdownGrid: any;
	let toggleVisibility = $state('always');
	let showOnFocus = $state(true);
	let openOnEnter = $state(false);

	const employees = [
		{ id: 1, name: 'Alice Johnson', department: 'Engineering', salary: 95000, status: 'active', isRemote: true },
		{ id: 2, name: 'Bob Smith', department: 'Marketing', salary: 72000, status: 'pending', isRemote: false },
		{ id: 3, name: 'Charlie Brown', department: 'Sales', salary: 88000, status: 'active', isRemote: true },
		{ id: 4, name: 'Diana Prince', department: 'Engineering', salary: 105000, status: 'active', isRemote: false },
		{ id: 5, name: 'Eve Wilson', department: 'HR', salary: 68000, status: 'inactive', isRemote: true }
	];

	const departmentOptions = [
		{ value: 'Engineering', label: 'Engineering' },
		{ value: 'Marketing', label: 'Marketing' },
		{ value: 'Sales', label: 'Sales' },
		{ value: 'HR', label: 'HR' },
		{ value: 'Finance', label: 'Finance' }
	];

	const statusOptions = [
		{ value: 'active', label: 'Active' },
		{ value: 'pending', label: 'Pending' },
		{ value: 'inactive', label: 'Inactive' }
	];

	function getMixedColumns() {
		return [
			{ field: 'id', title: 'ID', width: '60px', isEditable: false, horizontalAlign: 'center' },
			{ field: 'name', title: 'Name', width: '140px', editor: 'text' },
			{ field: 'department', title: 'Department', width: '140px', editor: 'combobox', editorOptions: { options: departmentOptions, valueMember: 'value', displayMember: 'label' } },
			{ field: 'salary', title: 'Salary', width: '110px', editor: 'number', horizontalAlign: 'right', formatCallback: (v: number) => '$' + v.toLocaleString(), editorOptions: { min: 0, step: 1000 } },
			{ field: 'status', title: 'Status', width: '110px', editor: 'select', editorOptions: { options: statusOptions, valueMember: 'value', displayMember: 'label' } },
			{ field: 'isRemote', title: 'Remote', width: '80px', editor: 'checkbox', horizontalAlign: 'center' }
		];
	}

	function setMode(mode: string) {
		activeMode = mode;
		if (modesGrid) {
			modesGrid.mode = mode;
		}
	}

	function setTrigger(trigger: string) {
		activeTrigger = trigger;
		if (triggerGrid) {
			triggerGrid.editTrigger = trigger;
		}
	}

	function setSelection(selection: string) {
		activeSelection = selection;
		if (selectionGrid) {
			selectionGrid.editStartSelection = selection;
		}
	}

	$effect(() => {
		if (dropdownGrid) {
			dropdownGrid.dropdownToggleVisibility = toggleVisibility;
		}
	});

	$effect(() => {
		if (dropdownGrid) {
			dropdownGrid.shouldShowDropdownOnFocus = showOnFocus;
		}
	});

	$effect(() => {
		if (dropdownGrid) {
			dropdownGrid.shouldOpenDropdownOnEnter = openOnEnter;
		}
	});

	onMount(async () => {
		await import('@keenmate/web-grid');

		// GM01: Grid Modes Overview
		if (modesGrid) {
			modesGrid.columns = getMixedColumns();
			modesGrid.items = employees.map(e => ({...e}));
			modesGrid.mode = 'excel';
			modesGrid.isStriped = true;
		}

		// GM02: Edit Triggers
		if (triggerGrid) {
			triggerGrid.columns = [
				{ field: 'id', title: 'ID', width: '60px', isEditable: false, horizontalAlign: 'center' },
				{ field: 'name', title: 'Name', width: '150px', editor: 'text' },
				{ field: 'department', title: 'Department', width: '140px', editor: 'text' },
				{ field: 'salary', title: 'Salary', width: '120px', editor: 'number', horizontalAlign: 'right', formatCallback: (v: number) => '$' + v.toLocaleString(), editorOptions: { min: 0, step: 1000 } }
			];
			triggerGrid.items = employees.map(e => ({...e}));
			triggerGrid.isEditable = true;
			triggerGrid.editTrigger = 'dblclick';
			triggerGrid.isStriped = true;
		}

		// GM03: Edit Start Selection
		if (selectionGrid) {
			selectionGrid.columns = [
				{ field: 'name', title: 'Name', width: '180px', editor: 'text' },
				{ field: 'department', title: 'Department', width: '160px', editor: 'text' },
				{ field: 'salary', title: 'Salary', width: '120px', editor: 'number', horizontalAlign: 'right', formatCallback: (v: number) => '$' + v.toLocaleString() }
			];
			selectionGrid.items = employees.map(e => ({...e}));
			selectionGrid.isEditable = true;
			selectionGrid.editTrigger = 'click';
			selectionGrid.editStartSelection = 'selectAll';
			selectionGrid.isStriped = true;
		}

		// GM04: Dropdown Behavior
		if (dropdownGrid) {
			dropdownGrid.columns = [
				{ field: 'name', title: 'Name', width: '140px', editor: 'text' },
				{ field: 'department', title: 'Department', width: '150px', editor: 'combobox', editorOptions: { options: departmentOptions, valueMember: 'value', displayMember: 'label', placeholder: 'Search...' } },
				{ field: 'status', title: 'Status', width: '120px', editor: 'select', editorOptions: { options: statusOptions, valueMember: 'value', displayMember: 'label' } }
			];
			dropdownGrid.items = employees.map(e => ({...e}));
			dropdownGrid.isEditable = true;
			dropdownGrid.editTrigger = 'click';
			dropdownGrid.dropdownToggleVisibility = 'always';
			dropdownGrid.shouldShowDropdownOnFocus = true;
			dropdownGrid.shouldOpenDropdownOnEnter = false;
			dropdownGrid.isStriped = true;
		}
	});
</script>

<style>
	.mode-switcher {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}
	.mode-btn {
		padding: 0.4rem 0.8rem;
		border: 1px solid #d1d5db;
		border-radius: 4px;
		background: white;
		cursor: pointer;
		font-size: 13px;
		font-weight: 500;
	}
	.mode-btn:hover {
		background: #f3f4f6;
	}
	.mode-btn.active {
		background: #667eea;
		color: white;
		border-color: #667eea;
	}
	.mode-details {
		margin-top: 0.75rem;
		padding: 0.6rem;
		background: #f9fafb;
		border-radius: 4px;
		font-size: 13px;
	}
	.mode-details dt {
		font-family: monospace;
		color: #374151;
		font-weight: 600;
	}
	.mode-details dd {
		margin-bottom: 0.3rem;
		margin-left: 0;
		color: #6b7280;
		font-family: monospace;
		font-size: 12px;
	}
	.trigger-desc {
		margin-top: 0.75rem;
		padding: 0.6rem;
		background: #f9fafb;
		border-radius: 4px;
		font-size: 13px;
	}
	.config-group {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
	.config-group label {
		font-weight: 600;
		color: #374151;
	}
	.config-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
	}
	.checkbox-label small {
		color: #9ca3af;
		font-weight: normal;
	}
	.config-output {
		margin-top: 0.25rem;
		padding: 0.4rem 0.6rem;
		background: #f3f4f6;
		border-radius: 4px;
		font-family: monospace;
		font-size: 13px;
	}
	.config-output code {
		color: #1f2937;
	}
	.config-output span {
		color: #059669;
	}
</style>

<DocLayout
	titleText="Grid Modes"
	descriptionText="Pre-configured editing modes, edit triggers, and dropdown behavior">

	<div class="py-4">
		<!-- GM01: Grid Modes Overview -->
		<ShowcaseSection
			titleText="GM01 Grid Modes"
			subtitleText="Switch between read-only, excel, and input-matrix modes"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Mode Details">

			{#snippet demoContent()}
				<div class="grid-demo">
					<div class="mode-switcher mb-2">
						<button class="mode-btn" class:active={activeMode === 'read-only'} onclick={() => setMode('read-only')}>read-only</button>
						<button class="mode-btn" class:active={activeMode === 'excel'} onclick={() => setMode('excel')}>excel</button>
						<button class="mode-btn" class:active={activeMode === 'input-matrix'} onclick={() => setMode('input-matrix')}>input-matrix</button>
					</div>
					<web-grid
						bind:this={modesGrid}
						style="max-height: 300px;"
					></web-grid>
					<p class="small text-muted mt-2">Switch modes to see how editing behavior changes.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Set mode with a single property
grid.mode = '${activeMode}';

// Equivalent to setting these individually:
${activeMode === 'read-only' ? `grid.isEditable = false;
grid.dropdownToggleVisibility = 'on-focus';
grid.cellSelectionMode = 'click';` : ''}${activeMode === 'excel' ? `grid.isEditable = true;
grid.editTrigger = 'navigate';
grid.dropdownToggleVisibility = 'always';
grid.shouldShowDropdownOnFocus = false;
grid.cellSelectionMode = 'click';` : ''}${activeMode === 'input-matrix' ? `grid.isEditable = true;
grid.editTrigger = 'always';
grid.dropdownToggleVisibility = 'always';
grid.shouldShowDropdownOnFocus = true;
grid.cellSelectionMode = 'shift';` : ''}`}
					languageType="javascript"
					titleText="Grid Mode"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					{#if activeMode === 'read-only'}
						<h5>Read-Only Mode</h5>
						<p>Data display only. No editing, no edit triggers.</p>
						<div class="mode-details">
							<dl>
								<dt>isEditable</dt><dd>false</dd>
								<dt>dropdownToggleVisibility</dt><dd>'on-focus'</dd>
								<dt>cellSelectionMode</dt><dd>'click'</dd>
							</dl>
						</div>
						<p class="mt-2"><strong>Best for:</strong> Data display, reporting, read-only views.</p>
					{:else if activeMode === 'excel'}
						<h5>Excel Mode</h5>
						<p>Spreadsheet-like editing. Navigate with arrows, type to start editing. Double-click or F2 also enter edit mode.</p>
						<div class="mode-details">
							<dl>
								<dt>isEditable</dt><dd>true</dd>
								<dt>editTrigger</dt><dd>'navigate'</dd>
								<dt>dropdownToggleVisibility</dt><dd>'always'</dd>
								<dt>shouldShowDropdownOnFocus</dt><dd>false</dd>
								<dt>cellSelectionMode</dt><dd>'click'</dd>
							</dl>
						</div>
						<p class="mt-2"><strong>Best for:</strong> Spreadsheet-like editing, data analysis.</p>
					{:else}
						<h5>Input-Matrix Mode</h5>
						<p>All cells are always in edit mode. Tab/Enter to move between cells.</p>
						<div class="mode-details">
							<dl>
								<dt>isEditable</dt><dd>true</dd>
								<dt>editTrigger</dt><dd>'always'</dd>
								<dt>dropdownToggleVisibility</dt><dd>'always'</dd>
								<dt>shouldShowDropdownOnFocus</dt><dd>true</dd>
								<dt>cellSelectionMode</dt><dd>'shift'</dd>
							</dl>
						</div>
						<p class="mt-2"><strong>Best for:</strong> Data entry forms, bulk input.</p>
					{/if}
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- GM02: Edit Triggers -->
		<ShowcaseSection
			titleText="GM02 Edit Triggers"
			subtitleText="Control how users enter edit mode in cells"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Description">

			{#snippet demoContent()}
				<div class="grid-demo">
					<div class="mode-switcher mb-2">
						<button class="mode-btn" class:active={activeTrigger === 'click'} onclick={() => setTrigger('click')}>click</button>
						<button class="mode-btn" class:active={activeTrigger === 'dblclick'} onclick={() => setTrigger('dblclick')}>dblclick</button>
						<button class="mode-btn" class:active={activeTrigger === 'navigate'} onclick={() => setTrigger('navigate')}>navigate</button>
						<button class="mode-btn" class:active={activeTrigger === 'always'} onclick={() => setTrigger('always')}>always</button>
						<button class="mode-btn" class:active={activeTrigger === 'button'} onclick={() => setTrigger('button')}>button</button>
					</div>
					<web-grid
						bind:this={triggerGrid}
						style="max-height: 300px;"
					></web-grid>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`grid.isEditable = true;
grid.editTrigger = '${activeTrigger}';

// Per-column override:
grid.columns = [
  {
    field: 'name',
    editTrigger: 'click'  // Override grid default
  }
];`}
					languageType="javascript"
					titleText="Edit Trigger"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Edit Triggers</h5>
					{#if activeTrigger === 'click'}
						<div class="trigger-desc">
							<strong>click</strong> &mdash; Single click enters edit mode. Simple and direct.
						</div>
					{:else if activeTrigger === 'dblclick'}
						<div class="trigger-desc">
							<strong>dblclick</strong> &mdash; Double-click to edit. Default trigger. Prevents accidental edits.
						</div>
					{:else if activeTrigger === 'navigate'}
						<div class="trigger-desc">
							<strong>navigate</strong> &mdash; Excel-like: start typing to enter edit mode. Double-click, F2, or Enter also enter editing. Arrow keys navigate between cells.
						</div>
					{:else if activeTrigger === 'always'}
						<div class="trigger-desc">
							<strong>always</strong> &mdash; Cells are always in edit mode. Used by input-matrix mode. Tab/Enter to move between cells.
						</div>
					{:else}
						<div class="trigger-desc">
							<strong>button</strong> &mdash; An edit button appears in cells. Click the button to enter edit mode. Good for preventing accidental edits in touch interfaces.
						</div>
					{/if}

					<h5 class="mt-3">All Triggers</h5>
					<ul>
						<li><code>click</code> &mdash; Single click</li>
						<li><code>dblclick</code> &mdash; Double click (default)</li>
						<li><code>navigate</code> &mdash; Type to edit (Excel-like)</li>
						<li><code>always</code> &mdash; Always in edit mode</li>
						<li><code>button</code> &mdash; Edit button in cell</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- GM03: Edit Start Selection -->
		<ShowcaseSection
			titleText="GM03 Edit Start Selection"
			subtitleText="Control cursor position when entering edit mode"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Description">

			{#snippet demoContent()}
				<div class="grid-demo">
					<div class="mode-switcher mb-2">
						<button class="mode-btn" class:active={activeSelection === 'selectAll'} onclick={() => setSelection('selectAll')}>selectAll</button>
						<button class="mode-btn" class:active={activeSelection === 'mousePosition'} onclick={() => setSelection('mousePosition')}>mousePosition</button>
						<button class="mode-btn" class:active={activeSelection === 'cursorAtStart'} onclick={() => setSelection('cursorAtStart')}>cursorAtStart</button>
						<button class="mode-btn" class:active={activeSelection === 'cursorAtEnd'} onclick={() => setSelection('cursorAtEnd')}>cursorAtEnd</button>
					</div>
					<web-grid
						bind:this={selectionGrid}
						style="max-height: 300px;"
					></web-grid>
					<p class="small text-muted mt-2">Click a cell to edit and observe cursor position.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`grid.editStartSelection = '${activeSelection}';

// Per-column override via editorOptions:
grid.columns = [
  {
    field: 'email',
    editor: 'text',
    editorOptions: {
      editStartSelection: 'selectAll'
    }
  }
];`}
					languageType="javascript"
					titleText="Edit Start Selection"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Selection Options</h5>
					{#if activeSelection === 'selectAll'}
						<div class="trigger-desc">
							<strong>selectAll</strong> &mdash; All text is selected when entering edit mode. Typing replaces the entire value.
						</div>
					{:else if activeSelection === 'mousePosition'}
						<div class="trigger-desc">
							<strong>mousePosition</strong> &mdash; Cursor is placed at the click position. Best for precise in-place editing. This is the default.
						</div>
					{:else if activeSelection === 'cursorAtStart'}
						<div class="trigger-desc">
							<strong>cursorAtStart</strong> &mdash; Cursor is placed at the beginning of the text. Good for prepending content.
						</div>
					{:else}
						<div class="trigger-desc">
							<strong>cursorAtEnd</strong> &mdash; Cursor is placed at the end of the text. Good for appending content.
						</div>
					{/if}

					<h5 class="mt-3">All Options</h5>
					<ul>
						<li><code>selectAll</code> &mdash; Select all</li>
						<li><code>mousePosition</code> &mdash; At click position (default)</li>
						<li><code>cursorAtStart</code> &mdash; At beginning</li>
						<li><code>cursorAtEnd</code> &mdash; At end</li>
					</ul>
					<p class="mt-2">Set globally on the grid or per-column via <code>editorOptions.editStartSelection</code>.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- GM04: Dropdown Behavior -->
		<ShowcaseSection
			titleText="GM04 Dropdown Behavior"
			subtitleText="Configure dropdown toggle visibility and auto-open behavior"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Configuration">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={dropdownGrid}
						style="max-height: 300px;"
					></web-grid>
					<p class="small text-muted mt-2">Focus on Department or Status cells to see dropdown behavior.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`grid.dropdownToggleVisibility = '${toggleVisibility}';
grid.shouldShowDropdownOnFocus = ${showOnFocus};
grid.shouldOpenDropdownOnEnter = ${openOnEnter};

// Per-column overrides:
grid.columns = [
  {
    field: 'department',
    editor: 'combobox',
    dropdownToggleVisibility: 'always',
    shouldOpenDropdownOnEnter: true
  }
];`}
					languageType="javascript"
					titleText="Dropdown Config"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="config-section">
					<div class="config-group">
						<label>dropdownToggleVisibility:</label>
						<div class="mode-switcher">
							<button class="mode-btn" class:active={toggleVisibility === 'always'} onclick={() => toggleVisibility = 'always'}>always</button>
							<button class="mode-btn" class:active={toggleVisibility === 'on-focus'} onclick={() => toggleVisibility = 'on-focus'}>on-focus</button>
						</div>
						<div class="config-output">
							<code>dropdownToggleVisibility = "<span>{toggleVisibility}</span>"</code>
						</div>
					</div>

					<div class="config-group">
						<label class="checkbox-label">
							<input type="checkbox" bind:checked={showOnFocus}>
							<strong>shouldShowDropdownOnFocus</strong>
							<small>(auto-open on focus)</small>
						</label>
					</div>

					<div class="config-group">
						<label class="checkbox-label">
							<input type="checkbox" bind:checked={openOnEnter}>
							<strong>shouldOpenDropdownOnEnter</strong>
							<small>(Enter opens dropdown)</small>
						</label>
					</div>

					<div class="prose small mt-2">
						<p><code>always</code> shows the dropdown arrow even when not editing. <code>on-focus</code> shows it only when the cell is focused.</p>
					</div>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- API Reference -->
		<section class="mb-5">
			<h2 class="mb-4">API Reference</h2>
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr><th>Property</th><th>Type</th><th>Default</th><th>Description</th></tr>
					</thead>
					<tbody>
						<tr>
							<td><code>mode</code></td>
							<td><code>'read-only' | 'excel' | 'input-matrix'</code></td>
							<td><code>'excel'</code></td>
							<td>Sets sensible defaults for common use cases. Setting mode overrides individual properties.</td>
						</tr>
						<tr>
							<td><code>editTrigger</code></td>
							<td><code>'click' | 'dblclick' | 'navigate' | 'always' | 'button'</code></td>
							<td><code>'dblclick'</code></td>
							<td>How users enter edit mode. Can be overridden per-column.</td>
						</tr>
						<tr>
							<td><code>editStartSelection</code></td>
							<td><code>'selectAll' | 'mousePosition' | 'cursorAtStart' | 'cursorAtEnd'</code></td>
							<td><code>'mousePosition'</code></td>
							<td>Cursor/selection position when entering edit. Per-column override via <code>editorOptions.editStartSelection</code>.</td>
						</tr>
						<tr>
							<td><code>dropdownToggleVisibility</code></td>
							<td><code>'always' | 'on-focus'</code></td>
							<td><code>'always'</code></td>
							<td>When to show dropdown toggle arrow. Grid-level and per-column.</td>
						</tr>
						<tr>
							<td><code>shouldShowDropdownOnFocus</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Auto-open dropdown when cell receives focus. Grid-level only.</td>
						</tr>
						<tr>
							<td><code>shouldOpenDropdownOnEnter</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Enter key opens dropdown (true) or moves to next row (false). Grid-level and per-column.</td>
						</tr>
						<tr>
							<td><code>cellSelectionMode</code></td>
							<td><code>'disabled' | 'click' | 'shift'</code></td>
							<td><code>'click'</code></td>
							<td>How to select cell ranges. <code>'shift'</code> requires Shift+click to avoid conflict with always-editing cells.</td>
						</tr>
						<tr>
							<td><code>isEditable</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Enable/disable editing globally. Individual columns can override with <code>column.isEditable</code>.</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	</div>
</DocLayout>
