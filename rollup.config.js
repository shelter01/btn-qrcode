import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import babel from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'

// const extensions = ['.js']

const plugins = [
  terser({
    compress: {
      ecma: 2015,
      pure_getters: true,
    },
  }),
]

export default {
  input: './index.js',
  output: [
    {
      name: 'btnqrcode',
      file: 'dist/btnqrcode.js',
      format: 'umd',
      plugins,
    },
  ],
  plugins: [
    postcss({
      extensions: ['.css'],
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    resolve(),
    babel({
      exclude: 'node_modules/**',
      // extensions,
      babelHelpers: 'runtime',
    }),
  ],
}
