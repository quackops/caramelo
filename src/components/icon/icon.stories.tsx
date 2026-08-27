import type { Meta, StoryObj } from '@storybook/react-vite';

import { Icon, iconNames } from './icon';

const meta = {
  title: 'brand/Icon',
  component: Icon,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    name: 'home',
    size: 24,
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-end gap-4 text-neutral-2">
      {[12, 16, 22, 32, 48].map((size) => (
        <Icon key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

export const Gallery: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 text-neutral-2">
      {iconNames.map((name) => (
        <div key={name} className="flex w-[58px] flex-col items-center gap-1.5">
          <Icon name={name} size={22} />
          <span className="text-center text-[8px] text-neutral-3">{name}</span>
        </div>
      ))}
    </div>
  ),
};
