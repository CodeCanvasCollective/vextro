# create-vextro

[![CI](https://github.com/lasalasa/vextro/actions/workflows/ci.yml/badge.svg)](https://github.com/lasalasa/vextro/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/create-vextro?color=blue&style=flat-square)](https://www.npmjs.com/package/create-vextro)
[![npm downloads](https://img.shields.io/npm/dt/create-vextro?style=flat-square)](https://www.npmjs.com/package/create-vextro)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](https://github.com/lasalasa/vextro/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/lasalasa/vextro?style=flat-square)](https://github.com/lasalasa/vextro/stargazers)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](https://github.com/lasalasa/vextro/pulls)

> Scaffold modern browser extensions for Chrome, Edge, and Firefox — powered by Vite + React + Tailwind.

**Vextro** is a CLI tool for building fast, modern browser extensions using:

- ⚡ [Vite](https://vitejs.dev/)
- ⚛️ [React + TypeScript](https://reactjs.org/)
- 🎨 [Tailwind CSS](https://tailwindcss.com/)
- 🧩 [Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/)
- 🔌 [CRXJS](https://crxjs.dev/) (Chrome/Edge) or [vite-plugin-web-extension](https://github.com/nicedoc/vite-plugin-web-extension) (Firefox)

---

## 🌐 Browser Support

| Browser | Status | Flag | Notes |
|---------|--------|------|-------|
| **Chrome** | ✅ Fully supported | `--chrome` | Uses CRXJS Vite Plugin |
| **Edge** | ✅ Fully supported | `--chrome` | Chromium-based — same as Chrome, load from `edge://extensions` |
| **Firefox** | ✅ Fully supported | `--firefox` | Uses vite-plugin-web-extension + `browser.*` namespace |
| **Safari** | 📄 Documented | — | Convert Chrome output with `xcrun safari-web-extension-converter` |

---

## 🚀 Quick Start

```bash
# Interactive (prompts for browser)
npx create-vextro create my-extension

# Chrome / Edge (skip prompt)
npx create-vextro create my-extension --chrome

# Firefox (skip prompt)
npx create-vextro create my-extension --firefox
```

Then:

```bash
cd my-extension
npm run dev
```

### Loading your extension

**Chrome / Edge:**
1. Open `chrome://extensions` (or `edge://extensions`)
2. Enable **Developer mode**
3. Click **"Load unpacked"** → select the `dist/` folder

**Firefox:**
1. Open `about:debugging#/runtime/this-firefox`
2. Click **"Load Temporary Add-on"**
3. Select any file in the `dist/` folder

**Safari (macOS only):**
1. Build a Chrome extension first using `--chrome`
2. Run `xcrun safari-web-extension-converter dist/` to create an Xcode project
3. Build and run from Xcode

---

## 📋 Commands

```bash
create-vextro create <name>              # Interactive (prompts for browser)
create-vextro create <name> --chrome     # Chrome / Edge
create-vextro create <name> --firefox    # Firefox
create-vextro create <name> --force      # Overwrite existing directory
create-vextro --version                  # Show version
create-vextro --help                     # Show help
create-vextro --verbose                  # Enable verbose output
```

---

## ✨ What You Get

Every generated project includes:

| Feature | Description |
|---------|-------------|
| **Popup** | React popup with `chrome.storage` demo |
| **Options page** | Settings page with save/load via storage sync |
| **Background** | Service worker with `onInstalled` and message listener |
| **Content script** | Injected script with background messaging example |
| **Storage utils** | Typed wrapper around browser storage API |
| **Hot Reload** | Vite HMR for popup and options pages |
| **TypeScript** | Full type safety |
| **Tailwind CSS** | Utility-first styling pre-configured |

---

## 📁 Generated Project Structure

```
my-extension/
├── public/
│   ├── icon.png
│   └── icons/              # Extension icons (16, 48, 128)
├── src/
│   ├── background/         # Background service worker / script
│   ├── content/            # Content scripts
│   ├── options/            # Options page (React + Tailwind)
│   ├── popup/              # Popup UI (React + Tailwind)
│   ├── utils/              # Storage utilities
│   ├── manifest.ts/.json   # Manifest config (format depends on browser)
│   └── styles.css          # Tailwind CSS entrypoint
├── vite.config.ts          # Vite + browser plugin config
├── tsconfig.json
└── package.json
```

---

## 🤝 Contributing

See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for development setup and contribution guidelines.

---

## 📄 License

MIT © [Lasantha Lakmal](https://github.com/lasalasa)