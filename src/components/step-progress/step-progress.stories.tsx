import type { Meta, StoryObj } from '@storybook/react-vite';
import { StepProgress } from './step-progress';

const meta = {
  title: 'feedback/StepProgress',
  component: StepProgress,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof StepProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bars: Story = {
  args: { total: 5, current: 3, label: 'Passo 3 de 5 · Saúde' },
};

export const FirstStep: Story = {
  args: { total: 3, current: 1 },
};

export const Dots: Story = {
  args: { total: 3, current: 2, variant: 'dots' },
};

export const DotsOverPhoto: Story = {
  args: { total: 3, current: 1, variant: 'dots', tone: 'over-photo' },
};
