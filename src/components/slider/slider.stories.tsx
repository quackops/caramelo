import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Slider } from './slider';

const meta = {
  title: 'interactive/Slider',
  component: Slider,
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
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

const Distance = ({ initial = 15 }: { initial?: number }) => {
  const [value, setValue] = useState(initial);

  return (
    <Slider
      label="Distância máxima"
      value={value}
      min={1}
      max={100}
      onChange={setValue}
      formatValue={(km) => `${km} km`}
    />
  );
};

export const Default: Story = {
  args: { value: 15, min: 1, max: 100, onChange: () => {} },
  render: () => <Distance />,
};

export const AtTheMaximum: Story = {
  args: { value: 100, min: 1, max: 100, onChange: () => {} },
  render: () => <Distance initial={100} />,
};

export const WithHint: Story = {
  args: {
    label: 'Distância máxima',
    value: 15,
    min: 1,
    max: 100,
    step: 5,
    onChange: () => {},
    formatValue: (km) => `até ${km} km`,
    hint: 'Aumentar para 50 km mostra mais 6 bichos',
  },
};
