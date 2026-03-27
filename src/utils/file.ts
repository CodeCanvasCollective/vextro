import path from 'node:path';
import fs from 'fs-extra';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getTemplatesDir(): string {
  // When bundled with tsup, __dirname is dist/ → go up 1 level to project root
  // When running unbundled (vitest), __dirname is src/utils/ → go up 2 levels to project root
  const isBundled =
    __dirname.replace(/\\/g, '/').endsWith('/dist') ||
    __dirname.replace(/\\/g, '/').includes('/dist/');
  const projectRoot = isBundled
    ? path.resolve(__dirname, '..')
    : path.resolve(__dirname, '..', '..');
  return path.resolve(projectRoot, 'extension-structure');
}

export async function createDir(dirPath: string): Promise<void> {
  await fs.ensureDir(dirPath);
}

export async function directoryExists(dirPath: string): Promise<boolean> {
  try {
    const stat = await fs.stat(dirPath);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    const stat = await fs.stat(filePath);
    return stat.isFile();
  } catch {
    return false;
  }
}
