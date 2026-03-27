import { describe, it, expect } from 'vitest';
import { createCli } from '../../src/cli';

describe('CLI', () => {
  it('should create a program with correct name', () => {
    const program = createCli();
    expect(program.name()).toBe('create-vextro');
  });

  it('should have version set', () => {
    const program = createCli();
    expect(program.version()).toBe('0.1.0');
  });

  it('should have the create command', () => {
    const program = createCli();
    const createCmd = program.commands.find((cmd) => cmd.name() === 'create');
    expect(createCmd).toBeDefined();
    expect(createCmd?.description()).toBe('Create a new Chrome extension project');
  });

  it('should have --verbose option', () => {
    const program = createCli();
    const verboseOpt = program.options.find((opt) => opt.long === '--verbose');
    expect(verboseOpt).toBeDefined();
  });
});
