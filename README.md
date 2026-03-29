# create-vextro

[![CI](https://github.com/CodeCanvasCollective/vextro/actions/workflows/ci.yml/badge.svg)](https://github.com/CodeCanvasCollective/vextro/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/create-vextro?color=blue&style=flat-square)](https://www.npmjs.com/package/create-vextro)
[![npm downloads](https://img.shields.io/npm/dt/create-vextro?style=flat-square)](https://www.npmjs.com/package/create-vextro)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](https://github.com/CodeCanvasCollective/vextro/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/CodeCanvasCollective/vextro?style=flat-square)](https://github.com/CodeCanvasCollective/vextro/stargazers)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](https://github.com/CodeCanvasCollective/vextro/pulls)

> CLI for scaffolding modern browser extensions with Vite, React, and Tailwind CSS.

**Vextro** creates a browser extension project on top of Vite's React + TypeScript template. It adds popup and options UIs, background and content scripts, storage helpers, icons, and browser-specific extension configuration for Chrome/Edge or Firefox.

## Features

- Fast Vite-based development workflow for popup and options pages.
- React, TypeScript, and Tailwind CSS preconfigured out of the box.
- Browser-specific extension setup:
  Chrome and Edge use CRXJS with a typed `src/manifest.ts`.
  Firefox uses `vite-plugin-web-extension` with `src/manifest.json`.
- Starter boilerplate for popup, options, background, content, and storage utilities.

## Prerequisites

- Node.js 20 or newer
- npm
- Chrome, Edge, or Firefox for local extension testing
- macOS with Xcode only if you plan to convert a Chrome build for Safari

## Browser Support

| Browser     | Status            | Flag        | Notes                                                             |
| ----------- | ----------------- | ----------- | ----------------------------------------------------------------- |
| **Chrome**  | Template included | `--chrome`  | Uses CRXJS and typed `src/manifest.ts`                            |
| **Edge**    | Template included | `--chrome`  | Same Chromium template as Chrome                                  |
| **Firefox** | Template included | `--firefox` | Uses `vite-plugin-web-extension` and `src/manifest.json`          |
| **Safari**  | Manual conversion | n/a         | Convert Chrome output with `xcrun safari-web-extension-converter` |

## Quick Start

You can scaffold a new project with `npm create`. No global install is required.

```bash
# Provide a project name and choose the browser interactively
npm create vextro@latest my-extension

# Or skip the browser prompt
npm create vextro@latest my-extension -- --chrome
npm create vextro@latest my-extension -- --firefox
```

`npm create` automatically inserts `--` before package-specific flags. You can also run the package directly with `npx`, for example `npx create-vextro@latest create my-extension --chrome`.

Vextro scaffolds the project and installs dependencies for you. Then start the dev workflow:

```bash
cd my-extension
npm run dev
```

### Load the Extension During Development

**Chrome / Edge**

1. Open `chrome://extensions` or `edge://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select the generated `dist/` folder.

**Firefox**

1. Open `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on**.
3. Select any file inside the generated `dist/` folder.

**Safari (macOS only)**

1. Scaffold a Chrome project with `--chrome`.
2. Run `xcrun safari-web-extension-converter dist/`.
3. Build and run the generated Xcode project.

## CLI Commands

```bash
# Interactive setup
npx create-vextro@latest create <project-name>

# Target a specific browser
npx create-vextro@latest create <project-name> --chrome
npx create-vextro@latest create <project-name> --firefox

# Overwrite an existing directory
npx create-vextro@latest create <project-name> --chrome --force

# Global flags
npx create-vextro@latest --help
npx create-vextro@latest --version
npx create-vextro@latest --verbose create <project-name> --chrome
```

`--verbose` is a global flag, so place it before the explicit `create` command.

## What You Get

Every generated project includes:

| Feature            | Description                                                                             |
| ------------------ | --------------------------------------------------------------------------------------- |
| **Popup**          | React popup with a `chrome.storage` demo                                                |
| **Options page**   | Settings page with save and load via storage sync                                       |
| **Background**     | Chrome template uses a service worker; Firefox template uses a module background script |
| **Content script** | Injected script with background messaging example                                       |
| **Storage utils**  | Typed wrapper around `chrome.storage.sync`                                              |
| **Manifest setup** | Chrome gets `src/manifest.ts`; Firefox gets `src/manifest.json`                         |
| **TypeScript**     | Type-safe React and extension code                                                      |
| **Tailwind CSS**   | Utility-first styling preconfigured                                                     |

## What's Included

Each generated project follows this structure. The manifest file differs by browser target.

```text
my-extension/
|-- public/
|   |-- icon.png
|   `-- icons/
|-- src/
|   |-- background/
|   |-- content/
|   |-- options/
|   |-- popup/
|   |-- utils/
|   |-- styles.css
|   `-- manifest.ts or manifest.json
|-- vite.config.ts
|-- tsconfig.app.json
|-- tsconfig.json
`-- package.json
```

## Contributing

We welcome contributions. See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for development setup and contribution guidelines.

## License

MIT © [CodeCanvas Collective](https://github.com/CodeCanvasCollective)
