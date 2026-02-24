<script lang="ts">
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
</script>

<DocLayout
	titleText="Columns API"
	descriptionText="Complete reference for column configuration">

	<div class="py-4">
		<!-- Overview -->
		<section class="mb-5">
			<h2 class="mb-3">Overview</h2>
			<p class="lead">
				Columns define how data is displayed, formatted, and edited in the grid. Each column maps to a field in your data objects.
			</p>

			<CodeBlock
				codeContent={`type Column<T> = {
  field: keyof T | string;
  title: string;
  // ... display, editing, and callback options
}`}
				languageType="typescript"
				titleText="Column Type"
			/>
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
							<th>Required</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>field</code></td>
							<td><code>string</code></td>
							<td>Yes</td>
							<td>Property name in data object to display</td>
						</tr>
						<tr>
							<td><code>title</code></td>
							<td><code>string</code></td>
							<td>Yes</td>
							<td>Column header text</td>
						</tr>
						<tr>
							<td><code>headerInfo</code></td>
							<td><code>string</code></td>
							<td>No</td>
							<td>Info tooltip shown next to header (displays info icon)</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`grid.columns = [
  { field: 'id', title: 'ID' },
  { field: 'name', title: 'Full Name' },
  {
    field: 'status',
    title: 'Status',
    headerInfo: 'Current employee status in the system'
  }
];`}
				languageType="javascript"
				titleText="Basic Columns"
			/>
		</section>

		<!-- Sizing Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Sizing Properties</h2>

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
							<td><code>width</code></td>
							<td><code>string</code></td>
							<td>auto</td>
							<td>Column width (CSS value: '100px', '10%', 'auto')</td>
						</tr>
						<tr>
							<td><code>minWidth</code></td>
							<td><code>string</code></td>
							<td>-</td>
							<td>Minimum column width</td>
						</tr>
						<tr>
							<td><code>maxWidth</code></td>
							<td><code>string</code></td>
							<td>-</td>
							<td>Maximum column width</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`grid.columns = [
  { field: 'id', title: 'ID', width: '60px' },
  { field: 'name', title: 'Name', width: '150px', minWidth: '100px' },
  { field: 'description', title: 'Description', maxWidth: '400px' },
  { field: 'email', title: 'Email' }  // Auto width
];`}
				languageType="javascript"
				titleText="Column Sizing"
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
							<td><code>horizontalAlign</code></td>
							<td><code>'left' | 'center' | 'right' | 'justify'</code></td>
							<td><code>'left'</code></td>
							<td>Text alignment in cells</td>
						</tr>
						<tr>
							<td><code>textOverflow</code></td>
							<td><code>'wrap' | 'ellipsis'</code></td>
							<td><code>'ellipsis'</code></td>
							<td>How to handle text overflow</td>
						</tr>
						<tr>
							<td><code>isSortable</code></td>
							<td><code>boolean</code></td>
							<td>inherits</td>
							<td>Per-column sortable override. When <code>false</code>, hides sort options in header context menu.</td>
						</tr>
						<tr>
							<td><code>isFilterable</code></td>
							<td><code>boolean</code></td>
							<td>inherits</td>
							<td>Per-column filterable override</td>
						</tr>
						<tr>
							<td><code>isHidden</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Hide column from display. Column stays in array and can be shown again via Column Visibility submenu.</td>
						</tr>
						<tr>
							<td><code>verticalAlign</code></td>
							<td><code>'top' | 'middle' | 'bottom'</code></td>
							<td><code>'middle'</code></td>
							<td>Vertical alignment of cell content</td>
						</tr>
						<tr>
							<td><code>headerHorizontalAlign</code></td>
							<td><code>'left' | 'center' | 'right' | 'justify'</code></td>
							<td>inherits</td>
							<td>Header text alignment</td>
						</tr>
						<tr>
							<td><code>headerVerticalAlign</code></td>
							<td><code>'top' | 'middle' | 'bottom'</code></td>
							<td><code>'middle'</code></td>
							<td>Header vertical alignment</td>
						</tr>
						<tr>
							<td><code>maxLines</code></td>
							<td><code>number</code></td>
							<td>-</td>
							<td>Maximum lines with CSS line-clamp (requires textOverflow: 'wrap')</td>
						</tr>
						<tr>
							<td><code>isMovable</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Whether column can be reordered</td>
						</tr>
						<tr>
							<td><code>isResizable</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Whether column can be resized</td>
						</tr>
						<tr>
							<td><code>isFrozen</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Pin column to the left side</td>
						</tr>
						<tr>
							<td><code>fillDirection</code></td>
							<td><code>'vertical' | 'all'</code></td>
							<td>-</td>
							<td>Per-column override for fill direction</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`grid.columns = [
  { field: 'id', title: 'ID', horizontalAlign: 'center', isSortable: false },
  { field: 'name', title: 'Name', textOverflow: 'ellipsis' },
  { field: 'salary', title: 'Salary', horizontalAlign: 'right' },
  { field: 'notes', title: 'Notes', textOverflow: 'wrap' },
  { field: 'internal', title: 'Internal', isHidden: true }  // Hidden by default
];

// Hidden columns can be shown via headerContextMenu:
grid.headerContextMenu = ['columnVisibility'];`}
				languageType="javascript"
				titleText="Display Options"
			/>
		</section>

		<!-- Styling Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Styling Properties</h2>

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
							<td><code>cellClass</code></td>
							<td><code>string</code></td>
							<td>CSS class(es) applied to all cells in this column</td>
						</tr>
						<tr>
							<td><code>cellClassCallback</code></td>
							<td><code>(value, row) => string | null</code></td>
							<td>Dynamic CSS class based on cell value or row data</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`grid.columns = [
  {
    field: 'status',
    title: 'Status',
    cellClass: 'status-cell'
  },
  {
    field: 'salary',
    title: 'Salary',
    cellClassCallback: (value, row) => {
      if (value > 100000) return 'high-salary';
      if (value < 50000) return 'low-salary';
      return null;
    }
  }
];

// Define classes in customStylesCallback
grid.customStylesCallback = () => \`
  .high-salary { background: #d1fae5 !important; }
  .low-salary { background: #fef3c7 !important; }
\`;`}
				languageType="javascript"
				titleText="Cell Styling"
			/>
		</section>

		<!-- Formatting Callbacks -->
		<section class="mb-5">
			<h2 class="mb-4">Formatting Callbacks</h2>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Callback</th>
							<th>Type</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>formatCallback</code></td>
							<td><code>(value, row) => string</code></td>
							<td>Transform value for display (text output)</td>
						</tr>
						<tr>
							<td><code>templateCallback</code></td>
							<td><code>(row) => string</code></td>
							<td>Return HTML string for cell content</td>
						</tr>
						<tr>
							<td><code>renderCallback</code></td>
							<td><code>(row, element) => void</code></td>
							<td>Direct DOM manipulation for cell content</td>
						</tr>
						<tr>
							<td><code>tooltipCallback</code></td>
							<td><code>(value, row) => string | null</code></td>
							<td>Dynamic tooltip text on hover</td>
						</tr>
						<tr>
							<td><code>tooltipMember</code></td>
							<td><code>string</code></td>
							<td>Property name containing tooltip text</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`grid.columns = [
  // Simple formatting
  {
    field: 'salary',
    title: 'Salary',
    formatCallback: (value) => '$' + value.toLocaleString()
  },

  // Date formatting
  {
    field: 'createdAt',
    title: 'Created',
    formatCallback: (value) => new Date(value).toLocaleDateString()
  },

  // HTML template
  {
    field: 'status',
    title: 'Status',
    templateCallback: (row) => \`
      <span class="badge badge-\${row.status}">
        \${row.status.toUpperCase()}
      </span>
    \`
  },

  // Tooltip
  {
    field: 'name',
    title: 'Name',
    tooltipCallback: (value, row) => \`ID: \${row.id}\\nEmail: \${row.email}\`
  }
];`}
				languageType="javascript"
				titleText="Formatting Examples"
			/>
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
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>isEditable</code></td>
							<td><code>boolean</code></td>
							<td>Per-column editable override</td>
						</tr>
						<tr>
							<td><code>editor</code></td>
							<td><code>EditorType</code></td>
							<td>Editor type: 'text', 'number', 'checkbox', 'select', 'combobox', 'date', 'autocomplete', 'custom'</td>
						</tr>
						<tr>
							<td><code>editTrigger</code></td>
							<td><code>EditTrigger</code></td>
							<td>Per-column edit trigger override</td>
						</tr>
						<tr>
							<td><code>editorOptions</code></td>
							<td><code>EditorOptions</code></td>
							<td>Editor-specific configuration (see <a href="/api/editors">Editors API</a>)</td>
						</tr>
						<tr>
							<td><code>isEditButtonVisible</code></td>
							<td><code>boolean</code></td>
							<td>Show edit button in cell</td>
						</tr>
						<tr>
							<td><code>dropdownToggleVisibility</code></td>
							<td><code>'always' | 'on-focus'</code></td>
							<td>Per-column dropdown toggle visibility</td>
						</tr>
						<tr>
							<td><code>shouldOpenDropdownOnEnter</code></td>
							<td><code>boolean</code></td>
							<td>Enter opens dropdown vs moves down</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`grid.columns = [
  // Read-only column
  { field: 'id', title: 'ID', isEditable: false },

  // Text editor
  { field: 'name', title: 'Name', editor: 'text' },

  // Number editor with constraints
  {
    field: 'salary',
    title: 'Salary',
    editor: 'number',
    editorOptions: {
      min: 0,
      max: 500000,
      step: 1000
    }
  },

  // Select dropdown
  {
    field: 'department',
    title: 'Department',
    editor: 'select',
    editorOptions: {
      options: [
        { value: 'eng', label: 'Engineering' },
        { value: 'mkt', label: 'Marketing' },
        { value: 'hr', label: 'Human Resources' }
      ]
    }
  }
];`}
				languageType="javascript"
				titleText="Editor Configuration"
			/>
		</section>

		<!-- Validation Callbacks -->
		<section class="mb-5">
			<h2 class="mb-4">Validation Callbacks</h2>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Callback</th>
							<th>Type</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>validateCallback</code></td>
							<td><code>(value, row) => string | null | Promise&lt;string | null&gt;</code></td>
							<td>Return error message or null if valid (deprecated)</td>
						</tr>
						<tr>
							<td><code>beforeCommitCallback</code></td>
							<td><code>(context) => ValidationResult | boolean | string | null | undefined | Promise&lt;...&gt;</code></td>
							<td>Validate and optionally transform value before commit</td>
						</tr>
						<tr>
							<td><code>cellEditCallback</code></td>
							<td><code>(context) => void</code></td>
							<td>Take over cell editing with custom logic</td>
						</tr>
						<tr>
							<td><code>validationTooltipCallback</code></td>
							<td><code>(context) => string | null</code></td>
							<td>Return custom HTML for validation tooltip (column-level override)</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`// BeforeCommitContext type
type BeforeCommitContext<T> = {
  value: unknown;
  oldValue: unknown;
  row: T;
  rowIndex: number;
  field: string;
}

// ValidationResult type
type ValidationResult = {
  valid: boolean;
  message?: string;
  transformedValue?: unknown;
}

grid.columns = [
  {
    field: 'email',
    title: 'Email',
    editor: 'text',
    beforeCommitCallback: (ctx) => {
      const email = String(ctx.value).trim().toLowerCase();

      if (!email.includes('@')) {
        return { valid: false, message: 'Invalid email format' };
      }

      // Transform to lowercase
      return { valid: true, transformedValue: email };
    }
  },
  {
    field: 'salary',
    title: 'Salary',
    editor: 'number',
    beforeCommitCallback: (ctx) => {
      if (ctx.value < ctx.oldValue * 0.5) {
        return { valid: false, message: 'Cannot reduce salary by more than 50%' };
      }
      return { valid: true };
    }
  }
];`}
				languageType="typescript"
				titleText="Validation"
			/>
		</section>

		<!-- Clipboard Callbacks -->
		<section class="mb-5">
			<h2 class="mb-4">Clipboard Callbacks</h2>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Callback</th>
							<th>Type</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>beforeCopyCallback</code></td>
							<td><code>(value, row) => string</code></td>
							<td>Transform value before copying to clipboard</td>
						</tr>
						<tr>
							<td><code>beforePasteCallback</code></td>
							<td><code>(value, row) => unknown</code></td>
							<td>Process pasted value before applying</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`grid.columns = [
  {
    field: 'salary',
    title: 'Salary',
    formatCallback: (v) => '$' + v.toLocaleString(),
    // Copy as plain number
    beforeCopyCallback: (value) => String(value),
    // Parse pasted value
    beforePasteCallback: (value) => {
      const num = parseInt(value.replace(/[^0-9]/g, ''));
      return isNaN(num) ? 0 : num;
    }
  },
  {
    field: 'email',
    title: 'Email',
    // Normalize pasted emails
    beforePasteCallback: (value) => value.toLowerCase().trim()
  }
];`}
				languageType="javascript"
				titleText="Clipboard Handling"
			/>
		</section>

		<!-- Complete Example -->
		<section class="mb-5">
			<h2 class="mb-4">Complete Example</h2>

			<CodeBlock
				codeContent={`interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  salary: number;
  startDate: string;
  active: boolean;
}

const columns: Column<Employee>[] = [
  {
    field: 'id',
    title: 'ID',
    width: '60px',
    horizontalAlign: 'center',
    isEditable: false
  },
  {
    field: 'name',
    title: 'Name',
    width: '150px',
    editor: 'text',
    editorOptions: { maxLength: 100 }
  },
  {
    field: 'email',
    title: 'Email',
    editor: 'text',
    editorOptions: { inputMode: 'email' },
    beforeCommitCallback: (ctx) => {
      const email = String(ctx.value).toLowerCase();
      if (!email.includes('@')) {
        return { valid: false, message: 'Invalid email' };
      }
      return { valid: true, transformedValue: email };
    }
  },
  {
    field: 'department',
    title: 'Department',
    width: '120px',
    editor: 'select',
    editorOptions: {
      options: [
        { value: 'eng', label: 'Engineering' },
        { value: 'mkt', label: 'Marketing' },
        { value: 'sales', label: 'Sales' }
      ]
    }
  },
  {
    field: 'salary',
    title: 'Salary',
    width: '100px',
    horizontalAlign: 'right',
    editor: 'number',
    formatCallback: (v) => '$' + v.toLocaleString(),
    editorOptions: { min: 0, step: 1000 },
    cellClassCallback: (v) => v > 100000 ? 'high-value' : null
  },
  {
    field: 'startDate',
    title: 'Start Date',
    width: '120px',
    editor: 'date',
    formatCallback: (v) => new Date(v).toLocaleDateString()
  },
  {
    field: 'active',
    title: 'Active',
    width: '80px',
    horizontalAlign: 'center',
    editor: 'checkbox'
  }
];

grid.columns = columns;`}
				languageType="typescript"
				titleText="Full Column Configuration"
			/>
		</section>

		<!-- Important Notes -->
		<div class="mt-5 p-4 bg-light border rounded">
			<h3 class="h5 mb-3">Important Notes</h3>
			<ul class="mb-0">
				<li><strong>field & title:</strong> Required for every column</li>
				<li><strong>Callback Priority:</strong> <code>renderCallback</code> > <code>templateCallback</code> > <code>formatCallback</code> > raw value</li>
				<li><strong>Tooltip Priority:</strong> <code>tooltipCallback</code> takes priority over <code>tooltipMember</code></li>
				<li><strong>Validation:</strong> Prefer <code>beforeCommitCallback</code> over deprecated <code>validateCallback</code></li>
				<li><strong>Type Safety:</strong> Use <code>Column&lt;T&gt;</code> generic for full TypeScript support</li>
			</ul>
		</div>
	</div>
</DocLayout>
