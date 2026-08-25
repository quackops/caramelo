import type { Meta, StoryObj } from '@storybook/react-vite';

import { AnimalCard } from '../animal-card/animal-card';
import { Badge } from '../badge/badge';
import { Button } from '../button/button';
import { Chip } from '../chip/chip';
import { CarameloProvider } from './caramelo-provider';

export default {
  title: 'foundation/CarameloProvider',
  component: CarameloProvider,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof CarameloProvider>;

const showcase = (
  <div className="flex flex-col gap-4 p-6">
    <div className="flex gap-3">
      <Button>Tenho interesse</Button>
      <Button variant="handoff">Abrir no WhatsApp</Button>
    </div>
    <div className="flex flex-wrap gap-2">
      <Chip variant="selected">Gatos</Chip>
      <Badge variant="verified" />
      <Badge variant="urgent" />
    </div>
    <AnimalCard
      name="Nina"
      badge="verified"
      details="Fêmea · 2 anos · Porte médio · SRD"
      meta="Pituba, Salvador · 2,4 km · há 3 dias"
      tags={['castrada', 'vacinada', 'dócil']}
    />
  </div>
);

export const Caramelo = {
  args: {
    theme: 'caramelo',
    children: showcase,
  },
} satisfies StoryObj<typeof CarameloProvider>;

export const Pawee = {
  args: {
    theme: 'pawee',
    children: showcase,
  },
} satisfies StoryObj<typeof CarameloProvider>;
