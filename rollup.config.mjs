import { cleandir } from 'rollup-plugin-cleandir';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

export const OUT_DIR = './dist';

/** @type import('rollup').RollupOptions[] */
export default [
  {
    input: 'src/index.ts',
    external: ['react', 'react-dom', 'react/jsx-runtime', 'tailwindcss'],
    plugins: [
      cleandir(OUT_DIR),
      esbuild({
        minify: false,
      }),
    ],
    output: [
      {
        dir: `${OUT_DIR}/esm`,
        format: 'esm',
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
      {
        dir: `${OUT_DIR}/cjs`,
        format: 'cjs',
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    ],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        dir: `${OUT_DIR}/esm`,
        format: 'es',
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].d.ts',
      },
    ],
    plugins: [dts()],
  },
];
