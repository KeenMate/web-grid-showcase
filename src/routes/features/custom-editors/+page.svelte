<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let promptGrid: any;
	let productGrid: any;
	let colorGrid: any;

	// Catalog used by CE02 (product search demo)
	const catalog = [
		{ id: 101, sku: 'KB-MX-BLK', name: 'Mechanical Keyboard',     category: 'Peripherals', price: 129.00 },
		{ id: 102, sku: 'MS-WL-ERG', name: 'Ergonomic Wireless Mouse', category: 'Peripherals', price:  49.90 },
		{ id: 103, sku: 'MON-27-4K', name: '27" 4K Monitor',           category: 'Displays',    price: 399.00 },
		{ id: 104, sku: 'MON-32-UW', name: '32" Ultrawide Monitor',    category: 'Displays',    price: 549.00 },
		{ id: 105, sku: 'HS-BT-ANC', name: 'Bluetooth Headset (ANC)',  category: 'Audio',       price: 179.00 },
		{ id: 106, sku: 'SPK-DESK',  name: 'Desk Speakers',            category: 'Audio',       price:  89.00 },
		{ id: 107, sku: 'WEB-1080',  name: 'HD Webcam 1080p',          category: 'Video',       price:  69.00 },
		{ id: 108, sku: 'WEB-4K',    name: '4K Studio Webcam',         category: 'Video',       price: 199.00 },
		{ id: 109, sku: 'DOCK-USBC', name: 'USB-C Docking Station',    category: 'Accessories', price: 159.00 },
		{ id: 110, sku: 'HUB-USB3',  name: 'USB 3.0 Hub (7-port)',     category: 'Accessories', price:  29.90 },
		{ id: 111, sku: 'CBL-HDMI',  name: 'HDMI 2.1 Cable (2m)',      category: 'Accessories', price:  12.50 },
		{ id: 112, sku: 'CBL-USBC',  name: 'USB-C Cable (1m)',         category: 'Accessories', price:   8.90 },
		{ id: 113, sku: 'STAND-LT',  name: 'Laptop Stand',             category: 'Ergonomics',  price:  39.00 },
		{ id: 114, sku: 'STAND-MON', name: 'Monitor Arm (dual)',       category: 'Ergonomics',  price:  99.00 },
		{ id: 115, sku: 'CHAIR-ERG', name: 'Ergonomic Office Chair',   category: 'Furniture',   price: 459.00 },
		{ id: 116, sku: 'DESK-SIT',  name: 'Sit/Stand Desk',           category: 'Furniture',   price: 399.00 },
		{ id: 117, sku: 'LIGHT-BAR', name: 'Monitor Light Bar',        category: 'Lighting',    price:  79.00 },
		{ id: 118, sku: 'LIGHT-KEY', name: 'Key Light',                category: 'Lighting',    price: 149.00 },
		{ id: 119, sku: 'SSD-2TB',   name: 'Portable SSD 2TB',         category: 'Storage',     price: 189.00 },
		{ id: 120, sku: 'HDD-EXT-4', name: 'External HDD 4TB',         category: 'Storage',     price: 109.00 }
	];
	const productById = new Map(catalog.map(p => [p.id, p]));
	const lookupProduct = (id: number | null | undefined) => (id != null ? productById.get(id) : null);

	const escapeHtml = (s: string) =>
		String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

	let productEvents: { time: string; action: string; detail: string }[] = $state([]);

	function logProductEvent(action: string, detail: string) {
		productEvents = [{ time: new Date().toLocaleTimeString(), action, detail }, ...productEvents].slice(0, 30);
	}

	onMount(async () => {
		await import('@keenmate/web-grid');

		// ---- CE01 — Simple prompt editor ---------------------------------
		if (promptGrid) {
			const promptRows = [
				{ id: 1, name: 'Alice Johnson', notes: 'Onboarding pending' },
				{ id: 2, name: 'Bob Smith', notes: 'Reviewed 2026-04-10' },
				{ id: 3, name: 'Charlie Brown', notes: '' }
			];
			promptGrid.columns = [
				{ field: 'id', title: '#', width: '50px', isEditable: false, horizontalAlign: 'center' },
				{ field: 'name', title: 'Name', width: '160px' },
				{
					field: 'notes',
					title: 'Notes (custom)',
					editor: 'custom',
					cellEditCallback: (ctx: any) => {
						const next = window.prompt('Edit notes:', ctx.value ?? '');
						if (next === null) {
							ctx.cancel();
						} else {
							ctx.commit(next);
						}
					}
				}
			];
			promptGrid.items = promptRows;
			promptGrid.isEditable = true;
			promptGrid.editTrigger = 'click';
		}

		// ---- CE02 — Product search dialog --------------------------------
		if (productGrid) {
			const rows: any[] = [
				{ line: 1, productId: 103, qty: 1 },
				{ line: 2, productId: 102, qty: 2 },
				{ line: 3, productId: null, qty: 1 },
				{ line: 4, productId: 109, qty: 1 },
				{ line: 5, productId: 115, qty: 1 },
				{ line: 6, productId: null, qty: 1 }
			];

			productGrid.columns = [
				{ field: 'line', title: '#', width: '50px', horizontalAlign: 'center', isEditable: false },
				{
					field: 'productId',
					title: 'Product',
					width: '240px',
					editor: 'custom',
					formatCallback: (id: number) => {
						const p = lookupProduct(id);
						return p ? p.name : '— click to search —';
					},
					cellEditCallback: (ctx: any) => openProductSearch(ctx)
				},
				{
					field: 'sku',
					title: 'SKU',
					width: '120px',
					isEditable: false,
					formatCallback: (_v: unknown, row: any) => lookupProduct(row.productId)?.sku ?? ''
				},
				{
					field: 'category',
					title: 'Category',
					width: '130px',
					isEditable: false,
					formatCallback: (_v: unknown, row: any) => lookupProduct(row.productId)?.category ?? ''
				},
				{
					field: 'unitPrice',
					title: 'Unit Price',
					width: '110px',
					horizontalAlign: 'right',
					isEditable: false,
					formatCallback: (_v: unknown, row: any) => {
						const p = lookupProduct(row.productId);
						return p ? '$' + p.price.toFixed(2) : '';
					}
				},
				{ field: 'qty', title: 'Qty', width: '80px', horizontalAlign: 'right', editor: 'number' },
				{
					field: 'total',
					title: 'Total',
					width: '110px',
					horizontalAlign: 'right',
					isEditable: false,
					formatCallback: (_v: unknown, row: any) => {
						const p = lookupProduct(row.productId);
						if (!p) return '';
						return '$' + (p.price * (row.qty || 0)).toFixed(2);
					}
				}
			];
			productGrid.items = rows;
			productGrid.isEditable = true;
			productGrid.editTrigger = 'navigate';
			productGrid.isHoverable = true;

			productGrid.onrowchange = (detail: any) => {
				if (!detail.isValid) return;
				rows[detail.rowIndex] = { ...detail.draftRow };

				if (detail.field === 'productId') {
					const p = lookupProduct(detail.newValue);
					logProductEvent(
						'Product selected',
						p ? `row ${detail.rowIndex + 1} → ${p.name} (${p.sku})` : `row ${detail.rowIndex + 1} cleared`
					);
				} else {
					logProductEvent('Cell changed', `row ${detail.rowIndex + 1}, ${detail.field} = ${detail.newValue}`);
				}

				// Sibling columns (SKU, Category, Unit Price, Total) derive their
				// display from productId / qty via formatCallback. The grid only
				// re-renders the edited cell, so reassign items to force a full
				// re-render and refresh the dependent cells.
				productGrid.items = [...rows];
			};
		}

		// ---- CE03 — Inline color picker popover --------------------------
		if (colorGrid) {
			const colorRows = [
				{ id: 1, label: 'Primary',   color: '#0d6efd' },
				{ id: 2, label: 'Success',   color: '#198754' },
				{ id: 3, label: 'Warning',   color: '#ffc107' },
				{ id: 4, label: 'Danger',    color: '#dc3545' }
			];
			colorGrid.columns = [
				{ field: 'id', title: '#', width: '50px', isEditable: false, horizontalAlign: 'center' },
				{ field: 'label', title: 'Label', width: '140px' },
				{
					field: 'color',
					title: 'Color',
					editor: 'custom',
					templateCallback: (row: any) => {
						const val = String(row.color ?? '');
						return `<span style="display:inline-flex;align-items:center;gap:.5rem;">
							<span style="display:inline-block;width:14px;height:14px;border-radius:3px;border:1px solid #00000022;background:${escapeHtml(val)};"></span>
							<code>${escapeHtml(val)}</code>
						</span>`;
					},
					cellEditCallback: (ctx: any) => openColorPopover(ctx, colorGrid)
				}
			];
			colorGrid.items = colorRows;
			colorGrid.isEditable = true;
			colorGrid.editTrigger = 'click';
		}
	});

	// ============ Product search dialog ==================================

	function openProductSearch(context: any) {
		logProductEvent('Dialog opened', `row ${context.rowIndex + 1}`);

		const overlay = document.createElement('div');
		overlay.className = 'ce-overlay';

		const dialog = document.createElement('div');
		dialog.className = 'ce-dialog';
		dialog.innerHTML = `
			<div class="ce-header">
				<div class="ce-title">Find product</div>
				<input type="text" class="ce-input" placeholder="Search name, SKU or category…" />
			</div>
			<div class="ce-results"></div>
			<div class="ce-footer">
				<span><kbd>↑</kbd><kbd>↓</kbd> navigate · <kbd>Enter</kbd> select · <kbd>Esc</kbd> cancel</span>
				<span class="ce-count"></span>
			</div>
		`;

		const input = dialog.querySelector<HTMLInputElement>('.ce-input')!;
		const resultsEl = dialog.querySelector<HTMLDivElement>('.ce-results')!;
		const countEl = dialog.querySelector<HTMLSpanElement>('.ce-count')!;

		let filtered = catalog.slice();
		let activeIndex = 0;

		if (context.value != null) {
			const idx = filtered.findIndex((p) => p.id === context.value);
			if (idx >= 0) activeIndex = idx;
		}

		const highlight = (text: string, query: string) => {
			if (!query) return escapeHtml(text);
			const q = query.toLowerCase();
			const lower = text.toLowerCase();
			const i = lower.indexOf(q);
			if (i < 0) return escapeHtml(text);
			return (
				escapeHtml(text.slice(0, i)) +
				'<span class="ce-highlight">' + escapeHtml(text.slice(i, i + q.length)) + '</span>' +
				escapeHtml(text.slice(i + q.length))
			);
		};

		const render = () => {
			const query = input.value.trim();
			const q = query.toLowerCase();
			filtered = q
				? catalog.filter((p) =>
					p.name.toLowerCase().includes(q) ||
					p.sku.toLowerCase().includes(q) ||
					p.category.toLowerCase().includes(q))
				: catalog.slice();

			if (activeIndex >= filtered.length) activeIndex = filtered.length - 1;
			if (activeIndex < 0) activeIndex = 0;

			countEl.textContent = filtered.length + (filtered.length === 1 ? ' match' : ' matches');

			if (filtered.length === 0) {
				resultsEl.innerHTML = '<div class="ce-empty">No products match your search.</div>';
				return;
			}

			resultsEl.innerHTML = filtered.map((p, i) => `
				<div class="ce-row${i === activeIndex ? ' active' : ''}" data-index="${i}">
					<span class="ce-sku">${escapeHtml(p.sku)}</span>
					<span>
						<span class="ce-name">${highlight(p.name, query)}</span>
						<span class="ce-category">${highlight(p.category, query)}</span>
					</span>
					<span class="ce-price">$${p.price.toFixed(2)}</span>
				</div>
			`).join('');

			const activeEl = resultsEl.querySelector('.ce-row.active');
			if (activeEl) (activeEl as HTMLElement).scrollIntoView({ block: 'nearest' });
		};

		const cleanup = () => {
			document.removeEventListener('keydown', onKey, true);
			overlay.remove();
		};

		const select = (product: any) => {
			if (!product) return;
			cleanup();
			context.commit(product.id);
		};

		const doCancel = () => {
			cleanup();
			context.cancel();
			logProductEvent('Dialog cancelled', `row ${context.rowIndex + 1}`);
		};

		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault(); e.stopPropagation();
				doCancel();
			} else if (e.key === 'ArrowDown') {
				e.preventDefault(); e.stopPropagation();
				if (filtered.length === 0) return;
				activeIndex = (activeIndex + 1) % filtered.length;
				render();
			} else if (e.key === 'ArrowUp') {
				e.preventDefault(); e.stopPropagation();
				if (filtered.length === 0) return;
				activeIndex = (activeIndex - 1 + filtered.length) % filtered.length;
				render();
			} else if (e.key === 'Enter') {
				e.preventDefault(); e.stopPropagation();
				select(filtered[activeIndex]);
			}
		};

		input.addEventListener('input', () => {
			activeIndex = 0;
			render();
		});

		resultsEl.addEventListener('click', (e) => {
			const row = (e.target as HTMLElement).closest<HTMLElement>('.ce-row');
			if (!row) return;
			const idx = Number(row.dataset.index);
			select(filtered[idx]);
		});

		resultsEl.addEventListener('mousemove', (e) => {
			const row = (e.target as HTMLElement).closest<HTMLElement>('.ce-row');
			if (!row) return;
			const idx = Number(row.dataset.index);
			if (idx !== activeIndex) {
				activeIndex = idx;
				render();
			}
		});

		overlay.addEventListener('click', (e) => {
			if (e.target === overlay) doCancel();
		});

		document.addEventListener('keydown', onKey, true);

		overlay.appendChild(dialog);
		document.body.appendChild(overlay);
		render();
		input.focus();
	}

	// ============ Inline color popover ===================================

	function openColorPopover(context: any, gridEl: HTMLElement) {
		const palette = ['#0d6efd', '#6610f2', '#6f42c1', '#d63384', '#dc3545', '#fd7e14',
			'#ffc107', '#198754', '#20c997', '#0dcaf0', '#212529', '#6c757d'];

		const popover = document.createElement('div');
		popover.className = 'cp-popover';
		popover.innerHTML = `
			<div class="cp-grid">
				${palette.map((c) =>
					`<button type="button" class="cp-swatch${c === context.value ? ' active' : ''}" data-color="${c}" style="background:${c};" title="${c}"></button>`
				).join('')}
			</div>
			<div class="cp-custom">
				<label>Custom: <input type="color" value="${escapeHtml(context.value || '#000000')}" /></label>
			</div>
		`;

		// Anchor below the cell that triggered editing.
		// Cells expose data-row / data-field attributes on the <td>.
		const root = (gridEl as any).shadowRoot as ShadowRoot | null;
		const cellEl = root?.querySelector(
			`td[data-row="${context.rowIndex}"][data-field="${context.field}"]`
		) as HTMLElement | null;
		const rect = cellEl?.getBoundingClientRect();

		popover.style.position = 'fixed';
		if (rect) {
			// Clamp so the popover stays on-screen
			const popoverWidth = 240; // approx; we'll correct after insertion if needed
			const left = Math.min(rect.left, window.innerWidth - popoverWidth - 8);
			popover.style.top = (rect.bottom + 4) + 'px';
			popover.style.left = Math.max(8, left) + 'px';
		} else {
			popover.style.top = '50%';
			popover.style.left = '50%';
			popover.style.transform = 'translate(-50%, -50%)';
		}

		const cleanup = () => {
			document.removeEventListener('keydown', onKey, true);
			document.removeEventListener('mousedown', onClickOutside, true);
			popover.remove();
		};

		const commit = (value: string) => {
			cleanup();
			context.commit(value);
		};

		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault(); e.stopPropagation();
				cleanup();
				context.cancel();
			}
		};

		const onClickOutside = (e: MouseEvent) => {
			if (!popover.contains(e.target as Node)) {
				cleanup();
				context.cancel();
			}
		};

		popover.addEventListener('click', (e) => {
			const swatch = (e.target as HTMLElement).closest<HTMLElement>('.cp-swatch');
			if (swatch) {
				commit(swatch.dataset.color!);
			}
		});

		popover.querySelector<HTMLInputElement>('input[type="color"]')!.addEventListener('change', (e) => {
			commit((e.target as HTMLInputElement).value);
		});

		document.addEventListener('keydown', onKey, true);
		// defer so the click that opened the editor doesn't immediately close it
		setTimeout(() => document.addEventListener('mousedown', onClickOutside, true), 0);

		document.body.appendChild(popover);
	}
</script>

<DocLayout
	titleText="Custom Editors"
	descriptionText="Take full control of cell editing with editor: 'custom' and cellEditCallback">

	<div class="py-4">
		<!-- CE01 — Simple Prompt -->
		<ShowcaseSection
			titleText="CE01 Simple Prompt Editor"
			subtitleText="The minimum viable custom editor: open a browser prompt, then commit or cancel"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Description">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={promptGrid}
						style="max-height: 240px;"
					></web-grid>
					<p class="small text-muted mt-2">
						Click a Notes cell, or focus it and press <kbd>F2</kbd> / <kbd>Space</kbd> / start typing.
					</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`{
  field: 'notes',
  title: 'Notes',
  editor: 'custom',
  cellEditCallback: (ctx) => {
    const next = window.prompt('Edit notes:', ctx.value ?? '')
    if (next === null) {
      ctx.cancel()      // user pressed Cancel
    } else {
      ctx.commit(next)  // user pressed OK
    }
  }
}`}
					languageType="javascript"
					titleText="Prompt-based custom editor"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>The contract</h5>
					<ul>
						<li>Set <code>editor: 'custom'</code> on the column. Without it, <code>cellEditCallback</code> never fires.</li>
						<li>The callback receives a <strong>single</strong> context object — not positional arguments.</li>
						<li>You <strong>must</strong> call exactly one of <code>ctx.commit(value)</code> or <code>ctx.cancel()</code>, otherwise the grid stays in edit state.</li>
					</ul>
					<h5>Triggers</h5>
					<p>The grid handles all the standard triggers (<code>F2</code>, <code>Space</code>, <code>Enter</code>, double-click, click depending on <code>editTrigger</code>, printable char in navigate mode). Your callback only needs to render UI.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- CE02 — Product Search Dialog -->
		<ShowcaseSection
			titleText="CE02 Product Search Dialog"
			subtitleText="Modal lookup with keyboard nav, highlighted matches, and derived sibling columns"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Description">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={productGrid}
						style="max-height: 380px;"
					></web-grid>
					<p class="small text-muted mt-2">
						The Product cell stores only a <code>productId</code>; SKU / Category / Unit Price / Total all derive their display from the catalog.
						Edit Product on row 3 (empty) to see the dialog. Type "mon", arrow down, Enter — every dependent cell refreshes in the same tick.
					</p>

					<div class="event-log">
						{#if productEvents.length === 0}
							<div class="event-entry"><em>Edit the Product column to open the search dialog.</em></div>
						{:else}
							{#each productEvents as e}
								<div class="event-entry">
									<span class="text-muted">[{e.time}]</span>
									<strong class="text-success">{e.action}</strong>
									<span>{e.detail}</span>
								</div>
							{/each}
						{/if}
					</div>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`{
  field: 'productId',
  title: 'Product',
  editor: 'custom',
  formatCallback: (id) => {
    const p = catalog.find(p => p.id === id)
    return p ? p.name : '— click to search —'
  },
  cellEditCallback: (ctx) => openProductSearch(ctx)
}

// In your dialog:
//   - input.value drives a filter over the catalog
//   - ArrowUp/Down updates activeIndex
//   - Enter calls ctx.commit(filtered[activeIndex].id)
//   - Esc / overlay click calls ctx.cancel()
//   - listen with capture: true and stopPropagation
//     so the grid doesn't react to the same keys

// IMPORTANT — refresh derived sibling cells:
grid.onrowchange = (detail) => {
  if (!detail.isValid) return
  rows[detail.rowIndex] = { ...detail.draftRow }
  // Forces full re-render so SKU/Category/Total
  // (which derive from productId via formatCallback)
  // refresh in the same tick. Focus is preserved.
  grid.items = [...rows]
}`}
					languageType="javascript"
					titleText="Product search column + onrowchange"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Single source of truth</h5>
					<p>The row stores only <code>productId</code>. SKU, Category, Unit Price and Total all use <code>formatCallback</code> to look up the catalog at render time.</p>

					<h5>The "stale derived cells" gotcha</h5>
					<p>By default the grid re-renders only the edited cell. Sibling columns whose <code>formatCallback</code> reads <code>row.productId</code> will show stale values until something else triggers a render. Fix: reassign <code>grid.items = [...rows]</code> in <code>onrowchange</code>.</p>

					<h5>Alternative — stamp the row</h5>
					<p>Instead of deriving sibling cells, you could write <code>row.sku</code>, <code>row.category</code>, <code>row.price</code> directly in the dialog before commit. Each column then reads its own field; no full re-render needed.</p>

					<h5>Keyboard handling</h5>
					<p>Listen with <code>capture: true</code> and call <code>stopPropagation()</code> on every key the dialog handles. Otherwise the grid's keyboard handler can run on the same event during the focus-return after commit.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- CE03 — Inline Color Picker -->
		<ShowcaseSection
			titleText="CE03 Inline Color Picker Popover"
			subtitleText="A floating panel anchored to the cell — not every custom editor needs to be a modal"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Description">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={colorGrid}
						style="max-height: 240px;"
					></web-grid>
					<p class="small text-muted mt-2">
						Click a Color cell. Pick a swatch or use the native color input. Click outside or press <kbd>Esc</kbd> to cancel.
					</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`{
  field: 'color',
  title: 'Color',
  editor: 'custom',
  // templateCallback returns RAW HTML (not escaped).
  // formatCallback would escape the string — use it
  // only for plain text values.
  templateCallback: (row) =>
    \`<span style="display:inline-flex;align-items:center;gap:.5rem;">
       <span style="width:14px;height:14px;background:\${escapeHtml(row.color)};"></span>
       <code>\${escapeHtml(row.color)}</code>
     </span>\`,
  cellEditCallback: (ctx) => {
    const popover = buildPopover(ctx.value, palette)

    // anchor below the cell — use the grid element
    // you already have via bind:this, not a global
    // querySelector (there may be multiple grids).
    const cell = gridEl.shadowRoot.querySelector(
      \`td[data-row="\${ctx.rowIndex}"][data-field="\${ctx.field}"]\`
    )
    const rect = cell.getBoundingClientRect()
    popover.style.position = 'fixed'
    popover.style.top  = (rect.bottom + 4) + 'px'
    popover.style.left = rect.left + 'px'

    popover.onPick   = (color) => ctx.commit(color)
    popover.onCancel = () => ctx.cancel()
    document.body.appendChild(popover)
  }
}`}
					languageType="javascript"
					titleText="Popover-style custom editor"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>The editor UI is up to you</h5>
					<p>A custom editor is just "render whatever you want, then call commit/cancel." Modal dialogs, floating popovers, native pickers, full sidebars — all valid.</p>

					<h5>Anchoring to the cell</h5>
					<p>The grid lives in shadow DOM, but cells expose <code>data-row</code> and <code>data-field</code> on each <code>&lt;td&gt;</code>. Query <code>gridElement.shadowRoot</code> (not <code>document</code>) to get the cell and <code>getBoundingClientRect()</code> to position the popover.</p>

					<h5>Cleanup matters</h5>
					<p>Always remove the popover element <strong>and</strong> any global listeners (<code>keydown</code>, <code>mousedown</code>) on commit/cancel — otherwise they leak across edits.</p>

					<h5>HTML cell content</h5>
					<p>Use <code>templateCallback</code> when you need raw HTML in the cell — the string it returns is <strong>not</strong> escaped. <code>formatCallback</code> is for plain text and escapes its return value. Either way, always escape any user input you interpolate.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Reference table -->
		<div class="mt-5">
			<h2 class="mb-4">CustomEditorContext reference</h2>
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
						<tr><td><code>value</code></td><td><code>unknown</code></td><td>The current cell value.</td></tr>
						<tr><td><code>row</code></td><td><code>T</code></td><td>The full row object.</td></tr>
						<tr><td><code>rowIndex</code></td><td><code>number</code></td><td>Index of the row being edited.</td></tr>
						<tr><td><code>field</code></td><td><code>string</code></td><td>The column field name.</td></tr>
						<tr><td><code>commit(newValue)</code></td><td><code>(value: unknown) =&gt; void</code></td><td>Save the new value and exit edit mode.</td></tr>
						<tr><td><code>cancel()</code></td><td><code>() =&gt; void</code></td><td>Discard changes and exit edit mode.</td></tr>
					</tbody>
				</table>
			</div>
			<p class="small text-muted">
				Pre-v1.0.0 betas used a positional callback signature
				<code>(row, rowIndex, field, cellElement, commit, cancel)</code>. That signature no longer fires — always use the single-context form above.
			</p>
		</div>
	</div>
</DocLayout>

<style>
	/* ---- Product search dialog (CE02) -------------------------------- */
	:global(.ce-overlay) {
		position: fixed;
		inset: 0;
		background: rgba(15, 23, 42, 0.45);
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding-top: 10vh;
		z-index: 9999;
	}

	:global(.ce-dialog) {
		background: white;
		width: min(560px, 92vw);
		border-radius: 12px;
		box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		max-height: 70vh;
	}

	:global(.ce-header) {
		padding: 0.9rem 1rem;
		border-bottom: 1px solid #e2e8f0;
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	:global(.ce-title) {
		font-weight: 600;
		color: #1e293b;
		flex: 0 0 auto;
	}

	:global(.ce-input) {
		flex: 1;
		border: 1px solid #cbd5e1;
		border-radius: 6px;
		padding: 0.5rem 0.75rem;
		font-size: 0.95rem;
		outline: none;
	}

	:global(.ce-input:focus) {
		border-color: #6366f1;
		box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
	}

	:global(.ce-results) {
		overflow-y: auto;
		max-height: 360px;
	}

	:global(.ce-row) {
		padding: 0.65rem 1rem;
		cursor: pointer;
		border-bottom: 1px solid #f1f5f9;
		display: grid;
		grid-template-columns: 110px 1fr 80px;
		align-items: center;
		gap: 0.75rem;
	}

	:global(.ce-row:hover),
	:global(.ce-row.active) {
		background: #eef2ff;
	}

	:global(.ce-sku) {
		font-family: 'Courier New', monospace;
		font-size: 0.8rem;
		color: #64748b;
	}

	:global(.ce-name) {
		color: #1e293b;
		font-weight: 500;
	}

	:global(.ce-category) {
		font-size: 0.75rem;
		color: #6366f1;
		margin-left: 0.5rem;
	}

	:global(.ce-price) {
		text-align: right;
		font-variant-numeric: tabular-nums;
		color: #0f172a;
		font-weight: 600;
	}

	:global(.ce-empty) {
		padding: 2rem 1rem;
		text-align: center;
		color: #94a3b8;
		font-size: 0.9rem;
	}

	:global(.ce-footer) {
		padding: 0.6rem 1rem;
		border-top: 1px solid #e2e8f0;
		font-size: 0.75rem;
		color: #64748b;
		display: flex;
		justify-content: space-between;
	}

	:global(.ce-footer kbd) {
		background: #f1f5f9;
		border: 1px solid #cbd5e1;
		border-bottom-width: 2px;
		border-radius: 4px;
		padding: 1px 5px;
		font-size: 0.7rem;
		font-family: 'Courier New', monospace;
		color: #334155;
	}

	:global(.ce-highlight) {
		background: #fde68a;
		color: #78350f;
		border-radius: 2px;
		padding: 0 1px;
	}

	/* ---- Color picker popover (CE03) --------------------------------- */
	:global(.cp-popover) {
		background: white;
		border: 1px solid #e2e8f0;
		border-radius: 8px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
		padding: 0.75rem;
		z-index: 9999;
	}

	:global(.cp-grid) {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 0.4rem;
		margin-bottom: 0.5rem;
	}

	:global(.cp-swatch) {
		width: 28px;
		height: 28px;
		border: 2px solid transparent;
		border-radius: 6px;
		cursor: pointer;
		padding: 0;
		outline: none;
	}

	:global(.cp-swatch:hover) {
		border-color: #6366f1;
	}

	:global(.cp-swatch.active) {
		border-color: #1e293b;
		box-shadow: 0 0 0 2px white inset;
	}

	:global(.cp-custom) {
		font-size: 0.8rem;
		color: #64748b;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	:global(.cp-custom input[type="color"]) {
		width: 40px;
		height: 28px;
		border: 1px solid #cbd5e1;
		border-radius: 4px;
		padding: 2px;
		cursor: pointer;
	}
</style>
