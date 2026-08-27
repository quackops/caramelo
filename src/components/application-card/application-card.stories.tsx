import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { ApplicationCard } from './application-card';

const meta = {
  title: 'interactive/ApplicationCard',
  component: ApplicationCard,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 380 }}>
        <Story />
      </div>
    ),
  ],
  args: { onAccept: fn(), onViewAnswers: fn() },
} satisfies Meta<typeof ApplicationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InReview: Story = {
  args: {
    applicantName: 'Marina Costa',
    progressLabel: 'Formulário respondido · 8/8',
    status: 'review',
  },
};

export const Accepted: Story = {
  args: {
    applicantName: 'Marina Costa',
    progressLabel: 'Formulário respondido · 8/8',
    status: 'accepted',
  },
};

export const Rejected: Story = {
  args: {
    applicantName: 'Marina Costa',
    progressLabel: 'Formulário respondido · 8/8',
    status: 'rejected',
  },
};

export const Completed: Story = {
  args: {
    applicantName: 'Marina Costa',
    progressLabel: 'Formulário respondido · 8/8',
    status: 'completed',
  },
};
