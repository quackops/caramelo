import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { StatGrid } from './stat-grid';

const meta = {
  title: 'brand/StatGrid',
  component: StatGrid,
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
} satisfies Meta<typeof StatGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ListingSpec: Story = {
  args: {
    columns: 4,
    order: 'label-first',
    items: [
      { label: 'Sexo', value: 'Fêmea' },
      { label: 'Idade', value: '2 anos' },
      { label: 'Porte', value: 'Médio' },
      { label: 'Peso', value: '12 kg' },
    ],
  },
};

export const ListingReach: Story = {
  args: {
    columns: 3,
    items: [
      { label: 'Avisados', value: 12 },
      { label: 'Interesses', value: 0 },
      { label: 'Salvos', value: 0 },
    ],
  },
};

export const OngNumbers: Story = {
  args: {
    columns: 3,
    variant: 'inline',
    items: [
      { label: 'Animais', value: 18 },
      { label: 'Adoções', value: 47 },
      { label: 'Seguindo', value: 312 },
    ],
  },
};

export const ProfileStats: Story = {
  args: {
    columns: 3,
    variant: 'inline',
    items: [
      { label: 'Anúncios', value: 2, onClick: fn() },
      { label: 'Candidatura', value: 1, onClick: fn() },
      { label: 'Doações', value: 3, onClick: fn() },
    ],
  },
};
