<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
</script>

<DocLayout
	titleText="Getting Started"
	descriptionText="Learn how to install and use @keenmate/web-grid in your project">

	<div class="py-4">
		<!-- Installation -->
		<ShowcaseSection
			titleText="Installation"
			subtitleText="Add the package to your project"
			col1Title="Package Manager"
			col2Title="CDN"
			col3Title="Build Tools">

			{#snippet demoContent()}
				<CodeBlock
					codeContent="npm install @keenmate/web-grid"
					languageType="bash"
					titleText="npm"
				/>
				<CodeBlock
					codeContent="pnpm add @keenmate/web-grid"
					languageType="bash"
					titleText="pnpm"
				/>
				<CodeBlock
					codeContent="yarn add @keenmate/web-grid"
					languageType="bash"
					titleText="yarn"
				/>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- UMD Build -->
<script src="https://unpkg.com/@keenmate/web-grid/dist/web-grid.umd.js"></script>

<!-- ES Module -->
<script type="module">
  import '@keenmate/web-grid';
</script>`}
					languageType="html"
					titleText="CDN Usage"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h4>Choose Your Method</h4>
					<p>
						Install via npm/pnpm/yarn for build tool integration, or use the CDN for quick prototyping and simple projects.
					</p>
					<h4>Zero Configuration</h4>
					<p>
						The component registers itself automatically when imported. No additional setup required. Styles are encapsulated in Shadow DOM.
					</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Basic Usage -->
		<ShowcaseSection
			titleText="Basic Usage"
			subtitleText="Your first data grid"
			col1Title="HTML"
			col2Title="JavaScript"
			col3Title="Explanation">

			{#snippet demoContent()}
				<CodeBlock
					codeContent={`<!DOCTYPE html>
<html>
<head>
  <title>Web Grid Example</title>
</head>
<body>
  <web-grid
    id="my-grid"
    style="max-height: 400px;"
  ></web-grid>

  <script type="module">
    import '@keenmate/web-grid';
  </script>
</body>
</html>`}
					languageType="html"
					titleText="HTML Structure"
				/>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`const grid = document.querySelector('#my-grid');

// Define columns
grid.columns = [
  { field: 'id', title: 'ID', width: '60px' },
  { field: 'name', title: 'Name', width: '150px' },
  { field: 'email', title: 'Email' },
  {
    field: 'salary',
    title: 'Salary',
    align: 'right',
    formatCallback: (v) => '$' + v.toLocaleString()
  }
];

// Set data
grid.items = [
  { id: 1, name: 'Alice', email: 'alice@example.com', salary: 85000 },
  { id: 2, name: 'Bob', email: 'bob@example.com', salary: 72000 },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', salary: 91000 }
];

// Enable features
grid.isSortable = true;
grid.pageable = true;
grid.pageSize = 10;`}
					languageType="javascript"
					titleText="JavaScript API"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h4>Column Definitions</h4>
					<p>
						Use the <code>columns</code> property to define your grid structure. Each column specifies a <code>field</code> and <code>title</code>.
					</p>
					<h4>Data Binding</h4>
					<p>
						Set <code>items</code> to an array of objects. The grid automatically renders rows based on your column definitions.
					</p>
					<h4>Formatting</h4>
					<p>
						Use <code>formatCallback</code> to transform displayed values (e.g., currency, dates).
					</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Editable Grid -->
		<ShowcaseSection
			titleText="Editable Grid"
			subtitleText="Enable cell editing with validation"
			col1Title="Configuration"
			col2Title="Editor Types"
			col3Title="Events">

			{#snippet demoContent()}
				<CodeBlock
					codeContent={`const grid = document.querySelector('#my-grid');

grid.isEditable = true;
grid.editTrigger = 'navigate'; // Excel-like mode

grid.columns = [
  {
    field: 'name',
    title: 'Name',
    editor: 'text',
    editorOptions: {
      placeholder: 'Enter name...',
      maxLength: 50
    }
  },
  {
    field: 'email',
    title: 'Email',
    editor: 'text',
    beforeCommitCallback: ({ value }) => {
      if (!value.includes('@')) {
        return { valid: false, message: 'Invalid email' };
      }
      return { valid: true };
    }
  },
  {
    field: 'active',
    title: 'Active',
    editor: 'checkbox'
  }
];`}
					languageType="javascript"
					titleText="Editable Configuration"
				/>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Available editor types:
'text'        // Text input with maxLength, placeholder
'number'      // Numeric with min, max, step
'checkbox'    // Boolean toggle
'select'      // Static dropdown
'combobox'    // Filterable dropdown
'date'        // Calendar picker
'autocomplete' // Async search dropdown

// Select/combobox example:
{
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
    displayMember: 'label'
  }
}`}
					languageType="javascript"
					titleText="Editor Types"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<CodeBlock
					codeContent={`// Listen for changes
grid.onrowchange = (e) => {
  console.log('Field:', e.field);
  console.log('Old value:', e.oldValue);
  console.log('New value:', e.newValue);
  console.log('Row:', e.row);
  console.log('Valid:', e.isValid);
};

// Validation error event
grid.onvalidationerror = (e) => {
  console.log('Validation failed:', e.error);
};`}
					languageType="javascript"
					titleText="Change Events"
				/>
			{/snippet}
		</ShowcaseSection>

		<!-- Framework Integration -->
		<div class="mt-5">
			<h2 class="mb-4">Framework Integration</h2>
			<div class="row g-4">
				<div class="col-lg-6">
					<CodeBlock
						codeContent={`<!-- Svelte -->
<script>
  import '@keenmate/web-grid';

  let gridElement;

  const columns = [
    { field: 'id', title: 'ID' },
    { field: 'name', title: 'Name' }
  ];

  const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
  ];

  $: if (gridElement) {
    gridElement.columns = columns;
    gridElement.items = items;
  }
</script>

<web-grid bind:this={gridElement} />`}
						languageType="svelte"
						titleText="Svelte"
					/>
				</div>
				<div class="col-lg-6">
					<CodeBlock
						codeContent={`// React
import { useEffect, useRef } from 'react';
import '@keenmate/web-grid';

function DataGrid({ data, columns }) {
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.columns = columns;
      gridRef.current.items = data;
      gridRef.current.isSortable = true;
    }
  }, [data, columns]);

  return (
    <web-grid
      ref={gridRef}
      style={{ maxHeight: '400px' }}
    />
  );
}`}
						languageType="jsx"
						titleText="React"
					/>
				</div>
				<div class="col-lg-6">
					<CodeBlock
						codeContent={`<!-- Vue 3 -->
<template>
  <web-grid ref="gridRef" style="max-height: 400px" />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import '@keenmate/web-grid';

const props = defineProps(['data', 'columns']);
const gridRef = ref(null);

onMounted(() => {
  gridRef.value.columns = props.columns;
  gridRef.value.items = props.data;
  gridRef.value.isSortable = true;
});

watch(() => props.data, (newData) => {
  gridRef.value.items = newData;
});
</script>`}
						languageType="vue"
						titleText="Vue"
					/>
				</div>
				<div class="col-lg-6">
					<CodeBlock
						codeContent={`// Angular
import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import '@keenmate/web-grid';

@Component({
  selector: 'app-data-grid',
  template: \`
    <web-grid
      #grid
      style="max-height: 400px"
    ></web-grid>
  \`
})
export class DataGridComponent {
  @ViewChild('grid') gridRef!: ElementRef;
  @Input() data: any[] = [];
  @Input() columns: any[] = [];

  ngAfterViewInit() {
    this.gridRef.nativeElement.columns = this.columns;
    this.gridRef.nativeElement.items = this.data;
    this.gridRef.nativeElement.isSortable = true;
  }
}`}
						languageType="typescript"
						titleText="Angular"
					/>
				</div>
			</div>
		</div>

		<!-- TypeScript Support -->
		<div class="mt-5">
			<h2 class="mb-4">TypeScript Support</h2>
			<CodeBlock
				codeContent={`import '@keenmate/web-grid';
import type { Column, RowChangeDetail } from '@keenmate/web-grid';

interface Employee {
  id: number;
  name: string;
  email: string;
  salary: number;
}

const columns: Column<Employee>[] = [
  { field: 'id', title: 'ID', width: '60px' },
  { field: 'name', title: 'Name', editor: 'text' },
  { field: 'email', title: 'Email', editor: 'text' },
  {
    field: 'salary',
    title: 'Salary',
    editor: 'number',
    formatCallback: (val) => '$' + val.toLocaleString()
  }
];

const grid = document.querySelector('web-grid') as HTMLElement & {
  columns: Column<Employee>[];
  items: Employee[];
  onrowchange: (detail: RowChangeDetail<Employee>) => void;
};

grid.columns = columns;
grid.items = employees;
grid.onrowchange = (e) => {
  console.log('Changed:', e.field, e.newValue);
};`}
				languageType="typescript"
				titleText="TypeScript Usage"
			/>
		</div>

		<!-- Next Steps -->
		<div class="mt-5 pt-5 border-top">
			<h2 class="mb-4">Next Steps</h2>
			<div class="row g-4">
				<div class="col-md-4">
					<div class="card h-100">
						<div class="card-body">
							<h3 class="h5 card-title">View Examples</h3>
							<p class="card-text">
								Explore comprehensive examples showcasing sorting, pagination, editing, and more.
							</p>
							<a href="/features/basic" class="btn btn-primary">
								View Examples
							</a>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="card h-100">
						<div class="card-body">
							<h3 class="h5 card-title">API Reference</h3>
							<p class="card-text">
								Learn about all available properties, column options, and events.
							</p>
							<a href="/api/component" class="btn btn-primary">
								API Docs
							</a>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="card h-100">
						<div class="card-body">
							<h3 class="h5 card-title">Styling Guide</h3>
							<p class="card-text">
								Customize the appearance with 100+ CSS variables and theme integration.
							</p>
							<a href="/features/custom-styling" class="btn btn-primary">
								Custom Styling
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</DocLayout>
