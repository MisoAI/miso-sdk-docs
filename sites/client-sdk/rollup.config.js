import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  plugins: [
    nodeResolve({ browser: true }),
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      },
    }),
  ],
  input: 'src/index.js',
  output: {
    file: 'dist/js/main.js',
    format: 'iife',
    indent: false,
  },
};
