import type { Meta, StoryObj } from '@storybook/react-vite';

import { Sidebar } from './sidebar';

const meta = {
  title: 'interactive/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { value: 'wall', label: 'Mural', icon: <span>🏠</span> },
  { value: 'favorites', label: 'Favoritos', icon: <span>♡</span> },
  { value: 'notices', label: 'Avisos', icon: <span>🔔</span>, badgeCount: 3 },
  { value: 'profile', label: 'Perfil', icon: <span>👤</span> },
];

export const Default: Story = {
  args: {
    logo: { mark: 'C', name: 'pawee' },
    items,
    activeValue: 'wall',
  },
};

export const Collapsed: Story = {
  args: {
    logo: { mark: 'C', name: 'pawee' },
    items,
    activeValue: 'wall',
    collapsed: true,
  },
};
