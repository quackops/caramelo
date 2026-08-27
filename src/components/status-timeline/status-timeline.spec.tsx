import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatusTimeline, type TimelineEvent } from './status-timeline';

const events: TimelineEvent[] = [
  {
    id: 'enviado',
    title: 'Interesse enviado',
    timestamp: '12 de agosto, 14h22',
    state: 'done',
  },
  {
    id: 'aceito',
    title: 'ONG aceitou conversar',
    timestamp: '12 de agosto, 17h05',
    detail: 'contato liberado',
    state: 'done',
  },
  {
    id: 'entrevista',
    title: 'Entrevista marcada',
    timestamp: 'Sábado, 16 de agosto, 10h',
    detail: 'por vídeo',
    state: 'current',
  },
  {
    id: 'decisao',
    title: 'Decisão final',
    timestamp: 'Depois da entrevista',
    state: 'pending',
  },
];

describe('StatusTimeline', () => {
  it('renders the sequence as an ordered list', () => {
    const { container } = render(<StatusTimeline events={events} />);

    expect(container.querySelector('ol')).toBeInTheDocument();
    expect(container.querySelectorAll('li')).toHaveLength(4);
  });

  it('joins the timestamp and detail on one line', () => {
    render(<StatusTimeline events={events} />);
    expect(
      screen.getByText('12 de agosto, 17h05 · contato liberado'),
    ).toBeInTheDocument();
  });

  it('states each event state in words, not only in colour', () => {
    render(<StatusTimeline events={events} />);

    expect(screen.getAllByText(/concluído/)).toHaveLength(2);
    expect(screen.getByText(/etapa atual/)).toBeInTheDocument();
    expect(screen.getByText(/pendente/)).toBeInTheDocument();
  });

  it('marks a done event with a filled brand marker', () => {
    const { container } = render(<StatusTimeline events={[events[0]]} />);
    expect(container.querySelector('[aria-hidden="true"]')).toHaveClass(
      'bg-brand',
    );
  });

  it('marks the current event with a hollow ring', () => {
    const { container } = render(<StatusTimeline events={[events[2]]} />);
    expect(container.querySelector('[aria-hidden="true"]')).toHaveClass(
      'border-2',
      'border-brand',
    );
  });

  it('greys the connector above a pending event', () => {
    const { container } = render(<StatusTimeline events={events} />);
    const connectors = container.querySelectorAll('.w-0\\.5');

    expect(connectors).toHaveLength(3);
    expect(connectors[2]).toHaveClass('bg-gray-6');
    expect(connectors[0]).toHaveClass('bg-brand');
  });

  it('numbers the steps in the forward-looking variant', () => {
    render(
      <StatusTimeline
        marker="number"
        events={[
          { id: 'a', title: 'Você envia o interesse', state: 'current' },
          { id: 'b', title: 'A ONG responde', state: 'pending' },
          { id: 'c', title: 'Vocês conversam', state: 'pending' },
        ]}
      />,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
