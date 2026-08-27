import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button/button';
import { ProfileHeader } from './profile-header';

const meta = {
  title: 'brand/ProfileHeader',
  component: ProfileHeader,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 402 }} className="bg-bg pb-16">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProfileHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ong: Story = {
  args: {
    name: 'ONG Amidogo',
    initials: 'OA',
    badge: 'verified',
    meta: 'Salvador, BA · desde 2014',
    bio: 'Cuidamos de cães e gatos resgatados em Salvador. Somos oito voluntários e mantemos 18 animais em lares temporários.',
    actions: (
      <>
        <Button variant="secondary">Seguir</Button>
        <Button>Doar</Button>
      </>
    ),
  },
};

export const Tutor: Story = {
  args: {
    name: 'Rafael Campos',
    initials: 'RC',
    meta: 'Itapuã, Salvador · desde 2023',
    actions: (
      <>
        <Button variant="secondary">Editar perfil</Button>
        <Button variant="ghost">Sair</Button>
      </>
    ),
  },
};

export const WithoutCover: Story = {
  args: {
    name: 'Lar Tintin',
    initials: 'LT',
    badge: 'tutor',
    meta: 'Pituba, Salvador · desde 2019',
  },
};
