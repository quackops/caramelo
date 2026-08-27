import type { Meta, StoryObj } from '@storybook/react-vite';

import { PhotoUpload } from './photo-upload';

const meta = {
  title: 'interactive/PhotoUpload',
  component: PhotoUpload,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PhotoUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    photos: [{ id: '1' }, { id: '2' }],
    max: 8,
  },
};

export const MaxReached: Story = {
  args: {
    photos: [{ id: '1' }, { id: '2' }, { id: '3' }],
    max: 3,
  },
};
