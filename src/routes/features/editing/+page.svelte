<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let textEditorGrid: any;
	let selectEditorGrid: any;
	let validationGrid: any;

	const employees = [
		{ id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'active', salary: 95000 },
		{ id: 2, name: 'Bob Smith', email: 'bob@example.com', status: 'pending', salary: 72000 },
		{ id: 3, name: 'Charlie Brown', email: 'charlie@example.com', status: 'active', salary: 88000 }
	];

	onMount(() => {
		// Text Editor Grid
		if (textEditorGrid) {
			textEditorGrid.columns = [
				{ field: 'id', title: 'ID', width: '60px', editable: false },
				{ field: 'name', title: 'Name', width: '150px', editor: 'text', editorOptions: { placeholder: 'Enter name...' } },
				{ field: 'email', title: 'Email', editor: 'text', editorOptions: { placeholder: 'Enter email...' } },
				{ field: 'salary', title: 'Salary', width: '120px', align: 'right', editor: 'number', editorOptions: { min: 0, step: 1000 }, formatCallback: (v: number) => '$' + v.toLocaleString() }
			];
			textEditorGrid.items = [...employees];
			textEditorGrid.editable = true;
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
			selectEditorGrid.editable = true;
			selectEditorGrid.editTrigger = 'click';
		}

		// Validation Grid
		if (validationGrid) {
			validationGrid.columns = [
				{ field: 'name', title: 'Name', width: '150px', editor: 'text' },
				{
					field: 'email',
					title: 'Email',
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
					editor: 'number',
					align: 'right',
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
			validationGrid.editable = true;
			validationGrid.editTrigger = 'navigate';
		}
	});
</script>

<DocLayout
	titleText="Editing"
	descriptionText="In-cell editing with 7 editor types and validation">

	<div class="py-4">
		<!-- Text & Number Editors -->
		<ShowcaseSection
			titleText="Text & Number Editors"
			subtitleText="Basic input editing"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Configuration"
			descriptionColumnTitle="Code">

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
				<div class="prose small">
					<h5>Edit Triggers</h5>
					<ul class="small">
						<li><code>click</code> - Single click</li>
						<li><code>dblclick</code> - Double click</li>
						<li><code>navigate</code> - Excel-like (type to edit)</li>
						<li><code>always</code> - Always in edit mode</li>
					</ul>
					<h5>Text Options</h5>
					<p><code>maxLength</code>, <code>placeholder</code>, <code>pattern</code></p>
					<h5>Number Options</h5>
					<p><code>min</code>, <code>max</code>, <code>step</code>, <code>decimalPlaces</code></p>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<CodeBlock
					codeContent={`grid.editable = true;
grid.editTrigger = 'click';

grid.columns = [
  {
    field: 'name',
    title: 'Name',
    editor: 'text',
    editorOptions: {
      placeholder: 'Enter name...',
      maxLength: 100
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
		</ShowcaseSection>

		<!-- Select & Combobox -->
		<ShowcaseSection
			titleText="Select Editor"
			subtitleText="Dropdown selection"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Configuration"
			descriptionColumnTitle="Code">

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
				<div class="prose small">
					<h5>Editor Types</h5>
					<ul class="small">
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

			{#snippet descriptionContent()}
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
		</ShowcaseSection>

		<!-- Validation -->
		<ShowcaseSection
			titleText="Validation"
			subtitleText="Validate and transform values before commit"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Configuration"
			descriptionColumnTitle="Code">

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
				<div class="prose small">
					<h5>beforeCommitCallback</h5>
					<p>Called before value is saved. Return:</p>
					<ul class="small">
						<li><code>valid: false</code> - Block commit, show error</li>
						<li><code>valid: true</code> - Allow commit</li>
						<li><code>transformedValue</code> - Modify the value</li>
					</ul>
					<h5>Events</h5>
					<p><code>onrowchange</code> - After successful commit</p>
					<p><code>onvalidationerror</code> - When validation fails</p>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
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
							<td>onSearchCallback, minSearchLength, debounceMs</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</DocLayout>
