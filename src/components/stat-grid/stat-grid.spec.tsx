import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { StatGrid } from './stat-grid';

const listingSpec = [
  { label: 'Sexo', value: 'Fêmea' },
  { label: 'Idade', value: '2 anos' },
  { label: 'Porte', value: 'Médio' },
  { label: 'Peso', value: '12 kg' },
];

describe('StatGrid', () => {
  it('exposes an inert grid as a description list', () => {
    const { container } = render(<StatGrid items={listingSpec} columns={4} />);

    expect(container.querySelector('dl')).toBeInTheDocument();
    expect(container.querySelectorAll('dt')).toHaveLength(4);
    expect(container.querySelectorAll('dd')).toHaveLength(4);
  });

  it('renders each pair', () => {
    render(<StatGrid items={listingSpec} columns={4} />);

    expect(screen.getByText('Sexo')).toBeInTheDocument();
    expect(screen.getByText('Fêmea')).toBeInTheDocument();
  });

  it('puts the label above the value when asked', () => {
    const { container } = render(
      <StatGrid items={listingSpec} columns={4} order="label-first" />,
    );
    const cell = container.querySelector('dl > div');

    expect(cell?.firstElementChild?.tagName).toBe('DT');
  });

  it('puts the value above the label by default', () => {
    const { container } = render(<StatGrid items={listingSpec} columns={4} />);
    const cell = container.querySelector('dl > div');

    expect(cell?.querySelector('dd')).toHaveClass('order-1');
    expect(cell?.querySelector('dt')).toHaveClass('order-2');
  });

  it('drops the tile surface in the inline variant', () => {
    const { container } = render(
      <StatGrid items={listingSpec} variant="inline" columns={4} />,
    );

    expect(container.querySelector('dl')).toHaveClass('divide-x');
    expect(container.querySelector('dl > div')).not.toHaveClass('bg-surface');
  });

  it('turns a cell into a button when it links somewhere', () => {
    const onClick = vi.fn();
    render(
      <StatGrid
        items={[
          { label: 'Anúncios', value: 2, onClick },
          { label: 'Candidaturas', value: 1 },
        ]}
        columns={2}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /Anúncios 2/ }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('wraps to fewer columns rather than shrinking the type', () => {
    const { container } = render(<StatGrid items={listingSpec} columns={4} />);
    expect(container.querySelector('dl')).toHaveClass(
      'grid-cols-2',
      'sm:grid-cols-4',
    );
  });
});
