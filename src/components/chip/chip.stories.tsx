import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

import { Chip } from './chip';

const meta = {
  title: 'interactive/Chip',
  component: Chip,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

const toggleRender: Story['render'] = (args) => {
  const [{ variant }, updateArgs] = useArgs();
  return (
    <Chip
      {...args}
      variant={variant}
      onClick={() =>
        updateArgs({ variant: variant === 'selected' ? 'default' : 'selected' })
      }
    />
  );
};

export const Default: Story = {
  render: toggleRender,
  args: {
    children: 'Cães',
  },
};

export const Selected: Story = {
  render: toggleRender,
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
