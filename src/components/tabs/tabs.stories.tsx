import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Tabs, type TabsProps } from './tabs';

const meta = {
  title: 'interactive/Tabs',
  component: Tabs,
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
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const Stateful = ({ value: initial, ...props }: TabsProps) => {
  const [value, setValue] = useState(initial);

  return <Tabs {...props} value={value} onChange={setValue} />;
};

export const OngProfile: Story = {
  args: {
    items: [
      { value: 'animais', label: 'Animais' },
      { value: 'sobre', label: 'Sobre' },
      { value: 'transparencia', label: 'Transparência' },
    ],
    value: 'animais',
    onChange: () => {},
  },
  render: (args) => <Stateful {...args} />,
};

export const WithCounts: Story = {
  args: {
    items: [
      { value: 'ativos', label: 'Ativos', count: 2 },
      { value: 'pausados', label: 'Pausados' },
      { value: 'adotados', label: 'Adotados', count: 1 },
    ],
    value: 'ativos',
    onChange: () => {},
  },
  render: (args) => <Stateful {...args} />,
};

export const Favourites: Story = {
  args: {
    items: [
      { value: 'salvos', label: 'Salvos', count: 4 },
      { value: 'buscas', label: 'Buscas salvas', count: 2 },
    ],
    value: 'salvos',
    onChange: () => {},
  },
  render: (args) => <Stateful {...args} />,
};

export const WithDisabled: Story = {
  args: {
    items: [
      { value: 'animais', label: 'Animais' },
      { value: 'sobre', label: 'Sobre' },
      { value: 'transparencia', label: 'Transparência', disabled: true },
    ],
    value: 'animais',
    onChange: () => {},
  },
  render: (args) => <Stateful {...args} />,
};
