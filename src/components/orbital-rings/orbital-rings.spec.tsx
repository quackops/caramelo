import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OrbitalRings } from './orbital-rings';

describe('OrbitalRings', () => {
  it('is decorative and never announced', () => {
    const { container } = render(<OrbitalRings />);
    expect(container.querySelector('svg')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });

  it('draws one solid and one dashed ring', () => {
    const { container } = render(<OrbitalRings />);
    const [outer, inner] = container.querySelectorAll('circle');

    expect(outer).not.toHaveAttribute('stroke-dasharray');
    expect(inner).toHaveAttribute('stroke-dasharray', '6 8');
  });

  it('scales everything from a single size', () => {
    const { container } = render(<OrbitalRings size={110} />);
    expect(container.firstElementChild).toHaveStyle({
      width: '110px',
      height: '110px',
    });
    expect(container.querySelector('svg')).toHaveAttribute(
      'viewBox',
      '0 0 150 150',
    );
  });

  it('is static unless asked to rotate', () => {
    const { container } = render(<OrbitalRings />);
    expect(container.querySelector('svg')).not.toHaveClass(
      'motion-safe:animate-orbit',
    );
  });

  it('rotates the whole svg once, and only when motion is safe', () => {
    const { container } = render(<OrbitalRings animated />);
    expect(container.querySelector('svg')).toHaveClass(
      'motion-safe:animate-orbit',
    );
    expect(
      container.querySelectorAll('.motion-safe\\:animate-orbit'),
    ).toHaveLength(1);
  });

  it('centres its children inside the rings', () => {
    const { container, getByText } = render(
      <OrbitalRings>
        <span>Dino</span>
      </OrbitalRings>,
    );

    expect(getByText('Dino')).toBeInTheDocument();
    expect(container.firstElementChild).toHaveClass(
      'items-center',
      'justify-center',
    );
  });
});
