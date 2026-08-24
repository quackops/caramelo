import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Avatar } from './avatar';

describe('Avatar', () => {
  it('renders initials when there is no photo', () => {
    render(<Avatar initials="AM" alt="ONG Amidogo" />);
    expect(screen.getByText('AM')).toBeInTheDocument();
  });

  it('renders an image when a src is provided', () => {
    render(<Avatar src="/nina.jpg" alt="Nina" />);
    expect(screen.getByRole('img', { name: 'Nina' })).toBeInTheDocument();
  });
});
