import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Select } from './select';

describe('Select', () => {
  it('renders a labelled select with options', () => {
    render(
      <Select id="porte" label="Porte" defaultValue="medio">
        <option value="pequeno">Pequeno</option>
        <option value="medio">Médio</option>
        <option value="grande">Grande</option>
      </Select>,
    );

    expect(screen.getByLabelText('Porte')).toHaveValue('medio');
  });

  it('turns the label into the accessible name in the ghost variant', () => {
    render(
      <Select variant="ghost" label="Cidade" defaultValue="ssa">
        <option value="ssa">Salvador, BA</option>
        <option value="sp">São Paulo, SP</option>
      </Select>,
    );

    const select = screen.getByLabelText('Cidade');
    expect(select).toHaveValue('ssa');
    expect(screen.queryByText('Cidade')).not.toBeInTheDocument();
  });

  it('drops the field chrome in the ghost variant', () => {
    render(
      <Select variant="ghost" label="Cidade">
        <option value="ssa">Salvador, BA</option>
      </Select>,
    );

    const select = screen.getByLabelText('Cidade');
    expect(select).toHaveClass('bg-transparent', 'border-none');
    expect(select).not.toHaveClass('h-13');
  });

  it('keeps the option colour workaround on both variants', () => {
    const { container } = render(
      <Select variant="ghost" label="Cidade">
        <option value="ssa">Salvador, BA</option>
      </Select>,
    );

    expect(container.querySelector('select')).toHaveClass(
      '[&_option]:bg-surface',
    );
  });
});
