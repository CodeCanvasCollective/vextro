import inquirer from 'inquirer';
import { DEFAULT_PROJECT_NAME } from '../constants.js';
import { validateProjectName } from '../utils/index.js';

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
