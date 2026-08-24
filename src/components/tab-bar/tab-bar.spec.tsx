import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TabBar } from './tab-bar';

const items = [
  { value: 'wall', label: 'Mural', icon: <span /> },
  { value: 'favorites', label: 'Favoritos', icon: <span /> },
  { value: 'publish', label: 'Publicar', icon: '+', isPublish: true },
  { value: 'notices', label: 'Avisos', icon: <span />, badgeCount: 3 },
  { value: 'profile', label: 'Perfil', icon: <span /> },
];

describe('TabBar', () => {
  it('renders every root and the badge count', () => {
    render(<TabBar items={items} activeValue="wall" />);

    expect(screen.getByText('Mural')).toBeInTheDocument();
    expect(screen.getByText('Publicar')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
