import type { Meta, StoryObj } from '@storybook/react-vite';

import { NoticeRow } from './notice-row';

const meta = {
  title: 'interactive/NoticeRow',
  component: NoticeRow,
  parameters: {
    layout: 'centered',
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
