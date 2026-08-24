import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Chip } from './chip';

const meta = {
  title: 'interactive/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Cães',
  },
};

export const Selected: Story = {
  args: {
    variant: 'selected',
    children: 'Gatos',
  },
};

export const WithCounter: Story = {
  args: {
    children: 'Filtros',
    count: 2,
  },
};

export const Disabled: Story = {
  args: {
    variant: 'disabled',
    children: 'Indisponível',
  },
};
