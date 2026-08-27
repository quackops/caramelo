import type { Meta, StoryObj } from '@storybook/react-vite';

import { MapArea } from './map-area';

const meta = {
  title: 'brand/MapArea',
  component: MapArea,
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
} satisfies Meta<typeof MapArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ApproximateArea: Story = {
  args: {
    label: 'Área aproximada',
    radiusLabel: 'raio de 400 m',
  },
};

export const OverAStaticMap: Story = {
  args: {
    label: 'Área aproximada',
    radiusLabel: 'raio de 400 m',
    backdrop: (
      <span className="absolute inset-0 bg-[repeating-linear-gradient(45deg,var(--color-gray-3),var(--color-gray-3)_12px,var(--color-gray-4)_12px,var(--color-gray-4)_24px)]" />
    ),
  },
};
