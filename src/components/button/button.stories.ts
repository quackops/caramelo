import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Button } from './button';

const meta = {
  title: 'interactive/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const OnBrand: Story = {
  args: {
    variant: 'on-brand',
    children: 'Button',
  },
  globals: {
    backgrounds: { value: 'brand' },
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large Button',
  },
};
