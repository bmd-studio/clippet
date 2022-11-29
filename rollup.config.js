import typescript from '@rollup/plugin-typescript';
import url from '@rollup/plugin-url';

export default {
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
};
