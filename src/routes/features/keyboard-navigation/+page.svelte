<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let navGrid: any;
	let virtualNavGrid: any;
	let loadedCount = $state(100);

	const employees = [
		{ id: 1, name: 'Alice Johnson', email: 'alice@example.com', department: 'Engineering', salary: 95000 },
		{ id: 2, name: 'Bob Smith', email: 'bob@example.com', department: 'Marketing', salary: 72000 },
		{ id: 3, name: 'Charlie Brown', email: 'charlie@example.com', department: 'Engineering', salary: 88000 },
		{ id: 4, name: 'Diana Ross', email: 'diana@example.com', department: 'Sales', salary: 67000 },
		{ id: 5, name: 'Eve Wilson', email: 'eve@example.com', department: 'Engineering', salary: 105000 }
	];

	// Generate large dataset for virtual scroll demo
	const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
	const generateData = (count: number) => {
		return Array.from({ length: count }, (_, i) => ({
			id: i + 1,
			name: `Employee ${i + 1}`,
			email: `employee${i + 1}@example.com`,
			department: departments[i % departments.length],
			salary: 40000 + Math.floor(Math.random() * 80000)
		}));
	};

	onMount(async () => {
		await import('@keenmate/web-grid');
		if (navGrid) {
			navGrid.columns = [
				{ field: 'id', title: 'ID', width: '60px' },
				{ field: 'name', title: 'Name', width: '150px', editor: 'text' },
				{ field: 'email', title: 'Email', editor: 'text' },
				{ field: 'department', title: 'Department', width: '120px', editor: 'text' },
				{ field: 'salary', title: 'Salary', width: '100px', align: 'right', editor: 'number', formatCallback: (v: number) => '$' + v.toLocaleString() }
			];
			navGrid.items = [...employees];
			navGrid.editable = true;
			navGrid.editTrigger = 'navigate';
		}

		// Virtual + Infinite Scroll with Navigation
		if (virtualNavGrid) {
			virtualNavGrid.columns = [
				{ field: 'id', title: 'ID', width: '80px' },
				{ field: 'name', title: 'Name', width: '150px', editor: 'text' },
				{ field: 'email', title: 'Email', editor: 'text' },
				{ field: 'department', title: 'Department', width: '120px', editor: 'select', editorOptions: {
					options: departments.map(d => ({ value: d, label: d }))
				}},
				{ field: 'salary', title: 'Salary', width: '100px', align: 'right', editor: 'number', formatCallback: (v: number) => '$' + v.toLocaleString() }
			];
			virtualNavGrid.items = generateData(100);
			virtualNavGrid.virtualScroll = true;
			virtualNavGrid.virtualScrollRowHeight = 38;
			virtualNavGrid.infiniteScroll = true;
			virtualNavGrid.hasMoreItems = true;
			virtualNavGrid.editable = true;
			virtualNavGrid.editTrigger = 'navigate';

			virtualNavGrid.ondatarequest = (e: any) => {
				if (e.trigger === 'loadMore') {
					// Simulate loading more data
					const currentCount = virtualNavGrid.items.length;
					const newItems = generateData(currentCount + 50).slice(currentCount);
					virtualNavGrid.items = [...virtualNavGrid.items, ...newItems];
					loadedCount = virtualNavGrid.items.length;
					// Stop at 500 items for demo
					virtualNavGrid.hasMoreItems = virtualNavGrid.items.length < 500;
				}
			};
		}
	});
</script>

<DocLayout
	titleText="Keyboard Navigation"
	descriptionText="Excel-like keyboard navigation and editing">

	<div class="py-4">
		<!-- Navigate Mode -->
		<ShowcaseSection
			titleText="KN01 Navigate Mode"
			subtitleText="Excel-like cell navigation with arrow keys, Tab, Home, End, and Page keys"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Keyboard Shortcuts">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={navGrid}
						style="max-height: 350px;"
					></web-grid>
					<p class="small text-muted mt-2">Click a cell, then use arrow keys to navigate. Type to start editing.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Enable navigate mode
grid.editable = true;
grid.editTrigger = 'navigate';

// In navigate mode:
// - Arrow keys move focus between cells
// - Type any character to start editing
// - F2 or Enter to edit current cell
// - Escape cancels editing
// - Enter commits and moves down
// - Tab commits and moves right`}
					languageType="javascript"
					titleText="Navigate Mode"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Navigation</h5>
					<table class="table table-sm small">
						<tbody>
							<tr><td><kbd>Arrow Keys</kbd></td><td>Move focus</td></tr>
							<tr><td><kbd>Tab</kbd></td><td>Next cell</td></tr>
							<tr><td><kbd>Shift+Tab</kbd></td><td>Previous cell</td></tr>
							<tr><td><kbd>Home</kbd></td><td>First column</td></tr>
							<tr><td><kbd>End</kbd></td><td>Last column</td></tr>
							<tr><td><kbd>Ctrl+Home</kbd></td><td>First cell</td></tr>
							<tr><td><kbd>Ctrl+End</kbd></td><td>Last cell</td></tr>
							<tr><td><kbd>Page Up/Down</kbd></td><td>Page navigation</td></tr>
						</tbody>
					</table>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Edit Shortcuts -->
		<ShowcaseSection
			titleText="KN02 Editing Shortcuts"
			subtitleText="F2, Enter, Escape, Delete, and clipboard shortcuts with copy/paste callbacks"
			col1Title="Edit Actions"
			col2Title="Code"
			col3Title="Clipboard">

			{#snippet demoContent()}
				<div class="prose small">
					<table class="table table-sm">
						<thead><tr><th>Key</th><th>Action</th></tr></thead>
						<tbody>
							<tr><td><kbd>F2</kbd></td><td>Edit cell (cursor at end)</td></tr>
							<tr><td><kbd>Enter</kbd></td><td>Edit cell / Commit & move down</td></tr>
							<tr><td><kbd>Escape</kbd></td><td>Cancel editing</td></tr>
							<tr><td><kbd>Space</kbd></td><td>Toggle checkbox / Open dropdown</td></tr>
							<tr><td><kbd>Delete</kbd></td><td>Clear cell value</td></tr>
							<tr><td><kbd>Any char</kbd></td><td>Start editing with that character</td></tr>
						</tbody>
					</table>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Customize copy behavior
{
  field: 'salary',
  beforeCopyCallback: (value) => {
    // Copy as plain number
    return value.toString();
  }
}

// Customize paste behavior
{
  field: 'email',
  beforePasteCallback: (value) => {
    // Normalize pasted email
    return value.toLowerCase().trim();
  }
}

// Handle row deletion
grid.onrowdelete = (e) => {
  if (confirm('Delete this row?')) {
    grid.items = grid.items.filter(
      (_, i) => i !== e.rowIndex
    );
  }
};`}
					languageType="javascript"
					titleText="Clipboard"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Clipboard Support</h5>
					<table class="table table-sm">
						<tbody>
							<tr><td><kbd>Ctrl+C</kbd></td><td>Copy cell value</td></tr>
							<tr><td><kbd>Ctrl+V</kbd></td><td>Paste into cell</td></tr>
							<tr><td><kbd>Ctrl+Delete</kbd></td><td>Delete row</td></tr>
						</tbody>
					</table>
					<h5>Callbacks</h5>
					<p><code>beforeCopyCallback</code> - Transform on copy</p>
					<p><code>beforePasteCallback</code> - Validate/transform on paste</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Virtual + Infinite Scroll with Navigation -->
		<ShowcaseSection
			titleText="KN03 Virtual Infinite Scroll"
			subtitleText="Navigate and edit through virtualized rows with infinite loading"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Features">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={virtualNavGrid}
						style="max-height: 400px;"
					></web-grid>
					<p class="small text-muted mt-2">
						<strong>{loadedCount} rows loaded</strong> - Use Ctrl+End to jump to bottom, scroll loads more. All rows are editable.
					</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Combine virtual + infinite + navigate
grid.virtualScroll = true;
grid.virtualScrollRowHeight = 38;
grid.infiniteScroll = true;
grid.hasMoreItems = true;
grid.editable = true;
grid.editTrigger = 'navigate';

// Load more on scroll
grid.ondatarequest = (e) => {
  if (e.trigger === 'loadMore') {
    const newItems = await fetchMore();
    grid.items = [...grid.items, ...newItems];
    grid.hasMoreItems = newItems.length > 0;
  }
};

// Navigate with Ctrl+End to last row
// This triggers loadMore if needed`}
					languageType="javascript"
					titleText="Virtual + Infinite + Navigate"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Combined Features</h5>
					<ul>
						<li><strong>Virtual scroll</strong> - Only renders visible rows</li>
						<li><strong>Infinite scroll</strong> - Loads more on scroll</li>
						<li><strong>Navigate mode</strong> - Arrow keys move focus</li>
						<li><strong>Edit mode</strong> - Type to edit cells</li>
					</ul>
					<h5>Try It</h5>
					<ul>
						<li><kbd>Ctrl+End</kbd> - Jump to last row (loads more)</li>
						<li><kbd>Page Down</kbd> - Navigate through pages</li>
						<li>Type to edit any cell</li>
						<li>Scroll to bottom to load more</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Keyboard Reference -->
		<div class="mt-5">
			<h2 class="mb-4">Complete Keyboard Reference</h2>
			<div class="row">
				<div class="col-md-6">
					<h5>Navigation</h5>
					<table class="table table-sm">
						<tbody>
							<tr><td><kbd>Arrow Keys</kbd></td><td>Move focus one cell</td></tr>
							<tr><td><kbd>Tab</kbd> / <kbd>Shift+Tab</kbd></td><td>Next/previous cell</td></tr>
							<tr><td><kbd>Home</kbd> / <kbd>End</kbd></td><td>First/last column in row</td></tr>
							<tr><td><kbd>Ctrl+Home</kbd></td><td>First cell (top-left)</td></tr>
							<tr><td><kbd>Ctrl+End</kbd></td><td>Last cell (bottom-right)</td></tr>
							<tr><td><kbd>Page Up</kbd> / <kbd>Page Down</kbd></td><td>Move one page</td></tr>
							<tr><td><kbd>Ctrl+Page Up</kbd></td><td>First row, same column</td></tr>
							<tr><td><kbd>Ctrl+Page Down</kbd></td><td>Last row, same column</td></tr>
						</tbody>
					</table>
				</div>
				<div class="col-md-6">
					<h5>Editing</h5>
					<table class="table table-sm">
						<tbody>
							<tr><td><kbd>F2</kbd></td><td>Start editing (cursor at end)</td></tr>
							<tr><td><kbd>Enter</kbd></td><td>Start editing / Commit & move down</td></tr>
							<tr><td><kbd>Escape</kbd></td><td>Cancel editing</td></tr>
							<tr><td><kbd>Space</kbd></td><td>Toggle checkbox / Open select</td></tr>
							<tr><td><kbd>Delete</kbd></td><td>Clear cell</td></tr>
							<tr><td><kbd>Ctrl+C</kbd></td><td>Copy cell</td></tr>
							<tr><td><kbd>Ctrl+V</kbd></td><td>Paste into cell</td></tr>
							<tr><td><kbd>Ctrl+Delete</kbd></td><td>Delete row</td></tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</DocLayout>
