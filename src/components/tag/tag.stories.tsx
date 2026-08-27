import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tag } from './tag';

const meta = {
  title: 'interactive/Tag',
  component: Tag,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'castrada' },
};
