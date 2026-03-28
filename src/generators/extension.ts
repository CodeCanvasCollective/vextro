import path from 'node:path';
import { execSync } from 'node:child_process';
import fs from 'fs-extra';
import { getTemplatesDir, spinner, success, debug } from '../utils/index.js';
import { FILES_TO_REMOVE, CHROME_DEV_DEPS, FIREFOX_DEV_DEPS } from '../constants.js';
import type { ProjectConfig } from '../types/index.js';

export class ExtensionGenerator {
  private config: ProjectConfig;
  private templatesDir: string;

  constructor(config: ProjectConfig) {
    this.config = config;
    this.templatesDir = getTemplatesDir();
  }

  async generate(): Promise<void> {
    await this.scaffoldVite();
    await this.installBaseDeps();
    await this.cleanViteDefaults();
    await this.copySharedFiles();
    await this.copyBrowserFiles();
    await this.overrideConfigs();
    await this.patchTsConfig();
    await this.injectProjectName();
    await this.installExtensionDeps();
  }

  private async scaffoldVite(): Promise<void> {
    const s = spinner('Creating base Vite + React + TS project...');
    s.start();
    try {
      execSync(`npm exec --yes -- create-vite@latest ${this.config.name} --template react-ts`, {
        cwd: path.dirname(this.config.targetDir),
        stdio: 'pipe',
        maxBuffer: 10 * 1024 * 1024,
      });
      s.stop();
      success('Created base Vite + React + TS project');
    } catch (err) {
      s.stop();
      throw new Error(
        `Failed to scaffold Vite project: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  private async installBaseDeps(): Promise<void> {
    const s = spinner('Installing base dependencies...');
    s.start();
    try {
      execSync('npm install', {
        cwd: this.config.targetDir,
        stdio: 'pipe',
        maxBuffer: 10 * 1024 * 1024,
      });
      s.stop();
      success('Installed base dependencies');
    } catch (err) {
      s.stop();
      throw new Error(
        `Failed to install dependencies: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  private async cleanViteDefaults(): Promise<void> {
    const s = spinner('Removing default Vite template files...');
    s.start();

    for (const file of FILES_TO_REMOVE) {
      const fullPath = path.join(this.config.targetDir, file);
      if (await fs.pathExists(fullPath)) {
        await fs.remove(fullPath);
        debug(`Removed: ${file}`);
      }
    }

    const publicPath = path.join(this.config.targetDir, 'public');
    if (await fs.pathExists(publicPath)) {
      await fs.emptyDir(publicPath);
    }

    s.stop();
    success('Cleaned default Vite template files');
  }

  private async copySharedFiles(): Promise<void> {
    const s = spinner('Copying shared extension files...');
    s.start();

    const sharedDir = path.join(this.templatesDir, 'shared');

    // Copy shared src files (popup, options, utils, styles)
    const sharedSrcDir = path.join(sharedDir, 'src');
    if (await fs.pathExists(sharedSrcDir)) {
      await fs.copy(sharedSrcDir, path.join(this.config.targetDir, 'src'));
    }

    // Copy shared public files (icons)
    const sharedPublicDir = path.join(sharedDir, 'public');
    if (await fs.pathExists(sharedPublicDir)) {
      await fs.copy(sharedPublicDir, path.join(this.config.targetDir, 'public'));
    }

    s.stop();
    success('Copied shared extension files');
  }

  private async copyBrowserFiles(): Promise<void> {
    const s = spinner(`Copying ${this.config.browser} browser files...`);
    s.start();

    const browserDir = path.join(this.templatesDir, this.config.browser);

    // Copy browser-specific src files (manifest, background, content)
    const browserSrcDir = path.join(browserDir, 'src');
    if (await fs.pathExists(browserSrcDir)) {
      await fs.copy(browserSrcDir, path.join(this.config.targetDir, 'src'), {
        overwrite: true,
      });
    }

    s.stop();
    success(`Copied ${this.config.browser} browser files`);
  }

  private async overrideConfigs(): Promise<void> {
    const s = spinner('Overriding config files...');
    s.start();

    const browserDir = path.join(this.templatesDir, this.config.browser);
    const viteConfigFrom = path.join(browserDir, 'vite.config.ts');
    const viteConfigTo = path.join(this.config.targetDir, 'vite.config.ts');

    if (await fs.pathExists(viteConfigFrom)) {
      await fs.copy(viteConfigFrom, viteConfigTo, { overwrite: true });
      debug('Overrode: vite.config.ts');
    }

    s.stop();
    success('Overrode config files');
  }

  private async patchTsConfig(): Promise<void> {
    const s = spinner('Patching tsconfig for extension types...');
    s.start();

    const tsconfigAppPath = path.join(this.config.targetDir, 'tsconfig.app.json');

    if (await fs.pathExists(tsconfigAppPath)) {
      let content = await fs.readFile(tsconfigAppPath, 'utf-8');

      // Both Chrome and Firefox use @types/chrome (Firefox MV3 supports chrome.* namespace)
      const typeToAdd = 'chrome';

      // Inject the type into the "types" array using string replacement
      // This preserves comments and formatting in the JSONC file
      content = content.replace(
        /("types"\s*:\s*\[)([\s\S]*?)(\])/,
        (match, prefix, existing, suffix) => {
          const trimmed = existing.trim();
          if (trimmed.includes(`"${typeToAdd}"`)) return match; // already present
          if (trimmed.length === 0) {
            return `${prefix}"${typeToAdd}"${suffix}`;
          }
          return `${prefix}${existing.trimEnd()}, "${typeToAdd}"${suffix}`;
        },
      );

      await fs.writeFile(tsconfigAppPath, content, 'utf-8');
      debug(`Patched tsconfig.app.json with type: ${typeToAdd}`);
    }

    s.stop();
    success('Patched tsconfig for extension types');
  }

  private async injectProjectName(): Promise<void> {
    const s = spinner('Injecting project name...');
    s.start();

    if (this.config.browser === 'chrome') {
      // Chrome uses manifest.ts
      const manifestPath = path.join(this.config.targetDir, 'src', 'manifest.ts');
      if (await fs.pathExists(manifestPath)) {
        let manifest = await fs.readFile(manifestPath, 'utf-8');
        manifest = manifest.replace(/__EXT_NAME__/g, this.config.name);
        await fs.writeFile(manifestPath, manifest, 'utf-8');
      }
    } else if (this.config.browser === 'firefox') {
      // Firefox uses manifest.json
      const manifestPath = path.join(this.config.targetDir, 'src', 'manifest.json');
      if (await fs.pathExists(manifestPath)) {
        let manifest = await fs.readFile(manifestPath, 'utf-8');
        manifest = manifest.replace(/__EXT_NAME__/g, this.config.name);
        await fs.writeFile(manifestPath, manifest, 'utf-8');
      }
    }

    // Update package.json name
    const pkgPath = path.join(this.config.targetDir, 'package.json');
    if (await fs.pathExists(pkgPath)) {
      let pkg = await fs.readFile(pkgPath, 'utf-8');
      pkg = pkg.replace(/"__EXT_NAME__"/g, `"${this.config.name}"`);
      await fs.writeFile(pkgPath, pkg, 'utf-8');
    }

    s.stop();
    success('Injected project name');
  }

  private async installExtensionDeps(): Promise<void> {
    const deps = this.config.browser === 'firefox' ? FIREFOX_DEV_DEPS : CHROME_DEV_DEPS;

    const s = spinner(`Installing ${this.config.browser} extension dev dependencies...`);
    s.start();
    try {
      execSync(`npm install --save-dev ${deps.join(' ')}`, {
        cwd: this.config.targetDir,
        stdio: 'pipe',
        maxBuffer: 10 * 1024 * 1024,
      });
      s.stop();
      success(`Installed ${this.config.browser} extension dev dependencies`);
    } catch (err) {
      s.stop();
      throw new Error(
        `Failed to install extension dependencies: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }
}
