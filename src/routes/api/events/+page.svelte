<script lang="ts">
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
</script>

<DocLayout
	titleText="Events API"
	descriptionText="Complete reference for grid events and callbacks">

	<div class="py-4">
		<!-- Overview -->
		<section class="mb-5">
			<h2 class="mb-3">Overview</h2>
			<p class="lead">
				Web Grid uses a clear naming convention: <strong>events</strong> use <code>on*</code> (lowercase) and are fire-and-forget notifications. <strong>Callbacks</strong> use <code>*Callback</code> suffix and their return value affects behavior.
			</p>
		</section>

		<!-- Row Change Event -->
		<section class="mb-5">
			<h2 class="mb-4">onrowchange</h2>
			<p>Fired when a cell value changes after editing.</p>

			<CodeBlock
				codeContent={`type RowChangeDetail<T> = {
  row: T;                    // Original row (unchanged)
  draftRow: T;               // Draft row with changes
  rowIndex: number;
  field: string;
  oldValue: unknown;
  newValue: unknown;
  isValid: boolean;
  validationError?: string | null;
}`}
				languageType="typescript"
				titleText="Event Detail Type"
			/>

			<CodeBlock
				codeContent={`grid.onrowchange = (detail) => {
  console.log('Cell changed:', detail.field);
  console.log('Old value:', detail.oldValue);
  console.log('New value:', detail.newValue);

  if (detail.isValid) {
    // Update your data store
    saveToServer(detail.rowIndex, detail.field, detail.newValue);
  } else {
    console.warn('Invalid:', detail.validationError);
  }
};`}
				languageType="javascript"
				titleText="Usage"
			/>
		</section>

		<!-- Edit Start/Cancel Events -->
		<section class="mb-5">
			<h2 class="mb-4">onroweditstart / onroweditcancel</h2>
			<p>Fired when editing begins or is cancelled.</p>

			<CodeBlock
				codeContent={`grid.onroweditstart = (detail) => {
  console.log('Started editing:', detail.field);
  console.log('Row:', detail.row);
  console.log('Row index:', detail.rowIndex);
};

grid.onroweditcancel = (detail) => {
  console.log('Cancelled editing:', detail.field);
};`}
				languageType="javascript"
				titleText="Edit Events"
			/>
		</section>

		<!-- Validation Error Event -->
		<section class="mb-5">
			<h2 class="mb-4">onvalidationerror</h2>
			<p>Fired when validation fails during editing.</p>

			<CodeBlock
				codeContent={`grid.onvalidationerror = (detail) => {
  console.log('Validation failed:');
  console.log('Field:', detail.field);
  console.log('Error:', detail.error);
  console.log('Row index:', detail.rowIndex);

  // Show custom notification
  showToast(\`\${detail.field}: \${detail.error}\`, 'error');
};`}
				languageType="javascript"
				titleText="Validation Error"
			/>
		</section>

		<!-- Data Request Event -->
		<section class="mb-5">
			<h2 class="mb-4">ondatarequest</h2>
			<p>Fired when sorting or pagination changes. Essential for server-side data handling.</p>

			<CodeBlock
				codeContent={`type DataRequestDetail = {
  sort: SortState[];         // Current sort state
  page: number;              // Current page (1-based)
  pageSize: number;
  trigger: DataRequestTrigger;
  mode: DataRequestMode;     // 'replace' or 'append'
  skip: number;              // Items to skip (offset)
}

type DataRequestTrigger = 'sort' | 'page' | 'pageSize' | 'init' | 'loadMore';
type DataRequestMode = 'replace' | 'append';`}
				languageType="typescript"
				titleText="Event Detail Type"
			/>

			<CodeBlock
				codeContent={`grid.ondatarequest = async (detail) => {
  console.log('Data requested:', detail.trigger);

  // Build query params
  const params = new URLSearchParams({
    page: detail.page.toString(),
    pageSize: detail.pageSize.toString(),
    skip: detail.skip.toString()
  });

  // Add sort params
  detail.sort.forEach((s, i) => {
    params.append(\`sort[\${i}][column]\`, s.column);
    params.append(\`sort[\${i}][direction]\`, s.direction);
  });

  // Fetch data
  const response = await fetch(\`/api/employees?\${params}\`);
  const data = await response.json();

  // Update grid
  if (detail.mode === 'append') {
    // Infinite scroll - append to existing
    grid.items = [...grid.items, ...data.items];
  } else {
    // Normal - replace items
    grid.items = data.items;
  }

  grid.totalItems = data.totalCount;
  grid.hasMoreItems = data.hasMore;
};`}
				languageType="javascript"
				titleText="Server-Side Data"
			/>
		</section>

		<!-- Toolbar Click Event -->
		<section class="mb-5">
			<h2 class="mb-4">ontoolbarclick</h2>
			<p>Fired when a toolbar button is clicked.</p>

			<CodeBlock
				codeContent={`type ToolbarClickDetail<T> = {
  item: NormalizedToolbarItem<T>;  // The clicked item
  rowIndex: number;
  row: T;
}`}
				languageType="typescript"
				titleText="Event Detail Type"
			/>

			<CodeBlock
				codeContent={`grid.ontoolbarclick = (detail) => {
  console.log('Toolbar action:', detail.item.id);
  console.log('Row:', detail.row);

  switch (detail.item.id) {
    case 'add':
      grid.items = [...grid.items, createNewRow()];
      break;
    case 'delete':
      if (confirm('Delete this row?')) {
        grid.items = grid.items.filter((_, i) => i !== detail.rowIndex);
      }
      break;
    case 'duplicate':
      const copy = { ...detail.row, id: generateId() };
      grid.items = [
        ...grid.items.slice(0, detail.rowIndex + 1),
        copy,
        ...grid.items.slice(detail.rowIndex + 1)
      ];
      break;
  }
};`}
				languageType="javascript"
				titleText="Toolbar Click"
			/>
		</section>

		<!-- Context Menu Open Event -->
		<section class="mb-5">
			<h2 class="mb-4">oncontextmenuopen</h2>
			<p>Fired when right-click context menu opens.</p>

			<CodeBlock
				codeContent={`type ContextMenuContext<T> = {
  row: T;
  rowIndex: number;
  colIndex: number;
  column: Column<T>;
  cellValue: unknown;
}`}
				languageType="typescript"
				titleText="Context Type"
			/>

			<CodeBlock
				codeContent={`grid.oncontextmenuopen = (ctx) => {
  console.log('Context menu opened');
  console.log('Cell:', ctx.column.field, '=', ctx.cellValue);
  console.log('Row:', ctx.row);

  // You can use this to dynamically adjust menu items
  // based on the clicked cell
};`}
				languageType="javascript"
				titleText="Context Menu Open"
			/>
		</section>

		<!-- Row Delete Event -->
		<section class="mb-5">
			<h2 class="mb-4">onrowdelete</h2>
			<p>Fired when Ctrl+Delete is pressed on a row in navigate mode.</p>

			<CodeBlock
				codeContent={`grid.onrowdelete = (detail) => {
  console.log('Delete requested for row:', detail.rowIndex);

  if (confirm(\`Delete \${detail.row.name}?\`)) {
    grid.items = grid.items.filter((_, i) => i !== detail.rowIndex);
  }
};`}
				languageType="javascript"
				titleText="Row Delete"
			/>
		</section>

		<!-- Pagination Labels Callback -->
		<section class="mb-5">
			<h2 class="mb-4">paginationLabelsCallback</h2>
			<p>Customize or translate pagination text.</p>

			<CodeBlock
				codeContent={`type PaginationLabelsContext = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}

type PaginationLabels = {
  first: string;
  previous: string;
  next: string;
  last: string;
  pageInfo: string;
  itemCount: string;
  perPage: string;
}`}
				languageType="typescript"
				titleText="Types"
			/>

			<CodeBlock
				codeContent={`// English (default)
grid.paginationLabelsCallback = (ctx) => ({
  pageInfo: \`Page \${ctx.currentPage} of \${ctx.totalPages}\`,
  itemCount: \`\${ctx.totalItems} items\`,
  perPage: 'per page'
});

// German translation
grid.paginationLabelsCallback = (ctx) => ({
  first: 'Erste',
  previous: 'Vorherige',
  next: 'Nächste',
  last: 'Letzte',
  pageInfo: \`Seite \${ctx.currentPage} von \${ctx.totalPages}\`,
  itemCount: \`\${ctx.totalItems} Einträge\`,
  perPage: 'pro Seite'
});`}
				languageType="javascript"
				titleText="Translation"
			/>
		</section>

		<!-- Summary Content Callback -->
		<section class="mb-5">
			<h2 class="mb-4">summaryContentCallback</h2>
			<p>Generate custom summary content (totals, aggregates, etc.).</p>

			<CodeBlock
				codeContent={`type SummaryContext<T> = {
  items: T[];           // Current display items (paginated)
  allItems: T[];        // All items (before pagination)
  totalItems: number;
  currentPage: number;
  pageSize: number;
  metadata: unknown;    // Server-provided metadata
}`}
				languageType="typescript"
				titleText="Context Type"
			/>

			<CodeBlock
				codeContent={`grid.summaryPosition = 'bottom-left';

grid.summaryContentCallback = (ctx) => {
  const total = ctx.allItems.reduce((sum, row) => sum + row.salary, 0);
  const avg = total / ctx.allItems.length;

  return \`
    <strong>Total:</strong> \$\${total.toLocaleString()} |
    <strong>Average:</strong> \$\${avg.toLocaleString()}
  \`;
};`}
				languageType="javascript"
				titleText="Summary"
			/>
		</section>

		<!-- Custom Styles Callback -->
		<section class="mb-5">
			<h2 class="mb-4">customStylesCallback</h2>
			<p>Inject custom CSS into the shadow DOM.</p>

			<CodeBlock
				codeContent={`grid.customStylesCallback = () => \`
  /* Custom cell classes */
  .high-value {
    background: #d1fae5 !important;
    font-weight: 600;
  }

  .low-value {
    background: #fee2e2 !important;
  }

  .row-inactive {
    opacity: 0.5;
  }

  /* Custom status badges */
  .status-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.75rem;
  }

  .status-active { background: #d1fae5; color: #065f46; }
  .status-pending { background: #fef3c7; color: #92400e; }
  .status-inactive { background: #fee2e2; color: #991b1b; }
\`;`}
				languageType="javascript"
				titleText="Custom Styles"
			/>
		</section>

		<!-- Row Class Callback -->
		<section class="mb-5">
			<h2 class="mb-4">rowClassCallback</h2>
			<p>Apply dynamic CSS classes to entire rows.</p>

			<CodeBlock
				codeContent={`grid.rowClassCallback = (row, rowIndex) => {
  if (row.status === 'inactive') return 'row-inactive';
  if (row.isHighlighted) return 'row-highlight';
  if (rowIndex % 10 === 0) return 'row-section-start';
  return null;
};`}
				languageType="javascript"
				titleText="Row Class"
			/>
		</section>

		<!-- Events vs Callbacks Reference -->
		<section class="mb-5">
			<h2 class="mb-4">Quick Reference</h2>

			<div class="row g-4">
				<div class="col-md-6">
					<div class="card h-100">
						<div class="card-header">
							<h5 class="mb-0">Events (on*)</h5>
						</div>
						<div class="card-body">
							<p class="text-muted small">Fire-and-forget notifications. Return value is ignored.</p>
							<table class="table table-sm small">
								<tbody>
									<tr><td><code>onrowchange</code></td><td>Cell value changed</td></tr>
									<tr><td><code>onroweditstart</code></td><td>Editing began</td></tr>
									<tr><td><code>onroweditcancel</code></td><td>Editing cancelled</td></tr>
									<tr><td><code>onvalidationerror</code></td><td>Validation failed</td></tr>
									<tr><td><code>ondatarequest</code></td><td>Sort/page changed</td></tr>
									<tr><td><code>ontoolbarclick</code></td><td>Toolbar button clicked</td></tr>
									<tr><td><code>oncontextmenuopen</code></td><td>Context menu opening</td></tr>
									<tr><td><code>onrowdelete</code></td><td>Ctrl+Delete pressed</td></tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="card h-100">
						<div class="card-header">
							<h5 class="mb-0">Callbacks (*Callback)</h5>
						</div>
						<div class="card-body">
							<p class="text-muted small">Return value affects component behavior.</p>
							<table class="table table-sm small">
								<tbody>
									<tr><td><code>formatCallback</code></td><td>Returns display string</td></tr>
									<tr><td><code>templateCallback</code></td><td>Returns HTML string</td></tr>
									<tr><td><code>tooltipCallback</code></td><td>Returns tooltip text</td></tr>
									<tr><td><code>validateCallback</code></td><td>Returns error or null</td></tr>
									<tr><td><code>beforeCommitCallback</code></td><td>Returns ValidationResult</td></tr>
									<tr><td><code>cellClassCallback</code></td><td>Returns CSS class</td></tr>
									<tr><td><code>rowClassCallback</code></td><td>Returns CSS class</td></tr>
									<tr><td><code>customStylesCallback</code></td><td>Returns CSS string</td></tr>
									<tr><td><code>paginationLabelsCallback</code></td><td>Returns labels object</td></tr>
									<tr><td><code>summaryContentCallback</code></td><td>Returns HTML string</td></tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Framework Integration -->
		<section class="mb-5">
			<h2 class="mb-4">Framework Integration</h2>

			<div class="mb-4">
				<h3 class="h5">Svelte</h3>
				<CodeBlock
					codeContent={`<script>
  import { onMount } from 'svelte';
  let grid;

  onMount(() => {
    grid.onrowchange = (detail) => {
      console.log('Changed:', detail);
    };
  });
</script>

<web-grid bind:this={grid} />`}
					languageType="svelte"
				/>
			</div>

			<div class="mb-4">
				<h3 class="h5">React</h3>
				<CodeBlock
					codeContent={`function MyGrid() {
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.onrowchange = (detail) => {
        console.log('Changed:', detail);
      };
    }
  }, []);

  return <web-grid ref={gridRef} />;
}`}
					languageType="jsx"
				/>
			</div>

			<div class="mb-4">
				<h3 class="h5">Vue 3</h3>
				<CodeBlock
					codeContent={`<template>
  <web-grid ref="grid" />
</template>

<script setup>
import { ref, onMounted } from 'vue';

const grid = ref(null);

onMounted(() => {
  grid.value.onrowchange = (detail) => {
    console.log('Changed:', detail);
  };
});
</script>`}
					languageType="vue"
				/>
			</div>
		</section>

		<!-- Important Notes -->
		<div class="mt-5 p-4 bg-light border rounded">
			<h3 class="h5 mb-3">Important Notes</h3>
			<ul class="mb-0">
				<li><strong>Naming Convention:</strong> <code>on*</code> = event (fire-and-forget), <code>*Callback</code> = return value matters</li>
				<li><strong>onrowchange:</strong> Contains both <code>row</code> (original) and <code>draftRow</code> (with changes)</li>
				<li><strong>ondatarequest:</strong> Essential for server-side sorting and pagination</li>
				<li><strong>customStylesCallback:</strong> Styles are injected into shadow DOM - use <code>!important</code> if needed</li>
				<li><strong>Async Support:</strong> <code>ondatarequest</code> handler can be async</li>
			</ul>
		</div>
	</div>
</DocLayout>
