import chalk from 'chalk';
import ora, { type Ora } from 'ora';

let verbose = false;

export function setVerbose(value: boolean): void {
  verbose = value;
}

export function info(message: string): void {
  console.log(chalk.blue('ℹ'), message);
}

export function success(message: string): void {
  console.log(chalk.green('✔'), message);
}

export function warn(message: string): void {
  console.log(chalk.yellow('⚠'), message);
}

export function error(message: string): void {
  console.log(chalk.red('✖'), message);
}

export function debug(message: string): void {
  if (verbose) {
    console.log(chalk.gray('⬥'), chalk.gray(message));
  }
}

export function spinner(text: string): Ora {
  return ora({ text, color: 'cyan' });
}

export function newLine(): void {
  console.log();
}

export function banner(text: string): void {
  console.log(chalk.bold.cyan(text));
}
