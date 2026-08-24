import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Select } from './select';

describe('Select', () => {
  it('renders a labelled select with options', () => {
    render(
      <Select id="porte" label="Porte" defaultValue="medio">
        <option value="pequeno">Pequeno</option>
        <option value="medio">Médio</option>
        <option value="grande">Grande</option>
      </Select>,
    );

    expect(screen.getByLabelText('Porte')).toHaveValue('medio');
  });
});
