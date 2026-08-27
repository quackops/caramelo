import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MapCluster } from './map-cluster';

describe('MapCluster', () => {
  it('renders the count with an explanatory name', () => {
    render(<MapCluster count={12} label="12 bichos nesta área" />);

    expect(screen.getByText('12')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '12 bichos nesta área' }),
    ).toBeInTheDocument();
  });

  it('zooms in when tapped', () => {
    const onClick = vi.fn();
    render(<MapCluster count={4} label="4 bichos" onClick={onClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('keeps the numerals from jittering', () => {
    render(<MapCluster count={128} label="128 bichos" />);
    expect(screen.getByText('128')).toHaveClass('tabular-nums');
  });
});
