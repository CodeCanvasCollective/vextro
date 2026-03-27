# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.1.0] - 2026-03-27

### Added

- TypeScript source with tsup build pipeline
- Commander CLI with `--help`, `--version`, and `--verbose` flags
- Project name validation (npm-name compliant)
- `--force` flag to overwrite existing directories
- Graceful Ctrl+C handling with cleanup
- `ora` loading spinners for all long-running operations
- Error handling with user-friendly messages
- Generic Chrome extension starter templates:
  - Popup with `chrome.storage` counter demo
  - Options page with settings save/load
  - Background service worker with `onInstalled` and `onMessage`
  - Content script with background messaging example
  - Typed `chrome.storage.sync` utility wrapper
- ESLint + Prettier configuration
- Vitest unit tests
- GitHub Actions CI/CD (build + test + publish)
- Changesets for version management
- Contributing guide

### Changed

- Migrated from raw JavaScript (`bin/cli.js`) to modular TypeScript (`src/`)
- CLI binary now points to compiled `dist/index.js`
- Minimum Node.js version bumped from 16 to 20
- Version bumped from 0.0.4 to 0.1.0

### Fixed

- Branding: replaced all "Extensify" references with "Vextro"

### Removed

- `bin/cli.js` (replaced by `src/` + `dist/`)
- `apiClient.ts` placeholder (replaced by `storage.ts`)
