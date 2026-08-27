import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProgressMeter } from './progress-meter';

const meta = {
  title: 'feedback/ProgressMeter',
  component: ProgressMeter,
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
} satisfies Meta<typeof ProgressMeter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: { label: 'Ração e alimentação', value: 54, valueLabel: '54%' },
};

export const Allocation: Story = {
  args: { label: 'Ração e alimentação', value: 54, valueLabel: '54%' },
  render: () => (
    <ProgressMeter.Group>
      <ProgressMeter label="Ração e alimentação" value={54} valueLabel="54%" />
      <ProgressMeter
        label="Veterinário e remédios"
        value={31}
        valueLabel="31%"
      />
      <ProgressMeter label="Castrações" value={15} valueLabel="15%" />
    </ProgressMeter.Group>
  ),
};

export const DecreasingEmphasis: Story = {
  args: { label: 'Ração e alimentação', value: 54, valueLabel: '54%' },
  render: () => (
    <ProgressMeter.Group>
      <ProgressMeter label="Ração e alimentação" value={54} valueLabel="54%" />
      <ProgressMeter
        label="Veterinário e remédios"
        value={31}
        valueLabel="31%"
        tone="neutral"
      />
      <ProgressMeter
        label="Castrações"
        value={15}
        valueLabel="15%"
        tone="neutral"
      />
    </ProgressMeter.Group>
  ),
};

export const GoalScale: Story = {
  args: {
    label: 'Meta do mês',
    value: 750,
    max: 2000,
    valueLabel: 'R$ 750 de R$ 2.000',
  },
};
