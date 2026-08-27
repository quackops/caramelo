import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { TabBarItem } from './tab-bar';
import { TabBar } from './tab-bar';

const items: TabBarItem[] = [
  { value: 'wall', label: 'Mural', icon: 'home' },
  { value: 'favorites', label: 'Favoritos', icon: 'heart' },
  { value: 'publish', label: 'Publicar', icon: 'plus', isPublish: true },
  { value: 'notices', label: 'Avisos', icon: 'bell', badgeCount: 3 },
  { value: 'profile', label: 'Perfil', icon: 'user' },
];

describe('TabBar', () => {
  it('renders every root and the badge count', () => {
    render(<TabBar items={items} activeValue="wall" />);

    expect(screen.getByText('Mural')).toBeInTheDocument();
    expect(screen.getByText('Publicar')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
