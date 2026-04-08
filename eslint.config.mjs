import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

const config = [
  {
    ignores: ['.next/**', 'storybook-static/**', 'coverage/**', 'node_modules/**', '*.tsbuildinfo'],
  },
  ...coreWebVitals,
  ...typescript,
];

export default config;
