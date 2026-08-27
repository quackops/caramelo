import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AmountOption } from './amount-option';

const renderGroup = () =>
  render(
    <AmountOption.Group label="Escolha um valor">
      <AmountOption amountLabel="R$ 10" value="1000" />
      <AmountOption
        amountLabel="R$ 25"
        equivalence="1 semana de ração"
        value="2500"
        defaultChecked
      />
      <AmountOption amountLabel="R$ 50" value="5000" />
    </AmountOption.Group>,
  );

describe('AmountOption', () => {
  it('renders each preset as a radio named by its amount', () => {
    renderGroup();
    expect(screen.getByRole('radio', { name: /R\$ 25/ })).toBeChecked();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('renders the equivalence line the org defined', () => {
    renderGroup();
    expect(screen.getByText('1 semana de ração')).toBeInTheDocument();
  });

  it('centres the amount when there is no equivalence to show', () => {
    const { container } = render(<AmountOption amountLabel="R$ 10" />);
    expect(container.querySelectorAll('span')).toHaveLength(1);
  });

  it('shares one generated name across the group', () => {
    renderGroup();
    const names = screen
      .getAllByRole('radio')
      .map((radio) => radio.getAttribute('name'));

    expect(new Set(names).size).toBe(1);
  });

  it('selects a single preset at a time', () => {
    renderGroup();
    const fifty = screen.getByRole('radio', { name: /R\$ 50/ });

    fireEvent.click(fifty);
    expect(fifty).toBeChecked();
    expect(screen.getByRole('radio', { name: /R\$ 25/ })).not.toBeChecked();
  });

  it('lays out cleanly beside a non-tile child', () => {
    render(
      <AmountOption.Group columns={2}>
        <AmountOption amountLabel="R$ 10" value="1000" />
        <input aria-label="Outro valor" onChange={vi.fn()} />
      </AmountOption.Group>,
    );

    expect(screen.getByLabelText('Outro valor')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(1);
  });

  it('uses the dark brand tint rather than the brand fill', () => {
    const { container } = render(<AmountOption amountLabel="R$ 10" />);
    expect(container.firstElementChild).toHaveClass(
      'has-[:checked]:bg-caramelo-4',
    );
  });
});
