<script lang="ts">
	import { DocLayout } from '@keenmate/svelte-docs';
</script>

<DocLayout
	titleText="Callbacks"
	descriptionText="Reference for every grid callback, grouped by aspect">

	<div class="py-4">
		<!-- Intro -->
		<section class="mb-5">
			<p class="lead">
				Web Grid uses a clear naming rule:
				<strong>callbacks</strong> use the <code>*Callback</code> suffix and their <em>return value</em> affects grid behavior;
				<strong>events</strong> use the <code>on*</code> prefix and are fire-and-forget notifications.
				This page covers the callbacks. For events, see <a href="/api/events">Events API</a>.
			</p>
			<p class="small text-muted">
				All callbacks are synchronous unless the signature shows <code>Promise&lt;…&gt;</code>.
				The grid does not retry on exceptions — handle errors inside your callback.
			</p>
		</section>

		<!-- 1. Cell content rendering -->
		<section class="mb-5">
			<h2 class="mb-2">Cell content rendering</h2>
			<p class="text-muted">
				Three mutually exclusive ways to render a cell while it's <em>not</em> being edited.
				Priority: <code>templateCallback</code> &gt; <code>formatCallback</code> &gt; default <code>String(value)</code>.
				All run on every render of the cell. Set on the column.
			</p>
			<div class="table-responsive">
				<table class="table table-bordered align-top">
					<thead class="table-light">
						<tr>
							<th>Callback</th>
							<th>Signature</th>
							<th>Returns</th>
							<th>Escaped?</th>
							<th>Sees drafts?</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>formatCallback</code></td>
							<td><code>(value, row) =&gt; string</code></td>
							<td>Plain text</td>
							<td><strong>Yes</strong> — the grid escapes the result</td>
							<td><strong>Yes</strong> — <code>value</code> already reflects the draft</td>
						</tr>
						<tr>
							<td><code>templateCallback</code></td>
							<td><code>(row) =&gt; string</code></td>
							<td>Raw HTML (innerHTML)</td>
							<td><strong>No</strong> — escape user input yourself</td>
							<td><strong>No</strong> — receives the original row; fold drafts into <code>items</code> in <code>onrowchange</code> if you need live updates</td>
						</tr>
						<tr>
							<td><code>renderCallback</code></td>
							<td><code>(row, element) =&gt; void</code></td>
							<td>Nothing — you mutate <code>element</code></td>
							<td>n/a — you own the DOM</td>
							<td>Depends on what you read</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p class="small text-muted">
				Rule of thumb: plain text from one field → no callback; computed/formatted text → <code>formatCallback</code>;
				HTML (badges, swatches, icons) → <code>templateCallback</code>; event handlers or complex DOM → <code>renderCallback</code>.
			</p>
		</section>

		<!-- 2. Editing & validation -->
		<section class="mb-5">
			<h2 class="mb-2">Editing &amp; validation</h2>
			<p class="text-muted">
				Hooks around the edit lifecycle. <code>cellEditCallback</code> replaces the built-in editor entirely;
				the others run alongside whichever editor is active. Set on the column unless noted.
			</p>
			<div class="table-responsive">
				<table class="table table-bordered align-top">
					<thead class="table-light">
						<tr>
							<th>Callback</th>
							<th>Signature</th>
							<th>Purpose &amp; when it fires</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>cellEditCallback</code></td>
							<td><code>(ctx: CustomEditorContext&lt;T&gt;) =&gt; void</code></td>
							<td>
								Custom editor. Fires when editing <em>starts</em> (only with <code>editor: 'custom'</code>).
								You render UI, then call <code>ctx.commit(value)</code> or <code>ctx.cancel()</code> — exactly one — or the cell stays in edit state.
							</td>
						</tr>
						<tr>
							<td><code>beforeCommitCallback</code></td>
							<td><code>(ctx: BeforeCommitContext&lt;T&gt;) =&gt; ValidationResult | boolean | string | null | Promise&lt;…&gt;</code></td>
							<td>
								Validates and optionally transforms the value before it's saved. Fires when the editor tries to commit (Enter, Tab, blur).
								Return <code>&#123; valid: false, message &#125;</code> to block; return <code>&#123; valid: true, transformedValue &#125;</code> to allow with a modified value.
								Plain <code>true</code>, <code>null</code>, <code>undefined</code> = valid; plain <code>false</code> or a string = invalid.
							</td>
						</tr>
						<tr>
							<td><code>validateCallback</code> <span class="badge text-bg-warning">deprecated</span></td>
							<td><code>(value, row) =&gt; string | null | Promise&lt;string | null&gt;</code></td>
							<td>
								Legacy validator. Return an error message string or <code>null</code> for valid.
								Prefer <code>beforeCommitCallback</code> — it can also transform the value.
							</td>
						</tr>
						<tr>
							<td><code>validationTooltipCallback</code></td>
							<td><code>(ctx: ValidationTooltipContext&lt;T&gt;) =&gt; string | null</code></td>
							<td>
								Rich HTML tooltip shown when hovering an invalid cell. Fires on hover after validation has flagged the cell.
								Return raw HTML — escape user input. Settable on column <strong>or</strong> grid; column-level wins.
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- 3. Tooltips -->
		<section class="mb-5">
			<h2 class="mb-2">Tooltips</h2>
			<p class="text-muted">
				Dynamic tooltip text. Set <code>isTooltipHtml: true</code> on the column to render the result as HTML instead of text.
			</p>
			<div class="table-responsive">
				<table class="table table-bordered align-top">
					<thead class="table-light">
						<tr>
							<th>Callback</th>
							<th>Set on</th>
							<th>Signature</th>
							<th>Purpose &amp; when it fires</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>tooltipCallback</code> (cell)</td>
							<td>Column</td>
							<td><code>(value, row) =&gt; string | null</code></td>
							<td>
								Tooltip on cell hover. Takes priority over <code>tooltipMember</code>.
								Return <code>null</code> for no tooltip.
							</td>
						</tr>
						<tr>
							<td><code>tooltipCallback</code> (toolbar / menu item)</td>
							<td>Toolbar item</td>
							<td><code>(row, rowIndex) =&gt; string</code></td>
							<td>
								Custom HTML tooltip for a row toolbar button. Returned per-row, so you can include row-specific text.
							</td>
						</tr>
						<tr>
							<td><code>lockTooltipCallback</code></td>
							<td>Grid <code>rowLocking</code></td>
							<td><code>(lockInfo, row) =&gt; string | null</code></td>
							<td>
								Tooltip shown on the lock badge in the row-number column for locked rows.
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- 4. Styling hooks -->
		<section class="mb-5">
			<h2 class="mb-2">Styling hooks</h2>
			<p class="text-muted">
				Inject CSS classes or full stylesheets without forking the component.
				All run on every render of the affected element.
			</p>
			<div class="table-responsive">
				<table class="table table-bordered align-top">
					<thead class="table-light">
						<tr>
							<th>Callback</th>
							<th>Set on</th>
							<th>Signature</th>
							<th>Purpose &amp; when it fires</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>cellClassCallback</code></td>
							<td>Column</td>
							<td><code>(value, row) =&gt; string | null</code></td>
							<td>
								Dynamic CSS class(es) for cells in this column. Return space-separated class names or <code>null</code>.
								Combined with the static <code>cellClass</code> property.
							</td>
						</tr>
						<tr>
							<td><code>rowClassCallback</code></td>
							<td>Grid</td>
							<td><code>(row, rowIndex) =&gt; string | null</code></td>
							<td>
								Dynamic CSS class(es) for the entire row. Run during row render.
							</td>
						</tr>
						<tr>
							<td><code>customStylesCallback</code></td>
							<td>Grid</td>
							<td><code>() =&gt; string</code></td>
							<td>
								Returns a CSS string injected into the grid's shadow DOM. Called once at setup and on full re-renders.
								Use to scope arbitrary CSS to the grid without leaking to the page.
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- 5. Clipboard -->
		<section class="mb-5">
			<h2 class="mb-2">Clipboard</h2>
			<p class="text-muted">
				Transform values when copying to or pasting from the OS clipboard. Set on the column.
			</p>
			<div class="table-responsive">
				<table class="table table-bordered align-top">
					<thead class="table-light">
						<tr>
							<th>Callback</th>
							<th>Signature</th>
							<th>Purpose &amp; when it fires</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>beforeCopyCallback</code></td>
							<td><code>(value, row) =&gt; string</code></td>
							<td>
								Transforms the cell value before it lands on the clipboard.
								Fires on Ctrl+C / Cmd+C from this column.
								Use to format dates as ISO strings, drop currency symbols, etc.
							</td>
						</tr>
						<tr>
							<td><code>beforePasteCallback</code></td>
							<td><code>(value: string, row) =&gt; unknown</code></td>
							<td>
								Processes a pasted clipboard string before it's applied as the new cell value.
								Fires on Ctrl+V / Cmd+V into this column.
								Return the typed value (number, Date, etc.) the cell should store.
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- 6. Row locking -->
		<section class="mb-5">
			<h2 class="mb-2">Row locking</h2>
			<p class="text-muted">
				All set on <code>grid.rowLocking</code>. Pair with the property-based members
				(<code>lockedMember</code>, <code>lockInfoMember</code>) when the lock state lives on the row itself.
				See <a href="/features/row-locking">Row Locking</a>.
			</p>
			<div class="table-responsive">
				<table class="table table-bordered align-top">
					<thead class="table-light">
						<tr>
							<th>Callback</th>
							<th>Signature</th>
							<th>Purpose &amp; when it fires</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>isLockedCallback</code></td>
							<td><code>(row, rowIndex) =&gt; boolean</code></td>
							<td>
								Decides whether a row is locked. Called per row during render.
								Use when lock state isn't a simple field on the row (external session, time-window, etc.).
							</td>
						</tr>
						<tr>
							<td><code>getLockInfoCallback</code></td>
							<td><code>(row, rowIndex) =&gt; RowLockInfo | null</code></td>
							<td>
								Returns full lock metadata (who locked, when, why). Called whenever the grid needs to render or reason about lock state.
							</td>
						</tr>
						<tr>
							<td><code>canEditLockedCallback</code></td>
							<td><code>(row, lockInfo) =&gt; boolean</code></td>
							<td>
								Only consulted when <code>lockedEditBehavior: 'callback'</code>. Fires when the user tries to edit a locked cell —
								return <code>true</code> to allow the edit, <code>false</code> to block.
							</td>
						</tr>
						<tr>
							<td><code>lockTooltipCallback</code></td>
							<td><code>(lockInfo, row) =&gt; string | null</code></td>
							<td>
								Tooltip shown on the lock indicator. Fires on hover.
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- 7. Dropdown option resolvers -->
		<section class="mb-5">
			<h2 class="mb-2">Dropdown option resolvers</h2>
			<p class="text-muted">
				All live under <code>column.editorOptions</code> and apply to <code>select</code> / <code>combobox</code> / <code>autocomplete</code> editors.
				The <code>get*Callback</code> set overrides the corresponding <code>*Member</code> string keys when both are present.
			</p>
			<div class="table-responsive">
				<table class="table table-bordered align-top">
					<thead class="table-light">
						<tr>
							<th>Callback</th>
							<th>Signature</th>
							<th>Purpose &amp; when it fires</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>loadOptions</code></td>
							<td><code>(row, field) =&gt; Promise&lt;EditorOption[]&gt;</code></td>
							<td>
								Async loader for select/combobox options. Fires according to <code>optionsLoadTrigger</code>:
								<code>'immediate'</code>, <code>'oneditstart'</code> (default), or <code>'ondropdownopen'</code>.
							</td>
						</tr>
						<tr>
							<td><code>searchCallback</code></td>
							<td><code>(query, row, signal?) =&gt; Promise&lt;EditorOption[]&gt;</code></td>
							<td>
								Async search for the <code>autocomplete</code> editor. Fires on every keystroke (debounced via <code>debounceMs</code>).
								Honor the optional <code>AbortSignal</code> to cancel in-flight requests.
							</td>
						</tr>
						<tr>
							<td><code>renderOptionCallback</code></td>
							<td><code>(option, ctx: OptionRenderContext) =&gt; string</code></td>
							<td>
								Custom HTML for each option in the dropdown. Called once per option per render.
								<code>ctx</code> includes <code>&#123; index, isHighlighted, isSelected, isDisabled &#125;</code>.
							</td>
						</tr>
						<tr>
							<td><code>getValueCallback</code></td>
							<td><code>(option) =&gt; string | number</code></td>
							<td>The option's stored value. Overrides <code>valueMember</code>.</td>
						</tr>
						<tr>
							<td><code>getDisplayCallback</code></td>
							<td><code>(option) =&gt; string</code></td>
							<td>The option's display text. Overrides <code>displayMember</code>.</td>
						</tr>
						<tr>
							<td><code>getSearchCallback</code></td>
							<td><code>(option) =&gt; string</code></td>
							<td>Text used for client-side filtering. Overrides <code>searchMember</code>; falls back to display text.</td>
						</tr>
						<tr>
							<td><code>getIconCallback</code></td>
							<td><code>(option) =&gt; string</code></td>
							<td>Icon (emoji, glyph, or HTML). Overrides <code>iconMember</code>.</td>
						</tr>
						<tr>
							<td><code>getSubtitleCallback</code></td>
							<td><code>(option) =&gt; string</code></td>
							<td>Secondary line under the option label. Overrides <code>subtitleMember</code>.</td>
						</tr>
						<tr>
							<td><code>getDisabledCallback</code></td>
							<td><code>(option) =&gt; boolean</code></td>
							<td>Whether the option is selectable. Overrides <code>disabledMember</code>.</td>
						</tr>
						<tr>
							<td><code>getGroupCallback</code></td>
							<td><code>(option) =&gt; string</code></td>
							<td>Group heading under which the option is listed. Overrides <code>groupMember</code>.</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p class="small text-muted">
				<code>onselect</code> also lives on <code>editorOptions</code> but is an <em>event</em>, not a callback —
				its return value is ignored. See <a href="/api/events">Events API</a>.
			</p>
		</section>

		<!-- 8. Data, summary, fill -->
		<section class="mb-5">
			<h2 class="mb-2">Data, summary, pagination, fill</h2>
			<p class="text-muted">
				Grid-level callbacks for content the grid renders or operations it orchestrates.
			</p>
			<div class="table-responsive">
				<table class="table table-bordered align-top">
					<thead class="table-light">
						<tr>
							<th>Callback</th>
							<th>Signature</th>
							<th>Purpose &amp; when it fires</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>summaryContentCallback</code></td>
							<td><code>(ctx: SummaryContext&lt;T&gt;) =&gt; string</code></td>
							<td>
								HTML for the summary bar. Called whenever items, page, or sort change.
								<code>ctx</code> exposes <code>items</code> (current page), <code>allItems</code>, <code>totalItems</code>, <code>currentPage</code>, <code>pageSize</code>, and server-supplied <code>metadata</code>.
							</td>
						</tr>
						<tr>
							<td><code>paginationLabelsCallback</code></td>
							<td><code>(ctx: PaginationLabelsContext) =&gt; Partial&lt;PaginationLabels&gt;</code></td>
							<td>
								Customize/translate pagination text. Fires on every pagination render.
								Return only the labels you want to override; the rest fall back to <code>grid.labels</code>.
							</td>
						</tr>
						<tr>
							<td><code>fillDragCallback</code></td>
							<td><code>(detail: FillDragDetail) =&gt; boolean | void</code></td>
							<td>
								Inspect a fill-handle drag <em>before</em> it's applied. Return <code>false</code> to cancel.
								Fires when the user releases the fill handle.
							</td>
						</tr>
						<tr>
							<td><code>createEmptyRowCallback</code> <span class="badge text-bg-info">experimental</span></td>
							<td><code>() =&gt; T | Promise&lt;T&gt;</code></td>
							<td>
								Factory for the new empty row. Called when the grid needs to materialize a placeholder row (e.g. inline-add).
								Async is supported.
							</td>
						</tr>
						<tr>
							<td><code>shortcutsHelpContentCallback</code></td>
							<td><code>() =&gt; string</code></td>
							<td>
								Custom HTML shown in the keyboard-shortcuts help popover, alongside the auto-generated shortcut list.
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- See also -->
		<section class="mb-5">
			<h2 class="mb-2">See also</h2>
			<ul>
				<li><a href="/api/events">Events API</a> — every <code>on*</code> handler (return value ignored)</li>
				<li><a href="/api/columns">Columns API</a> — full column property reference</li>
				<li><a href="/api/editors">Editors API</a> — built-in editor types</li>
				<li><a href="/features/custom-editors">Custom Editors</a> — practical <code>cellEditCallback</code> patterns</li>
			</ul>
		</section>
	</div>
</DocLayout>
