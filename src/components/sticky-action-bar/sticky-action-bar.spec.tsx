import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from '../button/button';
import { IconButton } from '../icon-button/icon-button';
import { StickyActionBar } from './sticky-action-bar';

describe('StickyActionBar', () => {
  it('sticks to the bottom of its scroll container', () => {
    const { container } = render(
      <StickyActionBar>
        <Button>Tenho interesse</Button>
      </StickyActionBar>,
    );

    expect(container.firstElementChild).toHaveClass('sticky', 'bottom-0');
    expect(container.firstElementChild).not.toHaveClass('fixed');
  });

  it('separates itself with the protection gradient alone', () => {
    const { container } = render(
      <StickyActionBar>
        <Button>Continuar</Button>
      </StickyActionBar>,
    );
    const bar = container.firstElementChild;

    expect(bar?.className).toMatch(/linear-gradient\(to_top,var\(--color-bg\)/);
    expect(bar?.className).not.toMatch(/\bshadow-|\bborder-t\b/);
  });

  it('can sit on a surface instead of the page background', () => {
    const { container } = render(
      <StickyActionBar surface="surface">
        <Button>Continuar</Button>
      </StickyActionBar>,
    );

    expect(container.firstElementChild?.className).toMatch(
      /var\(--color-surface\)/,
    );
  });

  it('lays its actions out in a row', () => {
    render(
      <StickyActionBar>
        <Button>Tenho interesse</Button>
        <IconButton icon="message-circle" aria-label="Abrir no WhatsApp" />
      </StickyActionBar>,
    );

    expect(
      screen.getByRole('button', { name: 'Tenho interesse' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Abrir no WhatsApp' }),
    ).toBeInTheDocument();
  });

  it('keeps a fixed-size icon action out of the growing row', () => {
    const { container } = render(
      <StickyActionBar>
        <Button>Tenho interesse</Button>
      </StickyActionBar>,
    );

    expect(container.firstElementChild).toHaveClass(
      '[&>button.size-11]:flex-none',
    );
  });
});
