import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Button } from '../button/button';
import { StatusBanner } from './status-banner';

const meta = {
  title: 'feedback/StatusBanner',
  component: StatusBanner,
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
} satisfies Meta<typeof StatusBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Offline: Story = {
  args: {
    message: 'Você está offline',
    icon: 'wifi-off',
  },
};

export const OfflineWithRetry: Story = {
  args: {
    message: 'Você está offline · mostrando o que já baixamos',
    icon: 'wifi-off',
    action: <Button variant="ghost">Tentar de novo</Button>,
  },
};

export const Warning: Story = {
  args: {
    message: 'Seu anúncio expira em 3 dias',
    tone: 'warning',
    icon: 'clock',
  },
};

export const Danger: Story = {
  args: {
    message: 'Não conseguimos salvar suas alterações',
    tone: 'danger',
    icon: 'alert-circle',
    onDismiss: fn(),
  },
};
