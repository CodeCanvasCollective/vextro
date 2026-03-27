# Contributing to create-vextro

Thanks for your interest in contributing! This guide will help you get started.

## Prerequisites

- Node.js 20+
- git
- npm

## Setup

```bash
# Fork and clone the repo
git clone https://github.com/YOUR-USERNAME/vextro.git
cd vextro

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test
```

## Development

```bash
# Watch mode (rebuilds on changes)
npm run dev

# Test the CLI locally
node dist/index.js create my-app

# Run tests in watch mode
npm run test:watch
```

## Project Structure

```
src/
├── index.ts              # Entry point
├── cli.ts                # Commander CLI setup
├── constants.ts          # Branding, defaults, config
├── commands/
│   └── create.ts         # Create command handler
├── prompts/
│   └── index.ts          # Interactive prompts
├── generators/
│   └── extension.ts      # Scaffold logic
├── utils/
│   ├── logger.ts         # chalk + ora wrappers
│   ├── validator.ts      # Input validation
│   └── file.ts           # Filesystem helpers
└── types/
    └── index.ts          # TypeScript interfaces

src/templates/            # Template files copied into new projects
tests/                    # Unit tests (vitest)
```

## Code Style

- TypeScript strict mode
- ESLint + Prettier enforced
- Run `npm run lint` and `npm run format` before committing

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes with tests
3. Ensure all checks pass: `npm run lint && npm run build && npm test`
4. Submit a PR with a clear description
5. Address review feedback

## Commit Messages

Use clear, descriptive commit messages:

- `feat: add support for Svelte extensions`
- `fix: correct template path on Windows`
- `docs: update contributing guide`
- `test: add generator unit tests`
