import { Command } from 'commander';
import { createCommand } from './commands/create.js';
import { setVerbose } from './utils/logger.js';
import pkg from '../package.json' with { type: 'json' };

const CLI_VERSION = pkg.version || '0.1.0';

export function createCli(): Command {
  const program = new Command();

  program
    .name('create-vextro')
    .description('Scaffold modern browser extensions with Vite + React + Tailwind')
    .version(CLI_VERSION)
    .option('--verbose', 'Enable verbose output')
    .hook('preAction', (thisCommand) => {
      const opts = thisCommand.opts();
      if (opts.verbose) {
        setVerbose(true);
      }
    });

  program.addCommand(createCommand(), { isDefault: true });

  return program;
}
