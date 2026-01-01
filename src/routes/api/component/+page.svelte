<script lang="ts">
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
</script>

<DocLayout
	titleText="Component API"
	descriptionText="Complete API reference for the Web Grid component">

	<div class="py-4">
		<!-- Overview -->
		<section class="mb-5">
			<h2 class="mb-3">Overview</h2>
			<p class="lead">
				The <code>&lt;web-grid&gt;</code> web component provides a high-performance data grid with editing, sorting, pagination, and Excel-like navigation.
			</p>
		</section>

		<!-- Core Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Core Properties</h2>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>items</code></td>
							<td><code>T[]</code></td>
							<td><code>[]</code></td>
							<td>Array of data objects to display</td>
						</tr>
						<tr>
							<td><code>columns</code></td>
							<td><code>Column&lt;T&gt;[]</code></td>
							<td><code>[]</code></td>
							<td>Column definitions (see <a href="/api/columns">Columns API</a>)</td>
						</tr>
						<tr>
							<td><code>mode</code></td>
							<td><code>'read-only' | 'excel' | 'input-matrix'</code></td>
							<td>-</td>
							<td>Grid mode - sets sensible defaults for common use cases</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`const grid = document.querySelector('web-grid');

// Set data
grid.items = [
  { id: 1, name: 'Alice', department: 'Engineering' },
  { id: 2, name: 'Bob', department: 'Marketing' }
];

// Set columns
grid.columns = [
  { field: 'id', title: 'ID', width: '60px' },
  { field: 'name', title: 'Name', width: '150px' },
  { field: 'department', title: 'Department' }
];`}
				languageType="javascript"
				titleText="Basic Setup"
			/>
		</section>

		<!-- Display Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Display Properties</h2>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>striped</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Alternating row background colors</td>
						</tr>
						<tr>
							<td><code>hoverable</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Highlight rows on hover</td>
						</tr>
						<tr>
							<td><code>showRowNumbers</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Show row number column on the left</td>
						</tr>
						<tr>
							<td><code>class</code></td>
							<td><code>string</code></td>
							<td>-</td>
							<td>Custom CSS class(es) on host element</td>
						</tr>
						<tr>
							<td><code>style</code></td>
							<td><code>string</code></td>
							<td>-</td>
							<td>Inline styles on host element</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Sorting Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Sorting Properties</h2>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>sortable</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Enable sorting on all columns</td>
						</tr>
						<tr>
							<td><code>sort</code></td>
							<td><code>SortState[]</code></td>
							<td><code>[]</code></td>
							<td>Current sort state (for initial/controlled sort)</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`// SortState type
type SortState = {
  column: string;      // Field name
  direction: 'asc' | 'desc';
}

// Set initial sort
grid.sort = [
  { column: 'name', direction: 'asc' }
];

// Multi-column sort (Ctrl+Click)
grid.sort = [
  { column: 'department', direction: 'asc' },
  { column: 'name', direction: 'asc' }
];`}
				languageType="typescript"
				titleText="Sort State"
			/>
		</section>

		<!-- Pagination Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Pagination Properties</h2>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>pageable</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Enable pagination</td>
						</tr>
						<tr>
							<td><code>pageSize</code></td>
							<td><code>number</code></td>
							<td><code>10</code></td>
							<td>Items per page</td>
						</tr>
						<tr>
							<td><code>currentPage</code></td>
							<td><code>number</code></td>
							<td><code>1</code></td>
							<td>Current page (1-based)</td>
						</tr>
						<tr>
							<td><code>totalItems</code></td>
							<td><code>number</code></td>
							<td>-</td>
							<td>Total items (for server-side pagination)</td>
						</tr>
						<tr>
							<td><code>pageSizes</code></td>
							<td><code>number[]</code></td>
							<td><code>[10, 25, 50, 100]</code></td>
							<td>Available page size options</td>
						</tr>
						<tr>
							<td><code>showPagination</code></td>
							<td><code>boolean | 'auto'</code></td>
							<td><code>'auto'</code></td>
							<td>When to show: true=always, false=never, 'auto'=hide when 1 page</td>
						</tr>
						<tr>
							<td><code>paginationPosition</code></td>
							<td><code>string</code></td>
							<td><code>'bottom-center'</code></td>
							<td>Position(s): "bottom-center", "top-right|bottom-right"</td>
						</tr>
						<tr>
							<td><code>paginationLayout</code></td>
							<td><code>string</code></td>
							<td>-</td>
							<td>Element order: "pageSize|previous|pageInfo|next"</td>
						</tr>
						<tr>
							<td><code>paginationLabelsCallback</code></td>
							<td><code>function</code></td>
							<td>-</td>
							<td>Callback to customize pagination text</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Editing Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Editing Properties</h2>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>editable</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Enable editing on all columns with editors</td>
						</tr>
						<tr>
							<td><code>editTrigger</code></td>
							<td><code>EditTrigger</code></td>
							<td><code>'click'</code></td>
							<td>How editing is triggered: 'click', 'dblclick', 'button', 'always', 'navigate'</td>
						</tr>
						<tr>
							<td><code>dropdownToggleVisibility</code></td>
							<td><code>'always' | 'on-focus'</code></td>
							<td><code>'on-focus'</code></td>
							<td>When to show dropdown toggle button</td>
						</tr>
						<tr>
							<td><code>openDropdownOnEnter</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Enter opens dropdown (true) or moves down (false)</td>
						</tr>
						<tr>
							<td><code>checkboxAlwaysEditable</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Make checkboxes always interactive</td>
						</tr>
						<tr>
							<td><code>invalidCells</code></td>
							<td><code>CellValidationState[]</code></td>
							<td><code>[]</code></td>
							<td>Currently invalid cells (for external tracking)</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Row Toolbar Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Row Toolbar Properties</h2>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>showRowToolbar</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Enable row toolbar</td>
						</tr>
						<tr>
							<td><code>rowToolbar</code></td>
							<td><code>RowToolbarConfig[]</code></td>
							<td><code>[]</code></td>
							<td>Toolbar items: strings ('add', 'delete', etc.) or custom objects</td>
						</tr>
						<tr>
							<td><code>toolbarTrigger</code></td>
							<td><code>'hover' | 'click' | 'button'</code></td>
							<td><code>'hover'</code></td>
							<td>How to show toolbar</td>
						</tr>
						<tr>
							<td><code>toolbarAlign</code></td>
							<td><code>'center' | 'top'</code></td>
							<td><code>'center'</code></td>
							<td>Vertical alignment</td>
						</tr>
						<tr>
							<td><code>toolbarTopPosition</code></td>
							<td><code>'start' | 'center' | 'end' | 'cursor'</code></td>
							<td><code>'center'</code></td>
							<td>Horizontal position when above row</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Virtual Scroll Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Virtual Scroll Properties</h2>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>virtualScroll</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Enable virtual scrolling</td>
						</tr>
						<tr>
							<td><code>virtualScrollThreshold</code></td>
							<td><code>number</code></td>
							<td><code>100</code></td>
							<td>Auto-enable when items >= threshold</td>
						</tr>
						<tr>
							<td><code>virtualScrollRowHeight</code></td>
							<td><code>number</code></td>
							<td><code>38</code></td>
							<td>Fixed row height in pixels</td>
						</tr>
						<tr>
							<td><code>virtualScrollBuffer</code></td>
							<td><code>number</code></td>
							<td><code>10</code></td>
							<td>Extra rows above/below viewport</td>
						</tr>
						<tr>
							<td><code>infiniteScroll</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Enable infinite scroll (load more)</td>
						</tr>
						<tr>
							<td><code>infiniteScrollThreshold</code></td>
							<td><code>number</code></td>
							<td><code>100</code></td>
							<td>Pixels from bottom to trigger load</td>
						</tr>
						<tr>
							<td><code>hasMoreItems</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Set to false when no more data</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Context Menu & Summary -->
		<section class="mb-5">
			<h2 class="mb-4">Context Menu & Summary</h2>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>contextMenu</code></td>
							<td><code>ContextMenuItem[]</code></td>
							<td>Right-click menu items</td>
						</tr>
						<tr>
							<td><code>summaryPosition</code></td>
							<td><code>string</code></td>
							<td>Position(s): "bottom-left", "top-right|bottom-right"</td>
						</tr>
						<tr>
							<td><code>summaryContentCallback</code></td>
							<td><code>function</code></td>
							<td>Callback returning HTML content for summary</td>
						</tr>
						<tr>
							<td><code>summaryInline</code></td>
							<td><code>boolean</code></td>
							<td>Share row with pagination (default: true)</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Styling Callbacks -->
		<section class="mb-5">
			<h2 class="mb-4">Styling Callbacks</h2>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>customStylesCallback</code></td>
							<td><code>() => string</code></td>
							<td>Return custom CSS to inject into shadow DOM</td>
						</tr>
						<tr>
							<td><code>rowClassCallback</code></td>
							<td><code>(row, rowIndex) => string | null</code></td>
							<td>Dynamic CSS class for rows</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`// Inject custom styles into shadow DOM
grid.customStylesCallback = () => \`
  .high-value { background: #d1fae5 !important; }
  .low-value { background: #fee2e2 !important; }
  .row-inactive { opacity: 0.5; }
\`;

// Dynamic row classes
grid.rowClassCallback = (row, index) => {
  if (row.status === 'inactive') return 'row-inactive';
  return null;
};`}
				languageType="javascript"
				titleText="Styling Callbacks"
			/>
		</section>

		<!-- Grid Modes -->
		<section class="mb-5">
			<h2 class="mb-4">Grid Modes</h2>
			<p>The <code>mode</code> property sets sensible defaults for common use cases:</p>

			<div class="row g-4 mb-4">
				<div class="col-md-4">
					<div class="card h-100">
						<div class="card-body">
							<h5 class="card-title"><code>read-only</code></h5>
							<p class="card-text">Display-only grid. Editing disabled, optimized for viewing data.</p>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="card h-100">
						<div class="card-body">
							<h5 class="card-title"><code>excel</code></h5>
							<p class="card-text">Excel-like behavior. Navigate mode with arrow keys, type to edit, Enter/Tab to commit.</p>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="card h-100">
						<div class="card-body">
							<h5 class="card-title"><code>input-matrix</code></h5>
							<p class="card-text">Form-like behavior. All cells editable, Tab moves between cells.</p>
						</div>
					</div>
				</div>
			</div>

			<CodeBlock
				codeContent={`// Excel-like spreadsheet behavior
grid.mode = 'excel';

// Equivalent to:
grid.editable = true;
grid.editTrigger = 'navigate';
grid.hoverable = true;`}
				languageType="javascript"
				titleText="Grid Mode"
			/>
		</section>

		<!-- TypeScript Support -->
		<section class="mb-5">
			<h2 class="mb-4">TypeScript Support</h2>
			<p>The component is fully typed with generic support:</p>

			<CodeBlock
				codeContent={`import type { GridElement, Column } from '@keenmate/web-grid';

interface Employee {
  id: number;
  name: string;
  department: string;
  salary: number;
}

const grid = document.querySelector<GridElement<Employee>>('web-grid');

if (grid) {
  const columns: Column<Employee>[] = [
    { field: 'id', title: 'ID' },
    { field: 'name', title: 'Name', editor: 'text' },
    { field: 'department', title: 'Department' },
    {
      field: 'salary',
      title: 'Salary',
      formatCallback: (value) => '$' + value.toLocaleString()
    }
  ];

  grid.columns = columns;
  grid.items = employees;
}`}
				languageType="typescript"
				titleText="TypeScript Example"
			/>
		</section>

		<!-- Global API -->
		<section class="mb-5">
			<h2 class="mb-4">Global API</h2>
			<p class="lead">
				Access component functionality through <code>window.keenmate.grid</code>:
			</p>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Method / Property</th>
							<th>Returns</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>version()</code></td>
							<td>string</td>
							<td>Returns the component version</td>
						</tr>
						<tr>
							<td><code>config</code></td>
							<td>object</td>
							<td>Package metadata (name, version, author, etc.)</td>
						</tr>
						<tr>
							<td><code>register()</code></td>
							<td>void</td>
							<td>Manually register the custom element</td>
						</tr>
						<tr>
							<td><code>getInstances()</code></td>
							<td>HTMLElement[]</td>
							<td>Get all active grid instances on the page</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`// Get component version
const version = window.keenmate.grid.version();
console.log('Web Grid Version:', version);

// Get all grid instances
const allGrids = window.keenmate.grid.getInstances();
allGrids.forEach(grid => {
  console.log('Grid has', grid.items.length, 'items');
});`}
				languageType="javascript"
				titleText="Global API Usage"
			/>
		</section>

		<!-- Important Notes -->
		<div class="mt-5 p-4 bg-light border rounded">
			<h3 class="h5 mb-3">Important Notes</h3>
			<ul class="mb-0">
				<li><strong>Generic Types:</strong> Component supports any data structure via <code>T</code> parameter</li>
				<li><strong>Reactive:</strong> All properties are reactive - changes update the UI automatically</li>
				<li><strong>Shadow DOM:</strong> Component uses Shadow DOM for style encapsulation</li>
				<li><strong>CSS Variables:</strong> Customize appearance with 100+ CSS variables</li>
				<li><strong>Events vs Callbacks:</strong> Events use <code>on*</code> naming, callbacks use <code>*Callback</code> suffix</li>
			</ul>
		</div>
	</div>
</DocLayout>
