import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MapArea } from './map-area';

describe('MapArea', () => {
  it('renders an area rather than a point', () => {
    const { container } = render(<MapArea label="Área aproximada" />);
    const circle = container.querySelector('[aria-hidden="true"]');

    expect(circle).toHaveClass('rounded-full', 'border-dashed');
    expect(screen.getByText(/Área aproximada/)).toBeInTheDocument();
  });

  it('states the radius beside the label', () => {
    render(<MapArea label="Área aproximada" radiusLabel="raio de 400 m" />);
    expect(screen.getByText(/raio de 400 m/)).toBeInTheDocument();
  });

  it('renders over a static backdrop the consumer supplies', () => {
    render(
      <MapArea
        label="Área aproximada"
        backdrop={<img src="/map.png" alt="" />}
      />,
    );
    expect(document.querySelector('img[src="/map.png"]')).toBeInTheDocument();
  });
});
