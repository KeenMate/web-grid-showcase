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

		<!-- Row Focus Event -->
		<section class="mb-5">
			<h2 class="mb-4">onrowfocus</h2>
			<p>Fired when the focused row changes. Useful for master/detail patterns.</p>
			<CodeBlock
				codeContent={`grid.onrowfocus = (detail) => {
  console.log('Focused row:', detail.rowIndex);
  console.log('Row data:', detail.row);

  // Update detail panel
  showDetailPanel(detail.row);
};`}
				languageType="javascript"
				titleText="Row Focus"
			/>
		</section>

		<!-- Row Lock Change Event -->
		<section class="mb-5">
			<h2 class="mb-4">onrowlockchange</h2>
			<p>Fired when a row's lock state changes (locked or unlocked).</p>
			<CodeBlock
				codeContent={`grid.onrowlockchange = (detail) => {
  console.log('Row lock changed:', detail.rowId);
  console.log('Row:', detail.row);
  console.log('Row index:', detail.rowIndex);
  console.log('Locked:', detail.lockInfo !== null);
  console.log('Lock info:', detail.lockInfo);
  console.log('Source:', detail.source);
};`}
				languageType="javascript"
				titleText="Row Lock Change"
			/>
		</section>

		<!-- Cell Selection Change Event -->
		<section class="mb-5">
			<h2 class="mb-4">oncellselectionchange</h2>
			<p>Fired when cell selection changes.</p>
			<CodeBlock
				codeContent={`grid.oncellselectionchange = (detail) => {
  console.log('Selection range:', detail.range);
  console.log('Cell count:', detail.cellCount);
};`}
				languageType="javascript"
				titleText="Cell Selection Change"
			/>
		</section>

		<!-- Column Resize Event -->
		<section class="mb-5">
			<h2 class="mb-4">oncolumnresize</h2>
			<p>Fired after a column is resized by dragging.</p>
			<CodeBlock
				codeContent={`grid.oncolumnresize = ({ field, oldWidth, newWidth, allWidths }) => {
  console.log(\`\${field} resized: \${oldWidth} → \${newWidth}\`);
};`}
				languageType="javascript"
				titleText="Column Resize"
			/>
		</section>

		<!-- Column Reorder Event -->
		<section class="mb-5">
			<h2 class="mb-4">oncolumnreorder</h2>
			<p>Fired after a column is reordered by drag-and-drop.</p>
			<CodeBlock
				codeContent={`grid.oncolumnreorder = ({ field, fromIndex, toIndex, allOrder }) => {
  console.log(\`\${field} moved: \${fromIndex} → \${toIndex}\`);
};`}
				languageType="javascript"
				titleText="Column Reorder"
			/>
		</section>

		<!-- Fill Drag Callback -->
		<section class="mb-5">
			<h2 class="mb-4">fillDragCallback</h2>
			<p>Called before fill handle completes. Return <code>false</code> to cancel the fill operation.</p>
			<CodeBlock
				codeContent={`grid.fillDragCallback = ({ sourceCell, targetCells, direction }) => {
  console.log(\`Filling \${targetCells.length} cells \${direction}\`);
  // Return false to cancel
  return true;
};`}
				languageType="javascript"
				titleText="Fill Drag"
			/>
		</section>

		<!-- Header Context Menu Open -->
		<section class="mb-5">
			<h2 class="mb-4">onheadercontextmenuopen</h2>
			<p>Fired when the header context menu opens.</p>
			<CodeBlock
				codeContent={`grid.onheadercontextmenuopen = (ctx) => {
  console.log('Header menu for:', ctx.column.field);
  console.log('Column index:', ctx.columnIndex);
  console.log('Is frozen:', ctx.isFrozen);
  console.log('Sort direction:', ctx.sortDirection);
};`}
				languageType="javascript"
				titleText="Header Context Menu Open"
			/>
		</section>

		<!-- Paste Callbacks -->
		<section class="mb-5">
			<h2 class="mb-4">onbeforepaste / onpaste</h2>
			<p>Control and respond to paste operations from clipboard (Ctrl+V with TSV data). Use <code>detail.cancel = true</code> in <code>onbeforepaste</code> to prevent the paste.</p>
			<CodeBlock
				codeContent={`// Before paste - validate or cancel
grid.onbeforepaste = (detail) => {
  console.log('Parsed rows:', detail.parsedRows);       // 2D array of values
  console.log('Target start:', detail.targetRowIndex, detail.targetColIndex);
  console.log('New rows count:', detail.newRowsCount);
  console.log('Has headers:', detail.hasHeaders);

  // Set cancel to true to prevent paste
  if (detail.newRowsCount > 100) {
    detail.cancel = true;
  }
};

// After paste completes
grid.onpaste = (detail) => {
  console.log('Total cells:', detail.totalCells);
  console.log('Successful:', detail.successfulCells);
  console.log('Failed:', detail.failedCells);
  console.log('Skipped:', detail.skippedCells);
  console.log('New rows created:', detail.newRowsCreated);
};`}
				languageType="javascript"
				titleText="Paste Callbacks"
			/>
		</section>

		<!-- ontoolbarclick alias -->
		<section class="mb-5">
			<h2 class="mb-4">onrowaction (legacy)</h2>
			<p>Legacy alias for <code>ontoolbarclick</code>. Both work identically - prefer <code>ontoolbarclick</code> for new code.</p>
			<CodeBlock
				codeContent={`// Legacy (still works)
grid.onrowaction = (detail) => { ... };

// Preferred
grid.ontoolbarclick = (detail) => { ... };`}
				languageType="javascript"
				titleText="Legacy Alias"
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
									<tr><td><code>onrowfocus</code></td><td>Row focus changed</td></tr>
									<tr><td><code>onrowlockchange</code></td><td>Row lock state changed</td></tr>
									<tr><td><code>oncellselectionchange</code></td><td>Cell selection changed</td></tr>
									<tr><td><code>oncolumnresize</code></td><td>Column resized</td></tr>
									<tr><td><code>oncolumnreorder</code></td><td>Column reordered</td></tr>
									<tr><td><code>onheadercontextmenuopen</code></td><td>Header menu opening</td></tr>
									<tr><td><code>onbeforepaste</code></td><td>Before paste operation</td></tr>
									<tr><td><code>onpaste</code></td><td>After paste completes</td></tr>
									<tr><td><code>onrowaction</code></td><td>Toolbar click (legacy alias)</td></tr>
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
									<tr><td><code>fillDragCallback</code></td><td>Controls fill handle behavior</td></tr>
									<tr><td><code>validationTooltipCallback</code></td><td>Returns HTML for validation tooltip</td></tr>
									<tr><td><code>beforeCopyCallback</code></td><td>Transforms value before copy</td></tr>
									<tr><td><code>beforePasteCallback</code></td><td>Processes value before paste</td></tr>
									<tr><td><code>cellEditCallback</code></td><td>Takes over cell editing</td></tr>
									<tr><td><code>shortcutsHelpContentCallback</code></td><td>Returns custom HTML for shortcuts overlay</td></tr>
									<tr><td><code>idValueCallback</code></td><td>Returns row ID for identification</td></tr>
									<tr><td><code>renderCallback</code></td><td>Imperative DOM rendering</td></tr>
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
