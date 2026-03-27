# create-vextro

[![CI](https://github.com/lasalasa/vextro/actions/workflows/ci.yml/badge.svg)](https://github.com/lasalasa/vextro/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/create-vextro?color=blue&style=flat-square)](https://www.npmjs.com/package/create-vextro)
[![npm downloads](https://img.shields.io/npm/dt/create-vextro?style=flat-square)](https://www.npmjs.com/package/create-vextro)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](https://github.com/lasalasa/vextro/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/lasalasa/vextro?style=flat-square)](https://github.com/lasalasa/vextro/stargazers)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](https://github.com/lasalasa/vextro/pulls)

> Scaffold a modern Chrome extension powered by Vite + React + Tailwind in seconds.

**Vextro** is a CLI tool for building fast, modern Chrome extensions using:

- ⚡ [Vite](https://vitejs.dev/)
- ⚛️ [React + TypeScript](https://reactjs.org/)
- 🎨 [Tailwind CSS](https://tailwindcss.com/)
- 🧩 [Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/)
- 🔌 [CRXJS Vite Plugin](https://crxjs.dev/)

---

## 🚀 Quick Start

```bash
npx create-vextro create my-extension
```

Or skip the prompt by passing the project name directly:

```bash
npx create-vextro create my-extension
```

### With other package managers

```bash
# Yarn
yarn create vextro create my-extension

# pnpm
pnpm create vextro create my-extension

# Bun
bun create vextro create my-extension
```

Then:

```bash
cd my-extension
npm install
npm run dev
```

Open Chrome and load your extension from the `dist/` folder via `chrome://extensions`.

---

## 📋 Commands

```bash
create-vextro create <name>          # Create a new extension
create-vextro create <name> --force  # Overwrite existing directory
create-vextro --version              # Show version
create-vextro --help                 # Show help
create-vextro --verbose              # Enable verbose output
```

---

## ✨ What You Get

Every generated project includes:

| Feature | Description |
|---------|-------------|
| **Popup** | React popup with `chrome.storage` demo |
| **Options page** | Settings page with save/load via `chrome.storage.sync` |
| **Background** | Service worker with `onInstalled` and message listener |
| **Content script** | Injected script with background messaging example |
| **Storage utils** | Typed wrapper around `chrome.storage.sync` |
| **Hot Reload** | Vite HMR for popup and options pages |
| **TypeScript** | Full type safety with `@types/chrome` |
| **Tailwind CSS** | Utility-first styling pre-configured |

---

## 📁 Generated Project Structure

```
my-extension/
├── public/
│   ├── icon.png
│   └── icons/              # Extension icons (16, 48, 128)
├── src/
│   ├── background/         # Background service worker
│   ├── content/            # Content scripts
│   ├── options/            # Options page (React + Tailwind)
│   ├── popup/              # Popup UI (React + Tailwind)
│   ├── utils/              # Storage utilities
│   ├── manifest.ts         # Typed manifest config
│   └── styles.css          # Tailwind CSS entrypoint
├── vite.config.ts          # Vite + CRX plugin config
├── tsconfig.json
└── package.json
```

---

## 🌟 Features

- ⚡ Instant startup with Vite
- 🔥 Hot Module Reload (HMR) for popup and options
- 🧩 Multi-entry support with `@crxjs/vite-plugin`
- 🛠️ Preconfigured React + TypeScript + Tailwind
- 🧱 Opinionated folder structure
- ✅ Typed `chrome.storage` utilities included

---

## 🤝 Contributing

See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for development setup and contribution guidelines.

---

## 📄 License

MIT © [Lasantha Lakmal](https://github.com/lasalasa)