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
      { value: 'wall', label: 'Mural', icon: <span>🏠</span> },
      { value: 'favorites', label: 'Favoritos', icon: <span>♡</span> },
      { value: 'publish', label: 'Publicar', icon: '+', isPublish: true },
      {
        value: 'notices',
        label: 'Avisos',
        icon: <span>🔔</span>,
        badgeCount: 3,
      },
      { value: 'profile', label: 'Perfil', icon: <span>👤</span> },
    ],
  },
};
