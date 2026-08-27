import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button/button';
import { SummaryRow } from './summary-row';

const meta = {
  title: 'brand/SummaryRow',
  component: SummaryRow,
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
} satisfies Meta<typeof SummaryRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fact: Story = {
  args: { label: 'CNPJ', value: '28.451.***/0001-09' },
  render: (args) => (
    <SummaryRow.Group>
      <SummaryRow {...args} />
    </SummaryRow.Group>
  ),
};

export const Transparency: Story = {
  args: { label: 'CNPJ', value: '28.451.***/0001-09' },
  render: () => (
    <SummaryRow.Group>
      <SummaryRow label="CNPJ" value="28.451.***/0001-09" />
      <SummaryRow label="Responsável" value="Viviane Lima" />
      <SummaryRow label="Endereço" value="Pituba, Salvador — BA" />
    </SummaryRow.Group>
  ),
};

export const ReviewBeforePublishing: Story = {
  args: { label: 'Fotos', value: '2 fotos' },
  render: () => (
    <SummaryRow.Group>
      <SummaryRow
        label="Fotos"
        value="2 fotos"
        action={<Button variant="ghost">Editar</Button>}
      />
      <SummaryRow
        label="Animal"
        value="Cão · fêmea · 2 anos"
        action={<Button variant="ghost">Editar</Button>}
      />
      <SummaryRow
        label="Saúde"
        value="Castrada · vacinada"
        action={<Button variant="ghost">Editar</Button>}
      />
    </SummaryRow.Group>
  ),
};

export const Receipt: Story = {
  args: { label: 'Valor', value: 'R$ 25,00' },
  render: () => (
    <SummaryRow.Group>
      <SummaryRow label="Valor" value="R$ 25,00" />
      <SummaryRow label="Data" value="23/08/2026 · 15h04" />
      <SummaryRow label="Taxa Pawee" value="R$ 0,00" />
      <SummaryRow label="Total" value="R$ 25,00" emphasis />
    </SummaryRow.Group>
  ),
};
