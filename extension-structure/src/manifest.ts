import { defineManifest } from '@crxjs/vite-plugin';

export default defineManifest({
  manifest_version: 3,
  name: "__EXT_NAME__",
  description: "A modern Chrome extension built with Vextro.",
  version: "1.0.0",
  icons: {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  },
  permissions: ["storage", "tabs", "scripting"],
  action: {
    default_popup: "src/popup/popup.html"
  },
  background: {
    service_worker: "src/background/background.ts",
    type: "module"
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content/content.ts"]
    }
  ],
  options_page: "src/options/options.html"
});
