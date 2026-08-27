import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

import { Switch } from './switch';

const meta = {
  title: 'interactive/Switch',
  component: Switch,
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => {
    const [{ checked }, updateArgs] = useArgs();
    return (
      <Switch
        {...args}
        checked={checked}
        onChange={(event) => updateArgs({ checked: event.target.checked })}
      />
    );
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const On: Story = {
  args: {
    id: 'switch-on',
    checked: true,
  },
};

export const Off: Story = {
  args: {
    id: 'switch-off',
    checked: false,
  },
};
