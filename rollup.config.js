import svelte from 'rollup-plugin-svelte';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import progress from 'rollup-plugin-progress';
import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import path from 'path';

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

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: path.resolve('public', 'build', 'bundle.js')
	},
	plugins: [
		svelte({
			compilerOptions: {
				dev: !production
			}
		}),
		babel({
			extensions: [".js", ".mjs", ".html", ".svelte"],
			babelHelpers: 'bundled'
		}),
		postcss({
			extract: path.resolve('public', 'build', 'bundle.css'),
			minimize: production,
			config: {
				path: 'postcss.config.js',
			},
		}),
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		!production && serve(),
		!production && livereload('public'),
		production && terser(),
		production && sizeSnapshot(),
		progress(),
	],
	watch: {
		clearScreen: false
	}
};
