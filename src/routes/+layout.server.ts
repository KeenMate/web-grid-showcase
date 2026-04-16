import type { PartialDocsConfig } from '@keenmate/svelte-docs';
import { mergeConfig, defaultConfig, generateSSRStyles } from '@keenmate/svelte-docs';

// Enable prerendering for all routes
export const prerender = true;
export const ssr = true;

const config: PartialDocsConfig = {
	site: {
		title: 'Web Grid Showcase',
		description: 'Complete showcase and documentation for @keenmate/web-grid - a powerful, framework-agnostic data grid web component',
		keywords: ['grid', 'data-grid', 'table', 'spreadsheet', 'datagrid', 'web-component', 'editable', 'sorting', 'pagination', 'keenmate'],
		author: 'KeenMate',
		url: 'https://web-grid.keenmate.com',
		language: 'en'
	},
	company: {
		name: 'KeenMate',
		website: 'https://keenmate.com?utm_source=web-grid-showcase',
		social: {
			github: 'https://github.com/keenmate/web-grid'
		}
	},
	navigation: {
		main: [
			{ label: 'Home', href: '/', icon: '🏠' },
			{ label: 'Getting Started', href: '/getting-started', icon: '🚀' },
			{
				label: 'Features',
				href: '/features/basic',
				icon: '✨',
				children: [
					{ label: 'Basic Usage', href: '/features/basic' },
					{ label: 'Sorting', href: '/features/sorting' },
					{ label: 'Filtering', href: '/features/filtering' },
					{ label: 'Pagination', href: '/features/pagination' },
					{ label: 'Grid Modes', href: '/features/grid-modes' },
					{ label: 'Editing', href: '/features/editing' },
					{ label: 'Fill Handle', href: '/features/fill-handle' },
					{ label: 'Column Resizing', href: '/features/column-resize' },
					{ label: 'Column Reordering', href: '/features/column-reorder' },
					{ label: 'Column Visibility', href: '/features/column-visibility' },
					{ label: 'Freeze Panes', href: '/features/freeze-panes' },
					{ label: 'Row Toolbar', href: '/features/toolbar' },
					{ label: 'Context Menu', href: '/features/context-menu' },
					{ label: 'Virtual Scrolling', href: '/features/virtual-scrolling' },
					{ label: 'Scroll Modes', href: '/features/scroll-modes' },
					{ label: 'Keyboard Navigation', href: '/features/keyboard-navigation' },
					{ label: 'Custom Styling', href: '/features/custom-styling' },
					{ label: 'Row Locking', href: '/features/row-locking' },
					{ label: 'Selection', href: '/features/row-selection' },
					{ label: 'Summary Bar', href: '/features/summary' }
				]
			},
			{
				label: 'API Reference',
				href: '/api/component',
				icon: '📚',
				children: [
					{ label: 'Component API', href: '/api/component' },
					{ label: 'Columns', href: '/api/columns' },
					{ label: 'Editors', href: '/api/editors' },
					{ label: 'Events', href: '/api/events' }
				]
			}
		]
	},
	features: {
		search: true,
		breadcrumbs: true,
		tableOfContents: true,
		analyticsScripts: [
			'<script async src="https://stats.keenmate.services/js/pa-9LpjWBT1FCSf1PO6jmCha.js"></script>',
			`<script>window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()</script>`
		]
	}
};

export async function load() {
	const mergedConfig = mergeConfig(defaultConfig, config);
	const ssrStyles = generateSSRStyles(mergedConfig);

	return {
		config: mergedConfig,
		ssrStyles
	};
}
