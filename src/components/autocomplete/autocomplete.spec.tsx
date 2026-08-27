import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Autocomplete } from './autocomplete';

const options = [
  { value: 'ssa', label: 'Salvador, BA' },
  { value: 'lauro', label: 'Lauro de Freitas, BA' },
  { value: 'camacari', label: 'Camaçari, BA' },
];

const renderAutocomplete = (
  props: Partial<Parameters<typeof Autocomplete>[0]> = {},
) =>
  render(
    <Autocomplete
      label="Cidade"
      value="sal"
      options={options}
      onQueryChange={vi.fn()}
      onSelect={vi.fn()}
      {...props}
    />,
  );

describe('Autocomplete', () => {
  it('renders a collapsed combobox', () => {
    renderAutocomplete();
    const field = screen.getByRole('combobox', { name: 'Cidade' });

    expect(field).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('opens the listbox on focus and points at the active option', () => {
    renderAutocomplete();
    const field = screen.getByRole('combobox');

    fireEvent.focus(field);
    expect(field).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(field.getAttribute('aria-activedescendant')).toBe(
      screen.getAllByRole('option')[0].id,
    );
  });

  it('reports the typed query without filtering', () => {
    const onQueryChange = vi.fn();
    renderAutocomplete({ onQueryChange });

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'lauro' },
    });
    expect(onQueryChange).toHaveBeenCalledWith('lauro');
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  it('moves the active option with the arrow keys', () => {
    renderAutocomplete();
    const field = screen.getByRole('combobox');
    fireEvent.focus(field);

    fireEvent.keyDown(field, { key: 'ArrowDown' });
    expect(screen.getAllByRole('option')[1]).toHaveAttribute(
      'aria-selected',
      'true',
    );

    fireEvent.keyDown(field, { key: 'ArrowUp' });
    expect(screen.getAllByRole('option')[0]).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  it('selects the active option with Enter', () => {
    const onSelect = vi.fn();
    renderAutocomplete({ onSelect });
    const field = screen.getByRole('combobox');

    fireEvent.focus(field);
    fireEvent.keyDown(field, { key: 'ArrowDown' });
    fireEvent.keyDown(field, { key: 'Enter' });

    expect(onSelect).toHaveBeenCalledWith(options[1]);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('selects on pointer without losing the field focus', () => {
    const onSelect = vi.fn();
    renderAutocomplete({ onSelect });
    fireEvent.focus(screen.getByRole('combobox'));

    fireEvent.mouseDown(screen.getByText('Camaçari, BA'));
    expect(onSelect).toHaveBeenCalledWith(options[2]);
  });

  it('closes on Escape without selecting', () => {
    const onSelect = vi.fn();
    renderAutocomplete({ onSelect });
    const field = screen.getByRole('combobox');

    fireEvent.focus(field);
    fireEvent.keyDown(field, { key: 'Escape' });

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('closes on Tab', () => {
    renderAutocomplete();
    const field = screen.getByRole('combobox');

    fireEvent.focus(field);
    fireEvent.keyDown(field, { key: 'Tab' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('shows a spinner while loading instead of replacing the field', () => {
    renderAutocomplete({ loading: true, options: [] });
    fireEvent.focus(screen.getByRole('combobox'));

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByLabelText('Carregando')).toBeInTheDocument();
  });

  it('shows the empty label rather than an empty box', () => {
    renderAutocomplete({
      options: [],
      emptyLabel: 'Nenhuma cidade encontrada',
    });
    fireEvent.focus(screen.getByRole('combobox'));

    expect(screen.getByText('Nenhuma cidade encontrada')).toBeInTheDocument();
  });

  it('stays closed when there is nothing to show', () => {
    renderAutocomplete({ options: [], value: '' });
    fireEvent.focus(screen.getByRole('combobox'));

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('renders the suggestion count', () => {
    renderAutocomplete({
      options: [{ value: 'gato-filhote', label: 'gato filhote', count: 18 }],
    });
    fireEvent.focus(screen.getByRole('combobox'));

    expect(screen.getByText('18')).toBeInTheDocument();
  });
});
