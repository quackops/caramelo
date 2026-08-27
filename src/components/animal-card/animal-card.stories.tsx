import type { Meta, StoryObj } from '@storybook/react-vite';

import { AnimalCard } from './animal-card';

const meta = {
  title: 'interactive/AnimalCard',
  component: AnimalCard,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AnimalCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Nina',
    badge: 'verified',
    details: 'Fêmea · 2 anos · Porte médio · SRD',
    meta: 'Pituba, Salvador · 2,4 km · há 3 dias',
    tags: ['castrada', 'vacinada', 'dócil'],
  },
};

export const NoBadge: Story = {
  args: {
    name: 'Thor',
    details: 'Macho · 1 ano · Porte grande · Vira-lata',
    meta: 'Itaigara, Salvador · 3,1 km · há 1 dia',
    tags: ['vacinado'],
  },
};
