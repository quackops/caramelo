import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar } from './avatar';

const meta = {
  title: 'interactive/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {
  args: {
    initials: 'AM',
    alt: 'ONG Amidogo',
  },
};

export const Small: Story = {
  args: {
    initials: 'AM',
    size: 'small',
    alt: 'ONG Amidogo',
  },
};

export const Photo: Story = {
  args: {
    src: 'https://placekitten.com/96/96',
    alt: 'Nina',
  },
};
