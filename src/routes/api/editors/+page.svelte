<script lang="ts">
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
</script>

<DocLayout
	titleText="Editors API"
	descriptionText="Complete reference for cell editor types and configuration">

	<div class="py-4">
		<!-- Overview -->
		<section class="mb-5">
			<h2 class="mb-3">Overview</h2>
			<p class="lead">
				Web Grid provides 7 built-in editor types plus a custom editor option for specialized input needs.
			</p>

			<CodeBlock
				codeContent={`type EditorType =
  | 'text'         // Text input
  | 'number'       // Numeric input
  | 'checkbox'     // Boolean toggle
  | 'select'       // Dropdown selection
  | 'combobox'     // Searchable dropdown
  | 'date'         // Date picker
  | 'autocomplete' // Async search dropdown
  | 'custom';      // Custom editor callback`}
				languageType="typescript"
				titleText="Editor Types"
			/>
		</section>

		<!-- Text Editor -->
		<section class="mb-5">
			<h2 class="mb-4">Text Editor</h2>
			<p>Standard text input for string values.</p>

			<div class="table-responsive mb-4">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Option</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>maxLength</code></td>
							<td><code>number</code></td>
							<td>-</td>
							<td>Maximum character count</td>
						</tr>
						<tr>
							<td><code>placeholder</code></td>
							<td><code>string</code></td>
							<td>-</td>
							<td>Placeholder text when empty</td>
						</tr>
						<tr>
							<td><code>pattern</code></td>
							<td><code>string</code></td>
							<td>-</td>
							<td>Regex pattern for validation</td>
						</tr>
						<tr>
							<td><code>inputMode</code></td>
							<td><code>'text' | 'numeric' | 'email' | 'tel' | 'url'</code></td>
							<td><code>'text'</code></td>
							<td>Virtual keyboard hint on mobile</td>
						</tr>
						<tr>
							<td><code>editStartSelection</code></td>
							<td><code>'selectAll' | 'cursorAtStart' | 'cursorAtEnd'</code></td>
							<td><code>'selectAll'</code></td>
							<td>Cursor position when entering edit mode</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`{
  field: 'email',
  title: 'Email',
  editor: 'text',
  editorOptions: {
    maxLength: 100,
    placeholder: 'Enter email address',
    inputMode: 'email',
    editStartSelection: 'cursorAtEnd'
  }
}`}
				languageType="javascript"
				titleText="Text Editor"
			/>
		</section>

		<!-- Number Editor -->
		<section class="mb-5">
			<h2 class="mb-4">Number Editor</h2>
			<p>Numeric input with min/max constraints and step control.</p>

			<div class="table-responsive mb-4">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Option</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>min</code></td>
							<td><code>number</code></td>
							<td>-</td>
							<td>Minimum allowed value</td>
						</tr>
						<tr>
							<td><code>max</code></td>
							<td><code>number</code></td>
							<td>-</td>
							<td>Maximum allowed value</td>
						</tr>
						<tr>
							<td><code>step</code></td>
							<td><code>number</code></td>
							<td><code>1</code></td>
							<td>Increment/decrement step</td>
						</tr>
						<tr>
							<td><code>decimalPlaces</code></td>
							<td><code>number</code></td>
							<td>-</td>
							<td>Fixed decimal places</td>
						</tr>
						<tr>
							<td><code>allowNegative</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Allow negative numbers</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`{
  field: 'salary',
  title: 'Salary',
  editor: 'number',
  editorOptions: {
    min: 0,
    max: 500000,
    step: 1000,
    allowNegative: false
  }
}

{
  field: 'rating',
  title: 'Rating',
  editor: 'number',
  editorOptions: {
    min: 0,
    max: 5,
    step: 0.1,
    decimalPlaces: 1
  }
}`}
				languageType="javascript"
				titleText="Number Editor"
			/>
		</section>

		<!-- Checkbox Editor -->
		<section class="mb-5">
			<h2 class="mb-4">Checkbox Editor</h2>
			<p>Boolean toggle for true/false values. Can be customized to use different true/false values.</p>

			<div class="table-responsive mb-4">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Option</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>trueValue</code></td>
							<td><code>unknown</code></td>
							<td><code>true</code></td>
							<td>Value to store when checked</td>
						</tr>
						<tr>
							<td><code>falseValue</code></td>
							<td><code>unknown</code></td>
							<td><code>false</code></td>
							<td>Value to store when unchecked</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`// Standard boolean
{
  field: 'active',
  title: 'Active',
  editor: 'checkbox'
}

// Custom true/false values
{
  field: 'status',
  title: 'Enabled',
  editor: 'checkbox',
  editorOptions: {
    trueValue: 'Y',
    falseValue: 'N'
  }
}

// Numeric values
{
  field: 'isPublished',
  title: 'Published',
  editor: 'checkbox',
  editorOptions: {
    trueValue: 1,
    falseValue: 0
  }
}`}
				languageType="javascript"
				titleText="Checkbox Editor"
			/>
		</section>

		<!-- Select Editor -->
		<section class="mb-5">
			<h2 class="mb-4">Select Editor</h2>
			<p>Dropdown selection from a list of options.</p>

			<div class="table-responsive mb-4">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Option</th>
							<th>Type</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>options</code></td>
							<td><code>EditorOption[]</code></td>
							<td>Static list of options</td>
						</tr>
						<tr>
							<td><code>loadOptions</code></td>
							<td><code>(row, field) => Promise&lt;EditorOption[]&gt;</code></td>
							<td>Dynamic options loader</td>
						</tr>
						<tr>
							<td><code>optionsLoadTrigger</code></td>
							<td><code>'immediate' | 'oneditstart' | 'ondropdownopen'</code></td>
							<td>When to load dynamic options</td>
						</tr>
						<tr>
							<td><code>allowEmpty</code></td>
							<td><code>boolean</code></td>
							<td>Allow null/empty selection</td>
						</tr>
						<tr>
							<td><code>emptyLabel</code></td>
							<td><code>string</code></td>
							<td>Label for empty option (default: "-- Select --")</td>
						</tr>
						<tr>
							<td><code>valueMember</code></td>
							<td><code>string</code></td>
							<td>Property for value (default: "value")</td>
						</tr>
						<tr>
							<td><code>displayMember</code></td>
							<td><code>string</code></td>
							<td>Property for display text (default: "label")</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`// Static options
{
  field: 'department',
  title: 'Department',
  editor: 'select',
  editorOptions: {
    options: [
      { value: 'eng', label: 'Engineering' },
      { value: 'mkt', label: 'Marketing' },
      { value: 'sales', label: 'Sales' },
      { value: 'hr', label: 'Human Resources' }
    ],
    allowEmpty: true,
    emptyLabel: '-- Choose department --'
  }
}

// Dynamic options (loaded per row)
{
  field: 'managerId',
  title: 'Manager',
  editor: 'select',
  editorOptions: {
    loadOptions: async (row, field) => {
      const response = await fetch(\`/api/managers?dept=\${row.department}\`);
      return await response.json();
    },
    optionsLoadTrigger: 'ondropdownopen'
  }
}`}
				languageType="javascript"
				titleText="Select Editor"
			/>
		</section>

		<!-- Combobox Editor -->
		<section class="mb-5">
			<h2 class="mb-4">Combobox Editor</h2>
			<p>Searchable dropdown - type to filter options. Combines text input with dropdown selection.</p>

			<div class="table-responsive mb-4">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Option</th>
							<th>Type</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>options</code></td>
							<td><code>EditorOption[]</code></td>
							<td>Options to filter from</td>
						</tr>
						<tr>
							<td><code>searchMember</code></td>
							<td><code>string</code></td>
							<td>Property for searchable text (falls back to displayMember)</td>
						</tr>
						<tr>
							<td><code>iconMember</code></td>
							<td><code>string</code></td>
							<td>Property for icon/emoji</td>
						</tr>
						<tr>
							<td><code>subtitleMember</code></td>
							<td><code>string</code></td>
							<td>Property for subtitle/description</td>
						</tr>
						<tr>
							<td><code>groupMember</code></td>
							<td><code>string</code></td>
							<td>Property for grouping options</td>
						</tr>
						<tr>
							<td><code>disabledMember</code></td>
							<td><code>string</code></td>
							<td>Property for disabled state</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`{
  field: 'countryCode',
  title: 'Country',
  editor: 'combobox',
  editorOptions: {
    options: [
      { value: 'US', label: 'United States', icon: '🇺🇸', group: 'Americas' },
      { value: 'CA', label: 'Canada', icon: '🇨🇦', group: 'Americas' },
      { value: 'GB', label: 'United Kingdom', icon: '🇬🇧', group: 'Europe' },
      { value: 'DE', label: 'Germany', icon: '🇩🇪', group: 'Europe' },
      { value: 'JP', label: 'Japan', icon: '🇯🇵', group: 'Asia' }
    ],
    iconMember: 'icon',
    groupMember: 'group'
  }
}`}
				languageType="javascript"
				titleText="Combobox Editor"
			/>
		</section>

		<!-- Date Editor -->
		<section class="mb-5">
			<h2 class="mb-4">Date Editor</h2>
			<p>Date picker with configurable format and constraints.</p>

			<div class="table-responsive mb-4">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Option</th>
							<th>Type</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>minDate</code></td>
							<td><code>Date | string</code></td>
							<td>Minimum selectable date</td>
						</tr>
						<tr>
							<td><code>maxDate</code></td>
							<td><code>Date | string</code></td>
							<td>Maximum selectable date</td>
						</tr>
						<tr>
							<td><code>dateFormat</code></td>
							<td><code>string</code></td>
							<td>Display format: 'YYYY-MM-DD', 'DD.MM.YYYY', etc.</td>
						</tr>
						<tr>
							<td><code>outputFormat</code></td>
							<td><code>'date' | 'iso' | 'timestamp'</code></td>
							<td>Storage format: Date object, ISO string, or timestamp</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`{
  field: 'startDate',
  title: 'Start Date',
  editor: 'date',
  editorOptions: {
    minDate: new Date(),
    dateFormat: 'DD.MM.YYYY',
    outputFormat: 'iso'
  }
}

{
  field: 'deadline',
  title: 'Deadline',
  editor: 'date',
  editorOptions: {
    minDate: '2024-01-01',
    maxDate: '2024-12-31',
    outputFormat: 'date'
  }
}`}
				languageType="javascript"
				titleText="Date Editor"
			/>
		</section>

		<!-- Autocomplete Editor -->
		<section class="mb-5">
			<h2 class="mb-4">Autocomplete Editor</h2>
			<p>Async search dropdown - type to trigger server search. Ideal for large datasets.</p>

			<div class="table-responsive mb-4">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Option</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>onSearchCallback</code></td>
							<td><code>(query, row, signal?) => Promise&lt;EditorOption[]&gt;</code></td>
							<td>-</td>
							<td>Async search function (required)</td>
						</tr>
						<tr>
							<td><code>initialOptions</code></td>
							<td><code>EditorOption[]</code></td>
							<td><code>[]</code></td>
							<td>Options to show before searching</td>
						</tr>
						<tr>
							<td><code>minSearchLength</code></td>
							<td><code>number</code></td>
							<td><code>1</code></td>
							<td>Min characters before search triggers</td>
						</tr>
						<tr>
							<td><code>debounceMs</code></td>
							<td><code>number</code></td>
							<td><code>300</code></td>
							<td>Debounce delay in milliseconds</td>
						</tr>
						<tr>
							<td><code>multiple</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Allow multiple selections</td>
						</tr>
						<tr>
							<td><code>maxSelections</code></td>
							<td><code>number</code></td>
							<td>-</td>
							<td>Max items when multiple=true</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`{
  field: 'customerId',
  title: 'Customer',
  editor: 'autocomplete',
  editorOptions: {
    onSearchCallback: async (query, row, signal) => {
      const response = await fetch(
        \`/api/customers?search=\${encodeURIComponent(query)}\`,
        { signal }  // Support cancellation
      );
      const data = await response.json();
      return data.map(c => ({
        value: c.id,
        label: c.name,
        subtitle: c.email
      }));
    },
    initialOptions: [
      { value: 'recent1', label: 'Recently Used Customer 1' },
      { value: 'recent2', label: 'Recently Used Customer 2' }
    ],
    minSearchLength: 2,
    debounceMs: 300,
    subtitleMember: 'subtitle'
  }
}`}
				languageType="javascript"
				titleText="Autocomplete Editor"
			/>
		</section>

		<!-- Custom Editor -->
		<section class="mb-5">
			<h2 class="mb-4">Custom Editor</h2>
			<p>Take full control with a custom editor callback.</p>

			<CodeBlock
				codeContent={`// CustomEditorContext type
type CustomEditorContext<T> = {
  value: unknown;      // Current cell value
  row: T;              // Row data
  rowIndex: number;
  field: string;
  commit: (newValue: unknown) => void;  // Call to save
  cancel: () => void;  // Call to cancel
}`}
				languageType="typescript"
				titleText="Context Type"
			/>

			<CodeBlock
				codeContent={`{
  field: 'color',
  title: 'Color',
  editor: 'custom',
  cellEditCallback: (ctx) => {
    // Create custom color picker
    const picker = document.createElement('input');
    picker.type = 'color';
    picker.value = ctx.value || '#000000';

    picker.addEventListener('change', () => {
      ctx.commit(picker.value);
    });

    picker.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') ctx.cancel();
    });

    // The grid will handle positioning
    picker.click();
  }
}

// Complex custom editor with modal
{
  field: 'address',
  title: 'Address',
  editor: 'custom',
  showEditButton: true,
  cellEditCallback: (ctx) => {
    openAddressModal(ctx.value, (newAddress) => {
      if (newAddress) {
        ctx.commit(newAddress);
      } else {
        ctx.cancel();
      }
    });
  }
}`}
				languageType="javascript"
				titleText="Custom Editor"
			/>
		</section>

		<!-- Shared Option Properties -->
		<section class="mb-5">
			<h2 class="mb-4">Shared Option Properties</h2>
			<p>These properties work with select, combobox, and autocomplete editors:</p>

			<div class="table-responsive mb-4">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Option</th>
							<th>Type</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>valueMember</code></td>
							<td><code>string</code></td>
							<td>Property for value (default: "value")</td>
						</tr>
						<tr>
							<td><code>displayMember</code></td>
							<td><code>string</code></td>
							<td>Property for display text (default: "label")</td>
						</tr>
						<tr>
							<td><code>searchMember</code></td>
							<td><code>string</code></td>
							<td>Property for searchable text</td>
						</tr>
						<tr>
							<td><code>iconMember</code></td>
							<td><code>string</code></td>
							<td>Property for icon/emoji</td>
						</tr>
						<tr>
							<td><code>subtitleMember</code></td>
							<td><code>string</code></td>
							<td>Property for subtitle</td>
						</tr>
						<tr>
							<td><code>groupMember</code></td>
							<td><code>string</code></td>
							<td>Property for grouping</td>
						</tr>
						<tr>
							<td><code>disabledMember</code></td>
							<td><code>string</code></td>
							<td>Property for disabled state</td>
						</tr>
						<tr>
							<td><code>onselect</code></td>
							<td><code>(option, row) => void</code></td>
							<td>Called when option is selected</td>
						</tr>
						<tr>
							<td><code>renderOptionCallback</code></td>
							<td><code>(option, context) => string</code></td>
							<td>Custom HTML rendering for options</td>
						</tr>
						<tr>
							<td><code>noOptionsText</code></td>
							<td><code>string</code></td>
							<td>Text when no options found (default: from grid.labels)</td>
						</tr>
						<tr>
							<td><code>searchingText</code></td>
							<td><code>string</code></td>
							<td>Text while searching (autocomplete only, default: from grid.labels)</td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`// Option render context
type OptionRenderContext = {
  index: number;
  isHighlighted: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

// Custom option rendering
{
  field: 'userId',
  title: 'User',
  editor: 'combobox',
  editorOptions: {
    options: users,
    valueMember: 'id',
    displayMember: 'name',
    renderOptionCallback: (option, ctx) => \`
      <div class="user-option \${ctx.isSelected ? 'selected' : ''}">
        <img src="\${option.avatar}" class="avatar" />
        <div class="user-info">
          <div class="name">\${option.name}</div>
          <div class="email">\${option.email}</div>
        </div>
      </div>
    \`,
    onselect: (option, row) => {
      console.log('Selected user:', option, 'for row:', row);
    }
  }
}`}
				languageType="javascript"
				titleText="Custom Option Rendering"
			/>
		</section>

		<!-- Callback Alternatives -->
		<section class="mb-5">
			<h2 class="mb-4">Callback Alternatives</h2>
			<p>Instead of member properties, you can use callbacks for more control:</p>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Callback</th>
							<th>Type</th>
							<th>Overrides</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>getValueCallback</code></td>
							<td><code>(option) => string | number</code></td>
							<td><code>valueMember</code></td>
						</tr>
						<tr>
							<td><code>getDisplayCallback</code></td>
							<td><code>(option) => string</code></td>
							<td><code>displayMember</code></td>
						</tr>
						<tr>
							<td><code>getSearchCallback</code></td>
							<td><code>(option) => string</code></td>
							<td><code>searchMember</code></td>
						</tr>
						<tr>
							<td><code>getIconCallback</code></td>
							<td><code>(option) => string</code></td>
							<td><code>iconMember</code></td>
						</tr>
						<tr>
							<td><code>getSubtitleCallback</code></td>
							<td><code>(option) => string</code></td>
							<td><code>subtitleMember</code></td>
						</tr>
						<tr>
							<td><code>getDisabledCallback</code></td>
							<td><code>(option) => boolean</code></td>
							<td><code>disabledMember</code></td>
						</tr>
						<tr>
							<td><code>getGroupCallback</code></td>
							<td><code>(option) => string</code></td>
							<td><code>groupMember</code></td>
						</tr>
					</tbody>
				</table>
			</div>

			<CodeBlock
				codeContent={`{
  field: 'product',
  title: 'Product',
  editor: 'combobox',
  editorOptions: {
    options: products,
    getValueCallback: (opt) => opt.sku,
    getDisplayCallback: (opt) => \`\${opt.name} (\${opt.sku})\`,
    getIconCallback: (opt) => opt.inStock ? 'check' : 'x',
    getDisabledCallback: (opt) => !opt.inStock
  }
}`}
				languageType="javascript"
				titleText="Callback Example"
			/>
		</section>

		<!-- Important Notes -->
		<div class="mt-5 p-4 bg-light border rounded">
			<h3 class="h5 mb-3">Important Notes</h3>
			<ul class="mb-0">
				<li><strong>EditorOption type:</strong> <code>{'{'} value: string | number | boolean, label: string, [key: string]: unknown {'}'}</code></li>
				<li><strong>Callbacks override members:</strong> If both callback and member are set, callback takes priority</li>
				<li><strong>AbortSignal:</strong> Autocomplete provides a signal for request cancellation</li>
				<li><strong>Custom editors:</strong> Must call either <code>commit()</code> or <code>cancel()</code></li>
				<li><strong>Dynamic options:</strong> Use <code>loadOptions</code> for row-specific option lists</li>
			</ul>
		</div>
	</div>
</DocLayout>
