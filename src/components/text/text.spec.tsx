import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Text } from './text';

describe('Text', () => {
  it('should render children', () => {
    render(<Text>Content</Text>);

    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
