import inquirer from 'inquirer';
import { DEFAULT_PROJECT_NAME, BROWSERS } from '../constants.js';
import { validateProjectName } from '../utils/index.js';
import type { BrowserTarget } from '../types/index.js';

export async function promptProjectName(): Promise<string> {
  const { projectName } = await inquirer.prompt([
    {
      name: 'projectName',
      message: 'Enter your extension project name:',
      default: DEFAULT_PROJECT_NAME,
      validate: (input: string) => {
        const result = validateProjectName(input);
        return result === true ? true : result;
      },
    },
  ]);
  return projectName;
}

export async function promptBrowser(): Promise<BrowserTarget> {
  const { browser } = await inquirer.prompt([
    {
      type: 'list',
      name: 'browser',
      message: 'Select target browser:',
      choices: Object.entries(BROWSERS).map(([value, meta]) => ({
        name: `${meta.displayName} — ${meta.description}`,
        value,
      })),
      default: 'chrome',
    },
  ]);
  return browser;
}
