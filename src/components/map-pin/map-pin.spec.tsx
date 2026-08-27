import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MapPin } from './map-pin';

describe('MapPin', () => {
  it('names the pin for assistive tech', () => {
    render(<MapPin label="Nina · aproximadamente em Pituba" />);
    expect(
      screen.getByRole('button', { name: 'Nina · aproximadamente em Pituba' }),
    ).toBeInTheDocument();
  });

  it('marks a verified org pin with its own tone and glyph', () => {
    const { container } = render(
      <MapPin tone="verified" label="ONG Amidogo · endereço público" />,
    );

    expect(screen.getByRole('button')).toHaveClass('border-success');
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('never signals selection by colour alone', () => {
    const { container } = render(<MapPin selected label="Nina" />);
    const pin = screen.getByRole('button');

    expect(pin).toHaveAttribute('aria-pressed', 'true');
    expect(pin).toHaveClass('size-14', 'ring-2');
    expect(container.querySelectorAll('svg').length).toBeGreaterThan(0);
  });

  it('stays at the tap-target size when unselected', () => {
    render(<MapPin label="Nina" />);
    expect(screen.getByRole('button')).toHaveClass('size-11');
  });

  it('renders a thumbnail inside the pin', () => {
    render(<MapPin label="Nina" thumbnail={<img src="/nina.jpg" alt="" />} />);
    expect(screen.getByRole('button').querySelector('img')).toBeInTheDocument();
  });

  it('reports taps', () => {
    const onClick = vi.fn();
    render(<MapPin label="Nina" onClick={onClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
