import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import webExtension from 'vite-plugin-web-extension';
import tailwindcss from '@tailwindcss/vite';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    webExtension({
      manifest: path.resolve(__dirname, 'src/manifest.json'),
      additionalInputs: ['src/popup/popup.html', 'src/options/options.html'],
    }),
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',
  },
});
