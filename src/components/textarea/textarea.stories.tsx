import type { Meta, StoryObj } from '@storybook/react-vite';

import { Textarea } from './textarea';

const meta = {
  title: 'interactive/Textarea',
  component: Textarea,
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
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'historia',
    label: 'História',
    placeholder: 'Conte como ela chegou até você',
  },
};

export const WithCounter: Story = {
  args: {
    id: 'historia-count',
    label: 'História',
    maxLength: 400,
    showCount: true,
    defaultValue:
      'A Nina apareceu no portão numa noite de chuva e nunca mais saiu.',
  },
};

export const NearTheLimit: Story = {
  args: {
    id: 'historia-limit',
    label: 'História',
    maxLength: 60,
    showCount: true,
    defaultValue: 'A Nina apareceu no portão numa noite de chuva e nunca mais.',
  },
};

export const AutoGrow: Story = {
  args: {
    id: 'mensagem',
    label: 'Sua mensagem',
    autoGrow: true,
    hint: 'Você pode editar antes de enviar',
    defaultValue:
      'Oi! Vi o anúncio da Nina no mural da Pawee e tenho interesse em adotar.',
  },
};

export const ErrorState: Story = {
  args: {
    id: 'historia-error',
    label: 'História',
    maxLength: 400,
    showCount: true,
    error: 'Escreva pelo menos 20 caracteres',
  },
};
