import type { Meta, StoryObj } from '@storybook/react-vite';

import { PasswordField } from './password-field';

const meta = {
  title: 'interactive/PasswordField',
  component: PasswordField,
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
} satisfies Meta<typeof PasswordField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Login: Story = {
  args: {
    id: 'senha-login',
    label: 'Senha',
    placeholder: 'Sua senha',
    autoComplete: 'current-password',
  },
};

export const SignupWeak: Story = {
  args: {
    id: 'senha-fraca',
    label: 'Senha',
    autoComplete: 'new-password',
    defaultValue: 'caramelo',
    strength: 1,
    strengthLabel: 'Fraca',
  },
};

export const SignupGood: Story = {
  args: {
    id: 'senha-boa',
    label: 'Senha',
    autoComplete: 'new-password',
    defaultValue: 'Caramelo2026',
    strength: 3,
    strengthLabel: 'Boa',
  },
};

export const SignupStrong: Story = {
  args: {
    id: 'senha-forte',
    label: 'Senha',
    autoComplete: 'new-password',
    defaultValue: 'Caramelo!2026#',
    strength: 4,
    strengthLabel: 'Ótima',
  },
};

export const ErrorState: Story = {
  args: {
    id: 'senha-erro',
    label: 'Senha',
    autoComplete: 'new-password',
    defaultValue: 'abc',
    error: 'A senha precisa de pelo menos 8 caracteres',
  },
};

export const WithoutToggle: Story = {
  args: {
    id: 'senha-sem-toggle',
    label: 'Senha',
    showToggle: false,
  },
};
