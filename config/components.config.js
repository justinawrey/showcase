import getCommonPlugins from "./common.config";
import bundleComponents from "./bundleComponents";
import path from 'path'

export default {
  output: {
    dir: path.resolve('public', 'components'),
  },
  plugins: [
    ...getCommonPlugins(),
    bundleComponents(),
  ]
};