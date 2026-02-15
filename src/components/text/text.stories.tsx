import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Text } from './text';

const meta = {
  title: 'display/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  args: {
    onClick: fn(),
    children: 'The quick brown fox jumps over the lazy dog',
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Polymorphic: Story = {
  args: {
    as: 'p',
  },
};

export const Small: Story = {
  args: {
    variant: 'small',
  },
};

export const Large: Story = {
  args: {
    variant: 'large',
  },
};

export const Heading: Story = {
  args: {
    variant: 'heading',
  },
};

export const BrandColor: Story = {
  args: {
    color: 'brand',
  },
};

export const MediumWeight: Story = {
  args: {
    weight: 'medium',
  },
};

export const SemiboldWeight: Story = {
  args: {
    weight: 'semibold',
  },
};

export const BoldWeight: Story = {
  args: {
    weight: 'bold',
  },
};
