import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { SwitchRow } from './switch-row';

const meta = {
  title: 'interactive/SwitchRow',
  component: SwitchRow,
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
} satisfies Meta<typeof SwitchRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Somente castrados' },
};

export const Checked: Story = {
  args: { label: 'Somente ONGs verificadas', checked: true },
};

export const WithDescription: Story = {
  args: {
    label: 'Doação anônima',
    description: 'Seu nome não aparece para a ONG',
  },
};

export const Group: Story = {
  args: { label: 'Somente castrados' },
  render: (args) => (
    <SwitchRow.Group>
      <SwitchRow {...args} label="Somente castrados" />
      <SwitchRow {...args} label="Somente ONGs verificadas" checked />
      <SwitchRow {...args} label="Aceita apartamento" />
      <SwitchRow
        {...args}
        label="Só liberar meu número após eu aceitar"
        description="Ninguém vê seu WhatsApp antes de você aceitar o pedido"
        checked
      />
    </SwitchRow.Group>
  ),
};
