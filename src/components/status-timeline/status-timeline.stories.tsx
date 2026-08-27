import type { Meta, StoryObj } from '@storybook/react-vite';

import { StatusTimeline } from './status-timeline';

const meta = {
  title: 'feedback/StatusTimeline',
  component: StatusTimeline,
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
} satisfies Meta<typeof StatusTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ApplicationHistory: Story = {
  args: {
    events: [
      {
        id: 'enviado',
        title: 'Interesse enviado',
        timestamp: '12 de agosto, 14h22',
        state: 'done',
      },
      {
        id: 'aceito',
        title: 'ONG aceitou conversar',
        timestamp: '12 de agosto, 17h05',
        detail: 'contato liberado',
        state: 'done',
      },
      {
        id: 'formulario',
        title: 'Formulário enviado',
        timestamp: '13 de agosto, 09h40',
        state: 'done',
      },
      {
        id: 'entrevista',
        title: 'Entrevista marcada',
        timestamp: 'Sábado, 16 de agosto, 10h',
        detail: 'por vídeo',
        state: 'current',
      },
      {
        id: 'decisao',
        title: 'Decisão final',
        timestamp: 'Depois da entrevista',
        state: 'pending',
      },
    ],
  },
};

export const WhatHappensNow: Story = {
  args: {
    marker: 'number',
    events: [
      {
        id: 'envia',
        title: 'Você envia o interesse',
        detail: 'a ONG recebe um aviso na hora',
        state: 'current',
      },
      {
        id: 'responde',
        title: 'A ONG responde',
        detail: 'costuma levar até 2 dias',
        state: 'pending',
      },
      {
        id: 'conversa',
        title: 'Vocês conversam no WhatsApp',
        detail: 'seu número só é liberado depois que você aceita',
        state: 'pending',
      },
    ],
  },
};

export const EndedEarly: Story = {
  args: {
    events: [
      {
        id: 'enviado',
        title: 'Interesse enviado',
        timestamp: '12 de agosto, 14h22',
        state: 'done',
      },
      {
        id: 'recusada',
        title: 'Candidatura recusada',
        timestamp: '13 de agosto, 08h10',
        detail: 'a ONG escolheu outro lar',
        state: 'done',
      },
    ],
  },
};
