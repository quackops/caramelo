import type { Preview } from '@storybook/react-vite';

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
  initialGlobals: {
    backgrounds: { value: 'surface' },
  },
};

export default preview;
