import type { Meta, StoryObj } from '@storybook/react-vite';

import { ExpandableText } from './expandable-text';

const meta = {
  title: 'brand/ExpandableText',
  component: ExpandableText,
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
} satisfies Meta<typeof ExpandableText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ListingStory: Story = {
  args: {
    children:
      'A Nina apareceu no portão numa noite de chuva e nunca mais saiu. Ela é dócil, se dá bem com crianças e com o gato da casa, e já está castrada e vacinada. Procuramos um lar com tela nas janelas, porque ela adora subir no parapeito. Ela dorme a noite inteira e acorda todo mundo às seis da manhã pedindo carinho.',
  },
};

export const ShortEnoughToFit: Story = {
  args: {
    children: 'A Nina é dócil e já está castrada.',
  },
};

export const OngBio: Story = {
  args: {
    lines: 4,
    children:
      'O Lar Tintin cuida de cães e gatos resgatados em Salvador desde 2014. Somos oito voluntários e mantemos hoje 18 animais em lares temporários. Todo o dinheiro doado vai para ração, vacinas e castrações — a prestação de contas fica na aba Transparência.',
  },
};
