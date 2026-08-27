import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Carousel, type CarouselProps } from './carousel';

const meta = {
  title: 'interactive/Carousel',
  component: Carousel,
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
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const Stateful = ({ index: initial, ...props }: CarouselProps) => {
  const [index, setIndex] = useState(initial);

  return <Carousel {...props} index={index} onIndexChange={setIndex} />;
};

const Slide = ({ children }: { children: string }) => (
  <div className="flex h-40 items-center justify-center bg-surface px-16 text-center">
    <span className="font-poppins text-card-title font-semibold text-neutral">
      {children}
    </span>
  </div>
);

const Photo = ({ children }: { children: string }) => (
  <div className="flex h-56 items-center justify-center bg-caramelo-3">
    <span className="font-poppins text-body text-on-brand-inverse">
      {children}
    </span>
  </div>
);

export const Onboarding: Story = {
  args: {
    label: 'Boas-vindas',
    index: 0,
    onIndexChange: () => {},
    children: [
      <Slide key="a">Encontre um bicho perto de você</Slide>,
      <Slide key="b">Converse direto com a ONG</Slide>,
      <Slide key="c">Leve para casa</Slide>,
    ],
  },
  render: (args) => <Stateful {...args} />,
};

export const ListingGallery: Story = {
  args: {
    label: 'Fotos da Nina',
    indicator: 'counter',
    index: 0,
    onIndexChange: () => {},
    children: [
      <Photo key="1">Foto 1</Photo>,
      <Photo key="2">Foto 2</Photo>,
      <Photo key="3">Foto 3</Photo>,
      <Photo key="4">Foto 4</Photo>,
      <Photo key="5">Foto 5</Photo>,
    ],
  },
  render: (args) => <Stateful {...args} />,
};

export const DotsOverPhoto: Story = {
  args: {
    label: 'Fotos da Nina',
    indicatorTone: 'over-photo',
    index: 1,
    onIndexChange: () => {},
    children: [
      <Photo key="1">Foto 1</Photo>,
      <Photo key="2">Foto 2</Photo>,
      <Photo key="3">Foto 3</Photo>,
    ],
  },
  render: (args) => <Stateful {...args} />,
};
