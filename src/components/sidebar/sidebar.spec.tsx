import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Sidebar } from './sidebar';

const items = [
  { value: 'wall', label: 'Mural', icon: <span /> },
  { value: 'favorites', label: 'Favoritos', icon: <span /> },
  { value: 'notices', label: 'Avisos', icon: <span />, badgeCount: 3 },
  { value: 'profile', label: 'Perfil', icon: <span /> },
];

describe('Sidebar', () => {
  it('renders the logo, items and publish button', () => {
    render(
      <Sidebar
        logo={{ mark: 'C', name: 'pawee' }}
        items={items}
        activeValue="wall"
      />,
    );

    expect(screen.getByText('pawee')).toBeInTheDocument();
    expect(screen.getByText('Mural')).toBeInTheDocument();
    expect(screen.getByText('Publicar')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('hides labels when collapsed', () => {
    render(
      <Sidebar
        logo={{ mark: 'C', name: 'pawee' }}
        items={items}
        activeValue="wall"
        collapsed
      />,
    );

    expect(screen.queryByText('Mural')).not.toBeInTheDocument();
  });
});
