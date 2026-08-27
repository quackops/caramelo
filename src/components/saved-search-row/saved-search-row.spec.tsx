import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { IconButton } from '../icon-button/icon-button';
import { SavedSearchRow } from './saved-search-row';

const frequencyOptions = [
  { value: 'instant' as const, label: 'assim que aparecer' },
  { value: 'daily' as const, label: 'resumo diário' },
  { value: 'weekly' as const, label: 'resumo semanal' },
];

const renderRow = (props: Partial<Parameters<typeof SavedSearchRow>[0]> = {}) =>
  render(
    <SavedSearchRow
      name="Gata filhote perto de mim"
      filters={['gatos', 'filhote', 'até 10 km']}
      frequency="instant"
      frequencyOptions={frequencyOptions}
      frequencyLabel="Avisar"
      pausedLabel="Avisos pausados"
      onFrequencyChange={vi.fn()}
      {...props}
    />,
  );

describe('SavedSearchRow', () => {
  it('renders the search name and its filters as static tags', () => {
    renderRow();

    expect(screen.getByText('Gata filhote perto de mim')).toBeInTheDocument();
    expect(screen.getByText('até 10 km')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'gatos' })).toBeNull();
  });

  it('reports a frequency change', () => {
    const onFrequencyChange = vi.fn();
    renderRow({ onFrequencyChange });

    fireEvent.change(screen.getByLabelText('Avisar'), {
      target: { value: 'weekly' },
    });
    expect(onFrequencyChange).toHaveBeenCalledWith('weekly');
  });

  it('takes its frequency copy from the consumer', () => {
    renderRow();
    expect(screen.getByText('Avisar')).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'resumo diário' }),
    ).toBeInTheDocument();
  });

  it('changes the leading word and drops emphasis when paused', () => {
    const { container } = renderRow({ paused: true });

    expect(screen.getByText('Avisos pausados')).toBeInTheDocument();
    expect(screen.queryByText('Avisar')).not.toBeInTheDocument();
    expect(container.firstElementChild).toHaveClass('opacity-70');
  });

  it('renders the new-results pill', () => {
    renderRow({ newCount: 3 });
    expect(screen.getByText('3 novos')).toBeInTheDocument();
  });

  it('renders nothing rather than a zero', () => {
    renderRow({ newCount: 0 });
    expect(screen.queryByText(/novos/)).not.toBeInTheDocument();
  });

  it('opens the search from the name without wrapping the nested controls', () => {
    const onClick = vi.fn();
    renderRow({ onClick });

    const opener = screen.getByRole('button', {
      name: 'Gata filhote perto de mim',
    });
    expect(opener.querySelector('select')).toBeNull();

    fireEvent.click(opener);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('keeps the frequency picker and the actions out of the row click', () => {
    const onClick = vi.fn();
    const onFrequencyChange = vi.fn();
    renderRow({
      onClick,
      onFrequencyChange,
      actions: <IconButton icon="trash" aria-label="Excluir busca" />,
    });

    fireEvent.click(screen.getByRole('button', { name: 'Excluir busca' }));
    fireEvent.change(screen.getByLabelText('Avisar'), {
      target: { value: 'daily' },
    });

    expect(onClick).not.toHaveBeenCalled();
    expect(onFrequencyChange).toHaveBeenCalledWith('daily');
  });
});
