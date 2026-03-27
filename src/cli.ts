import { Command } from 'commander';
import { createCommand } from './commands/create.js';
import { setVerbose } from './utils/logger.js';

export function createCli(): Command {
  const program = new Command();

  program
    .name('create-vextro')
    .description('Scaffold modern Chrome extensions with Vite + React + Tailwind')
    .version('0.1.0')
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
