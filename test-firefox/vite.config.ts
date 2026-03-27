import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import webExtension from 'vite-plugin-web-extension';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    webExtension({
      manifest: path.resolve(__dirname, 'src/manifest.json'),
      additionalInputs: [
        'src/popup/popup.html',
        'src/options/options.html',
      ],
    }),
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',
  },
});
