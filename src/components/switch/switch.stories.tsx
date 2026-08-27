import type { Meta, StoryObj } from '@storybook/react-vite';

import { Switch } from './switch';

const meta = {
  title: 'interactive/Switch',
  component: Switch,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const On: Story = {
  args: {
    id: 'switch-on',
    checked: true,
    readOnly: true,
  },
};

export const Off: Story = {
  args: {
    id: 'switch-off',
    checked: false,
    readOnly: true,
  },
};
