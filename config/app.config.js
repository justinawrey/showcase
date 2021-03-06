import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import babel from '@rollup/plugin-babel';
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
    production && terser(),
    production && sizeSnapshot(),
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
    babel({
      extensions: [".js", ".mjs", ".html", ".svelte"],
      babelHelpers: 'bundled'
    }),
    !production && serve(),
    production && terser(),
    production && sizeSnapshot(),
  ],
  watch: {
    clearScreen: false
  }
};