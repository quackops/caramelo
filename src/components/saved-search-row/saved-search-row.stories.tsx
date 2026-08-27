import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { fn } from 'storybook/test';

import { IconButton } from '../icon-button/icon-button';
import {
  type SavedSearchFrequency,
  SavedSearchRow,
  type SavedSearchRowProps,
} from './saved-search-row';

const meta = {
  title: 'interactive/SavedSearchRow',
  component: SavedSearchRow,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 380 }}>
        <Story />
      </div>
    ),
  ],
  args: { onClick: fn() },
} satisfies Meta<typeof SavedSearchRow>;

export default meta;
type Story = StoryObj<typeof meta>;

const frequencyOptions = [
  { value: 'instant' as const, label: 'assim que aparecer' },
  { value: 'daily' as const, label: 'resumo diário' },
  { value: 'weekly' as const, label: 'resumo semanal' },
];

const Stateful = ({ frequency: initial, ...props }: SavedSearchRowProps) => {
  const [frequency, setFrequency] = useState<SavedSearchFrequency>(initial);

  return (
    <SavedSearchRow
      {...props}
      frequency={frequency}
      onFrequencyChange={setFrequency}
    />
  );
};

export const Active: Story = {
  args: {
    name: 'Gata filhote perto de mim',
    filters: ['gatos', 'filhote', 'até 10 km'],
    frequency: 'instant',
    frequencyOptions,
    frequencyLabel: 'Avisar',
    pausedLabel: 'Avisos pausados',
    newCount: 3,
    onFrequencyChange: () => {},
    actions: (
      <>
        <IconButton icon="pause" aria-label="Pausar avisos" />
        <IconButton icon="trash" aria-label="Excluir busca" />
      </>
    ),
  },
  render: (args) => <Stateful {...args} />,
};

export const Paused: Story = {
  args: {
    name: 'Cachorro porte pequeno',
    filters: ['cães', 'pequeno', 'castrado'],
    frequency: 'weekly',
    frequencyOptions,
    frequencyLabel: 'Avisar',
    pausedLabel: 'Avisos pausados',
    paused: true,
    onFrequencyChange: () => {},
    actions: <IconButton icon="play" aria-label="Retomar avisos" />,
  },
  render: (args) => <Stateful {...args} />,
};

export const NothingNew: Story = {
  args: {
    name: 'ONGs verificadas em Salvador',
    filters: ['ONG verificada', 'Salvador'],
    frequency: 'daily',
    frequencyOptions,
    frequencyLabel: 'Avisar',
    pausedLabel: 'Avisos pausados',
    onFrequencyChange: () => {},
  },
  render: (args) => <Stateful {...args} />,
};
