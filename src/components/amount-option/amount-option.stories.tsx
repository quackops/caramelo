import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { MoneyInput } from '../money-input/money-input';
import { AmountOption } from './amount-option';

const meta = {
  title: 'interactive/AmountOption',
  component: AmountOption,
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
  args: { onChange: fn() },
} satisfies Meta<typeof AmountOption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { amountLabel: 'R$ 25' },
};

export const WithEquivalence: Story = {
  args: { amountLabel: 'R$ 25', equivalence: '1 semana de ração' },
};

export const Selected: Story = {
  args: {
    amountLabel: 'R$ 25',
    equivalence: '1 semana de ração',
    defaultChecked: true,
  },
};

export const PresetRow: Story = {
  args: { amountLabel: 'R$ 25' },
  render: (args) => (
    <AmountOption.Group label="Escolha um valor">
      <AmountOption {...args} amountLabel="R$ 10" value="1000" />
      <AmountOption
        {...args}
        amountLabel="R$ 25"
        equivalence="1 semana de ração"
        value="2500"
        defaultChecked
      />
      <AmountOption {...args} amountLabel="R$ 50" value="5000" />
    </AmountOption.Group>
  ),
};

export const WithOtherAmount: Story = {
  args: { amountLabel: 'R$ 25' },
  render: (args) => (
    <AmountOption.Group label="Escolha um valor" columns={2}>
      <AmountOption
        {...args}
        amountLabel="R$ 25"
        equivalence="1 semana de ração"
        value="2500"
      />
      <MoneyInput
        id="outro-valor"
        label="Outro valor"
        value={0}
        onChange={() => {}}
      />
    </AmountOption.Group>
  ),
};
