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

export const Block: Story = {
  args: {
    variant: 'block',
    className: 'h-4 w-40',
  },
};

export const Spinner: Story = {
  args: {
    variant: 'spinner',
  },
};
