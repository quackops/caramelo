import { addons } from 'storybook/manager-api';

import logo from './sb-logo.svg';

addons.setConfig({
  theme: {
    base: 'dark',
    brandTitle: 'Caramelo Design System',
    brandUrl: 'https://caramelo.pawee.space',
    brandImage: logo,
    brandTarget: '_self',
    colorPrimary: '#ffba17',
    colorSecondary: '#b2b4bd',
    appBg: '#111113',
    appContentBg: '#19191b',
    appHoverBg: '#ffba17',
    appPreviewBg: '#303136',
    appBorderColor: '#303136',
    appBorderRadius: 4,
    fontBase: 'Poppins, sans-serif',
    fontCode: '"JetBrains Mono", monospace',
    textColor: '#eeeef0',
    textInverseColor: '#111113',
    textMutedColor: '#95999D',
    barTextColor: '#95999D',
    barHoverColor: '#ffba17',
    barSelectedColor: '#ffba17',
    barBg: '#222325',
    buttonBg: '#19191b',
    buttonBorder: 'hsl(0 0% 100% / 0.1)',
    booleanBg: '#1B1C1D',
    booleanSelectedBg: '#eeeef0',
    inputBg: '#1B1C1D',
    inputBorder: 'hsl(0 0% 100% / 0.1)',
    inputTextColor: '#C9CCCF',
    inputBorderRadius: 4,
  },
});
