<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let basicGrid: any;
	let workflowGrid: any;
	let themedGrid: any;

	const initialEmployees = [
		{ id: 1, name: 'Alice Johnson',  email: 'alice@example.com',   department: 'Engineering', salary: 95000 },
		{ id: 2, name: 'Bob Smith',      email: 'bob@example.com',     department: 'Sales',       salary: 72000 },
		{ id: 3, name: 'Charlie Brown',  email: 'charlie@example.com', department: 'Marketing',   salary: 88000 },
		{ id: 4, name: 'Dana Prince',    email: 'dana@example.com',    department: 'Engineering', salary: 102000 },
		{ id: 5, name: 'Evan Wright',    email: 'evan@example.com',    department: 'Support',     salary: 64000 }
	];

	let isIndicatorVisible = $state(true);

	let dirtyRowCount = $state(0);
	let dirtyCellCount = $state(0);
	let workflowEvents: { time: string; message: string }[] = $state([]);

	function logWorkflow(message: string) {
		workflowEvents = [{ time: new Date().toLocaleTimeString(), message }, ...workflowEvents].slice(0, 30);
	}

	function recomputeStats() {
		if (!workflowGrid) return;
		const draftIndices: number[] = workflowGrid.getDraftRowIndices();
		const fields = ['name', 'email', 'department', 'salary'];
		let cells = 0;
		for (const i of draftIndices) {
			for (const f of fields) {
				if (workflowGrid.isCellDirty(i, f)) cells++;
			}
		}
		dirtyRowCount = draftIndices.length;
		dirtyCellCount = cells;
	}

	function commonColumns() {
		return [
			{ field: 'id', title: '#', width: '50px', isEditable: false, horizontalAlign: 'center' },
			{ field: 'name', title: 'Name', width: '160px', editor: 'text' },
			{ field: 'email', title: 'Email', editor: 'text' },
			{
				field: 'department',
				title: 'Department',
				width: '140px',
				editor: 'select',
				editorOptions: {
					options: [
						{ value: 'Engineering', label: 'Engineering' },
						{ value: 'Sales',       label: 'Sales' },
						{ value: 'Marketing',   label: 'Marketing' },
						{ value: 'Support',     label: 'Support' },
						{ value: 'Finance',     label: 'Finance' }
					],
					valueMember: 'value',
					displayMember: 'label'
				}
			},
			{
				field: 'salary',
				title: 'Salary',
				width: '120px',
				horizontalAlign: 'right',
				editor: 'number',
				editorOptions: { min: 0, step: 1000 },
				formatCallback: (v: number) => '$' + v.toLocaleString()
			}
		];
	}

	$effect(() => {
		if (basicGrid) basicGrid.isDirtyIndicatorVisible = isIndicatorVisible;
	});

	onMount(async () => {
		await import('@keenmate/web-grid');

		// ---- DI01 — Basic dirty indicator -------------------------------
		if (basicGrid) {
			basicGrid.columns = commonColumns();
			basicGrid.items = initialEmployees.map((r) => ({ ...r }));
			basicGrid.isEditable = true;
			basicGrid.editTrigger = 'click';
			basicGrid.isRowNumberVisible = true;
			basicGrid.isDirtyIndicatorVisible = isIndicatorVisible;
		}

		// ---- DI02 — Save / Discard workflow -----------------------------
		if (workflowGrid) {
			workflowGrid.columns = commonColumns();
			workflowGrid.items = initialEmployees.map((r) => ({ ...r }));
			workflowGrid.isEditable = true;
			workflowGrid.editTrigger = 'click';
			workflowGrid.isRowNumberVisible = true;

			workflowGrid.onrowchange = (detail: any) => {
				if (!detail.isValid) return;
				recomputeStats();
			};
		}

		// ---- DI03 — Custom theming --------------------------------------
		if (themedGrid) {
			themedGrid.columns = commonColumns();
			themedGrid.items = initialEmployees.map((r) => ({ ...r }));
			themedGrid.isEditable = true;
			themedGrid.editTrigger = 'click';
			themedGrid.isRowNumberVisible = true;
		}
	});

	function handleSaveAll() {
		const indices: number[] = workflowGrid.getDraftRowIndices();
		if (indices.length === 0) {
			logWorkflow('Save All — no drafts to save');
			return;
		}

		const items = [...workflowGrid.items];
		const savedSummary: string[] = [];

		for (const i of indices) {
			const draft = workflowGrid.getRowDraft(i);
			if (draft) {
				items[i] = { ...items[i], ...draft };
				savedSummary.push(`#${items[i].id}`);
			}
		}

		workflowGrid.items = items;
		workflowGrid.discardAllDrafts();
		recomputeStats();
		logWorkflow(`Saved ${indices.length} row(s): ${savedSummary.join(', ')}`);
	}

	function handleDiscardAll() {
		const count = workflowGrid.getDraftRowIndices().length;
		workflowGrid.discardAllDrafts();
		recomputeStats();
		logWorkflow(count === 0 ? 'Discard All — nothing to discard' : `Discarded ${count} draft row(s)`);
	}

	function handleDiscardRow(rowIndex: number) {
		if (!workflowGrid.isRowDirty(rowIndex)) {
			logWorkflow(`Row ${rowIndex + 1} is not dirty`);
			return;
		}
		workflowGrid.discardRowDraft(rowIndex);
		recomputeStats();
		logWorkflow(`Discarded row ${rowIndex + 1}`);
	}
</script>

<DocLayout
	titleText="Dirty Indicator"
	descriptionText="Visual cues, draft state and save/discard workflow for unsaved cell edits">

	<div class="py-4">
		<!-- DI01 — Basic Indicator -->
		<ShowcaseSection
			titleText="DI01 Basic Indicator"
			subtitleText="Edit cells to see the orange tint, corner triangle and dirty row stripe — toggle the indicator on/off"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Description">

			{#snippet demoContent()}
				<div class="grid-demo">
					<div class="d-flex align-items-center gap-3 mb-2">
						<label class="form-check form-switch m-0">
							<input
								class="form-check-input"
								type="checkbox"
								role="switch"
								bind:checked={isIndicatorVisible}
							/>
							<span class="form-check-label small">
								<code>isDirtyIndicatorVisible</code> = <strong>{isIndicatorVisible}</strong>
							</span>
						</label>
					</div>

					<web-grid
						bind:this={basicGrid}
						style="max-height: 280px;"
					></web-grid>

					<p class="small text-muted mt-2">
						Click any cell, change the value, then press <kbd>Enter</kbd> or <kbd>Tab</kbd>.
						The cell tints orange with a corner triangle; the row number gets an orange left stripe.
						Toggling the switch hides indicators without losing the underlying drafts.
					</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// On by default — no setup needed.
grid.isEditable = true
grid.isRowNumberVisible = true

// Toggle the visual indicator at any time
// (drafts are preserved in either case)
grid.isDirtyIndicatorVisible = false  // hide
grid.isDirtyIndicatorVisible = true   // show again

// Visual indicators per cell:
//   - background tinted with --wg-dirty-cell-bg
//   - corner triangle in --wg-dirty-indicator-color
//   - row number column gets a coloured left stripe
//     (when isRowNumberVisible = true)`}
					languageType="javascript"
					titleText="Toggling the dirty indicator"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>What gets marked dirty</h5>
					<ul>
						<li>A cell is dirty when its <em>committed</em> value differs from the original item value.</li>
						<li>A row is dirty as soon as any cell in it has been edited (even if the user reverted the value manually).</li>
					</ul>
					<h5>Drafts vs visuals</h5>
					<p>
						<code>isDirtyIndicatorVisible</code> only controls the <strong>visuals</strong>.
						The grid still tracks drafts internally — toggle it off, then back on, and the indicators reappear unchanged.
					</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- DI02 — Save / Discard Workflow -->
		<ShowcaseSection
			titleText="DI02 Save / Discard Workflow"
			subtitleText="Read drafts, commit them, or roll them back per-row or all at once"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Description">

			{#snippet demoContent()}
				<div class="grid-demo">
					<div class="d-flex flex-wrap align-items-center gap-2 mb-2">
						<button class="btn btn-success btn-sm" type="button" onclick={handleSaveAll}>
							Save All
						</button>
						<button class="btn btn-outline-warning btn-sm" type="button" onclick={handleDiscardAll}>
							Discard All
						</button>
						<div class="dropdown">
							<button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
								Discard Row…
							</button>
							<ul class="dropdown-menu">
								{#each initialEmployees as emp, i}
									<li>
										<button class="dropdown-item" type="button" onclick={() => handleDiscardRow(i)}>
											Row {i + 1} — {emp.name}
										</button>
									</li>
								{/each}
							</ul>
						</div>
						<span class="grid-state ms-auto">
							{dirtyRowCount} row{dirtyRowCount === 1 ? '' : 's'} dirty,
							{dirtyCellCount} cell{dirtyCellCount === 1 ? '' : 's'} dirty
						</span>
					</div>

					<web-grid
						bind:this={workflowGrid}
						style="max-height: 280px;"
					></web-grid>

					<div class="event-log mt-2">
						{#if workflowEvents.length === 0}
							<div class="event-entry"><em>Edit a few cells, then click Save All or Discard All.</em></div>
						{:else}
							{#each workflowEvents as e}
								<div class="event-entry">
									<span class="text-muted">[{e.time}]</span>
									<span>{e.message}</span>
								</div>
							{/each}
						{/if}
					</div>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// --- Save: merge drafts back into items ---
function saveAll() {
  const indices = grid.getDraftRowIndices()
  if (indices.length === 0) return

  const items = [...grid.items]
  for (const i of indices) {
    const draft = grid.getRowDraft(i)   // T | undefined
    if (draft) items[i] = { ...items[i], ...draft }
  }

  grid.items = items
  grid.discardAllDrafts()    // clear draft state after save
}

// --- Discard everything ---
grid.discardAllDrafts()

// --- Discard a single row ---
grid.discardRowDraft(rowIndex)

// --- Live stats ---
function recomputeStats() {
  const indices = grid.getDraftRowIndices()
  let cells = 0
  for (const i of indices) {
    for (const f of FIELDS) {
      if (grid.isCellDirty(i, f)) cells++
    }
  }
  return { rows: indices.length, cells }
}

grid.onrowchange = (detail) => {
  if (detail.isValid) recomputeStats()
}`}
					languageType="javascript"
					titleText="Save / Discard with the draft API"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>The draft API</h5>
					<ul>
						<li><code>getDraftRowIndices()</code> — indices of all rows with pending edits.</li>
						<li><code>getRowDraft(i)</code> — the draft row object for index <code>i</code>, or <code>undefined</code>.</li>
						<li><code>isRowDirty(i)</code> / <code>isCellDirty(i, field)</code> — boolean checks.</li>
						<li><code>discardRowDraft(i)</code> / <code>discardAllDrafts()</code> — roll back.</li>
					</ul>

					<h5>How "save" works</h5>
					<p>
						The grid never mutates <code>items</code> directly — every commit goes into a draft. To persist, you read the drafts, push them to your backend, then update <code>items</code> and call <code>discardAllDrafts()</code> to clear the draft state.
					</p>

					<h5>Stat refresh</h5>
					<p>
						Recompute counts inside <code>onrowchange</code> and after each Save/Discard call. The grid does not expose a "drafts changed" event — every mutation flows through these touchpoints.
					</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- DI03 — Custom Theming -->
		<ShowcaseSection
			titleText="DI03 Custom Theming"
			subtitleText="Re-skin the indicator with three CSS custom properties"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Description">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={themedGrid}
						class="themed-grid"
						style="max-height: 280px;"
					></web-grid>
					<p class="small text-muted mt-2">
						Same component as DI01, but the indicator color, tint and triangle size are overridden by scoped CSS.
					</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`/* Override at the host (or any parent) level */
web-grid.themed-grid {
  --wg-dirty-indicator-color: #8b5cf6;          /* triangle + stripe colour */
  --wg-dirty-cell-bg: rgba(139, 92, 246, 0.10); /* dirty cell tint */
  --wg-dirty-indicator-size: 9px;               /* triangle edge length */
}

/* Defaults (light theme):
   --wg-dirty-indicator-color: #ed8b00;
   --wg-dirty-cell-bg: rgba(237, 139, 0, 0.08);
   --wg-dirty-indicator-size: 6px;
*/`}
					languageType="css"
					titleText="CSS variables for the indicator"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Three knobs</h5>
					<ul>
						<li><code>--wg-dirty-indicator-color</code> — colour of the corner triangle and the row-number stripe.</li>
						<li><code>--wg-dirty-cell-bg</code> — full-cell background tint. Use a low-alpha rgba so cell text stays readable.</li>
						<li><code>--wg-dirty-indicator-size</code> — edge length of the triangle. Defaults to <code>6px</code>.</li>
					</ul>
					<h5>Where to set them</h5>
					<p>
						Anywhere up the cascade — on <code>:root</code>, on <code>web-grid</code>, on a parent container.
						The grid uses CSS custom properties that pierce shadow DOM, so a host-level override is enough.
					</p>
					<h5>Dark mode</h5>
					<p>
						The grid ships dark-mode defaults (<code>#ffa940</code> on <code>rgba(255, 169, 64, 0.12)</code>).
						Override via the same variables under your <code>data-theme="dark"</code> selector.
					</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- API reference table -->
		<div class="mt-5">
			<h2 class="mb-4">Dirty / Draft API reference</h2>
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Member</th>
							<th>Type</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr><td><code>isDirtyIndicatorVisible</code></td><td><code>boolean</code></td><td>Show/hide the visuals. Drafts are preserved either way. Default <code>true</code>.</td></tr>
						<tr><td><code>isCellDirty(rowIndex, field)</code></td><td><code>(number, string) =&gt; boolean</code></td><td>Cell value differs from the original.</td></tr>
						<tr><td><code>isRowDirty(rowIndex)</code></td><td><code>(number) =&gt; boolean</code></td><td>Any draft exists for that row.</td></tr>
						<tr><td><code>getDraftRowIndices()</code></td><td><code>() =&gt; number[]</code></td><td>Indices of all rows with pending edits.</td></tr>
						<tr><td><code>getRowDraft(rowIndex)</code></td><td><code>(number) =&gt; T | undefined</code></td><td>The draft row object — merge into your items to persist.</td></tr>
						<tr><td><code>discardRowDraft(rowIndex)</code></td><td><code>(number) =&gt; void</code></td><td>Roll back a single row.</td></tr>
						<tr><td><code>discardAllDrafts()</code></td><td><code>() =&gt; void</code></td><td>Clear every draft.</td></tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</DocLayout>

<style>
	:global(web-grid.themed-grid) {
		--wg-dirty-indicator-color: #8b5cf6;
		--wg-dirty-cell-bg: rgba(139, 92, 246, 0.10);
		--wg-dirty-indicator-size: 9px;
	}
</style>
