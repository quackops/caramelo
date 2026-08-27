import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  it('renders a button element', () => {
    render(<Button variant="primary">Click me</Button>);
    expect(
      screen.getByRole('button', { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it('renders the ghost variant without a surface or a border', () => {
    render(<Button variant="ghost">Pular</Button>);
    const button = screen.getByRole('button', { name: 'Pular' });
    expect(button).toHaveClass('bg-transparent', 'border-none', 'text-link');
  });

  it('keeps the ghost variant off the fixed control height', () => {
    render(<Button variant="ghost">Pular</Button>);
    const button = screen.getByRole('button', { name: 'Pular' });
    expect(button).toHaveClass('min-h-11');
    expect(button).not.toHaveClass('h-13');
  });

  it('renders a ghost action as a link through the as slot', () => {
    render(
      <Button as="a" variant="ghost" href="#">
        Esqueci a senha
      </Button>,
    );
    expect(screen.getByRole('link', { name: 'Esqueci a senha' })).toHaveClass(
      'text-link',
    );
  });

  it('should render polymorphic component', () => {
    render(
      <Button as="a" href="#">
        Click me
      </Button>,
    );
    expect(screen.getByRole('link', { name: /click me/i })).toBeInTheDocument();
  });
});
