import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { CopyField } from './copy-field';

const meta = {
  title: 'interactive/CopyField',
  component: CopyField,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Clipboard access needs a secure context (https or localhost). In a plain-HTTP preview the copy falls back to document.execCommand and may still be refused by the browser — the failure is surfaced in the component rather than swallowed.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
  args: { onCopy: fn() },
} satisfies Meta<typeof CopyField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PixPayload: Story = {
  args: {
    label: 'PIX copia e cola',
    value:
      '00020126580014BR.GOV.BCB.PIX0136a1b2c3d4-e5f6-7890-abcd-ef1234567890520400005303986540525.005802BR5913Lar Tintin6009SALVADOR62070503***6304A1B2',
    copyLabel: 'Copiar código',
    copiedLabel: 'Código copiado',
  },
};

export const WhatsappMessage: Story = {
  args: {
    variant: 'text',
    label: 'Sua mensagem',
    value:
      'Oi! Vi o anúncio da Nina no mural da Pawee e tenho interesse em adotar.',
    copyLabel: 'Copiar mensagem',
    copiedLabel: 'Mensagem copiada',
  },
};

export const ErrorReference: Story = {
  args: {
    variant: 'inline',
    value: 'erro 500 · ref 8F2A-D19',
  },
};
