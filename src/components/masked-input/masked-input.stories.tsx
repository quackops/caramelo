import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { MaskedInput, type MaskedInputProps } from './masked-input';

const meta = {
  title: 'interactive/MaskedInput',
  component: MaskedInput,
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
} satisfies Meta<typeof MaskedInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const Stateful = ({ value: initial, ...props }: MaskedInputProps) => {
  const [value, setValue] = useState(initial);

  return (
    <MaskedInput {...props} value={value} onChange={(raw) => setValue(raw)} />
  );
};

export const Phone: Story = {
  args: {
    id: 'whatsapp',
    label: 'WhatsApp para contato',
    mask: 'phone-br',
    value: '71988881234',
    placeholder: '(00) 00000-0000',
    autoComplete: 'tel',
    onChange: () => {},
  },
  render: (args) => <Stateful {...args} />,
};

export const PhoneEmpty: Story = {
  args: {
    id: 'whatsapp-vazio',
    label: 'WhatsApp para contato',
    mask: 'phone-br',
    value: '',
    placeholder: '(00) 00000-0000',
    hint: 'Só liberamos seu número depois que você aceitar',
    onChange: () => {},
  },
  render: (args) => <Stateful {...args} />,
};

export const Cnpj: Story = {
  args: {
    id: 'cnpj',
    label: 'CNPJ da ONG',
    mask: 'cnpj',
    value: '12345678000199',
    onChange: () => {},
  },
  render: (args) => <Stateful {...args} />,
};

export const Cep: Story = {
  args: {
    id: 'cep',
    label: 'CEP',
    mask: 'cep',
    value: '41810000',
    onChange: () => {},
  },
  render: (args) => <Stateful {...args} />,
};

export const PhoneWithError: Story = {
  args: {
    id: 'whatsapp-erro',
    label: 'WhatsApp para contato',
    mask: 'phone-br',
    value: '719888',
    error: 'Número incompleto',
    onChange: () => {},
  },
  render: (args) => <Stateful {...args} />,
};
