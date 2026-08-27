import type { Meta, StoryObj } from '@storybook/react-vite';

import { CheckList } from './check-list';

const meta = {
  title: 'brand/CheckList',
  component: CheckList,
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
} satisfies Meta<typeof CheckList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HealthAndCare: Story = {
  args: {
    items: [
      { id: 'castrada', label: 'Castrada', state: 'yes' },
      { id: 'vacinada', label: 'Vacinada', state: 'yes' },
      { id: 'vermifugada', label: 'Vermifugada', state: 'unknown' },
      { id: 'especiais', label: 'Necessidades especiais', state: 'no' },
    ],
  },
};

export const AdoptionRequirements: Story = {
  args: {
    items: [
      { id: 'entrevista', label: 'Entrevista por vídeo', state: 'required' },
      { id: 'tela', label: 'Tela de proteção nas janelas', state: 'required' },
      { id: 'termo', label: 'Termo de adoção assinado', state: 'required' },
    ],
  },
};

export const AllUnknown: Story = {
  args: {
    items: [
      { id: 'castrada', label: 'Castrada', state: 'unknown' },
      { id: 'vacinada', label: 'Vacinada', state: 'unknown' },
    ],
  },
};
