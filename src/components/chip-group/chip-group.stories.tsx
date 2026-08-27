import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { ChipGroup, type ChipGroupProps } from './chip-group';

const meta = {
  title: 'interactive/ChipGroup',
  component: ChipGroup,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChipGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const Stateful = ({ value: initial, ...props }: ChipGroupProps) => {
  const [value, setValue] = useState(initial);

  return <ChipGroup {...props} value={value} onChange={setValue} />;
};

const species = [
  { value: 'cao', label: 'Cão', count: 128 },
  { value: 'gato', label: 'Gato', count: 64 },
  { value: 'outro', label: 'Outro' },
];

const temperament = [
  { value: 'docil', label: 'Dócil' },
  { value: 'brincalhao', label: 'Brincalhão' },
  { value: 'calmo', label: 'Calmo' },
  { value: 'timido', label: 'Tímido' },
  { value: 'protetor', label: 'Protetor' },
];

export const Multiple: Story = {
  args: {
    label: 'Espécie',
    options: species,
    value: ['cao'],
    onChange: () => {},
  },
  render: (args) => <Stateful {...args} />,
};

export const Single: Story = {
  args: {
    label: 'Sexo',
    selection: 'single',
    options: [
      { value: 'femea', label: 'Fêmea' },
      { value: 'macho', label: 'Macho' },
    ],
    value: ['femea'],
    onChange: () => {},
  },
  render: (args) => <Stateful {...args} />,
};

export const CappedAtThree: Story = {
  args: {
    label: 'Temperamento',
    hint: 'até 3',
    max: 3,
    options: temperament,
    value: ['docil', 'calmo', 'timido'],
    onChange: () => {},
  },
  render: (args) => <Stateful {...args} />,
};

export const WithDisabledOption: Story = {
  args: {
    label: 'Porte',
    options: [
      { value: 'pequeno', label: 'Pequeno' },
      { value: 'medio', label: 'Médio' },
      { value: 'grande', label: 'Grande', disabled: true },
    ],
    value: [],
    onChange: () => {},
  },
  render: (args) => <Stateful {...args} />,
};
