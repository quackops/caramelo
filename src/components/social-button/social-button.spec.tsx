import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SocialButton } from './social-button';

describe('SocialButton', () => {
  it('renders the provider mark with the label', () => {
    const { container } = render(
      <SocialButton provider="apple" label="Entrar com Apple" />,
    );

    expect(
      screen.getByRole('button', { name: 'Entrar com Apple' }),
    ).toBeInTheDocument();
    expect(container.querySelector('svg')).toHaveAttribute(
      'fill',
      'currentColor',
    );
  });

  it('keeps the accessible name when the mark stands alone', () => {
    render(
      <SocialButton provider="google" label="Entrar com Google" compact />,
    );

    const button = screen.getByRole('button', { name: 'Entrar com Google' });
    expect(button).toHaveTextContent('');
  });

  it('lines up with the primary Button geometry', () => {
    render(<SocialButton provider="apple" label="Entrar com Apple" />);
    expect(screen.getByRole('button')).toHaveClass('h-13', 'rounded-control');
  });

  it('gives each mark its own trademark colour', () => {
    const { container: apple } = render(
      <SocialButton provider="apple" label="Apple" />,
    );
    const { container: google } = render(
      <SocialButton provider="google" label="Google" />,
    );

    expect(apple.querySelector('svg')).toHaveClass('text-neutral');
    expect(google.querySelector('svg')).toHaveClass('text-mark-google');
  });

  it('uses the native disabled attribute', () => {
    render(
      <SocialButton provider="google" label="Entrar com Google" disabled />,
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
