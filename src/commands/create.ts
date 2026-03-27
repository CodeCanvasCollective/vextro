import { Command } from 'commander';
import path from 'node:path';
import fs from 'fs-extra';
import { promptProjectName } from '../prompts/index.js';
import { ExtensionGenerator } from '../generators/extension.js';
import {
  validateProjectName,
  validateDirectory,
  error,
  success,
  newLine,
  banner,
} from '../utils/index.js';
import type { CreateOptions, ProjectConfig } from '../types/index.js';

export function createCommand(): Command {
  const cmd = new Command('create')
    .description('Create a new Chrome extension project')
    .argument('[project-name]', 'Name of the extension project')
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
  };

  newLine();
  banner(`🚀 Creating Vextro Chrome Extension "${config.name}"...`);
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
  success(`Vextro project "${config.name}" created successfully! 🎉`);
  newLine();
  console.log('Next steps:');
  console.log(`  cd ${config.name}`);
  console.log('  npm run dev');
  newLine();
  console.log('Happy coding! 🚀');
  newLine();
}
