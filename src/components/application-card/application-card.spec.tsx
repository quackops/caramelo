import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ApplicationCard } from './application-card';

describe('ApplicationCard', () => {
  it('shows actions while in review', () => {
    render(
      <ApplicationCard
        applicantName="Marina Costa"
        progressLabel="Formulário respondido · 8/8"
        status="review"
        onAccept={vi.fn()}
        onViewAnswers={vi.fn()}
      />,
    );

    expect(screen.getByText('EM ANÁLISE')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Aceitar e conversar' }),
    ).toBeInTheDocument();
  });

  it('hides actions once accepted', () => {
    render(
      <ApplicationCard
        applicantName="Marina Costa"
        progressLabel="Formulário respondido · 8/8"
        status="accepted"
        onAccept={vi.fn()}
      />,
    );

    expect(screen.getByText('ACEITA')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Aceitar e conversar' }),
    ).not.toBeInTheDocument();
  });

  it('renders the applicant identity line', () => {
    render(
      <ApplicationCard
        applicantName="Rafael Campos"
        meta="Itapuã · 6,2 km · há 2 horas"
        status="review"
      />,
    );

    expect(screen.getByText('Rafael Campos')).toBeInTheDocument();
    expect(
      screen.getByText('Itapuã · 6,2 km · há 2 horas'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Rafael Campos' }),
    ).toBeInTheDocument();
  });

  it('marks an unopened interest as new', () => {
    render(
      <ApplicationCard applicantName="Rafael Campos" status="review" unread />,
    );
    expect(screen.getByText('NOVO')).toBeInTheDocument();
  });

  it('renders the screening answers as static tags', () => {
    render(
      <ApplicationCard
        applicantName="Rafael Campos"
        status="review"
        answers={['Casa com quintal', '1 outro animal']}
      />,
    );

    expect(screen.getByText('Casa com quintal')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '1 outro animal' })).toBeNull();
  });

  it('quotes the applicant message', () => {
    render(
      <ApplicationCard
        applicantName="Rafael Campos"
        status="review"
        message="Oi! Tenho interesse na Nina."
      />,
    );
    expect(
      screen.getByText('Oi! Tenho interesse na Nina.'),
    ).toBeInTheDocument();
  });

  it('offers refusing as the other half of the screen', () => {
    const onReject = vi.fn();
    render(
      <ApplicationCard
        applicantName="Rafael Campos"
        status="review"
        onReject={onReject}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Recusar' }));
    expect(onReject).toHaveBeenCalledOnce();
  });

  it('keeps refusing low emphasis rather than red', () => {
    render(
      <ApplicationCard
        applicantName="Rafael Campos"
        status="review"
        onReject={vi.fn()}
      />,
    );

    const reject = screen.getByRole('button', { name: 'Recusar' });
    expect(reject).toHaveClass('text-link');
    expect(reject).not.toHaveClass('border-danger/50');
  });

  it('collapses to identity plus outcome for a terminal status', () => {
    render(
      <ApplicationCard
        applicantName="Pedro M."
        status="rejected"
        statusDetail="Recusado em 20 de agosto"
        answers={['Casa com quintal']}
        message="Oi!"
        onAccept={vi.fn()}
        onReject={vi.fn()}
      />,
    );

    expect(screen.getByText('Recusado em 20 de agosto')).toBeInTheDocument();
    expect(screen.queryByText('Casa com quintal')).not.toBeInTheDocument();
    expect(screen.queryByText('Oi!')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('covers the rest of the application state machine', () => {
    render(<ApplicationCard applicantName="Marina" status="interview" />);
    expect(screen.getByText('ENTREVISTA')).toBeInTheDocument();
  });

  it('is not a link as a whole', () => {
    render(
      <ApplicationCard
        applicantName="Rafael Campos"
        status="review"
        onAccept={vi.fn()}
      />,
    );
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
