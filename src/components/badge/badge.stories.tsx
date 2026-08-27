import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from './badge';

const meta = {
  title: 'interactive/Badge',
  component: Badge,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Verified: Story = {
  args: { voice: 'success', icon: 'check', label: 'ONG VERIFICADA' },
};

export const Tutor: Story = {
  args: { voice: 'neutral', label: 'TUTOR' },
};

export const Urgent: Story = {
  args: { voice: 'warning', icon: 'alert-circle', label: 'URGENTE' },
};

export const New: Story = {
  args: { voice: 'info', label: 'NOVO' },
};

export const Adopted: Story = {
  args: { voice: 'neutral', icon: 'check', label: 'ADOTADO' },
};

export const Compact: Story = {
  args: {
    voice: 'success',
    icon: 'check',
    label: 'ONG VERIFICADA',
    size: 'compact',
  },
};

export const ListingLifecycle: Story = {
  args: { label: 'ATIVO' },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge voice="success" icon="check" label="ATIVO" />
      <Badge voice="neutral" icon="pause" label="PAUSADO" />
    </div>
  ),
};

export const ApplicationStatuses: Story = {
  args: { label: 'EM ANÁLISE' },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge voice="info" icon="clock" label="EM ANÁLISE" />
      <Badge voice="success" icon="check" label="ACEITA" />
      <Badge voice="info" icon="clock" label="ENTREVISTA" />
      <Badge voice="success" icon="check" label="APROVADA" />
      <Badge voice="neutral" icon="x" label="RECUSADA" />
      <Badge voice="neutral" icon="x" label="DESISTIU" />
      <Badge voice="neutral" icon="clock" label="EXPIRADA" />
      <Badge voice="neutral" icon="check-circle" label="CONCLUÍDA" />
    </div>
  ),
};
