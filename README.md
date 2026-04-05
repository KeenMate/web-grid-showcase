# Web Grid Showcase

Interactive documentation and demo site for [@keenmate/web-grid](https://github.com/keenmate/web-grid) - a framework-agnostic data grid web component.

## Live Demo

Visit the live showcase at: https://web-grid.keenmate.com

## Features Demonstrated

- Basic grid usage with sorting, filtering, and pagination
- Inline editing with various editor types (text, number, date, select, combobox, autocomplete)
- Keyboard navigation and shortcuts
- Row toolbar with custom actions
- Context menus
- Virtual scrolling for large datasets
- Custom cell and row styling
- And more...

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# Install dependencies
make install

# Start development server
make dev
```

### Local Development with web-grid

When developing web-grid alongside this showcase:

```bash
# Link local web-grid package
make link-lib

# Or update package.json to use file reference:
# "@keenmate/web-grid": "file:../web-grid/packages/web-grid"
```

### Available Commands

```bash
make help          # Show all available commands
make dev           # Start development server
make build         # Build for production
make preview       # Preview production build
make docker-build  # Build Docker image
make docker-run    # Run Docker container
```

## Deployment

The showcase is deployed via GitHub Actions on push to the `prod` branch.

### Docker

```bash
# Build image
make docker-build

# Run container
make docker-run

# Stop container
make docker-stop
```

## Tech Stack

- [SvelteKit](https://kit.svelte.dev/) - Web framework
- [Bootstrap 5](https://getbootstrap.com/) - CSS framework
- [@keenmate/svelte-docs](https://github.com/keenmate/svelte-docs) - Documentation components
- [@keenmate/web-grid](https://github.com/keenmate/web-grid) - The grid component being showcased

## License
 
MIT
