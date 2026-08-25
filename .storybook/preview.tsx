import type { Preview } from '@storybook/react-vite';

import { CarameloProvider } from '../src/components/caramelo-provider/caramelo-provider';
import '../src/style.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        surface: { name: 'Surface', value: 'var(--color-surface)' },
        brand: { name: 'Brand', value: 'var(--color-brand)' },
      },
    },
  },
  tags: ['autodocs'],
  globalTypes: {
    theme: {
      description: 'Caramelo theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'caramelo', title: 'Caramelo' },
          { value: 'pawee', title: 'Pawee' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'surface' },
    theme: 'caramelo',
  },
  decorators: [
    (Story, context) => (
      <CarameloProvider theme={context.globals.theme ?? 'caramelo'}>
        <Story />
      </CarameloProvider>
    ),
  ],
};

export default preview;
