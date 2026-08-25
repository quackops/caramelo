import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Tag } from './tag';

describe('Tag', () => {
  it('renders its label', () => {
    render(<Tag>castrada</Tag>);
    expect(screen.getByText('castrada')).toBeInTheDocument();
  });
});
