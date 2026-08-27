import type { Meta, StoryObj } from '@storybook/react-vite';

import { EmptyState } from './empty-state';

const meta = {
  title: 'interactive/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The illustration slot takes a square SVG that the consuming app owns; caramelo ships no artwork. The stories below stand in for the Dino at the sizes the slot expects.',
      },
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

const IllustrationPlaceholder = ({ children }: { children: string }) => (
  <span className="flex size-full items-center justify-center text-center font-poppins text-badge text-on-brand-inverse">
    {children}
  </span>
);

export const Empty: Story = {
  args: {
    title: 'Nenhum bicho por aqui',
    description:
      'Seus filtros estão bem estreitos. Solta a distância e olha de novo.',
    actionLabel: 'Limpar filtros',
  },
};

export const WithIllustration: Story = {
  args: {
    title: 'Nenhum bicho por aqui',
    description:
      'Seus filtros estão bem estreitos. Solta a distância e olha de novo.',
    actionLabel: 'Limpar filtros',
    illustration: (
      <IllustrationPlaceholder>dino-crying</IllustrationPlaceholder>
    ),
  },
};

export const NothingSaved: Story = {
  args: {
    title: 'Você ainda não salvou ninguém',
    description: 'Toque no coração de um bicho para guardar aqui.',
    actionLabel: 'Ir para o mural',
    illustration: (
      <IllustrationPlaceholder>dino-crying</IllustrationPlaceholder>
    ),
  },
};

export const ErrorState: Story = {
  args: {
    variant: 'error',
    title: 'Não conseguimos carregar',
    description: 'A culpa provavelmente é nossa.',
    actionLabel: 'Tentar de novo',
  },
};
