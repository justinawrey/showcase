import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import progress from 'rollup-plugin-progress';

const production = !process.env.ROLLUP_WATCH;

export default function getCommonPlugins() {
  return [
    svelte({
      compilerOptions: {
        dev: !production
      }
    }),
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    progress(),
  ];
}