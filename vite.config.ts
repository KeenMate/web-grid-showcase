import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import packageLock from './package-lock.json' with { type: 'json' };

// Get version from package-lock.json (handles both normal and file: links)
const gridPkg = packageLock.packages['node_modules/@keenmate/web-grid'];
const gridVersion = gridPkg?.link
	? packageLock.packages[gridPkg.resolved]?.version
	: gridPkg?.version;

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		__GRID_VERSION__: JSON.stringify(gridVersion ?? 'unknown')
	}
});
