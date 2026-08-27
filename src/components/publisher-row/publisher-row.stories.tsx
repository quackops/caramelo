import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { PublisherRow } from './publisher-row';

const meta = {
  title: 'interactive/PublisherRow',
  component: PublisherRow,
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
} satisfies Meta<typeof PublisherRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OngOnAListing: Story = {
  args: {
    name: 'ONG Amidogo',
    initials: 'OA',
    badge: 'verified',
    meta: '18 animais · 47 adoções concluídas',
    onClick: fn(),
  },
};

export const TutorOnAListing: Story = {
  args: {
    name: 'Rafael Campos',
    initials: 'RC',
    badge: 'tutor',
    meta: 'Itapuã · 6,2 km',
    onClick: fn(),
  },
};

export const ReceivedInterest: Story = {
  args: {
    name: 'Rafael Campos',
    initials: 'RC',
    avatarSize: 'small',
    meta: 'Itapuã · 6,2 km · há 2 horas',
  },
};
