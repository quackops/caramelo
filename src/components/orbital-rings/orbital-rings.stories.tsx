import type { Meta, StoryObj } from '@storybook/react-vite';

import { Icon } from '../icon/icon';
import { OrbitalRings } from './orbital-rings';

const meta = {
  title: 'brand/OrbitalRings',
  component: OrbitalRings,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof OrbitalRings>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAMark: Story = {
  args: {
    children: (
      <span className="flex size-[60px] items-center justify-center rounded-2xl bg-caramelo-4 text-on-brand-inverse">
        <Icon name="heart" size={28} />
      </span>
    ),
  },
};

export const Animated: Story = {
  args: {
    animated: true,
    children: (
      <span className="flex size-[60px] items-center justify-center rounded-2xl bg-caramelo-4 text-on-brand-inverse">
        <Icon name="search" size={28} />
      </span>
    ),
  },
};

export const Splash: Story = {
  args: {
    size: 220,
    animated: true,
    children: (
      <span className="font-poppins text-title font-semibold text-neutral">
        pawee
      </span>
    ),
  },
};

export const InlineEmptyState: Story = {
  args: {
    size: 110,
    children: (
      <span className="flex size-[52px] items-center justify-center rounded-2xl bg-caramelo-4 text-on-brand-inverse">
        <Icon name="filter" size={22} />
      </span>
    ),
  },
};
