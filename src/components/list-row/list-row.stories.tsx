import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { IconButton } from '../icon-button/icon-button';
import { ListRow } from './list-row';

const meta = {
  title: 'interactive/ListRow',
  component: ListRow,
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
  args: { onClick: fn() },
} satisfies Meta<typeof ListRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: 'Minhas candidaturas', chevron: true },
};

export const WithIconAndCount: Story = {
  args: { title: 'gato filhote', icon: 'search', count: 18 },
};

export const WithBadgeCount: Story = {
  args: { title: 'Meus anúncios', badgeCount: 2, chevron: true },
};

export const WithDescription: Story = {
  args: {
    title: 'Virar uma ONG verificada',
    description: 'Aumenta a confiança de quem quer adotar',
    icon: 'shield',
    chevron: true,
  },
};

export const RecentSearch: Story = {
  args: {
    title: 'cachorro porte pequeno',
    icon: 'clock',
    trailing: <IconButton icon="x" aria-label="Remover busca" />,
  },
};

export const ProfileMenu: Story = {
  args: { title: 'Meus anúncios' },
  render: (args) => (
    <ListRow.Group>
      <ListRow {...args} title="Meus anúncios" badgeCount={2} chevron />
      <ListRow {...args} title="Minhas candidaturas" chevron />
      <ListRow {...args} title="Minhas doações" chevron />
      <ListRow
        {...args}
        title="Virar uma ONG verificada"
        icon="shield"
        chevron
      />
    </ListRow.Group>
  ),
};
