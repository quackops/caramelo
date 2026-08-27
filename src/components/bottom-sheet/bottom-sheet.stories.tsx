import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from '../button/button';
import { BottomSheet } from './bottom-sheet';

const meta = {
  title: 'overlay/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'fullscreen',
  },
  args: { open: true, onClose: fn() },
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filtros: Story = {
  args: {
    size: 'tall',
    title: 'Filtros',
    action: <span>Limpar</span>,
    children: (
      <p className="font-roboto font-light text-neutral-2">
        Espécie, porte e ONG verificada.
      </p>
    ),
    footer: <Button className="w-full">Ver 34 bichos</Button>,
  },
};

export const WhatsApp: Story = {
  args: {
    size: 'short',
    title: 'Abrir conversa',
    children: (
      <p className="font-roboto font-light text-neutral-2">
        Vamos abrir a conversa com a ONG já com esta mensagem.
      </p>
    ),
    footer: (
      <Button variant="handoff" className="w-full">
        Abrir no WhatsApp
      </Button>
    ),
  },
};
