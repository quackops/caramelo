import type { Meta, StoryObj } from '@storybook/react-vite';

import { QrCode } from './qr-code';

const meta = {
  title: 'brand/QrCode',
  component: QrCode,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Caramelo ships no QR encoder. The backend already produces the PIX payload and produces the matrix alongside it, so the library stays dependency-free and encoder correctness is tested against a real PSP on the server.',
      },
    },
  },
} satisfies Meta<typeof QrCode>;

export default meta;
type Story = StoryObj<typeof meta>;

const demoMatrix = Array.from({ length: 21 }, (_, y) =>
  Array.from({ length: 21 }, (_, x) => (x * 7 + y * 3) % 5 < 2),
);

export const FromAMatrix: Story = {
  args: {
    matrix: demoMatrix,
    label: 'QR code para pagamento PIX de R$ 25,00',
  },
};

export const Large: Story = {
  args: {
    matrix: demoMatrix,
    size: 260,
    label: 'QR code para pagamento PIX de R$ 25,00',
  },
};
