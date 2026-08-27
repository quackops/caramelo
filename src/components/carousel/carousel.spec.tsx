import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Carousel } from './carousel';

const slides = [
  <p key="a">Encontre um bicho perto de você</p>,
  <p key="b">Converse direto com a ONG</p>,
  <p key="c">Leve para casa</p>,
];

describe('Carousel', () => {
  it('names the region and every slide', () => {
    render(
      <Carousel label="Boas-vindas" index={0} onIndexChange={vi.fn()}>
        {slides}
      </Carousel>,
    );

    const region = screen.getByRole('region', { name: 'Boas-vindas' });
    expect(region).toHaveAttribute('aria-roledescription', 'carousel');
    expect(screen.getByRole('group', { name: '1 de 3' })).toHaveAttribute(
      'aria-roledescription',
      'slide',
    );
  });

  it('snaps one slide per scroll position', () => {
    const { container } = render(
      <Carousel label="Boas-vindas" index={0} onIndexChange={vi.fn()}>
        {slides}
      </Carousel>,
    );

    const track = container.querySelector('[tabindex="0"]');
    expect(track).toHaveClass('snap-x', 'snap-mandatory', 'overflow-x-auto');
    expect(screen.getAllByRole('group')).toHaveLength(3);
  });

  it('moves forward and back with the arrow keys', () => {
    const onIndexChange = vi.fn();
    const { container } = render(
      <Carousel label="Boas-vindas" index={1} onIndexChange={onIndexChange}>
        {slides}
      </Carousel>,
    );

    const track = container.querySelector('[tabindex="0"]') as HTMLElement;
    fireEvent.keyDown(track, { key: 'ArrowRight' });
    expect(onIndexChange).toHaveBeenCalledWith(2);

    fireEvent.keyDown(track, { key: 'ArrowLeft' });
    expect(onIndexChange).toHaveBeenCalledWith(0);
  });

  it('stops at the ends rather than looping', () => {
    const onIndexChange = vi.fn();
    const { container } = render(
      <Carousel label="Boas-vindas" index={0} onIndexChange={onIndexChange}>
        {slides}
      </Carousel>,
    );

    const track = container.querySelector('[tabindex="0"]') as HTMLElement;
    fireEvent.keyDown(track, { key: 'ArrowLeft' });
    expect(onIndexChange).not.toHaveBeenCalled();
  });

  it('reuses StepProgress for the dots', () => {
    render(
      <Carousel label="Boas-vindas" index={1} onIndexChange={vi.fn()}>
        {slides}
      </Carousel>,
    );

    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('aria-valuenow', '2');
    expect(progress).toHaveAttribute('aria-valuemax', '3');
  });

  it('renders the counter pill over the media', () => {
    render(
      <Carousel
        label="Fotos da Nina"
        indicator="counter"
        index={0}
        onIndexChange={vi.fn()}
      >
        {slides}
      </Carousel>,
    );

    expect(screen.getByText('1 de 3')).toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('can render no indicator at all', () => {
    render(
      <Carousel
        label="Fotos da Nina"
        indicator="none"
        index={0}
        onIndexChange={vi.fn()}
      >
        {slides}
      </Carousel>,
    );

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    expect(screen.queryByText('1 de 3')).not.toBeInTheDocument();
  });
});
