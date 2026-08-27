import type { Meta, StoryObj } from '@storybook/react-vite';

import { Select } from './select';

const meta = {
  title: 'interactive/Select',
  component: Select,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'porte',
    label: 'Porte',
    defaultValue: 'medio',
    children: (
      <>
        <option value="pequeno">Pequeno</option>
        <option value="medio">Médio</option>
        <option value="grande">Grande</option>
      </>
    ),
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'Cidade',
    defaultValue: 'ssa',
    className: 'font-poppins text-title font-semibold',
    children: (
      <>
        <option value="ssa">Salvador, BA</option>
        <option value="sp">São Paulo, SP</option>
        <option value="rj">Rio de Janeiro, RJ</option>
      </>
    ),
  },
};

export const GhostInline: Story = {
  args: {
    variant: 'ghost',
    label: 'Frequência do alerta',
    defaultValue: 'imediato',
    className: 'font-poppins text-label font-medium',
    children: (
      <>
        <option value="imediato">assim que aparecer</option>
        <option value="diario">resumo diário</option>
        <option value="semanal">resumo semanal</option>
      </>
    ),
  },
};
