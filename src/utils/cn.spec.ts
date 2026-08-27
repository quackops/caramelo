import { describe, expect, it } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('keeps a named type step alongside a text colour', () => {
    expect(cn('text-micro', 'text-neutral-3')).toBe(
      'text-micro text-neutral-3',
    );
  });

  it('lets a named type step override the default scale', () => {
    expect(cn('text-base', 'text-caption')).toBe('text-caption');
  });

  it('still resolves colour conflicts', () => {
    expect(cn('text-neutral', 'text-neutral-3')).toBe('text-neutral-3');
  });

  it('still resolves conflicts inside the default scale', () => {
    expect(cn('text-sm', 'text-lg')).toBe('text-lg');
  });
});
