import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { fn } from 'storybook/test';

import { MaskedValue, type MaskedValueProps } from './masked-value';

const meta = {
  title: 'brand/MaskedValue',
  component: MaskedValue,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
  args: { onRevealChange: fn() },
} satisfies Meta<typeof MaskedValue>;

export default meta;
type Story = StoryObj<typeof meta>;

const Stateful = (props: MaskedValueProps) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <MaskedValue {...props} revealed={revealed} onRevealChange={setRevealed} />
  );
};

export const PhoneBeforeAcceptance: Story = {
  args: {
    value: '(71) 9•••• ••34',
    hint: 'liberado após o aceite',
  },
};

export const PublishReview: Story = {
  args: { value: 'WhatsApp ••••1234' },
};

export const Cnpj: Story = {
  args: { value: '28.451.***/0001-09' },
};

export const OwnerCanReveal: Story = {
  args: {
    value: '(71) 9•••• ••34',
    revealedValue: '(71) 98888-1234',
    revealable: true,
  },
  render: (args) => <Stateful {...args} />,
};
