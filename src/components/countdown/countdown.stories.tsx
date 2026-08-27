import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Countdown } from './countdown';

const meta = {
  title: 'feedback/Countdown',
  component: Countdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Pairs with CopyField on the PIX screen. When it expires the consumer is expected to disable the copy action and offer a fresh payload — that wiring lives in the app.',
      },
    },
  },
  args: { onExpire: fn() },
} satisfies Meta<typeof Countdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PixExpiry: Story = {
  args: {
    label: 'Expira em',
    expiresAt: new Date(Date.now() + 9 * 60_000 + 42_000),
  },
};

export const LastMinute: Story = {
  args: {
    label: 'Expira em',
    expiresAt: new Date(Date.now() + 45_000),
  },
};

export const Expired: Story = {
  args: {
    label: 'Expira em',
    expiredLabel: 'Pagamento expirado',
    expiresAt: new Date(Date.now() - 1000),
  },
};
