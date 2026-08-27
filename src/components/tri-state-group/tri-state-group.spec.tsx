import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TriStateGroup } from './tri-state-group';

describe('TriStateGroup', () => {
  it('renders three radios with the label', () => {
    render(<TriStateGroup label="Castrada" value={null} onChange={vi.fn()} />);
    expect(screen.getAllByRole('radio')).toHaveLength(3);
    expect(
      screen.getByRole('radiogroup', { name: 'Castrada' }),
    ).toBeInTheDocument();
  });

  it('marks the matching option as checked', () => {
    render(<TriStateGroup label="Castrada" value={true} onChange={vi.fn()} />);
    expect(screen.getByRole('radio', { name: /Sim/ })).toBeChecked();
  });

  it('calls onChange with the clicked value', () => {
    const onChange = vi.fn();
    render(<TriStateGroup label="Castrada" value={null} onChange={onChange} />);
    fireEvent.click(screen.getByRole('radio', { name: 'Não' }));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('shows a glyph on the selected yes/no option', () => {
    render(<TriStateGroup label="Castrada" value={true} onChange={vi.fn()} />);
    expect(screen.getByText('✓')).toBeInTheDocument();
  });
});
