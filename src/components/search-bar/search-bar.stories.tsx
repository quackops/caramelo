import type { Meta, StoryObj } from '@storybook/react-vite';

import { SearchBar } from './search-bar';

const meta = {
  title: 'interactive/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Buscar por nome, raça ou bairro',
    value: '',
    readOnly: true,
  },
};

export const Focused: Story = {
  args: {
    value: 'poodle',
    focused: true,
    readOnly: true,
  },
};
