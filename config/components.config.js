import getCommonPlugins from "./common.config";
import bundleComponents from "./bundleComponents";
import postcss from 'rollup-plugin-postcss';
import livereload from 'rollup-plugin-livereload';
import path from 'path'

const production = !process.env.ROLLUP_WATCH;

export default {
  output: {
    dir: path.resolve('public', 'components'),
  },
  plugins: [
    ...getCommonPlugins(),
    postcss({
      config: {
        path: 'postcss.config.js',
      },
    }),
    !production && livereload('public'),
    bundleComponents(),
  ]
};