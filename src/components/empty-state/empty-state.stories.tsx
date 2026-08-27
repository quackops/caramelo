import type { Meta, StoryObj } from '@storybook/react-vite';

import { EmptyState } from './empty-state';

const meta = {
  title: 'interactive/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    title: 'Nenhum bicho por aqui',
    description:
      'Seus filtros estão bem estreitos. Solta a distância e olha de novo.',
    actionLabel: 'Limpar filtros',
  },
};

export const ErrorState: Story = {
  args: {
    variant: 'error',
    title: 'Não conseguimos carregar',
    description: 'A culpa provavelmente é nossa.',
    actionLabel: 'Tentar de novo',
  },
};
