import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '../src': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    root: '.',
    include: ['tests/**/*.test.ts'],
  },
});
