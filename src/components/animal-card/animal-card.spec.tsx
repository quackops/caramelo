import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AnimalCard } from './animal-card';

describe('AnimalCard', () => {
  it('renders the animal name, details and tags', () => {
    render(
      <AnimalCard
        name="Nina"
        badge="verified"
        details="Fêmea · 2 anos · Porte médio · SRD"
        meta="Pituba, Salvador · 2,4 km · há 3 dias"
        tags={['castrada', 'vacinada', 'dócil']}
      />,
    );

    expect(screen.getByText('Nina')).toBeInTheDocument();
    expect(
      screen.getByText('Fêmea · 2 anos · Porte médio · SRD'),
    ).toBeInTheDocument();
    expect(screen.getByText('castrada')).toBeInTheDocument();
    expect(screen.getByText(/ONG VERIFICADA/)).toBeInTheDocument();
  });
});
