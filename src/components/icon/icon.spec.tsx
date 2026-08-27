import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Icon, iconNames } from './icon';

describe('Icon', () => {
  it('renders an svg on a 24 viewBox for every name', () => {
    for (const name of iconNames) {
      const { container, unmount } = render(<Icon name={name} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
      unmount();
    }
  });

  it('is hidden from assistive tech without a label', () => {
    const { container } = render(<Icon name="home" />);
    expect(container.querySelector('svg')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });

  it('becomes an img role when labelled', () => {
    const { container } = render(<Icon name="home" aria-label="Início" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('role', 'img');
    expect(svg).not.toHaveAttribute('aria-hidden');
  });

  it('thickens the stroke below 14px', () => {
    const { container } = render(<Icon name="home" size={12} />);
    expect(container.querySelector('svg')).toHaveAttribute(
      'stroke-width',
      '2.4',
    );
  });
});
