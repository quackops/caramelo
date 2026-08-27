import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ChipGroup } from './chip-group';

const options = [
  { value: 'cao', label: 'Cão' },
  { value: 'gato', label: 'Gato' },
  { value: 'outro', label: 'Outro' },
];

describe('ChipGroup', () => {
  it('exposes multiple selection as pressed toggles', () => {
    render(
      <ChipGroup
        label="Espécie"
        options={options}
        value={['cao']}
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByRole('group', { name: 'Espécie' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cão' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('adds and removes values in multiple mode', () => {
    const onChange = vi.fn();
    render(<ChipGroup options={options} value={['cao']} onChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: 'Gato' }));
    expect(onChange).toHaveBeenCalledWith(['cao', 'gato']);

    fireEvent.click(screen.getByRole('button', { name: 'Cão' }));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('exposes single selection as a radiogroup', () => {
    render(
      <ChipGroup
        label="Sexo"
        selection="single"
        options={options}
        value={['gato']}
        onChange={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('radiogroup', { name: 'Sexo' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Gato' })).toBeChecked();
  });

  it('never returns more than one value in single mode', () => {
    const onChange = vi.fn();
    render(
      <ChipGroup
        selection="single"
        options={options}
        value={['cao']}
        onChange={onChange}
      />,
    );

    fireEvent.click(screen.getByRole('radio', { name: 'Outro' }));
    expect(onChange).toHaveBeenCalledWith(['outro']);
  });

  it('moves the single selection with the arrow keys', () => {
    const onChange = vi.fn();
    render(
      <ChipGroup
        label="Sexo"
        selection="single"
        options={options}
        value={['cao']}
        onChange={onChange}
      />,
    );

    fireEvent.keyDown(screen.getByRole('radiogroup'), { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith(['gato']);
  });

  it('wraps the roving selection around the ends', () => {
    const onChange = vi.fn();
    render(
      <ChipGroup
        label="Sexo"
        selection="single"
        options={options}
        value={['cao']}
        onChange={onChange}
      />,
    );

    fireEvent.keyDown(screen.getByRole('radiogroup'), { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenCalledWith(['outro']);
  });

  it('keeps a single roving tab stop', () => {
    render(
      <ChipGroup
        selection="single"
        options={options}
        value={['gato']}
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByRole('radio', { name: 'Gato' })).not.toHaveAttribute(
      'tabindex',
      '-1',
    );
    expect(screen.getByRole('radio', { name: 'Cão' })).toHaveAttribute(
      'tabindex',
      '-1',
    );
  });

  it('disables the unselected chips once the cap is reached', () => {
    const onChange = vi.fn();
    render(
      <ChipGroup
        label="Temperamento"
        hint="até 2"
        max={2}
        options={options}
        value={['cao', 'gato']}
        onChange={onChange}
      />,
    );

    const blocked = screen.getByRole('button', { name: 'Outro' });
    expect(blocked).toBeDisabled();
    fireEvent.click(blocked);
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByText(/até 2/)).toBeInTheDocument();
  });

  it('still allows deselecting once the cap is reached', () => {
    const onChange = vi.fn();
    render(
      <ChipGroup
        max={2}
        options={options}
        value={['cao', 'gato']}
        onChange={onChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Cão' }));
    expect(onChange).toHaveBeenCalledWith(['gato']);
  });
});
