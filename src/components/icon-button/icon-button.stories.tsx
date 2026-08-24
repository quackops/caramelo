import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { IconButton } from './icon-button';

const meta = {
  title: 'interactive/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  args: { onClick: fn() },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'aria-label': 'Favorite',
    children: <span>♡</span>,
  },
};

export const Active: Story = {
  args: {
    'aria-label': 'Favorite',
    active: true,
    children: <span>♡</span>,
  },
};
