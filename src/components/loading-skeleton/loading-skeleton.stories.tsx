import type { Meta, StoryObj } from '@storybook/react-vite';

import { LoadingSkeleton } from './loading-skeleton';

const meta = {
  title: 'interactive/LoadingSkeleton',
  component: LoadingSkeleton,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof LoadingSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'h-4 w-40',
  },
};

export const CardSilhouette: Story = {
  render: () => (
    <div className="w-60">
      <LoadingSkeleton className="mb-2 h-32 w-full" />
      <LoadingSkeleton className="mb-2 h-4 w-2/3" />
      <LoadingSkeleton className="h-3 w-1/2" />
    </div>
  ),
};
