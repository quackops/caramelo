import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ApplicationCard } from './application-card';

describe('ApplicationCard', () => {
  it('shows actions while in review', () => {
    render(
      <ApplicationCard
        applicantName="Marina Costa"
        progressLabel="Formulário respondido · 8/8"
        status="review"
      />,
    );

    expect(screen.getByText('EM ANÁLISE')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Aceitar' })).toBeInTheDocument();
  });

  it('hides actions once accepted', () => {
    render(
      <ApplicationCard
        applicantName="Marina Costa"
        progressLabel="Formulário respondido · 8/8"
        status="accepted"
      />,
    );

    expect(screen.getByText('ACEITA')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Aceitar' }),
    ).not.toBeInTheDocument();
  });
});
