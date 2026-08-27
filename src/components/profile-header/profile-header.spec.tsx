import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from '../button/button';
import { ProfileHeader } from './profile-header';

describe('ProfileHeader', () => {
  it('renders the name as the page heading', () => {
    render(<ProfileHeader name="ONG Amidogo" initials="OA" />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'ONG Amidogo' }),
    ).toBeInTheDocument();
  });

  it('composes Badge rather than reimplementing it', () => {
    render(<ProfileHeader name="ONG Amidogo" initials="OA" badge="verified" />);
    expect(screen.getByText('ONG VERIFICADA')).toBeInTheDocument();
  });

  it('composes Avatar and names it from the profile', () => {
    render(<ProfileHeader name="ONG Amidogo" initials="OA" />);
    expect(
      screen.getByRole('img', { name: 'ONG Amidogo' }),
    ).toBeInTheDocument();
  });

  it('holds the cover height when there is no cover image', () => {
    const { container } = render(
      <ProfileHeader name="Rafael Campos" initials="RC" />,
    );
    const plate = container.querySelector('.aspect-\\[402\\/190\\]');

    expect(plate).toHaveClass('bg-caramelo-3');
    expect(plate).toHaveAttribute('aria-hidden', 'true');
  });

  it('lets a decorative cover carry an empty alt deliberately', () => {
    const { container } = render(
      <ProfileHeader name="ONG Amidogo" initials="OA" coverSrc="/capa.jpg" />,
    );
    expect(container.querySelector('img[src="/capa.jpg"]')).toHaveAttribute(
      'alt',
      '',
    );
  });

  it('renders meta and bio', () => {
    render(
      <ProfileHeader
        name="ONG Amidogo"
        initials="OA"
        meta="Salvador, BA · desde 2014"
        bio="Cuidamos de cães e gatos resgatados."
      />,
    );

    expect(screen.getByText('Salvador, BA · desde 2014')).toBeInTheDocument();
    expect(
      screen.getByText('Cuidamos de cães e gatos resgatados.'),
    ).toBeInTheDocument();
  });

  it('renders the actions the consumer supplies, with no type prop of its own', () => {
    render(
      <ProfileHeader
        name="Rafael Campos"
        initials="RC"
        actions={
          <>
            <Button variant="secondary">Editar perfil</Button>
            <Button variant="ghost">Sair</Button>
          </>
        }
      />,
    );

    expect(
      screen.getByRole('button', { name: 'Editar perfil' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sair' })).toBeInTheDocument();
  });
});
