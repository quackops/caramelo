import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button/button';
import { SectionHeader } from './section-header';

const meta = {
  title: 'brand/SectionHeader',
  component: SectionHeader,
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
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FieldGroupLabel: Story = {
  args: { title: 'Espécie' },
};

export const PageEyebrow: Story = {
  args: { title: 'O que acontece agora', variant: 'eyebrow' },
};

export const WithCount: Story = {
  args: { title: 'Salvos', count: 4 },
};

export const WithAction: Story = {
  args: {
    title: 'Filtros',
    action: <Button variant="ghost">Limpar</Button>,
  },
};

export const NoticeGroups: Story = {
  args: { title: 'Hoje', variant: 'eyebrow' },
  render: (args) => (
    <div className="flex flex-col gap-16">
      <SectionHeader {...args} title="Hoje" variant="eyebrow" />
      <SectionHeader
        {...args}
        title="Esta semana"
        variant="eyebrow"
        action={<Button variant="ghost">Marcar lidos</Button>}
      />
    </div>
  ),
};
