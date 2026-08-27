import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { TriStateGroup } from './tri-state-group';

const meta = {
  title: 'forms/TriStateGroup',
  component: TriStateGroup,
  parameters: {
    layout: 'centered',
  },
  args: { onChange: fn() },
} satisfies Meta<typeof TriStateGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Yes: Story = {
  args: { label: 'Castrada', value: true },
};

export const No: Story = {
  args: { label: 'Vacinada', value: false },
};

export const Unknown: Story = {
  args: { label: 'Vermifugada', value: null },
};
