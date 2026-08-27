import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ExpandableText } from './expandable-text';

const story =
  'A Nina apareceu no portão numa noite de chuva e nunca mais saiu. Hoje ela dorme no sofá e acorda todo mundo às seis da manhã.';

const setOverflow = (overflowing: boolean) => {
  Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
    configurable: true,
    get: () => (overflowing ? 200 : 60),
  });
  Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
    configurable: true,
    get: () => 60,
  });
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ExpandableText', () => {
  it('keeps the full text in the DOM while clamped', () => {
    setOverflow(true);
    render(<ExpandableText>{story}</ExpandableText>);
    expect(screen.getByText(story)).toBeInTheDocument();
  });

  it('clamps to the requested number of lines', () => {
    setOverflow(true);
    render(<ExpandableText lines={2}>{story}</ExpandableText>);
    const text = screen.getByText(story);

    expect(text.style.getPropertyValue('--clamp-lines')).toBe('2');
    expect(text).toHaveClass(
      '[-webkit-line-clamp:var(--clamp-lines)]',
      'overflow-hidden',
    );
  });

  it('offers the toggle only when the text actually overflows', () => {
    setOverflow(false);
    render(<ExpandableText>{story}</ExpandableText>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('expands and collapses on its own', () => {
    setOverflow(true);
    render(<ExpandableText>{story}</ExpandableText>);

    const toggle = screen.getByRole('button', { name: 'Ler mais' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle.getAttribute('aria-controls')).toBe(
      screen.getByText(story).id,
    );

    fireEvent.click(toggle);
    expect(screen.getByRole('button', { name: 'Ler menos' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByText(story)).not.toHaveClass('overflow-hidden');
  });

  it('defers to a controlled expanded state', () => {
    setOverflow(true);
    const onExpandedChange = vi.fn();
    render(
      <ExpandableText expanded={false} onExpandedChange={onExpandedChange}>
        {story}
      </ExpandableText>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Ler mais' }));
    expect(onExpandedChange).toHaveBeenCalledWith(true);
    expect(
      screen.getByRole('button', { name: 'Ler mais' }),
    ).toBeInTheDocument();
  });
});
