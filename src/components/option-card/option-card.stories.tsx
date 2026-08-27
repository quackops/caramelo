import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { OptionCard } from './option-card';

const meta = {
  title: 'interactive/OptionCard',
  component: OptionCard,
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
  args: { onChange: fn() },
} satisfies Meta<typeof OptionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Animal para adoção',
    description: 'Meu ou resgatado, pronto para um lar',
  },
};

export const Selected: Story = {
  args: {
    title: 'Animal para adoção',
    description: 'Meu ou resgatado, pronto para um lar',
    defaultChecked: true,
  },
};

export const WithIcon: Story = {
  args: {
    title: 'Animal perdido',
    description: 'Sumiu e estou procurando',
    icon: 'search',
  },
};

export const PublishGroup: Story = {
  args: { title: 'Animal para adoção' },
  render: (args) => (
    <OptionCard.Group label="O que você quer publicar?">
      <OptionCard
        {...args}
        title="Animal para adoção"
        description="Meu ou resgatado, pronto para um lar"
        icon="heart"
        value="adocao"
        defaultChecked
      />
      <OptionCard
        {...args}
        title="Animal perdido"
        description="Sumiu e estou procurando"
        icon="search"
        value="perdido"
      />
      <OptionCard
        {...args}
        title="Animal encontrado"
        description="Achei na rua, procuro o tutor"
        icon="map-pin"
        value="encontrado"
      />
    </OptionCard.Group>
  ),
};
