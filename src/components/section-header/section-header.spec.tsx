import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from '../button/button';
import { SectionHeader } from './section-header';

describe('SectionHeader', () => {
  it('renders the title as a real heading', () => {
    render(<SectionHeader title="Espécie" />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Espécie' }),
    ).toBeInTheDocument();
  });

  it('lets the consumer pick the heading level', () => {
    render(<SectionHeader title="Hoje" titleAs="h3" variant="eyebrow" />);
    expect(
      screen.getByRole('heading', { level: 3, name: 'Hoje' }),
    ).toBeInTheDocument();
  });

  it('uses the sentence-case label treatment by default', () => {
    render(<SectionHeader title="Distância" />);
    expect(screen.getByRole('heading')).toHaveClass(
      'text-label',
      'text-neutral-2',
    );
  });

  it('uppercases the eyebrow treatment', () => {
    render(<SectionHeader title="Buscas recentes" variant="eyebrow" />);
    expect(screen.getByRole('heading')).toHaveClass(
      'uppercase',
      'text-micro',
      'text-neutral-3',
    );
  });

  it('renders a count after the title', () => {
    render(<SectionHeader title="Salvos" count={4} />);
    expect(
      screen.getByRole('heading', { name: /Salvos 4/ }),
    ).toBeInTheDocument();
  });

  it('renders a right-aligned action', () => {
    render(
      <SectionHeader
        title="Avisos"
        action={<Button variant="ghost">Marcar lidos</Button>}
      />,
    );
    expect(
      screen.getByRole('button', { name: 'Marcar lidos' }),
    ).toBeInTheDocument();
  });
});
