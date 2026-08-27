import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Button } from '../button/button';
import { CopyField } from '../copy-field/copy-field';
import { OrbitalRings } from '../orbital-rings/orbital-rings';
import { StatGrid } from '../stat-grid/stat-grid';
import { StatusTimeline } from '../status-timeline/status-timeline';
import { SummaryRow } from '../summary-row/summary-row';
import { ResultScreen } from './result-screen';

const meta = {
  title: 'feedback/ResultScreen',
  component: ResultScreen,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 402 }} className="bg-bg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ResultScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

const IllustrationPlaceholder = ({ children }: { children: string }) => (
  <OrbitalRings size={150}>
    <span className="flex size-[70px] items-center justify-center rounded-2xl bg-caramelo-4 text-center font-poppins text-badge text-on-brand-inverse">
      {children}
    </span>
  </OrbitalRings>
);

export const InterestSent: Story = {
  args: {
    tone: 'success',
    title: 'Interesse enviado',
    description: 'A ONG Amidogo já recebeu seu pedido.',
    children: (
      <StatusTimeline
        marker="number"
        events={[
          {
            id: 'envia',
            title: 'Você enviou o interesse',
            state: 'done',
          },
          {
            id: 'responde',
            title: 'A ONG responde',
            detail: 'costuma levar até 2 dias',
            state: 'current',
          },
          {
            id: 'conversa',
            title: 'Vocês conversam no WhatsApp',
            state: 'pending',
          },
        ]}
      />
    ),
    actions: (
      <>
        <Button onClick={fn()}>Ver minha candidatura</Button>
        <Button variant="ghost" onClick={fn()}>
          Voltar ao mural
        </Button>
      </>
    ),
  },
};

export const Published: Story = {
  args: {
    tone: 'success',
    illustration: (
      <IllustrationPlaceholder>dino-entire</IllustrationPlaceholder>
    ),
    title: 'Publicado',
    description: 'Seu anúncio já está no mural.',
    children: (
      <StatGrid
        columns={3}
        items={[
          { label: 'Avisados', value: 12 },
          { label: 'Interesses', value: 0 },
          { label: 'Salvos', value: 0 },
        ]}
      />
    ),
    actions: (
      <>
        <Button onClick={fn()}>Ver anúncio</Button>
        <Button variant="ghost" onClick={fn()}>
          Publicar outro
        </Button>
        <Button variant="ghost" onClick={fn()}>
          Voltar ao mural
        </Button>
      </>
    ),
  },
};

export const DonationConfirmed: Story = {
  args: {
    tone: 'success',
    size: 'sheet',
    title: 'Doação confirmada',
    description: 'A ONG Amidogo já recebeu o valor.',
    children: (
      <SummaryRow.Group>
        <SummaryRow label="Valor" value="R$ 25,00" />
        <SummaryRow label="Data" value="23/08/2026 · 15h04" />
        <SummaryRow label="Taxa Pawee" value="R$ 0,00" />
        <SummaryRow label="Total" value="R$ 25,00" emphasis />
      </SummaryRow.Group>
    ),
    actions: (
      <>
        <Button onClick={fn()}>Baixar PDF</Button>
        <Button variant="ghost" onClick={fn()}>
          Fechar
        </Button>
      </>
    ),
    footnote: 'A cobrança recorrente pode ser cancelada quando você quiser.',
  },
};

export const ServerError: Story = {
  args: {
    tone: 'error',
    illustration: <IllustrationPlaceholder>sad-face</IllustrationPlaceholder>,
    title: 'Não conseguimos carregar',
    description: 'A culpa provavelmente é nossa. Tenta de novo em instantes.',
    actions: (
      <>
        <Button onClick={fn()}>Tentar de novo</Button>
        <Button variant="ghost" onClick={fn()}>
          Falar com o suporte
        </Button>
      </>
    ),
    footnote: <CopyField variant="inline" value="erro 500 · ref 8F2A-D19" />,
  },
};

export const Offline: Story = {
  args: {
    illustration: (
      <IllustrationPlaceholder>dino-crying</IllustrationPlaceholder>
    ),
    title: 'Sem conexão',
    description: 'A gente continua mostrando o que já baixou.',
    actions: <Button onClick={fn()}>Tentar de novo</Button>,
  },
};
