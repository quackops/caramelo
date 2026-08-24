import type { Meta, StoryObj } from '@storybook/react-vite';

import { Toast } from './toast';

const meta = {
  title: 'interactive/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Interesse enviado',
    description: 'A ONG Amidogo recebe uma notificação agora.',
  },
};

export const ErrorState: Story = {
  args: {
    variant: 'error',
    title: 'Não deu certo',
    description: 'Sem conexão. Tentamos de novo sozinhos.',
  },
};
