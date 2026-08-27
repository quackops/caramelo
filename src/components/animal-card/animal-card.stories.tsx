import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { AnimalCard } from './animal-card';

const meta = {
  title: 'interactive/AnimalCard',
  component: AnimalCard,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 380 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AnimalCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const List: Story = {
  args: {
    name: 'Nina',
    badge: 'verified',
    details: 'SRD · 2 anos · médio',
    meta: 'Lar Tintin · 3,2 km',
    tags: ['castrada', 'vacinada', 'dócil'],
  },
};

export const ListWithFavourite: Story = {
  args: {
    name: 'Nina',
    badge: 'urgent',
    details: 'SRD · 2 anos · médio',
    meta: 'Lar Tintin · 3,2 km',
    onFavoriteToggle: fn(),
  },
};

export const Grid: Story = {
  args: {
    variant: 'grid',
    name: 'Bento',
    badge: 'new',
    meta: 'Pituba · 1,4 km',
    onFavoriteToggle: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 380 }} className="grid grid-cols-2 gap-3">
        <Story />
      </div>
    ),
  ],
};

export const GridFavourited: Story = {
  args: {
    variant: 'grid',
    name: 'Amora',
    meta: 'Itapuã · 6,2 km',
    favorited: true,
    onFavoriteToggle: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 380 }} className="grid grid-cols-2 gap-3">
        <Story />
      </div>
    ),
  ],
};

export const Unavailable: Story = {
  args: {
    name: 'Tofu',
    details: 'SRD · 4 anos · grande',
    meta: 'Lar Tintin · 3,2 km',
    unavailable: true,
    onFavoriteToggle: fn(),
  },
};

export const UnavailableGrid: Story = {
  args: {
    variant: 'grid',
    name: 'Tofu',
    meta: 'Lar Tintin · 3,2 km',
    unavailable: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 380 }} className="grid grid-cols-2 gap-3">
        <Story />
      </div>
    ),
  ],
};

export const Loading: Story = {
  args: { name: '', loading: true },
  render: (args) => (
    <div className="flex flex-col gap-3">
      <AnimalCard {...args} />
      <AnimalCard {...args} className="opacity-75" />
      <AnimalCard {...args} className="opacity-50" />
      <AnimalCard {...args} className="opacity-25" />
    </div>
  ),
};

export const LoadingGrid: Story = {
  args: { name: '', variant: 'grid', loading: true },
  decorators: [
    (Story) => (
      <div style={{ width: 380 }} className="grid grid-cols-2 gap-3">
        <Story />
      </div>
    ),
  ],
};
