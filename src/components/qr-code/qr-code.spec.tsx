import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { QrCode } from './qr-code';

const matrix = [
  [true, false, true],
  [false, true, false],
  [true, false, true],
];

describe('QrCode', () => {
  it('renders a pre-encoded matrix as crisp SVG', () => {
    const { container } = render(
      <QrCode matrix={matrix} label="QR code para pagamento PIX de R$ 25,00" />,
    );
    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('shape-rendering', 'crispEdges');
    expect(
      screen.getByRole('img', {
        name: 'QR code para pagamento PIX de R$ 25,00',
      }),
    ).toBeInTheDocument();
  });

  it('draws one rect per dark module plus the plate', () => {
    const { container } = render(<QrCode matrix={matrix} label="QR" />);
    expect(container.querySelectorAll('rect')).toHaveLength(6);
  });

  it('surrounds the code with a four-module quiet zone', () => {
    const { container } = render(<QrCode matrix={matrix} label="QR" />);
    expect(container.querySelector('svg')).toHaveAttribute(
      'viewBox',
      '0 0 11 11',
    );
  });

  it('keeps the plate light regardless of theme', () => {
    const { container } = render(<QrCode matrix={matrix} label="QR" />);
    expect(container.firstElementChild).toHaveClass('bg-qr-plate');
  });

  it('accepts a pre-rendered image instead of a matrix', () => {
    render(<QrCode src="/pix.svg" label="QR code para pagamento PIX" />);
    expect(
      screen.getByRole('img', { name: 'QR code para pagamento PIX' }),
    ).toHaveAttribute('src', '/pix.svg');
  });

  it('renders nothing when it has no payload to draw', () => {
    const { container } = render(<QrCode label="QR" />);
    expect(container).toBeEmptyDOMElement();
  });

  it('sizes the plate from a single prop', () => {
    const { container } = render(
      <QrCode matrix={matrix} label="QR" size={240} />,
    );
    expect(container.firstElementChild).toHaveStyle({
      width: '240px',
      height: '240px',
    });
  });
});
