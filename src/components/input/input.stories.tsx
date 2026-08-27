import type { Meta, StoryObj } from '@storybook/react-vite';

import { IconButton } from '../icon-button/icon-button';
import { Input } from './input';

const meta = {
  title: 'interactive/Input',
  component: Input,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'name',
    label: 'Nome do animal',
    placeholder: 'Ex.: Nina',
  },
};

export const Focused: Story = {
  args: {
    id: 'name-focus',
    label: 'Nome do animal · foco',
    defaultValue: 'Nina',
    autoFocus: true,
  },
};

export const ErrorState: Story = {
  args: {
    id: 'email',
    label: 'E-mail',
    defaultValue: 'dino@pawee',
    error: 'Insira um e-mail válido',
  },
};

export const WithHint: Story = {
  args: {
    id: 'cep',
    label: 'CEP',
    placeholder: '00000-000',
    hint: 'Só usamos para calcular a distância até você.',
  },
};

export const WithLeadingAffix: Story = {
  args: {
    id: 'amount',
    label: 'Outro valor',
    placeholder: '0,00',
    leading: 'R$',
  },
};

export const WithTrailingAction: Story = {
  args: {
    id: 'password',
    label: 'Senha',
    type: 'password',
    defaultValue: 'caramelo123',
    trailing: <IconButton icon="eye" aria-label="Mostrar senha" />,
  },
};
