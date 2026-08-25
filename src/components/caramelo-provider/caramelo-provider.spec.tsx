import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CarameloProvider } from './caramelo-provider';

describe('CarameloProvider', () => {
  it('renders children', () => {
    render(<CarameloProvider>Content</CarameloProvider>);

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('defaults to the caramelo theme', () => {
    render(<CarameloProvider>Content</CarameloProvider>);

    expect(screen.getByText('Content')).toHaveAttribute(
      'data-theme',
      'caramelo',
    );
  });

  it('applies the pawee theme when requested', () => {
    render(<CarameloProvider theme="pawee">Content</CarameloProvider>);

    expect(screen.getByText('Content')).toHaveAttribute('data-theme', 'pawee');
  });
});
