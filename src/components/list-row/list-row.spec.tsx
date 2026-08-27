import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ListRow } from './list-row';

describe('ListRow', () => {
  it('renders a plain row when it is not tappable', () => {
    render(<ListRow title="Minhas candidaturas" />);

    expect(screen.getByText('Minhas candidaturas')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('becomes a button when it is tappable', () => {
    const onClick = vi.fn();
    render(<ListRow title="Meus anúncios" onClick={onClick} />);

    fireEvent.click(screen.getByRole('button', { name: /Meus anúncios/ }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('renders as a link through the as slot', () => {
    render(<ListRow as="a" href="/anuncios" title="Meus anúncios" />);
    expect(
      screen.getByRole('link', { name: /Meus anúncios/ }),
    ).toBeInTheDocument();
  });

  it('renders a leading glyph', () => {
    const { container } = render(
      <ListRow title="Virar uma ONG verificada" icon="shield" />,
    );
    expect(container.querySelector('svg')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });

  it('renders a plain trailing count', () => {
    render(<ListRow title="gato filhote" icon="search" count={18} />);
    expect(screen.getByText('18')).toBeInTheDocument();
  });

  it('renders the filled badge count', () => {
    render(<ListRow title="Meus anúncios" badgeCount={2} chevron />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders an arbitrary trailing node', () => {
    render(
      <ListRow
        title="cachorro porte pequeno"
        icon="clock"
        trailing={<button type="button">Remover</button>}
      />,
    );
    expect(screen.getByRole('button', { name: 'Remover' })).toBeInTheDocument();
  });

  it('hides the chevron from assistive tech', () => {
    const { container } = render(<ListRow title="Meus anúncios" chevron />);
    const glyphs = container.querySelectorAll('svg');

    expect(glyphs).toHaveLength(1);
    expect(glyphs[0]).toHaveAttribute('aria-hidden', 'true');
  });

  it('stacks rows with a hairline between them', () => {
    const { container } = render(
      <ListRow.Group>
        <ListRow title="Meus anúncios" chevron />
        <ListRow title="Minhas candidaturas" chevron />
      </ListRow.Group>,
    );

    expect(container.firstElementChild).toHaveClass(
      'divide-y',
      'divide-gray-4',
    );
  });
});
