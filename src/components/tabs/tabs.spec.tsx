import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Tabs } from './tabs';

const items = [
  { value: 'ativos', label: 'Ativos', count: 2 },
  { value: 'pausados', label: 'Pausados' },
  { value: 'adotados', label: 'Adotados', count: 1 },
];

describe('Tabs', () => {
  it('renders a tablist with one selected tab', () => {
    render(<Tabs items={items} value="ativos" onChange={vi.fn()} />);

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
    expect(screen.getByRole('tab', { selected: true })).toHaveAttribute(
      'data-value',
      'ativos',
    );
  });

  it('folds the count into the accessible name', () => {
    render(<Tabs items={items} value="ativos" onChange={vi.fn()} />);
    expect(
      screen.getByRole('tab', { name: 'Ativos, 2 itens' }),
    ).toBeInTheDocument();
  });

  it('leaves a countless tab named by its label alone', () => {
    render(<Tabs items={items} value="ativos" onChange={vi.fn()} />);
    expect(screen.getByRole('tab', { name: 'Pausados' })).toBeInTheDocument();
  });

  it('reports the picked value', () => {
    const onChange = vi.fn();
    render(<Tabs items={items} value="ativos" onChange={onChange} />);

    fireEvent.click(screen.getByRole('tab', { name: 'Pausados' }));
    expect(onChange).toHaveBeenCalledWith('pausados');
  });

  it('moves through the strip with the arrow keys', () => {
    const onChange = vi.fn();
    render(<Tabs items={items} value="ativos" onChange={onChange} />);

    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith('pausados');

    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenCalledWith('adotados');
  });

  it('keeps a single roving tab stop', () => {
    render(<Tabs items={items} value="pausados" onChange={vi.fn()} />);

    expect(screen.getByRole('tab', { name: 'Pausados' })).toHaveAttribute(
      'tabindex',
      '0',
    );
    expect(
      screen.getByRole('tab', { name: 'Ativos, 2 itens' }),
    ).toHaveAttribute('tabindex', '-1');
  });

  it('skips a disabled tab when roving', () => {
    const onChange = vi.fn();
    render(
      <Tabs
        items={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B', disabled: true },
          { value: 'c', label: 'C' },
        ]}
        value="a"
        onChange={onChange}
      />,
    );

    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith('c');
  });

  it('never fills a tab with the brand colour', () => {
    const { container } = render(
      <Tabs items={items} value="ativos" onChange={vi.fn()} />,
    );

    for (const tab of screen.getAllByRole('tab')) {
      expect(tab.className).not.toMatch(/\bbg-brand\b/);
    }
    expect(container.querySelector('.bg-brand')).toBeTruthy();
  });

  it('scrolls rather than shrinking when the labels overflow', () => {
    render(<Tabs items={items} value="ativos" onChange={vi.fn()} />);
    expect(screen.getByRole('tablist')).toHaveClass('overflow-x-auto');
    expect(screen.getByRole('tab', { name: 'Pausados' })).toHaveClass(
      'shrink-0',
      'whitespace-nowrap',
    );
  });
});
