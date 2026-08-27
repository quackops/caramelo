import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { NoticeRow } from './notice-row';

const meta = {
  title: 'interactive/NoticeRow',
  component: NoticeRow,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof NoticeRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unread: Story = {
  args: {
    message: 'Marina demonstrou interesse na Nina',
    timestamp: 'há 12 min',
    read: false,
  },
};

export const Read: Story = {
  args: {
    message: '3 novos cães em Pituba na sua busca salva',
    timestamp: 'ontem',
    read: true,
  },
};

export const WithHint: Story = {
  args: {
    message: 'A ONG Amidogo aceitou conversar sobre a Nina',
    timestamp: 'há 12 minutos',
    hint: 'toque para abrir o WhatsApp',
    read: false,
  },
};

export const Interactive: Story = {
  args: {
    message: '3 novos cães em Pituba na sua busca salva',
    timestamp: 'há 5 horas',
    hint: 'alerta "Gata filhote perto de mim"',
    read: true,
    onClick: fn(),
  },
};
