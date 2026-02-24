<script lang="ts">
	import { DocLayout, ShowcaseSection, FeatureCard, CodeBlock } from '@keenmate/svelte-docs';
</script>

<DocLayout
	titleText="Web Grid Showcase"
	descriptionText="Powerful, framework-agnostic data grid web component with Excel-like editing, multi-column sorting, and extensive customization">

	<!-- Hero Section -->
	<div class="py-1">
		<div class="text-center mb-5">
			<h1 class="display-4 fw-bold mb-4">
				<span class="text-primary">@keenmate/web-grid</span>
			</h1>
			<p class="lead mb-4">
				A powerful, framework-agnostic data grid web component with Excel-like editing, multi-column sorting, virtual scrolling, and extensive customization through 170+ CSS variables.
			</p>
			<div class="d-flex gap-3 justify-content-center flex-wrap">
				<a href="/getting-started" class="btn btn-primary btn-lg">
					Get Started
				</a>
				<a href="/features/basic" class="btn btn-outline-primary btn-lg">
					View Examples
				</a>
				<a href="https://github.com/keenmate/web-grid" target="_blank" class="btn btn-outline-dark btn-lg">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" class="me-2">
						<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
					</svg>
					GitHub
				</a>
			</div>
		</div>

		<!-- Key Features -->
		<div class="row g-4 mb-5">
			<div class="col-md-6 col-lg-4">
				<FeatureCard
					iconEmoji="&#x1F3AF;"
					titleText="Framework Agnostic"
					descriptionText="Pure Web Component that works with vanilla JS, React, Vue, Angular, Svelte, and more"
					variantType="primary"
				/>
			</div>
			<div class="col-md-6 col-lg-4">
				<FeatureCard
					iconEmoji="&#x270F;&#xFE0F;"
					titleText="8 Editor Types"
					descriptionText="Text, number, checkbox, select, combobox, date picker, autocomplete, plus custom editor support"
					variantType="success"
				/>
			</div>
			<div class="col-md-6 col-lg-4">
				<FeatureCard
					iconEmoji="&#x1F5C2;&#xFE0F;"
					titleText="Multi-Column Sorting"
					descriptionText="Click to sort, Ctrl+Click for cascading multi-column sort with visual priority indicators"
					variantType="info"
				/>
			</div>
			<div class="col-md-6 col-lg-4">
				<FeatureCard
					iconEmoji="&#x2328;&#xFE0F;"
					titleText="Excel-Like Navigation"
					descriptionText="Arrow keys, Tab, Home/End, Page Up/Down with Ctrl shortcuts. Type-to-edit, clipboard support"
					variantType="warning"
				/>
			</div>
			<div class="col-md-6 col-lg-4">
				<FeatureCard
					iconEmoji="&#x1F6E0;&#xFE0F;"
					titleText="Row Toolbar & Context Menu"
					descriptionText="Floating toolbar with smart positioning. Right-click context menu with dynamic items"
					variantType="danger"
				/>
			</div>
			<div class="col-md-6 col-lg-4">
				<FeatureCard
					iconEmoji="&#x26A1;"
					titleText="Virtual Scrolling"
					descriptionText="Handle 10,000+ rows with smooth scrolling. Infinite scroll support for progressive loading"
					variantType="secondary"
				/>
			</div>
			<div class="col-md-6 col-lg-4">
				<FeatureCard
					iconEmoji="&#x1F4CB;"
					titleText="3 Grid Modes"
					descriptionText="Read-only, Excel, and Input-Matrix modes with sensible defaults for common use cases"
					variantType="primary"
				/>
			</div>
			<div class="col-md-6 col-lg-4">
				<FeatureCard
					iconEmoji="&#x1F4C4;"
					titleText="Copy & Paste"
					descriptionText="Multi-cell TSV paste from Excel, column selection via header click, and Select All support"
					variantType="success"
				/>
			</div>
			<div class="col-md-6 col-lg-4">
				<FeatureCard
					iconEmoji="&#x1F9CA;"
					titleText="Frozen Columns"
					descriptionText="Pin columns to the left while scrolling horizontally. Fill handle for Excel-like autofill"
					variantType="info"
				/>
			</div>
			<div class="col-md-6 col-lg-4">
				<FeatureCard
					iconEmoji="&#x1F512;"
					titleText="Row Locking"
					descriptionText="Optimistic locking with WebSocket support. Lock rows externally for collaborative editing"
					variantType="warning"
				/>
			</div>
			<div class="col-md-6 col-lg-4">
				<FeatureCard
					iconEmoji="&#x1F4CA;"
					titleText="Summary Bar"
					descriptionText="Customizable summary content with aggregates, totals, and metadata from server-side data"
					variantType="danger"
				/>
			</div>
			<div class="col-md-6 col-lg-4">
				<FeatureCard
					iconEmoji="&#x1F310;"
					titleText="i18n & Labels"
					descriptionText="Translatable UI strings for pagination, context menus, and dropdown editors. Full label customization"
					variantType="secondary"
				/>
			</div>
		</div>

		<!-- Quick Install -->
		<ShowcaseSection
			titleText="Quick Installation"
			subtitleText="Get started in seconds"
			col1Title="Package Manager"
			col2Title="Import"
			col3Title="Features">

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
					codeContent={`// ES Module import
import '@keenmate/web-grid';

// TypeScript types
import type { Column } from '@keenmate/web-grid';`}
					languageType="javascript"
					titleText="Import component"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h4>Simple to Use</h4>
					<p>
						Install the package, import it once, and use the <code>&lt;web-grid&gt;</code> element anywhere in your application.
					</p>
					<h4>Lightweight</h4>
					<p>
						Only one runtime dependency. No framework lock-in. Works everywhere modern web components are supported. Built with TypeScript for excellent IDE support.
					</p>
					<h4>Highly Customizable</h4>
					<p>
						170+ CSS variables for complete theming control. Integrates with @keenmate/theme-designer for enterprise theming.
					</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Example Usage -->
		<div class="mt-5">
			<h2 class="mb-4">Example Usage</h2>
			<div class="row g-4">
				<div class="col-lg-6">
					<CodeBlock
						codeContent={`<!-- Basic Grid -->
<web-grid id="grid"></web-grid>

<script>
  const grid = document.getElementById('grid');

  grid.columns = [
    { field: 'id', title: 'ID', width: '60px' },
    { field: 'name', title: 'Name', width: '150px' },
    { field: 'email', title: 'Email' },
    {
      field: 'salary',
      title: 'Salary',
      formatCallback: v => '$' + v.toLocaleString()
    }
  ];

  grid.items = [
    { id: 1, name: 'Alice', email: 'alice@example.com', salary: 85000 },
    { id: 2, name: 'Bob', email: 'bob@example.com', salary: 72000 }
  ];

  grid.sortMode = 'single';
  grid.isPageable = true;
</script>`}
						languageType="html"
						titleText="Basic Usage"
					/>
				</div>
				<div class="col-lg-6">
					<CodeBlock
						codeContent={`<!-- Editable Grid with Validation -->
<web-grid id="grid"></web-grid>

<script>
  const grid = document.getElementById('grid');

  grid.isEditable = true;
  grid.editTrigger = 'navigate'; // Excel-like

  grid.columns = [
    { field: 'name', title: 'Name', editor: 'text' },
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
      field: 'status',
      title: 'Status',
      editor: 'select',
      editorOptions: {
        options: [
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' }
        ]
      }
    }
  ];

  grid.onrowchange = (e) => {
    console.log('Changed:', e.field, e.newValue);
  };
</script>`}
						languageType="html"
						titleText="Editable Grid"
					/>
				</div>
			</div>
		</div>

		<!-- Stats/Features Icons -->
		<div class="row text-center mt-5 pt-5 border-top">
			<div class="col-md-3">
				<h3 class="display-6 fw-bold text-primary">8</h3>
				<p class="text-muted">Editor Types</p>
			</div>
			<div class="col-md-3">
				<h3 class="display-6 fw-bold text-primary">170+</h3>
				<p class="text-muted">CSS Variables</p>
			</div>
			<div class="col-md-3">
				<h3 class="display-6 fw-bold text-primary">10K+</h3>
				<p class="text-muted">Virtual Scroll Rows</p>
			</div>
			<div class="col-md-3">
				<h3 class="display-6 fw-bold text-primary">3</h3>
				<p class="text-muted">Grid Modes</p>
			</div>
		</div>
	</div>
</DocLayout>
