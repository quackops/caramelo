import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SwitchRow } from './switch-row';

describe('SwitchRow', () => {
  it('names the switch from the row label', () => {
    render(<SwitchRow label="Somente castrados" />);
    expect(
      screen.getByRole('switch', { name: 'Somente castrados' }),
    ).toBeInTheDocument();
  });

  it('toggles when the row label is clicked', () => {
    const onChange = vi.fn();
    render(<SwitchRow label="Somente castrados" onChange={onChange} />);

    fireEvent.click(screen.getByText('Somente castrados'));
    expect(onChange).toHaveBeenCalled();
  });

  it('exposes the description to assistive tech', () => {
    render(
      <SwitchRow
        label="Doação anônima"
        description="Seu nome não aparece para a ONG"
      />,
    );

    const control = screen.getByRole('switch');
    const describedBy = control.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy as string)).toHaveTextContent(
      'Seu nome não aparece para a ONG',
    );
  });

  it('reflects the checked state', () => {
    render(<SwitchRow label="Doar todo mês" checked onChange={vi.fn()} />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('stacks rows with a hairline between them', () => {
    const { container } = render(
      <SwitchRow.Group>
        <SwitchRow label="Somente castrados" />
        <SwitchRow label="Somente ONGs verificadas" />
      </SwitchRow.Group>,
    );

    expect(container.firstElementChild).toHaveClass(
      'divide-y',
      'divide-gray-4',
    );
    expect(screen.getAllByRole('switch')).toHaveLength(2);
  });
});
