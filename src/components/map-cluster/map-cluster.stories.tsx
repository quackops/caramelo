import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { MapCluster } from './map-cluster';

const meta = {
  title: 'brand/MapCluster',
  component: MapCluster,
  parameters: {
    layout: 'centered',
  },
  args: { onClick: fn() },
} satisfies Meta<typeof MapCluster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: { count: 4, label: '4 bichos nesta área' },
};

export const Large: Story = {
  args: { count: 128, label: '128 bichos nesta área' },
};
