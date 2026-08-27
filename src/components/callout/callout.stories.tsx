import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button/button';
import { Callout } from './callout';

const meta = {
  title: 'feedback/Callout',
  component: Callout,
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
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Verified: Story = {
  args: {
    tone: 'success',
    icon: 'shield',
    title: 'ONG verificada pela Pawee',
    children: 'CNPJ ativo, estatuto conferido, visita virtual em 03/2026.',
  },
};

export const NotPublishedYet: Story = {
  args: {
    tone: 'neutral',
    icon: 'clock',
    children: 'Prestação de contas ainda não publicada.',
  },
};

export const SalePolicy: Story = {
  args: {
    tone: 'warning',
    icon: 'alert-circle',
    children:
      'Venda de animais é proibida na Pawee. Anúncios com cobrança são removidos.',
  },
};

export const PrivacyNotice: Story = {
  args: {
    tone: 'info',
    icon: 'eye',
    children:
      'Seu nome, foto e cidade são compartilhados. Seu telefone só depois que a ONG aceitar.',
  },
};

export const AlertOffer: Story = {
  args: {
    tone: 'neutral',
    icon: 'bell',
    title: 'Quer saber quando alguém parecido com a Amora aparecer?',
    children: 'A gente te avisa assim que um bicho parecido for publicado.',
    action: <Button variant="secondary">Criar alerta</Button>,
  },
};
