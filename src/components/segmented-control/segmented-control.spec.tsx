import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SegmentedControl } from './segmented-control';

const options = [
  { label: 'Lista', value: 'list' },
  { label: 'Grade', value: 'grid' },
  { label: 'Mapa', value: 'map' },
];

describe('SegmentedControl', () => {
  it('renders every option', () => {
    render(<SegmentedControl options={options} value="list" />);
    for (const option of options) {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    }
  });

  it('calls onChange with the selected value', () => {
    const onChange = vi.fn();
    render(
      <SegmentedControl options={options} value="list" onChange={onChange} />,
    );

    fireEvent.click(screen.getByText('Grade'));

    expect(onChange).toHaveBeenCalledWith('grid');
  });
});
