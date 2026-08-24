import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { IconButton } from './icon-button';

describe('IconButton', () => {
  it('renders a button with children', () => {
    render(
      <IconButton aria-label="Favorite">
        <span>heart</span>
      </IconButton>,
    );

    expect(
      screen.getByRole('button', { name: /favorite/i }),
    ).toBeInTheDocument();
  });

  it('applies the active state', () => {
    render(
      <IconButton aria-label="Favorite" active>
        <span>heart</span>
      </IconButton>,
    );

    expect(screen.getByRole('button')).toHaveClass('bg-caramelo-4');
  });
});
