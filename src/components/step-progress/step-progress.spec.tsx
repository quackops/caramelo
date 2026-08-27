import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StepProgress } from './step-progress';

describe('StepProgress', () => {
  it('exposes progressbar semantics', () => {
    render(<StepProgress total={5} current={3} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '3');
    expect(bar).toHaveAttribute('aria-valuemax', '5');
  });

  it('renders the label when provided', () => {
    render(<StepProgress total={5} current={3} label="Passo 3 de 5 · Saúde" />);
    expect(screen.getByText('Passo 3 de 5 · Saúde')).toBeInTheDocument();
  });
});
