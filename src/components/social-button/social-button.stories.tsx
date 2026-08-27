import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Divider } from '../divider/divider';
import { SocialButton } from './social-button';

const meta = {
  title: 'interactive/SocialButton',
  component: SocialButton,
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
  args: { onClick: fn() },
} satisfies Meta<typeof SocialButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Apple: Story = {
  args: { provider: 'apple', label: 'Entrar com Apple' },
};

export const Google: Story = {
  args: { provider: 'google', label: 'Entrar com Google' },
};

export const Disabled: Story = {
  args: { provider: 'google', label: 'Entrar com Google', disabled: true },
};

export const AuthScreenPair: Story = {
  args: { provider: 'apple', label: 'Entrar com Apple' },
  render: (args) => (
    <div className="flex flex-col gap-16">
      <Divider label="ou" />
      <div className="grid grid-cols-2 gap-2.5">
        <SocialButton
          {...args}
          provider="apple"
          label="Entrar com Apple"
          compact
        />
        <SocialButton
          {...args}
          provider="google"
          label="Entrar com Google"
          compact
        />
      </div>
    </div>
  ),
};
