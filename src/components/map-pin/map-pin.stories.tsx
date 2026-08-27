import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { MapPin } from './map-pin';

const meta = {
  title: 'brand/MapPin',
  component: MapPin,
  parameters: {
    layout: 'centered',
  },
  args: { onClick: fn() },
} satisfies Meta<typeof MapPin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Approximate: Story = {
  args: { label: 'Nina · aproximadamente em Pituba' },
};

export const VerifiedOrg: Story = {
  args: { tone: 'verified', label: 'ONG Amidogo · endereço público' },
};

export const Selected: Story = {
  args: { selected: true, label: 'Nina · aproximadamente em Pituba' },
};

export const WithThumbnail: Story = {
  args: {
    label: 'Nina · aproximadamente em Pituba',
    thumbnail: <span className="block size-full bg-caramelo-7" />,
  },
};
