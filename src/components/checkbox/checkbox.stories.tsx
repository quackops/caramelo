import type { Meta, StoryObj } from '@storybook/react-vite';

import { Checkbox } from './checkbox';

const meta = {
  title: 'interactive/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 340 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Manter conectado' },
};

export const Checked: Story = {
  args: { label: 'Manter conectado', defaultChecked: true },
};

export const Disabled: Story = {
  args: { label: 'Manter conectado', disabled: true },
};

export const MultiLineWithLinks: Story = {
  args: {
    label: (
      <>
        Li e aceito os <a href="/termos">Termos de uso</a> e a{' '}
        <a href="/privacidade">Política de privacidade</a>. Tenho mais de 18
        anos.
      </>
    ),
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Li e aceito os Termos de uso',
    error: 'Você precisa aceitar os termos para continuar',
  },
};
