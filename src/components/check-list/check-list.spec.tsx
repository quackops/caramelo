import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CheckList, type CheckListItem } from './check-list';

const health: CheckListItem[] = [
  { id: 'castrada', label: 'Castrada', state: 'yes' },
  { id: 'vacinada', label: 'Vacinada', state: 'yes' },
  { id: 'vermifugada', label: 'Vermifugada', state: 'unknown' },
  { id: 'especiais', label: 'Necessidades especiais', state: 'no' },
];

describe('CheckList', () => {
  it('renders the list as a real list', () => {
    const { container } = render(<CheckList items={health} />);

    expect(container.querySelector('ul')).toBeInTheDocument();
    expect(container.querySelectorAll('li')).toHaveLength(4);
  });

  it('marks a yes with the success check', () => {
    const { container } = render(
      <CheckList items={[{ id: 'a', label: 'Castrada', state: 'yes' }]} />,
    );

    expect(container.querySelector('svg')).toHaveClass('text-success');
  });

  it('treats a no as a fact, not an error', () => {
    const { container } = render(
      <CheckList
        items={[{ id: 'a', label: 'Necessidades especiais', state: 'no' }]}
      />,
    );

    expect(container.querySelector('svg')).toHaveClass('text-neutral-3');
    expect(container.querySelector('svg')).not.toHaveClass('text-danger');
  });

  it('never renders an unknown as a red cross', () => {
    const { container } = render(
      <CheckList
        items={[{ id: 'a', label: 'Vermifugada', state: 'unknown' }]}
      />,
    );

    expect(container.querySelector('svg')).toBeNull();
    expect(container.querySelector('li')).toHaveClass(
      'border-dashed',
      'border-gray-7',
    );
  });

  it('spells the unknown state out in words', () => {
    render(<CheckList items={health} />);
    expect(screen.getByText(/Vermifugada · não sei/)).toBeInTheDocument();
  });

  it('renders a requirement without implying a truth value', () => {
    const { container } = render(
      <CheckList
        items={[{ id: 'a', label: 'Entrevista por vídeo', state: 'required' }]}
      />,
    );

    expect(screen.getByText('Entrevista por vídeo')).toBeInTheDocument();
    expect(container.querySelector('svg')).toHaveClass('text-neutral-2');
  });

  it('hides every glyph from assistive tech and keeps the state in the text', () => {
    const { container } = render(<CheckList items={health} />);

    for (const glyph of container.querySelectorAll('svg')) {
      expect(glyph).toHaveAttribute('aria-hidden', 'true');
    }
  });
});
