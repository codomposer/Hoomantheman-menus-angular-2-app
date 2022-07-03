import { readFile, writeFile } from 'fs/promises'
import { exec } from 'child-process-promise'
import svelte from 'rollup-plugin-svelte'
import replace from '@rollup/plugin-replace'
import node_resolve from '@rollup/plugin-node-resolve'
import globals from 'rollup-plugin-node-globals'
import json from '@rollup/plugin-json'
import css from 'rollup-plugin-css-only'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import {
	APP_VERSION_rollup_plugin_, client_output_dir$_b, config_preprocess_async_b, copy_targets_rollup_plugin_async_b,
	disable_version, env_APP_VERSION$_b, spa_replace_r_async_b, swc_plugin_i
} from '@menus/web-build'
disable_version()
await exec('mkdir -p dist')
const ctx = {}
const dev = false
const dir = `dist/${process.env.LIVE ? 'live' : 'dev'}/dist`
client_output_dir$_b(ctx).$ = dir
env_APP_VERSION$_b(ctx).$ = JSON.stringify(process.env.APP_VERSION)
const spa_replace_r = await spa_replace_r_async_b(ctx)
const preprocess = await config_preprocess_async_b(ctx)
const optimizer = server => esbuild({
	include: /\.[jt]sx?$/,
	minify: true,
	target: 'es2020'
})
export default [
	{
		input: 'src/app.ts',
		output: {
			sourcemap: true,
			name: 'app',
			format: 'iife',
			dir,
			esModule: true,
		},
		context: 'window',
		inlineDynamicImports: true,
		plugins: [
			replace(spa_replace_r),
			svelte({
				compilerOptions: {
					dev,
					hydratable: true // Needed for Sapper support
				},
				emitCss: true,
				preprocess,
			}),
			css({
				output: 'app.css'
			}),
			node_resolve(),
			commonjs(),
			swc_plugin_i,
			globals(),
			json(),
			await copy_targets_rollup_plugin_async_b(ctx),
			APP_VERSION_rollup_plugin_(`./${dir}`),
			{
				name: 'generate_index_html',
				async writeBundle(options, bundle) {
					const head = `<link rel="stylesheet" href="./app.css"/>`
					const body = `
						<script>
							__SAPPER__ = (function (url) {
								return {
									baseUrl: url.pathname + url.search,
									preloaded: [],
									session: {}
								}
							})(new URL(window.location.href))
						</script>
						<script src="./app.js"></script>
					`.replace(/^\t{6}/gm, '').trim()
					const index_html = (await readFile('./src/index.html'))
						.toString()
						.replace('%svelte.head%', () => head)
						.replace('%svelte.body%', () => body)
					await writeFile(`./${dir}/index.html`, index_html)
				}
			},
			optimizer(),
		]
	},
]
