import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [],
  framework: '@storybook/react-vite',
  viteFinal: (config) => {
    config.build = {
      ...config.build,
      chunkSizeWarningLimit: 2000,
    };
    return config;
  },
};

export default config;
