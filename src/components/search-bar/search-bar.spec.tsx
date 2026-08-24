import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SearchBar } from './search-bar';

describe('SearchBar', () => {
  it('renders the placeholder', () => {
    render(
      <SearchBar
        placeholder="Buscar por nome, raça ou bairro"
        readOnly
        value=""
      />,
    );
    expect(
      screen.getByPlaceholderText('Buscar por nome, raça ou bairro'),
    ).toBeInTheDocument();
  });

  it('shows a clear button with a value and calls onClear', () => {
    const onClear = vi.fn();
    render(<SearchBar value="poodle" onClear={onClear} readOnly />);

    fireEvent.click(screen.getByRole('button', { name: /limpar busca/i }));

    expect(onClear).toHaveBeenCalled();
  });
});
