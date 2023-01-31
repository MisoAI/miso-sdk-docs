import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import yaml from '@rollup/plugin-yaml';

export default {
  input: 'src/index.js',
  output: [
    {
      dir: 'dist/es',
      format: 'es'
    },
    {
      dir: 'dist/cjs',
      format: 'cjs'
    }
  ],
  plugins: [
    commonjs(),
    nodeResolve(),
    yaml(),
  ],
};
