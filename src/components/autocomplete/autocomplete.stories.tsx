import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Autocomplete, type AutocompleteProps } from './autocomplete';

const meta = {
  title: 'interactive/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360, paddingBottom: 260 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

const Stateful = ({ value: initial, options, ...props }: AutocompleteProps) => {
  const [value, setValue] = useState(initial);

  return (
    <Autocomplete
      {...props}
      value={value}
      options={options}
      onQueryChange={setValue}
      onSelect={(option) => setValue(option.label)}
    />
  );
};

export const City: Story = {
  args: {
    label: 'Sua cidade',
    placeholder: 'Comece a digitar',
    value: 'sal',
    options: [
      { value: 'ssa', label: 'Salvador, BA' },
      { value: 'lauro', label: 'Lauro de Freitas, BA' },
      { value: 'camacari', label: 'Camaçari, BA' },
    ],
    onQueryChange: () => {},
    onSelect: () => {},
  },
  render: (args) => <Stateful {...args} />,
};

export const SearchSuggestions: Story = {
  args: {
    variant: 'search',
    placeholder: 'Buscar no mural',
    value: 'gato fil',
    options: [
      { value: 'gato-filhote', label: 'gato filhote', count: 18 },
      { value: 'gato-fila-azul', label: 'gato fila azul', count: 2 },
    ],
    onQueryChange: () => {},
    onSelect: () => {},
  },
  render: (args) => <Stateful {...args} />,
};

export const Neighbourhood: Story = {
  args: {
    label: 'Bairro',
    value: 'pit',
    options: [
      {
        value: 'pituba',
        label: 'Pituba',
        description: 'Salvador — BA',
      },
      {
        value: 'pitangueiras',
        label: 'Pitangueiras',
        description: 'Lauro de Freitas — BA',
      },
    ],
    onQueryChange: () => {},
    onSelect: () => {},
  },
  render: (args) => <Stateful {...args} />,
};

export const Loading: Story = {
  args: {
    label: 'Sua cidade',
    value: 'sal',
    options: [],
    loading: true,
    onQueryChange: () => {},
    onSelect: () => {},
  },
  render: (args) => <Stateful {...args} />,
};

export const Empty: Story = {
  args: {
    label: 'Sua cidade',
    value: 'zzz',
    options: [],
    emptyLabel: 'Nenhuma cidade encontrada',
    onQueryChange: () => {},
    onSelect: () => {},
  },
  render: (args) => <Stateful {...args} />,
};
