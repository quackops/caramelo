import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { IconButton } from '../icon-button/icon-button';
import { ListingManagerCard } from './listing-manager-card';

const meta = {
  title: 'interactive/ListingManagerCard',
  component: ListingManagerCard,
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
  args: { onPendingClick: fn() },
} satisfies Meta<typeof ListingManagerCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithPendingInterests: Story = {
  args: {
    name: 'Nina',
    status: 'active',
    statusDetail: 'Publicado há 3 dias',
    metrics: [
      { label: 'Visualizações', value: 184 },
      { label: 'Salvos', value: 23 },
      { label: 'Interesses', value: 2 },
    ],
    pendingLabel: '2 interesses esperando resposta',
    actions: (
      <>
        <IconButton icon="pause" aria-label="Pausar anúncio" />
        <IconButton icon="edit" aria-label="Editar anúncio" />
      </>
    ),
  },
};

export const NothingPending: Story = {
  args: {
    name: 'Bento',
    status: 'active',
    statusDetail: 'Publicado há 12 dias',
    metrics: [
      { label: 'Visualizações', value: 42 },
      { label: 'Salvos', value: 3 },
      { label: 'Interesses', value: 0 },
    ],
  },
};

export const Paused: Story = {
  args: {
    name: 'Amora',
    status: 'paused',
    statusDetail: 'Pausado há 2 dias',
    metrics: [
      { label: 'Visualizações', value: 96 },
      { label: 'Salvos', value: 11 },
      { label: 'Interesses', value: 1 },
    ],
    actions: <IconButton icon="play" aria-label="Reativar anúncio" />,
  },
};

export const Adopted: Story = {
  args: {
    name: 'Tofu',
    status: 'adopted',
    statusDetail: 'Adotado em 2 de julho por Rafael C.',
    metrics: [
      { label: 'Visualizações', value: 310 },
      { label: 'Salvos', value: 44 },
      { label: 'Interesses', value: 6 },
    ],
    pendingLabel: '6 interesses esperando resposta',
  },
};
