const typescript = require('@rollup/plugin-typescript').default;
const url = require('@rollup/plugin-url').default;
const dts = require('rollup-plugin-dts').default;

/**
 * Bundling will go in two major steps:
 * 1. Transpiling the typescript to ESM and bundling all audio files.
 * 2. Bundling all type definitions to match the public API of the package.
 */
module.exports = [{
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
  },
  plugins: [
    typescript(),
    url({
      limit: Infinity, // required to prevent a maximum amount of files to not be bundled
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
