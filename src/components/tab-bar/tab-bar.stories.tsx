import type { Meta, StoryObj } from '@storybook/react-vite';

import { TabBar } from './tab-bar';

const meta = {
  title: 'interactive/TabBar',
  component: TabBar,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeValue: 'wall',
    items: [
      { value: 'wall', label: 'Mural', icon: 'home' },
      { value: 'favorites', label: 'Favoritos', icon: 'heart' },
      { value: 'publish', label: 'Publicar', icon: 'plus', isPublish: true },
      { value: 'notices', label: 'Avisos', icon: 'bell', badgeCount: 3 },
      { value: 'profile', label: 'Perfil', icon: 'user' },
    ],
  },
};
