import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from './badge';

const meta = {
  title: 'interactive/Badge',
  component: Badge,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Verified: Story = {
  args: { variant: 'verified' },
};

export const Tutor: Story = {
  args: { variant: 'tutor' },
};

export const Urgent: Story = {
  args: { variant: 'urgent' },
};

export const New: Story = {
  args: { variant: 'new' },
};

export const Adopted: Story = {
  args: { variant: 'adopted' },
};

export const Compact: Story = {
  args: { variant: 'verified', size: 'compact' },
};

export const ListingLifecycle: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="active" />
      <Badge variant="paused" />
    </div>
  ),
};

export const ApplicationStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="review" />
      <Badge variant="accepted" />
      <Badge variant="interview" />
      <Badge variant="approved" />
      <Badge variant="rejected" />
      <Badge variant="withdrawn" />
      <Badge variant="expired" />
      <Badge variant="completed" />
    </div>
  ),
};
