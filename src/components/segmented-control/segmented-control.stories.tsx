import type { Meta, StoryObj } from '@storybook/react-vite';

import { SegmentedControl } from './segmented-control';

const meta = {
  title: 'interactive/SegmentedControl',
  component: SegmentedControl,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'list',
    options: [
      { label: 'Lista', value: 'list' },
      { label: 'Grade', value: 'grid' },
      { label: 'Mapa', value: 'map' },
    ],
  },
};
