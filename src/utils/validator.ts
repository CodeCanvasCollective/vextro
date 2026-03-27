import { VALID_PROJECT_NAME } from '../constants.js';
import { directoryExists } from './file.js';

export function validateProjectName(name: string): string | true {
  if (!name || name.trim().length === 0) {
    return 'Project name is required.';
  }

  if (!VALID_PROJECT_NAME.test(name)) {
    return 'Project name must be a valid npm package name (lowercase, no spaces, can use hyphens and dots).';
  }

  if (name.length > 214) {
    return 'Project name must be less than 214 characters.';
  }

  return true;
}

export async function validateDirectory(dirPath: string): Promise<string | true> {
  if (await directoryExists(dirPath)) {
    return `Directory "${dirPath}" already exists. Use --force to overwrite.`;
  }
  return true;
}

export function checkNodeVersion(minMajor: number = 20): string | true {
  const version = process.version;
  const major = parseInt(version.slice(1).split('.')[0], 10);

  if (major < minMajor) {
    return `Node.js ${minMajor}+ is required. You are using ${version}.`;
  }

  return true;
}
