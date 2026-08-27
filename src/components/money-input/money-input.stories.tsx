import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { MoneyInput, type MoneyInputProps } from './money-input';

const meta = {
  title: 'interactive/MoneyInput',
  component: MoneyInput,
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
} satisfies Meta<typeof MoneyInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const Stateful = ({ value: initial, ...props }: MoneyInputProps) => {
  const [value, setValue] = useState(initial);

  return <MoneyInput {...props} value={value} onChange={setValue} />;
};

export const Default: Story = {
  args: {
    id: 'valor',
    label: 'Outro valor',
    value: 2500,
    onChange: () => {},
  },
  render: (args) => <Stateful {...args} />,
};

export const Empty: Story = {
  args: {
    id: 'valor-vazio',
    label: 'Outro valor',
    value: 0,
    hint: 'A Pawee não fica com nada. 100% vai para a ONG.',
    onChange: () => {},
  },
  render: (args) => <Stateful {...args} />,
};

export const Clamped: Story = {
  args: {
    id: 'valor-limite',
    label: 'Outro valor',
    value: 100,
    min: 500,
    max: 500000,
    hint: 'Entre R$ 5,00 e R$ 5.000,00',
    onChange: () => {},
  },
  render: (args) => <Stateful {...args} />,
};

export const ErrorState: Story = {
  args: {
    id: 'valor-erro',
    label: 'Outro valor',
    value: 100,
    error: 'O valor mínimo é R$ 5,00',
    onChange: () => {},
  },
  render: (args) => <Stateful {...args} />,
};
