import type { Meta, StoryObj } from '@storybook/react-vite';

import { Divider } from './divider';

const meta = {
  title: 'brand/Divider',
  component: Divider,
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
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};

export const Labelled: Story = {
  args: { label: 'ou' },
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-3 text-neutral-2">
      <span>Pawee</span>
      <Divider orientation="vertical" />
      <span>Salvador, BA</span>
    </div>
  ),
};
