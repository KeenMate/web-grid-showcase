<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let textEditorGrid: any;
	let selectEditorGrid: any;
	let validationGrid: any;
	let richValidationGrid: any;

	const employees = [
		{ id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'active', salary: 95000 },
		{ id: 2, name: 'Bob Smith', email: 'bob@example.com', status: 'pending', salary: 72000 },
		{ id: 3, name: 'Charlie Brown', email: 'charlie@example.com', status: 'active', salary: 88000 }
	];

	onMount(async () => {
		await import('@keenmate/web-grid');
		// Text Editor Grid
		if (textEditorGrid) {
			textEditorGrid.columns = [
				{ field: 'id', title: 'ID', width: '60px', isEditable: false },
				{ field: 'name', title: 'Name', width: '150px', editor: 'text', editorOptions: { placeholder: 'Enter name...' } },
				{ field: 'email', title: 'Email', editor: 'text', editorOptions: { placeholder: 'Enter email...', editStartSelection: 'selectAll' } },
				{ field: 'salary', title: 'Salary', width: '120px', horizontalAlign: 'right', editor: 'number', editorOptions: { min: 0, step: 1000 }, formatCallback: (v: number) => '$' + v.toLocaleString() }
			];
			textEditorGrid.items = [...employees];
			textEditorGrid.isEditable = true;
			textEditorGrid.editTrigger = 'click';
		}

		// Select Editor Grid
		if (selectEditorGrid) {
			selectEditorGrid.columns = [
				{ field: 'name', title: 'Name', width: '150px' },
				{
					field: 'status',
					title: 'Status',
					width: '120px',
					isEditable: true,
					editor: 'select',
					editorOptions: {
						options: [
							{ value: 'active', label: 'Active' },
							{ value: 'pending', label: 'Pending' },
							{ value: 'inactive', label: 'Inactive' }
						],
						valueMember: 'value',
						displayMember: 'label'
					}
				}
			];
			selectEditorGrid.items = [...employees];
			selectEditorGrid.isEditable = true;
			selectEditorGrid.editTrigger = 'click';
		}

		// Validation Grid
		if (validationGrid) {
			validationGrid.columns = [
				{ field: 'name', title: 'Name', width: '150px', isEditable: true, editor: 'text' },
				{
					field: 'email',
					title: 'Email',
					isEditable: true,
					editor: 'text',
					beforeCommitCallback: ({ value }: { value: string }) => {
						if (!value || !value.includes('@')) {
							return { valid: false, message: 'Please enter a valid email address' };
						}
						return { valid: true, transformedValue: value.toLowerCase() };
					}
				},
				{
					field: 'salary',
					title: 'Salary',
					width: '120px',
					isEditable: true,
					editor: 'number',
					horizontalAlign: 'right',
					formatCallback: (v: number) => '$' + v.toLocaleString(),
					beforeCommitCallback: ({ value }: { value: number }) => {
						if (value < 30000) {
							return { valid: false, message: 'Minimum salary is $30,000' };
						}
						if (value > 200000) {
							return { valid: false, message: 'Maximum salary is $200,000' };
						}
						return { valid: true };
					}
				}
			];
			validationGrid.items = [...employees];
			validationGrid.isEditable = true;
			validationGrid.editTrigger = 'navigate';
		}

		// Rich Validation Tooltip Grid
		if (richValidationGrid) {
			const escapeHtml = (str: string) => str.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] || c));

			richValidationGrid.columns = [
				{ field: 'name', title: 'Name', width: '150px', isEditable: true, editor: 'text' },
				{
					field: 'email',
					title: 'Email',
					isEditable: true,
					editor: 'text',
					beforeCommitCallback: ({ value }: { value: string }) => {
						if (!value || !value.includes('@')) {
							return { valid: false, message: 'Email must contain @' };
						}
						return { valid: true, transformedValue: value.toLowerCase() };
					},
					// Column-level rich tooltip
					validationTooltipCallback: ({ error, value }: any) => {
						const safeValue = escapeHtml(String(value || ''));
						return `<strong style="color: #dc2626;">Invalid Email</strong>
							<p style="margin: 4px 0;">${escapeHtml(error)}</p>
							<p style="margin: 4px 0; color: #6b7280;">You entered: <code style="background: #f3f4f6; padding: 2px 4px; border-radius: 3px;">${safeValue}</code></p>
							<p style="margin: 4px 0; font-size: 11px; color: #9ca3af;">Example: user@example.com</p>`;
					}
				},
				{
					field: 'salary',
					title: 'Salary',
					width: '120px',
					isEditable: true,
					editor: 'number',
					horizontalAlign: 'right',
					formatCallback: (v: number) => '$' + v.toLocaleString(),
					beforeCommitCallback: ({ value }: { value: number }) => {
						if (value < 30000) return { valid: false, message: 'Below minimum' };
						if (value > 200000) return { valid: false, message: 'Above maximum' };
						return { valid: true };
					}
				}
			];
			richValidationGrid.items = [...employees];
			richValidationGrid.isEditable = true;
			richValidationGrid.editTrigger = 'navigate';
			// Grid-level rich tooltip (applies to salary column which has no column-level callback)
			richValidationGrid.validationTooltipCallback = ({ field, error, value }: any) => {
				return `<div style="text-align: center;">
					<strong style="color: #dc2626;">Validation Failed</strong>
					<p style="margin: 4px 0;">${escapeHtml(error)}</p>
					<p style="margin: 4px 0; font-size: 11px; color: #6b7280;">Field: ${escapeHtml(field)} | Value: ${escapeHtml(String(value))}</p>
					<p style="margin: 4px 0; font-size: 11px;">Range: $30,000 - $200,000</p>
				</div>`;
			};
		}
	});
</script>

<DocLayout
	titleText="Editing"
	descriptionText="In-cell editing with 8 editor types and validation">

	<div class="py-4">
		<!-- Text & Number Editors -->
		<ShowcaseSection
			titleText="ED01 Text & Number Editors"
			subtitleText="Basic input editing with edit triggers and cursor start positions"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Description">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={textEditorGrid}
						style="max-height: 250px;"
					></web-grid>
					<p class="small text-muted mt-2">Click any cell to edit. ID column is read-only.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`grid.isEditable = true;
grid.editTrigger = 'click';
grid.editStartSelection = 'mousePosition'; // default

grid.columns = [
  {
    field: 'name',
    title: 'Name',
    editor: 'text',
    editorOptions: {
      placeholder: 'Enter name...',
      maxLength: 100,
      // Per-column override:
      // editStartSelection: 'selectAll'
    }
  },
  {
    field: 'salary',
    title: 'Salary',
    editor: 'number',
    editorOptions: {
      min: 0,
      max: 1000000,
      step: 1000
    }
  }
];`}
					languageType="javascript"
					titleText="Text & Number"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Edit Triggers</h5>
					<ul>
						<li><code>click</code> - Single click</li>
						<li><code>dblclick</code> - Double click (default)</li>
						<li><code>navigate</code> - Excel-like (type to edit)</li>
						<li><code>button</code> - Edit button in cell</li>
						<li><code>always</code> - Always in edit mode</li>
					</ul>
					<h5>Edit Start Selection</h5>
					<ul>
						<li><code>mousePosition</code> - Cursor at click (default)</li>
						<li><code>selectAll</code> - Select all text</li>
						<li><code>cursorAtStart</code> - Cursor at start</li>
						<li><code>cursorAtEnd</code> - Cursor at end</li>
					</ul>
					<h5>Text Options</h5>
					<p><code>maxLength</code>, <code>placeholder</code>, <code>pattern</code></p>
					<h5>Number Options</h5>
					<p><code>min</code>, <code>max</code>, <code>step</code>, <code>decimalPlaces</code>, <code>allowNegative</code></p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Select & Combobox -->
		<ShowcaseSection
			titleText="ED02 Select Editor"
			subtitleText="Dropdown selection with value/display members and option grouping"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Description">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={selectEditorGrid}
						style="max-height: 250px;"
					></web-grid>
					<p class="small text-muted mt-2">Click status cells to see dropdown.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`{
  field: 'status',
  title: 'Status',
  editor: 'select',
  editorOptions: {
    options: [
      { value: 'active', label: 'Active' },
      { value: 'pending', label: 'Pending' },
      { value: 'inactive', label: 'Inactive' }
    ],
    valueMember: 'value',
    displayMember: 'label',
    allowEmpty: true,
    emptyLabel: '-- Select --'
  }
}`}
					languageType="javascript"
					titleText="Select Editor"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Editor Types</h5>
					<ul>
						<li><code>select</code> - Static dropdown</li>
						<li><code>combobox</code> - Filterable dropdown</li>
						<li><code>autocomplete</code> - Async search</li>
					</ul>
					<h5>Option Properties</h5>
					<p><code>valueMember</code> - Value property</p>
					<p><code>displayMember</code> - Display text</p>
					<p><code>iconMember</code> - Optional icon</p>
					<p><code>groupMember</code> - Group heading</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Validation -->
		<ShowcaseSection
			titleText="ED03 Validation"
			subtitleText="Validate input and transform values with beforeCommitCallback"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Description">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={validationGrid}
						style="max-height: 250px;"
					></web-grid>
					<p class="small text-muted mt-2">Try entering invalid email or salary outside $30K-$200K range.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`{
  field: 'email',
  title: 'Email',
  editor: 'text',
  beforeCommitCallback: ({ value, row }) => {
    if (!value.includes('@')) {
      return {
        valid: false,
        message: 'Invalid email address'
      };
    }
    // Transform to lowercase
    return {
      valid: true,
      transformedValue: value.toLowerCase()
    };
  }
}

// Listen for changes
grid.onrowchange = (e) => {
  console.log(\`\${e.field} changed to \${e.newValue}\`);
  console.log('Valid:', e.isValid);
};`}
					languageType="javascript"
					titleText="Validation"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>beforeCommitCallback</h5>
					<p>Called before value is saved. Return:</p>
					<ul>
						<li><code>valid: false</code> - Block commit, show error</li>
						<li><code>valid: true</code> - Allow commit</li>
						<li><code>transformedValue</code> - Modify the value</li>
					</ul>
					<h5>Events</h5>
					<p><code>onrowchange</code> - After successful commit</p>
					<p><code>onvalidationerror</code> - When validation fails</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Rich Validation Tooltips -->
		<ShowcaseSection
			titleText="ED04 Rich Validation Tooltips"
			subtitleText="Custom HTML tooltips with escaped user input for validation errors"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Description">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={richValidationGrid}
						style="max-height: 250px;"
					></web-grid>
					<p class="small text-muted mt-2">Enter invalid email or salary, then hover over the red cell to see rich tooltip.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Helper to escape user input
const escapeHtml = (s) => s.replace(/[&<>"']/g,
  c => ({'&':'&amp;','<':'&lt;','>':'&gt;',
         '"':'&quot;',"'":'&#39;'}[c]));

// Column-level callback (overrides grid)
{
  field: 'email',
  validationTooltipCallback: ({ error, value }) => {
    return \`
      <strong style="color: #dc2626;">Invalid</strong>
      <p>\${escapeHtml(error)}</p>
      <p>You entered: <code>\${escapeHtml(value)}</code></p>
    \`;
  }
}

// Grid-level callback (fallback)
grid.validationTooltipCallback = ({ field, error, value }) => {
  return \`<b>\${field}</b>: \${escapeHtml(error)}\`;
};`}
					languageType="javascript"
					titleText="Rich Tooltips"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>validationTooltipCallback</h5>
					<p>Return HTML string for rich error display.</p>
					<h5>Context Object</h5>
					<ul>
						<li><code>field</code> - Column field name</li>
						<li><code>error</code> - Validation message</li>
						<li><code>value</code> - The invalid value</li>
						<li><code>row</code> - Row data</li>
						<li><code>rowIndex</code> - Row index</li>
					</ul>
					<h5>Priority</h5>
					<p>Column-level overrides grid-level callback.</p>
					<h5>Security</h5>
					<p>Always escape user values to prevent XSS.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Editor Types Reference -->
		<div class="mt-5">
			<h2 class="mb-4">All Editor Types</h2>
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>Type</th>
							<th>Description</th>
							<th>Key Options</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>text</code></td>
							<td>Text input</td>
							<td>maxLength, placeholder, pattern, inputMode</td>
						</tr>
						<tr>
							<td><code>number</code></td>
							<td>Numeric input</td>
							<td>min, max, step, decimalPlaces, allowNegative</td>
						</tr>
						<tr>
							<td><code>checkbox</code></td>
							<td>Boolean toggle</td>
							<td>trueValue, falseValue</td>
						</tr>
						<tr>
							<td><code>select</code></td>
							<td>Static dropdown</td>
							<td>options, valueMember, displayMember</td>
						</tr>
						<tr>
							<td><code>combobox</code></td>
							<td>Filterable dropdown</td>
							<td>options, searchMember, allowEmpty</td>
						</tr>
						<tr>
							<td><code>date</code></td>
							<td>Calendar picker</td>
							<td>minDate, maxDate, dateFormat, outputFormat</td>
						</tr>
						<tr>
							<td><code>autocomplete</code></td>
							<td>Async search</td>
							<td>searchCallback, minSearchLength, debounceMs</td>
						</tr>
						<tr>
							<td><code>custom</code></td>
							<td>Custom editor</td>
							<td>cellEditCallback (commit/cancel)</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<!-- Grid Modes -->
		<div class="mt-5">
			<h2 class="mb-4">Grid Modes</h2>
			<p>The <code>mode</code> property sets sensible defaults for common use cases:</p>

			<div class="table-responsive mb-4">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Mode</th>
							<th>Edit Trigger</th>
							<th>Cell Selection</th>
							<th>Best For</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>read-only</code></td>
							<td>None (not editable)</td>
							<td>Click selects cells</td>
							<td>Data display, reporting</td>
						</tr>
						<tr>
							<td><code>excel</code></td>
							<td><code>navigate</code> (type to edit)</td>
							<td>Click selects cells</td>
							<td>Spreadsheet-like editing</td>
						</tr>
						<tr>
							<td><code>input-matrix</code></td>
							<td><code>always</code> (always editing)</td>
							<td>Shift+Click selects cells</td>
							<td>Data entry forms</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`// Use mode instead of setting individual properties
grid.mode = 'excel';
// Equivalent to:
// grid.isEditable = true;
// grid.editTrigger = 'navigate';
// grid.dropdownToggleVisibility = 'always';
// grid.shouldShowDropdownOnFocus = false;
// grid.cellSelectionMode = 'click';

grid.mode = 'input-matrix';
// Equivalent to:
// grid.isEditable = true;
// grid.editTrigger = 'always';
// grid.dropdownToggleVisibility = 'always';
// grid.shouldShowDropdownOnFocus = true;
// grid.cellSelectionMode = 'shift';

grid.mode = 'read-only';
// Equivalent to:
// grid.isEditable = false;
// grid.dropdownToggleVisibility = 'on-focus';
// grid.cellSelectionMode = 'click';`}
				languageType="javascript"
				titleText="Grid Modes"
			/>
		</div>

		<!-- Additional Editor Examples -->
		<div class="mt-5">
			<h2 class="mb-4">Additional Editor Examples</h2>

			<h4>Checkbox Editor</h4>
			<CodeBlock
				codeContent={`{
  field: 'active',
  title: 'Active',
  editor: 'checkbox',
  editorOptions: {
    trueValue: 'Y',     // Custom true value (default: true)
    falseValue: 'N'     // Custom false value (default: false)
  }
}

// Always show checkbox (no need to enter edit mode)
grid.isCheckboxAlwaysEditable = true;

// Scale checkbox size via CSS variable
// --wg-checkbox-scale: 1.2;`}
				languageType="javascript"
				titleText="Checkbox Editor"
			/>

			<h4 class="mt-4">Combobox Editor</h4>
			<CodeBlock
				codeContent={`{
  field: 'country',
  title: 'Country',
  editor: 'combobox',
  editorOptions: {
    options: [
      { value: 'US', label: 'United States', icon: '🇺🇸', group: 'Americas' },
      { value: 'CA', label: 'Canada', icon: '🇨🇦', group: 'Americas' },
      { value: 'GB', label: 'United Kingdom', icon: '🇬🇧', group: 'Europe' }
    ],
    iconMember: 'icon',
    groupMember: 'group',
    placeholder: 'Search countries...',
    allowEmpty: true,
    emptyLabel: '-- None --'
  }
}`}
				languageType="javascript"
				titleText="Combobox Editor"
			/>

			<h4 class="mt-4">Autocomplete Editor</h4>
			<CodeBlock
				codeContent={`{
  field: 'customerId',
  title: 'Customer',
  editor: 'autocomplete',
  editorOptions: {
    searchCallback: async (query, row, signal) => {
      const res = await fetch(
        \`/api/customers?q=\${encodeURIComponent(query)}\`,
        { signal }  // Support cancellation
      );
      return await res.json();
    },
    initialOptions: [
      { value: 1, label: 'Recent Customer 1' }
    ],
    minSearchLength: 2,
    debounceMs: 300,
    subtitleMember: 'email',
    multiple: false
  }
}`}
				languageType="javascript"
				titleText="Autocomplete Editor"
			/>

			<h4 class="mt-4">Date Editor</h4>
			<CodeBlock
				codeContent={`{
  field: 'startDate',
  title: 'Start Date',
  editor: 'date',
  editorOptions: {
    minDate: new Date(),
    maxDate: '2025-12-31',
    dateFormat: 'DD.MM.YYYY',
    outputFormat: 'iso'  // 'date' | 'iso' | 'timestamp'
  }
}`}
				languageType="javascript"
				titleText="Date Editor"
			/>

			<h4 class="mt-4">Custom Editor</h4>
			<CodeBlock
				codeContent={`{
  field: 'color',
  title: 'Color',
  editor: 'custom',
  cellEditCallback: (ctx) => {
    // ctx.value - current value
    // ctx.row - row data
    // ctx.commit(newValue) - save
    // ctx.cancel() - discard

    const picker = document.createElement('input');
    picker.type = 'color';
    picker.value = ctx.value || '#000000';

    picker.addEventListener('change', () => {
      ctx.commit(picker.value);
    });
    picker.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') ctx.cancel();
    });
    picker.click();
  }
}

// With edit button visible
{
  field: 'address',
  title: 'Address',
  editor: 'custom',
  isEditButtonVisible: true,
  cellEditCallback: (ctx) => {
    openAddressModal(ctx.value, (result) => {
      result ? ctx.commit(result) : ctx.cancel();
    });
  }
}`}
				languageType="javascript"
				titleText="Custom Editor"
			/>
		</div>

		<!-- Shared Dropdown Options -->
		<div class="mt-5">
			<h2 class="mb-4">Shared Dropdown Options</h2>
			<p>These <code>editorOptions</code> work with select, combobox, and autocomplete editors:</p>

			<div class="table-responsive mb-4">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr><th>Option</th><th>Description</th></tr>
					</thead>
					<tbody>
						<tr><td><code>loadOptions</code></td><td>Async function to load options dynamically: <code>(row, field) => Promise&lt;Option[]&gt;</code></td></tr>
						<tr><td><code>optionsLoadTrigger</code></td><td>When to load: <code>'immediate'</code> | <code>'oneditstart'</code> | <code>'ondropdownopen'</code></td></tr>
						<tr><td><code>renderOptionCallback</code></td><td>Custom HTML for each option: <code>(option, ctx) => string</code></td></tr>
						<tr><td><code>dropdownMinWidth</code></td><td>Minimum width for dropdown panel</td></tr>
						<tr><td><code>subtitleMember</code></td><td>Property name for subtitle text below option label</td></tr>
						<tr><td><code>disabledMember</code></td><td>Property name for disabled state on options</td></tr>
						<tr><td><code>onselect</code></td><td>Callback when an option is selected: <code>(option, row) => void</code></td></tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- Dropdown Configuration -->
		<div class="mt-5">
			<h2 class="mb-4">Dropdown Configuration</h2>
			<p>These properties control dropdown behavior for select, combobox, and autocomplete editors:</p>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Property</th>
							<th>Level</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>dropdownToggleVisibility</code></td>
							<td>Grid / Column</td>
							<td><code>'always'</code></td>
							<td><code>'always'</code> shows toggle arrow even when not editing; <code>'on-focus'</code> shows only when cell is focused</td>
						</tr>
						<tr>
							<td><code>shouldShowDropdownOnFocus</code></td>
							<td>Grid</td>
							<td><code>true</code></td>
							<td>Auto-open dropdown when cell receives focus</td>
						</tr>
						<tr>
							<td><code>shouldOpenDropdownOnEnter</code></td>
							<td>Grid / Column</td>
							<td><code>false</code></td>
							<td>Enter key opens dropdown (vs moving to next row)</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</DocLayout>
