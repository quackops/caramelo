import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from './input';

const meta = {
  title: 'interactive/Input',
  component: Input,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'name',
    label: 'Nome do animal',
    placeholder: 'Ex.: Nina',
  },
};

export const Focused: Story = {
  args: {
    id: 'name-focus',
    label: 'Nome do animal · foco',
    defaultValue: 'Nina',
    autoFocus: true,
  },
};

export const ErrorState: Story = {
  args: {
    id: 'email',
    label: 'E-mail',
    defaultValue: 'dino@pawee',
    error: 'Insira um e-mail válido',
  },
};
