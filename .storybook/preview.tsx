import type { Preview } from '@storybook/react-vite';
import { create } from 'storybook/theming';

import { CarameloProvider } from '../src/components/caramelo-provider/caramelo-provider';
import { cn } from '../src/utils/cn';
import './preview.css';
import '../src/style.css';

const docsTheme = create({
  base: 'dark',
  appBg: '#0b0714',
  appContentBg: '#0b0714',
  appBorderColor: '#2a2140',
  textColor: '#eeeef0',
  barBg: '#171022',
  fontBase: 'Poppins, sans-serif',
});

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      theme: docsTheme,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
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
    theme: 'caramelo',
  },
  decorators: [
    (Story, context) => (
      <CarameloProvider
        theme={context.globals.theme ?? 'caramelo'}
        className={cn(
          'flex w-full items-center justify-center p-10',
          context.viewMode === 'docs' ? 'min-h-[320px]' : 'min-h-full',
        )}
      >
        <Story />
      </CarameloProvider>
    ),
  ],
};

export default preview;
