export type BrowserTarget = 'chrome' | 'firefox';

export interface CreateOptions {
  force?: boolean;
  chrome?: boolean;
  firefox?: boolean;
}

export interface ProjectConfig {
  name: string;
  targetDir: string;
  browser: BrowserTarget;
}
