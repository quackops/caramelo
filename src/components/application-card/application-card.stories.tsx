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
  args: { onAccept: fn(), onReject: fn(), onViewAnswers: fn() },
} satisfies Meta<typeof ApplicationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ReceivedInterest: Story = {
  args: {
    applicantName: 'Rafael Campos',
    meta: 'Itapuã · 6,2 km · há 2 horas',
    status: 'review',
    unread: true,
    answers: ['Casa com quintal', '1 outro animal'],
    message:
      'Oi! Vi o anúncio da Nina e tenho interesse. Moro em casa com quintal fechado.',
  },
};

export const InReview: Story = {
  args: {
    applicantName: 'Marina Costa',
    progressLabel: 'Formulário respondido · 8/8',
    status: 'review',
  },
};

export const Interview: Story = {
  args: {
    applicantName: 'Marina Costa',
    meta: 'Pituba · 2,1 km',
    status: 'interview',
    statusDetail: 'Entrevista marcada para sábado, 10h',
  },
};

export const Accepted: Story = {
  args: {
    applicantName: 'Marina Costa',
    progressLabel: 'Formulário respondido · 8/8',
    status: 'accepted',
  },
};

export const RejectedCollapsed: Story = {
  args: {
    applicantName: 'Pedro M.',
    status: 'rejected',
    statusDetail: 'Recusado em 20 de agosto',
  },
};

export const Completed: Story = {
  args: {
    applicantName: 'Marina Costa',
    status: 'completed',
    statusDetail: 'Adoção concluída em 2 de julho',
  },
};
