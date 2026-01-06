<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let propertyGrid: any;
	let callbackGrid: any;
	let externalGrid: any;

	// Simulated WebSocket connection status
	let wsConnected = $state(true);
	let lockLog = $state<string[]>([]);

	const employees = [
		{ id: 1, name: 'Alice Johnson', department: 'Engineering', salary: 95000, isLocked: false, lockInfo: null },
		{ id: 2, name: 'Bob Smith', department: 'Marketing', salary: 72000, isLocked: true, lockInfo: { lockedBy: 'John Doe', lockedAt: new Date().toISOString() } },
		{ id: 3, name: 'Charlie Brown', department: 'Engineering', salary: 88000, isLocked: false, lockInfo: null },
		{ id: 4, name: 'Diana Ross', department: 'Sales', salary: 67000, isLocked: false, lockInfo: null }
	];

	const callbackEmployees = [
		{ id: 1, name: 'Alice Johnson', department: 'Engineering', status: 'draft', editingBy: null },
		{ id: 2, name: 'Bob Smith', department: 'Marketing', status: 'review', editingBy: 'Jane Cooper' },
		{ id: 3, name: 'Charlie Brown', department: 'Engineering', status: 'approved', editingBy: null },
		{ id: 4, name: 'Diana Ross', department: 'Sales', status: 'draft', editingBy: null }
	];

	const externalEmployees = [
		{ id: 'emp-1', name: 'Alice Johnson', department: 'Engineering', salary: 95000 },
		{ id: 'emp-2', name: 'Bob Smith', department: 'Marketing', salary: 72000 },
		{ id: 'emp-3', name: 'Charlie Brown', department: 'Engineering', salary: 88000 },
		{ id: 'emp-4', name: 'Diana Ross', department: 'Sales', salary: 67000 }
	];

	function log(message: string) {
		const timestamp = new Date().toLocaleTimeString();
		lockLog = [`[${timestamp}] ${message}`, ...lockLog.slice(0, 7)];
	}

	function clearLog() {
		lockLog = [];
	}

	onMount(async () => {
		await import('@keenmate/web-grid');

		const columns = [
			{ field: 'name', title: 'Name', width: '150px', editor: 'text' },
			{ field: 'department', title: 'Department', width: '120px', editor: 'text' },
			{ field: 'salary', title: 'Salary', width: '100px', align: 'right', editor: 'number', formatCallback: (v: number) => '$' + v.toLocaleString() }
		];

		// Property-based locking
		if (propertyGrid) {
			propertyGrid.columns = columns;
			propertyGrid.items = [...employees];
			propertyGrid.editable = true;
			propertyGrid.editTrigger = 'click';
			propertyGrid.showRowNumbers = true;
			propertyGrid.idValueMember = 'id';
			propertyGrid.rowLocking = {
				lockedMember: 'isLocked',
				lockInfoMember: 'lockInfo',
				lockedEditBehavior: 'block'
			};
		}

		// Callback-based locking
		if (callbackGrid) {
			const statusColumns = [
				{ field: 'name', title: 'Name', width: '150px', editor: 'text' },
				{ field: 'department', title: 'Department', width: '120px', editor: 'text' },
				{ field: 'status', title: 'Status', width: '100px' }
			];
			callbackGrid.columns = statusColumns;
			callbackGrid.items = [...callbackEmployees];
			callbackGrid.editable = true;
			callbackGrid.editTrigger = 'click';
			callbackGrid.showRowNumbers = true;
			callbackGrid.idValueMember = 'id';
			callbackGrid.rowLocking = {
				getLockInfoCallback: (row: any) => {
					// Lock approved rows and rows being edited by others
					if (row.status === 'approved') {
						return { isLocked: true, reason: 'Row is approved and read-only' };
					}
					if (row.editingBy) {
						return { isLocked: true, lockedBy: row.editingBy, reason: 'Currently being edited' };
					}
					return null;
				},
				lockedEditBehavior: 'block'
			};
		}

		// External API locking
		if (externalGrid) {
			externalGrid.columns = columns;
			externalGrid.items = [...externalEmployees];
			externalGrid.editable = true;
			externalGrid.editTrigger = 'click';
			externalGrid.showRowNumbers = true;
			externalGrid.idValueMember = 'id';
			externalGrid.rowLocking = {
				lockedEditBehavior: 'block'
			};

			// Simulate initial lock from "server"
			setTimeout(() => {
				if (externalGrid) {
					externalGrid.lockRowById('emp-2', { lockedBy: 'Remote User', lockedAt: new Date().toISOString() });
					log('Server: emp-2 locked by Remote User');
				}
			}, 1000);
		}
	});

	function lockRow(id: string, user: string) {
		if (externalGrid) {
			externalGrid.lockRowById(id, { lockedBy: user, lockedAt: new Date().toISOString() });
			log(`Locked ${id} by ${user}`);
		}
	}

	function unlockRow(id: string) {
		if (externalGrid) {
			externalGrid.unlockRowById(id);
			log(`Unlocked ${id}`);
		}
	}

	function updateRow(id: string) {
		if (externalGrid) {
			externalGrid.updateRowById(id, { salary: Math.floor(Math.random() * 50000) + 50000 });
			log(`Updated ${id} salary`);
		}
	}
</script>

<DocLayout
	titleText="Row Locking"
	descriptionText="Lock rows to prevent editing for collaborative scenarios">

	<div class="py-4">
		<!-- Property-Based Locking -->
		<ShowcaseSection
			titleText="RL01 Property-Based Locking"
			subtitleText="Lock rows based on data properties (isLocked, lockInfo)"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="How It Works">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={propertyGrid}
						style="max-height: 300px;"
					></web-grid>
					<p class="small text-muted mt-2">Row 2 (Bob) is locked - try clicking to edit.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Data with lock properties
const employees = [
  { id: 1, name: 'Alice', isLocked: false },
  { id: 2, name: 'Bob', isLocked: true,
    lockInfo: {
      lockedBy: 'John Doe',
      lockedAt: '2024-01-15T10:30:00Z'
    }
  }
];

grid.idValueMember = 'id';
grid.rowLocking = {
  // Simple boolean check
  lockedMember: 'isLocked',

  // Full lock info object
  lockInfoMember: 'lockInfo',

  // What happens on edit attempt
  lockedEditBehavior: 'block'
};`}
					languageType="javascript"
					titleText="Property-Based"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Lock Sources</h5>
					<p><code>lockedMember</code> - Simple boolean property</p>
					<p><code>lockInfoMember</code> - Full object with details</p>
					<h5>LockInfo Object</h5>
					<ul>
						<li><code>isLocked</code> - Boolean</li>
						<li><code>lockedBy</code> - User name</li>
						<li><code>lockedAt</code> - Timestamp</li>
						<li><code>reason</code> - Custom message</li>
					</ul>
					<h5>Visual Indicators</h5>
					<ul>
						<li>Lock icon replaces row number</li>
						<li>Muted row styling</li>
						<li>Tooltip shows who locked</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Callback-Based Locking -->
		<ShowcaseSection
			titleText="RL02 Callback-Based Locking"
			subtitleText="Compute lock status dynamically based on row data"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="How It Works">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={callbackGrid}
						style="max-height: 300px;"
					></web-grid>
					<p class="small text-muted mt-2">Row 2 (review) and Row 3 (approved) are locked.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`grid.rowLocking = {
  getLockInfoCallback: (row) => {
    // Lock approved rows
    if (row.status === 'approved') {
      return {
        isLocked: true,
        reason: 'Approved - read-only'
      };
    }

    // Lock rows being edited by others
    if (row.editingBy) {
      return {
        isLocked: true,
        lockedBy: row.editingBy,
        reason: 'Currently being edited'
      };
    }

    // Not locked
    return null;
  },
  lockedEditBehavior: 'block'
};`}
					languageType="javascript"
					titleText="Callback-Based"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Use Cases</h5>
					<ul>
						<li>Status-based locking (approved, archived)</li>
						<li>Permission-based locking</li>
						<li>Computed lock conditions</li>
					</ul>
					<h5>Callback Options</h5>
					<p><code>isLockedCallback</code> - Returns boolean</p>
					<p><code>getLockInfoCallback</code> - Returns full LockInfo or null</p>
					<h5>Edit Behaviors</h5>
					<ul>
						<li><code>block</code> - Cannot edit (default)</li>
						<li><code>allow</code> - Can edit, just visual</li>
						<li><code>callback</code> - Use canEditLockedCallback</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- External API Locking -->
		<ShowcaseSection
			titleText="RL03 External API Locking"
			subtitleText="Lock/unlock rows via JavaScript API (WebSocket scenarios)"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Actions">

			{#snippet demoContent()}
				<div class="grid-demo">
					<web-grid
						bind:this={externalGrid}
						style="max-height: 250px;"
					></web-grid>
					<div class="console-log mt-2" style="font-family: monospace; font-size: 12px; background: #1e1e1e; color: #d4d4d4; padding: 8px; border-radius: 4px; height: 120px; overflow-y: auto;">
						<div class="d-flex justify-content-between align-items-center mb-1">
							<span class="text-muted">Event Log</span>
							<button class="btn btn-sm btn-outline-secondary py-0 px-1" style="font-size: 10px;" onclick={clearLog}>Clear</button>
						</div>
						{#if lockLog.length === 0}
							<div class="text-muted">Waiting for events...</div>
						{:else}
							{#each lockLog as line}
								<div style="color: #9cdcfe;">{line}</div>
							{/each}
						{/if}
					</div>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Lock row externally
grid.lockRowById('emp-1', {
  lockedBy: 'John',
  lockedAt: new Date().toISOString()
});

// Unlock row
grid.unlockRowById('emp-1');

// Update row data (preserves lock state)
grid.updateRowById('emp-1', {
  salary: 100000
});

// Replace entire row
grid.replaceRowById('emp-1', newRowData);

// WebSocket integration
socket.on('row-locked', ({ id, user }) => {
  grid.lockRowById(id, { lockedBy: user });
});

socket.on('row-unlocked', ({ id }) => {
  grid.unlockRowById(id);
});`}
					languageType="javascript"
					titleText="External API"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose small">
					<h5>Try These Actions</h5>
					<div class="d-grid gap-2">
						<button class="btn btn-sm btn-outline-primary" onclick={() => lockRow('emp-1', 'You')}>
							Lock emp-1 (Alice)
						</button>
						<button class="btn btn-sm btn-outline-primary" onclick={() => lockRow('emp-3', 'Admin')}>
							Lock emp-3 (Charlie)
						</button>
						<button class="btn btn-sm btn-outline-secondary" onclick={() => unlockRow('emp-1')}>
							Unlock emp-1
						</button>
						<button class="btn btn-sm btn-outline-secondary" onclick={() => unlockRow('emp-2')}>
							Unlock emp-2 (Bob)
						</button>
						<button class="btn btn-sm btn-outline-info" onclick={() => updateRow('emp-4')}>
							Update emp-4 salary
						</button>
					</div>
					<h5 class="mt-3">API Methods</h5>
					<ul>
						<li><code>lockRowById(id, info?)</code></li>
						<li><code>unlockRowById(id)</code></li>
						<li><code>updateRowById(id, data)</code></li>
						<li><code>replaceRowById(id, row)</code></li>
						<li><code>isRowLocked(rowOrId)</code></li>
						<li><code>getRowLockInfo(rowOrId)</code></li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Configuration Reference -->
		<section class="mb-5">
			<h2 class="mb-4">Configuration Reference</h2>

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
							<td><code>idValueMember</code></td>
							<td><code>string</code></td>
							<td>Property name for row ID (required for external API)</td>
						</tr>
						<tr>
							<td><code>idValueCallback</code></td>
							<td><code>(row) => unknown</code></td>
							<td>Callback to compute row ID</td>
						</tr>
						<tr>
							<td><code>rowLocking.lockedMember</code></td>
							<td><code>string</code></td>
							<td>Property name for boolean lock state</td>
						</tr>
						<tr>
							<td><code>rowLocking.lockInfoMember</code></td>
							<td><code>string</code></td>
							<td>Property name for full LockInfo object</td>
						</tr>
						<tr>
							<td><code>rowLocking.isLockedCallback</code></td>
							<td><code>(row) => boolean</code></td>
							<td>Callback returning lock state</td>
						</tr>
						<tr>
							<td><code>rowLocking.getLockInfoCallback</code></td>
							<td><code>(row) => LockInfo | null</code></td>
							<td>Callback returning full lock info</td>
						</tr>
						<tr>
							<td><code>rowLocking.lockedEditBehavior</code></td>
							<td><code>'block' | 'allow' | 'callback'</code></td>
							<td>What happens when editing locked row</td>
						</tr>
						<tr>
							<td><code>rowLocking.canEditLockedCallback</code></td>
							<td><code>(row, lockInfo) => boolean</code></td>
							<td>Custom permission check (when behavior='callback')</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	</div>
</DocLayout>
