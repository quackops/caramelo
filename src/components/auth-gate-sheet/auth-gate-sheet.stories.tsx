import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Icon } from '../icon/icon';
import { OrbitalRings } from '../orbital-rings/orbital-rings';
import { AuthGateSheet } from './auth-gate-sheet';

const meta = {
  title: 'interactive/AuthGateSheet',
  component: AuthGateSheet,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    open: true,
    onClose: fn(),
    onCreateAccount: fn(),
    onSignIn: fn(),
    createAccountLabel: 'Criar conta',
    signInLabel: 'Entrar',
  },
} satisfies Meta<typeof AuthGateSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const dino = (
  <OrbitalRings size={110}>
    <span className="flex size-[60px] items-center justify-center rounded-2xl bg-caramelo-4 text-on-brand-inverse">
      <Icon name="heart" size={28} />
    </span>
  </OrbitalRings>
);

export const Favorite: Story = {
  args: {
    title: 'Para salvar a Nina, crie sua conta',
    description:
      'Leva 40 segundos e a gente volta exatamente para onde você estava.',
    illustration: dino,
  },
};

export const Interest: Story = {
  args: {
    title: 'Para demonstrar interesse, crie sua conta',
    description:
      'Leva 40 segundos e a gente volta exatamente para onde você estava.',
    illustration: dino,
  },
};

export const Donate: Story = {
  args: {
    title: 'Para doar, crie sua conta',
    description:
      'Leva 40 segundos e a gente volta exatamente para onde você estava.',
    illustration: dino,
  },
};
