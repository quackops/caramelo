import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

import { SearchBar } from './search-bar';

const meta = {
  title: 'interactive/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => {
    const [{ value }, updateArgs] = useArgs();
    return (
      <SearchBar
        {...args}
        value={value}
        onChange={(event) => updateArgs({ value: event.target.value })}
        onClear={() => updateArgs({ value: '' })}
      />
    );
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Buscar por nome, raça ou bairro',
    value: '',
  },
};

export const Focused: Story = {
  args: {
    value: 'poodle',
    focused: true,
  },
};
