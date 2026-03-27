import { describe, it, expect } from 'vitest';
import { validateProjectName, checkNodeVersion } from '../../src/utils/validator';

describe('validateProjectName', () => {
  it('should accept valid npm names', () => {
    expect(validateProjectName('my-extension')).toBe(true);
    expect(validateProjectName('my.extension')).toBe(true);
    expect(validateProjectName('ext123')).toBe(true);
    expect(validateProjectName('@scope/my-ext')).toBe(true);
  });

  it('should reject empty names', () => {
    expect(validateProjectName('')).toBe('Project name is required.');
    expect(validateProjectName('   ')).toBe('Project name is required.');
  });

  it('should reject names with spaces', () => {
    const result = validateProjectName('my extension');
    expect(result).toContain('valid npm package name');
  });

  it('should reject names with uppercase', () => {
    const result = validateProjectName('MyExtension');
    expect(result).toContain('valid npm package name');
  });

  it('should reject names exceeding 214 characters', () => {
    const longName = 'a'.repeat(215);
    expect(validateProjectName(longName)).toContain('less than 214');
  });
});

describe('checkNodeVersion', () => {
  it('should validate current node version', () => {
    const result = checkNodeVersion(1);
    expect(result).toBe(true);
  });

  it('should fail for impossibly high version', () => {
    const result = checkNodeVersion(999);
    expect(result).toContain('is required');
  });
});
