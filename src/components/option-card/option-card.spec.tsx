import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { OptionCard } from './option-card';

const renderGroup = (onChange = vi.fn()) =>
  render(
    <OptionCard.Group label="O que você quer publicar?">
      <OptionCard
        title="Animal para adoção"
        description="Meu ou resgatado, pronto para um lar"
        icon="heart"
        value="adocao"
        defaultChecked
        onChange={onChange}
      />
      <OptionCard
        title="Animal perdido"
        description="Sumiu e estou procurando"
        value="perdido"
        onChange={onChange}
      />
      <OptionCard
        title="Animal encontrado"
        description="Achei na rua, procuro o tutor"
        value="encontrado"
        onChange={onChange}
      />
    </OptionCard.Group>,
  );

describe('OptionCard', () => {
  it('renders each option as a radio named by its title', () => {
    renderGroup();
    expect(
      screen.getByRole('radio', { name: /Animal para adoção/ }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('renders the description alongside the title', () => {
    renderGroup();
    expect(screen.getByText('Sumiu e estou procurando')).toBeInTheDocument();
  });

  it('shares one generated name across the group', () => {
    renderGroup();
    const names = screen
      .getAllByRole('radio')
      .map((radio) => radio.getAttribute('name'));

    expect(new Set(names).size).toBe(1);
    expect(names[0]).toBeTruthy();
  });

  it('lets only one option be selected at a time', () => {
    renderGroup();
    const perdido = screen.getByRole('radio', { name: /Animal perdido/ });

    fireEvent.click(perdido);
    expect(perdido).toBeChecked();
    expect(
      screen.getByRole('radio', { name: /Animal para adoção/ }),
    ).not.toBeChecked();
  });

  it('exposes the group as a radiogroup', () => {
    renderGroup();
    expect(
      screen.getByRole('radiogroup', { name: 'O que você quer publicar?' }),
    ).toBeInTheDocument();
  });

  it('marks selection with a glyph, not only a colour', () => {
    const { container } = render(
      <OptionCard title="Animal para adoção" defaultChecked />,
    );

    expect(container.querySelector('.peer-checked\\:opacity-100')).toBeTruthy();
  });

  it('uses the dark brand tint rather than the brand fill', () => {
    const { container } = render(<OptionCard title="Animal para adoção" />);
    const card = container.firstElementChild;

    expect(card).toHaveClass('has-[:checked]:bg-caramelo-4');
    expect(card).not.toHaveClass('has-[:checked]:bg-brand');
  });
});
