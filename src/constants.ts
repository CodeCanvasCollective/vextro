import type { BrowserTarget } from './types/index.js';

export const PACKAGE_NAME = 'create-vextro';
export const BRAND_NAME = 'Vextro';

export const VALID_PROJECT_NAME = /^(?:@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;

export const DEFAULT_PROJECT_NAME = 'my-extension';
export const DEFAULT_BROWSER: BrowserTarget = 'chrome';

export const FILES_TO_REMOVE = [
  'src/App.tsx',
  'src/main.tsx',
  'src/index.css',
  'src/App.css',
  'src/assets',
  'index.html',
];

export const BROWSERS: Record<BrowserTarget, { displayName: string; description: string }> = {
  chrome: {
    displayName: 'Chrome / Edge',
    description: 'Google Chrome & Microsoft Edge (Chromium-based, uses CRXJS)',
  },
  firefox: {
    displayName: 'Firefox',
    description: 'Mozilla Firefox (uses vite-plugin-web-extension)',
  },
};

export const CHROME_DEV_DEPS = [
  '@types/chrome',
  '@types/node',
  '@crxjs/vite-plugin',
  'tailwindcss',
  '@tailwindcss/vite',
];

export const FIREFOX_DEV_DEPS = [
  '@types/chrome',
  '@types/node',
  'vite-plugin-web-extension',
  'tailwindcss',
  '@tailwindcss/vite',
];
