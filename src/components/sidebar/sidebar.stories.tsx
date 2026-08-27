import type { Meta, StoryObj } from '@storybook/react-vite';

import { Sidebar, type SidebarItem } from './sidebar';

const meta = {
  title: 'interactive/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const items: SidebarItem[] = [
  { value: 'wall', label: 'Mural', icon: 'home' },
  { value: 'favorites', label: 'Favoritos', icon: 'heart' },
  { value: 'notices', label: 'Avisos', icon: 'bell', badgeCount: 3 },
  { value: 'profile', label: 'Perfil', icon: 'user' },
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
