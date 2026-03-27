import path from 'node:path';
import { execSync } from 'node:child_process';
import fs from 'fs-extra';
import { getTemplatesDir, spinner, success, debug } from '../utils/index.js';
import { FILES_TO_REMOVE } from '../constants.js';
import type { ProjectConfig } from '../types/index.js';

export class ExtensionGenerator {
  private config: ProjectConfig;
  private templateDir: string;

  constructor(config: ProjectConfig) {
    this.config = config;
    this.templateDir = getTemplatesDir();
  }

  async generate(): Promise<void> {
    await this.scaffoldVite();
    await this.installBaseDeps();
    await this.cleanViteDefaults();
    await this.copyExtensionStructure();
    await this.overrideConfigs();
    await this.injectProjectName();
    await this.installExtensionDeps();
  }

  private async scaffoldVite(): Promise<void> {
    const s = spinner('Creating base Vite + React + TS project...');
    s.start();
    try {
      execSync(
        `npm create vite@latest ${this.config.name} -- --template react-ts`,
        { cwd: path.dirname(this.config.targetDir), stdio: 'pipe' },
      );
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
      execSync('npm install', { cwd: this.config.targetDir, stdio: 'pipe' });
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

    // Clean up default public folder
    const publicPath = path.join(this.config.targetDir, 'public');
    if (await fs.pathExists(publicPath)) {
      await fs.emptyDir(publicPath);
    }

    s.stop();
    success('Cleaned default Vite template files');
  }

  private async copyExtensionStructure(): Promise<void> {
    const s = spinner('Copying extension structure into project...');
    s.start();

    await fs.copy(
      path.join(this.templateDir, 'src'),
      path.join(this.config.targetDir, 'src'),
    );
    await fs.copy(
      path.join(this.templateDir, 'public'),
      path.join(this.config.targetDir, 'public'),
    );

    s.stop();
    success('Copied extension structure');
  }

  private async overrideConfigs(): Promise<void> {
    const s = spinner('Overriding config files...');
    s.start();

    const rootFiles = ['vite.config.ts'];
    for (const file of rootFiles) {
      const from = path.join(this.templateDir, file);
      const to = path.join(this.config.targetDir, file);
      if (await fs.pathExists(from)) {
        await fs.copy(from, to, { overwrite: true });
        debug(`Overrode: ${file}`);
      }
    }

    s.stop();
    success('Overrode config files');
  }

  private async injectProjectName(): Promise<void> {
    const s = spinner('Injecting project name...');
    s.start();

    const manifestPath = path.join(this.config.targetDir, 'src', 'manifest.ts');
    const pkgPath = path.join(this.config.targetDir, 'package.json');

    if (await fs.pathExists(manifestPath)) {
      let manifest = await fs.readFile(manifestPath, 'utf-8');
      manifest = manifest.replace(/__EXT_NAME__/g, this.config.name);
      await fs.writeFile(manifestPath, manifest, 'utf-8');
    }

    if (await fs.pathExists(pkgPath)) {
      let pkg = await fs.readFile(pkgPath, 'utf-8');
      pkg = pkg.replace(/"__EXT_NAME__"/g, `"${this.config.name}"`);
      await fs.writeFile(pkgPath, pkg, 'utf-8');
    }

    s.stop();
    success('Injected project name');
  }

  private async installExtensionDeps(): Promise<void> {
    const s = spinner('Installing Chrome extension dev dependencies...');
    s.start();
    try {
      execSync(
        'npm install --save-dev @types/chrome @types/node @crxjs/vite-plugin tailwindcss @tailwindcss/vite',
        { cwd: this.config.targetDir, stdio: 'pipe' },
      );
      s.stop();
      success('Installed Chrome extension dev dependencies');
    } catch (err) {
      s.stop();
      throw new Error(
        `Failed to install extension dependencies: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }
}
