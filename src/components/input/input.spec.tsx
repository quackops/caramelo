import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Input } from './input';

describe('Input', () => {
  it('renders a labelled text field', () => {
    render(<Input id="name" label="Nome do animal" placeholder="Ex.: Nina" />);
    expect(screen.getByLabelText('Nome do animal')).toBeInTheDocument();
  });

  it('renders an error message and marks the field invalid', () => {
    render(<Input id="email" label="E-mail" error="Insira um e-mail válido" />);
    expect(screen.getByText('Insira um e-mail válido')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });
});
