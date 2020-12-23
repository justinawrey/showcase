import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import livereload from 'rollup-plugin-livereload';
import path from 'path';
import getCommonPlugins from './common.config';
// also leverage netlify builtins -- cache invalidation w/ chunk hashing
// and automatic brotli compression 

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true
      });

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    }
  };
}

export const module = {
  input: 'src/main.js',
  output: {
    name: 'app-esm',
    format: 'es',
    file: path.resolve('public', 'build', 'bundle-esm.mjs')
  },
  plugins: [
    ...getCommonPlugins(),
    postcss({
      extract: path.resolve('public', 'build', 'bundle.css'),
      minimize: true,
      config: {
        path: 'postcss.config.js',
      },
    }),
    terser(),
    sizeSnapshot(),
  ],
};

export const noModule = {
  input: 'src/main.js',
  output: {
    sourcemap: !production,
    format: 'iife',
    name: 'app',
    file: path.resolve('public', 'build', 'bundle.js')
  },
  plugins: [
    ...getCommonPlugins(),
    postcss({
      extract: path.resolve('public', 'build', 'bundle.css'),
      minimize: production,
      sourceMap: !production,
      config: {
        path: 'postcss.config.js',
      },
    }),
    babel({
      extensions: [".js", ".mjs", ".html", ".svelte"],
      babelHelpers: 'bundled'
    }),
    !production && serve(),
    !production && livereload('public'),
    production && terser(),
    production && sizeSnapshot(),
  ],
  watch: {
    clearScreen: false
  }
};