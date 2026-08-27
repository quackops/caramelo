import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button/button';
import { IconButton } from '../icon-button/icon-button';
import { StickyActionBar } from './sticky-action-bar';

const meta = {
  title: 'brand/StickyActionBar',
  component: StickyActionBar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div
        style={{ width: 360, height: 260, overflowY: 'auto' }}
        className="bg-bg"
      >
        <div className="px-16 py-16 text-neutral-2">
          <p className="font-roboto text-body">
            Role para ver a barra proteger o conteúdo por baixo dela.
          </p>
          <div style={{ height: 220 }} />
        </div>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StickyActionBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleAction: Story = {
  args: { children: <Button>Continuar</Button> },
};

export const WithHandoff: Story = {
  args: {
    children: (
      <>
        <Button>Tenho interesse</Button>
        <IconButton icon="whatsapp" aria-label="Abrir no WhatsApp" />
      </>
    ),
  },
};

export const BackAndForward: Story = {
  args: {
    children: (
      <>
        <Button variant="secondary">Voltar</Button>
        <Button>Continuar</Button>
      </>
    ),
  },
};

export const OnASurface: Story = {
  args: {
    surface: 'surface',
    children: <Button>Gerar PIX</Button>,
  },
};
