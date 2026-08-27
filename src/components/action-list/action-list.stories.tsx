import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { BottomSheet } from '../bottom-sheet/bottom-sheet';
import { ActionList } from './action-list';

const meta = {
  title: 'interactive/ActionList',
  component: ActionList,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }} className="bg-surface">
        <Story />
      </div>
    ),
  ],
  args: { onSelect: fn() },
} satisfies Meta<typeof ActionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RefusalReasons: Story = {
  args: {
    items: [
      { id: 'perfil', label: 'O perfil não combina' },
      { id: 'outro', label: 'Já escolhi outro lar' },
      { id: 'sem-resposta', label: 'Não tive resposta' },
    ],
  },
};

export const MarkAsAdopted: Story = {
  args: {
    items: [
      {
        id: 'pawee',
        label: 'Foi por aqui',
        description: 'A adoção aconteceu pela Pawee',
        icon: 'heart',
      },
      {
        id: 'fora',
        label: 'Foi por fora',
        description: 'A adoção aconteceu por outro caminho',
        icon: 'share-2',
      },
    ],
  },
};

export const ListingActions: Story = {
  args: {
    items: [
      { id: 'pausar', label: 'Pausar anúncio', icon: 'pause' },
      { id: 'editar', label: 'Editar anúncio', icon: 'edit' },
      { id: 'adotado', label: 'Marcar como adotado', icon: 'check' },
      {
        id: 'excluir',
        label: 'Excluir anúncio',
        icon: 'trash',
        tone: 'destructive',
      },
    ],
  },
};

export const InsideASheet: Story = {
  args: {
    items: [
      { id: 'perfil', label: 'O perfil não combina' },
      { id: 'outro', label: 'Já escolhi outro lar' },
      { id: 'sem-resposta', label: 'Não tive resposta' },
    ],
  },
  render: (args) => (
    <BottomSheet
      open
      size="short"
      title="Por que você está recusando?"
      onClose={fn()}
    >
      <ActionList {...args} />
    </BottomSheet>
  ),
};
