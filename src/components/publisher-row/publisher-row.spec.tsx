import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { PublisherRow } from './publisher-row';

describe('PublisherRow', () => {
  it('always pairs an avatar with the name', () => {
    render(<PublisherRow name="ONG Amidogo" initials="OA" />);

    expect(screen.getByText('ONG Amidogo')).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'ONG Amidogo' }),
    ).toBeInTheDocument();
  });

  it('renders the trust badge inline with the name', () => {
    render(<PublisherRow name="ONG Amidogo" initials="OA" badge="verified" />);
    expect(screen.getByText('ONG VERIFICADA')).toBeInTheDocument();
  });

  it('renders the trust numbers as meta', () => {
    render(
      <PublisherRow
        name="ONG Amidogo"
        initials="OA"
        meta="18 animais · 47 adoções concluídas"
      />,
    );
    expect(
      screen.getByText('18 animais · 47 adoções concluídas'),
    ).toBeInTheDocument();
  });

  it('stays inert without onClick', () => {
    const { container } = render(
      <PublisherRow name="Rafael Campos" initials="RC" />,
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(container.querySelectorAll('svg')).toHaveLength(0);
  });

  it('becomes a button with a chevron when it navigates', () => {
    const onClick = vi.fn();
    const { container } = render(
      <PublisherRow name="ONG Amidogo" initials="OA" onClick={onClick} />,
    );

    fireEvent.click(screen.getByRole('button', { name: /ONG Amidogo/ }));
    expect(onClick).toHaveBeenCalledOnce();
    expect(container.querySelector('svg')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });

  it('takes a smaller avatar for dense contexts', () => {
    render(
      <PublisherRow name="Rafael Campos" initials="RC" avatarSize="small" />,
    );
    expect(screen.getByRole('img', { name: 'Rafael Campos' })).toHaveClass(
      'size-32',
    );
  });

  it('renders a trailing node', () => {
    render(
      <PublisherRow
        name="Rafael Campos"
        initials="RC"
        trailing={<span>há 2 horas</span>}
      />,
    );
    expect(screen.getByText('há 2 horas')).toBeInTheDocument();
  });
});
