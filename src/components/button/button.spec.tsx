import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  it('renders a button element', () => {
    render(<Button variant="brand">Click me</Button>);
    expect(
      screen.getByRole('button', { name: /click me/i }),
    ).toBeInTheDocument();
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
