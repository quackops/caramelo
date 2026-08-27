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

  it('renders an Icon from the icon prop', () => {
    const { container } = render(<Fab aria-label="Publicar" icon="plus" />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
