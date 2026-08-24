import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Fab } from './fab';

describe('Fab', () => {
  it('renders a button with children', () => {
    render(<Fab aria-label="Publicar">+</Fab>);

    expect(
      screen.getByRole('button', { name: /publicar/i }),
    ).toBeInTheDocument();
  });
});
