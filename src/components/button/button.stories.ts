import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Button } from './button';

const meta = {
  title: 'interactive/Button',
  component: Button,
  parameters: {
    layout: 'fullscreen',
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Tenho interesse',
  },
};

export const PrimaryDisabled: Story = {
  args: {
    children: 'Tenho interesse',
    disabled: true,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Ver perfil da ONG',
  },
};

export const Handoff: Story = {
  args: {
    variant: 'handoff',
    children: 'Abrir no WhatsApp',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Excluir anúncio',
  },
};
