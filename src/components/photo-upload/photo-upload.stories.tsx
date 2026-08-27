import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { PhotoUpload } from './photo-upload';

const meta = {
  title: 'interactive/PhotoUpload',
  component: PhotoUpload,
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
  args: {
    onAdd: fn(),
    onRemove: fn(),
    onReorder: fn(),
    onRetry: fn(),
  },
} satisfies Meta<typeof PhotoUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    photos: [],
    max: 5,
    min: 1,
    requirementLabel: 'pelo menos 1',
  },
};

export const BelowTheRecommendation: Story = {
  args: {
    photos: [{ id: 'a', status: 'ready' }],
    max: 5,
    min: 3,
    requirementLabel: '3 recomendadas',
  },
};

export const Uploading: Story = {
  args: {
    photos: [
      { id: 'a', status: 'ready' },
      { id: 'b', status: 'uploading', progress: 62 },
    ],
    max: 5,
  },
};

export const Failed: Story = {
  args: {
    photos: [
      { id: 'a', status: 'ready' },
      { id: 'b', status: 'failed' },
    ],
    max: 5,
  },
};

export const Full: Story = {
  args: {
    photos: [
      { id: 'a', status: 'ready' },
      { id: 'b', status: 'ready' },
      { id: 'c', status: 'ready' },
    ],
    max: 3,
  },
};
