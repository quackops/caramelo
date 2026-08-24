import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Switch } from './switch';

describe('Switch', () => {
  it('renders a switch role', () => {
    render(<Switch id="castrado" checked readOnly />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('renders unchecked by default', () => {
    render(<Switch id="castrado-off" readOnly />);
    expect(screen.getByRole('switch')).not.toBeChecked();
  });
});
