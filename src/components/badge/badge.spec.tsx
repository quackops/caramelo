import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Badge } from './badge';

describe('Badge', () => {
  it('renders the verified label with its icon', () => {
    render(<Badge variant="verified" />);
    expect(screen.getByText(/✓ ONG VERIFICADA/)).toBeInTheDocument();
  });

  it('renders a custom label', () => {
    render(<Badge variant="new" label="RECÉM CHEGADO" />);
    expect(screen.getByText('RECÉM CHEGADO')).toBeInTheDocument();
  });
});
