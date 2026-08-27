import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ActionList } from './action-list';

const reasons = [
  { id: 'perfil', label: 'O perfil não combina' },
  { id: 'outro', label: 'Já escolhi outro lar' },
  { id: 'sem-resposta', label: 'Não tive resposta' },
];

describe('ActionList', () => {
  it('renders every choice as a button', () => {
    render(<ActionList items={reasons} onSelect={vi.fn()} />);
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('answers in one tap, with no confirm step', () => {
    const onSelect = vi.fn();
    render(<ActionList items={reasons} onSelect={onSelect} />);

    fireEvent.click(
      screen.getByRole('button', { name: 'Já escolhi outro lar' }),
    );
    expect(onSelect).toHaveBeenCalledExactlyOnceWith('outro');
  });

  it('leaves dismissing the sheet to the consumer', () => {
    const onSelect = vi.fn();
    const { container } = render(
      <ActionList items={reasons} onSelect={onSelect} />,
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'O perfil não combina' }),
    );
    expect(container.querySelectorAll('button')).toHaveLength(3);
  });

  it('renders a description under the label', () => {
    render(
      <ActionList
        items={[
          {
            id: 'aqui',
            label: 'Foi por aqui',
            description: 'A adoção aconteceu pela Pawee',
          },
        ]}
        onSelect={vi.fn()}
      />,
    );

    expect(
      screen.getByText('A adoção aconteceu pela Pawee'),
    ).toBeInTheDocument();
  });

  it('colours a destructive choice', () => {
    render(
      <ActionList
        items={[
          { id: 'excluir', label: 'Excluir anúncio', tone: 'destructive' },
        ]}
        onSelect={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: 'Excluir anúncio' })).toHaveClass(
      'text-danger',
    );
  });

  it('shares the row metrics with ListRow', () => {
    render(<ActionList items={reasons} onSelect={vi.fn()} />);
    expect(screen.getAllByRole('button')[0]).toHaveClass('min-h-13', 'px-16');
  });

  it('lets a long choice wrap rather than truncate', () => {
    render(<ActionList items={reasons} onSelect={vi.fn()} />);
    expect(screen.getAllByRole('button')[0].className).not.toMatch(
      /truncate|whitespace-nowrap/,
    );
  });
});
