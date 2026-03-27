import { Command } from 'commander';
import path from 'node:path';
import fs from 'fs-extra';
import { promptProjectName, promptBrowser } from '../prompts/index.js';
import { ExtensionGenerator } from '../generators/extension.js';
import {
  validateProjectName,
  validateDirectory,
  error,
  success,
  newLine,
  banner,
} from '../utils/index.js';
import { DEFAULT_BROWSER, BROWSERS } from '../constants.js';
import type { CreateOptions, ProjectConfig, BrowserTarget } from '../types/index.js';

export function createCommand(): Command {
  const cmd = new Command('create')
    .description('Create a new browser extension project')
    .argument('[project-name]', 'Name of the extension project')
    .option('--chrome', 'Target Chrome / Edge (default)')
    .option('--firefox', 'Target Firefox')
    .option('--force', 'Overwrite existing directory')
    .action(async (projectName: string | undefined, options: CreateOptions) => {
      try {
        await handleCreate(projectName, options);
      } catch (err) {
        error(err instanceof Error ? err.message : String(err));
        process.exit(1);
      }
    });

  return cmd;
}

function resolveBrowserFromFlags(options: CreateOptions): BrowserTarget | null {
  if (options.chrome) return 'chrome';
  if (options.firefox) return 'firefox';
  return null;
}

async function handleCreate(
  projectName: string | undefined,
  options: CreateOptions,
): Promise<void> {
  // If no project name given as arg, prompt for it
  if (!projectName) {
    projectName = await promptProjectName();
  }

  // Validate the project name
  const nameValidation = validateProjectName(projectName);
  if (nameValidation !== true) {
    throw new Error(nameValidation);
  }

  // Resolve browser target
  let browser = resolveBrowserFromFlags(options);
  if (!browser) {
    browser = await promptBrowser();
  }

  const targetDir = path.resolve(process.cwd(), projectName);

  // Check if directory already exists
  if (!options.force) {
    const dirValidation = await validateDirectory(targetDir);
    if (dirValidation !== true) {
      throw new Error(dirValidation);
    }
  } else if (await fs.pathExists(targetDir)) {
    await fs.remove(targetDir);
  }

  const config: ProjectConfig = {
    name: projectName,
    targetDir,
    browser,
  };

  const browserMeta = BROWSERS[browser];

  newLine();
  banner(`🚀 Creating Vextro Extension for ${browserMeta.displayName} — "${config.name}"...`);
  newLine();

  // Handle SIGINT — clean up partial directory
  const cleanup = async () => {
    newLine();
    error('Interrupted! Cleaning up...');
    try {
      if (await fs.pathExists(targetDir)) {
        await fs.remove(targetDir);
      }
    } catch {
      // best-effort cleanup
    }
    process.exit(1);
  };
  process.on('SIGINT', cleanup);

  const generator = new ExtensionGenerator(config);
  await generator.generate();

  // Remove SIGINT handler after success
  process.removeListener('SIGINT', cleanup);

  newLine();
  success(`Vextro project "${config.name}" created successfully for ${browserMeta.displayName}! 🎉`);
  newLine();
  console.log('Next steps:');
  console.log(`  cd ${config.name}`);
  console.log('  npm run dev');
  newLine();

  if (browser === 'chrome') {
    console.log('Load extension:');
    console.log('  1. Open chrome://extensions (or edge://extensions)');
    console.log('  2. Enable "Developer mode"');
    console.log('  3. Click "Load unpacked" → select the dist/ folder');
  } else if (browser === 'firefox') {
    console.log('Load extension:');
    console.log('  1. Open about:debugging#/runtime/this-firefox');
    console.log('  2. Click "Load Temporary Add-on"');
    console.log('  3. Select any file in the dist/ folder');
  }

  newLine();
  console.log('Happy coding! 🚀');
  newLine();
}
