import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Fab } from './fab';

const meta = {
  title: 'interactive/Fab',
  component: Fab,
  parameters: {
    layout: 'centered',
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Fab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'aria-label': 'Publicar',
    children: '+',
  },
};
