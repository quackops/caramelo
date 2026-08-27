import type { Meta, StoryObj } from '@storybook/react-vite';

import { Select } from './select';

const meta = {
  title: 'interactive/Select',
  component: Select,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'porte',
    label: 'Porte',
    defaultValue: 'medio',
    children: (
      <>
        <option value="pequeno">Pequeno</option>
        <option value="medio">Médio</option>
        <option value="grande">Grande</option>
      </>
    ),
  },
};
