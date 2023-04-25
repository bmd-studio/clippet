import typescript from '@rollup/plugin-typescript';
import url from '@rollup/plugin-url';
import dts from 'rollup-plugin-dts';

/**
 * Bundling will go in two major steps:
 * 1. Transpiling the typescript to ESM and bundling all audio files.
 * 2. Bundling all type definitions to match the public API of the package.
 */
export default [{
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
  },
  plugins: [
    typescript(),
    url({
      include: ['**/*.ogg', '**/*.mp3', '**/*.aac'],
    }),
  ],
}, {
  input: './dist/types/index.d.ts',
  output: [{
    file: 'dist/index.d.ts',
    format: 'es'
  }],
  plugins: [dts()],
}];
