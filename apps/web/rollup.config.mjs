import { readFile } from 'fs/promises'
import esbuild from 'rollup-plugin-esbuild'
import globals from 'rollup-plugin-node-globals'
import svelte from 'rollup-plugin-svelte'
import node_resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import replace from '@rollup/plugin-replace'
import config from 'sapper/config/rollup.js'
import { reject } from '@ctx-core/array'
import { assign } from '@ctx-core/object'
import { resolve } from '@menus/import-meta-resolve'
import {
	APP_VERSION_rollup_plugin_, version_config_preprocess_async_b, dev_b, client_output_dir$_b,
	copy_versioned_targets_rollup_plugin_async_b, env_APP_VERSION$_b, http_replace_r_async_b
} from '@menus/web-build'
const pkg = JSON.parse(
	(await readFile(
		new URL(
			await resolve('./package.json', import.meta.url)
		).pathname
	)).toString()
)
const serverOutput = config.server.output()
serverOutput.format = 'esm'
const ctx = {}
client_output_dir$_b(ctx).$ = config.client.output().dir
const http_replace_r = await http_replace_r_async_b(ctx)
const preprocess = await version_config_preprocess_async_b(ctx)
env_APP_VERSION$_b(ctx).$ = JSON.stringify(pkg.version)
const dev = dev_b(ctx)
const sapperVersion = pkg.devDependencies.sapper.match(/[0-9]{1,5}/g).map(el => Number(el))
const optimizer = server => esbuild({
	include: /\.[jt]sx?$/,
	minify: server ? (sapperVersion[1] >= 28 && sapperVersion[2] > 0) ? false : true : true,
	target: 'es2020'
})
const onwarn = (warning, onwarn) =>
	(warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
	(warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) ||
	onwarn(warning)
const client_output = assign(config.client.output(), { sourcemap: true })
const server_output = assign(config.server.output(), { sourcemap: true })
const external = reject(
	Object.keys(pkg.dependencies || {}),
	path => /(@menus|@ctx-core|@sapper)\/.*/.test(path)
).concat(
	(await import('module')).builtinModules || Object.keys(process.binding('natives')),
	// 'solid-js', 'solid-js/web'
)
export default {
	client: {
		input: config.client.input().replace(/\.js$/, '.mjs'),
		output: client_output,
		context: 'window',
		plugins: [
			replace(http_replace_r),
			svelte({
				emitCss: true,
				preprocess,
				compilerOptions: {
					dev,
					hydratable: true,
				},
			}),
			node_resolve({
				browser: true,
				dedupe: ['svelte'],
				extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
				// exportConditions: ['solid']
			}),
			commonjs(),
			globals(),
			json(),
			await copy_versioned_targets_rollup_plugin_async_b(ctx),
			APP_VERSION_rollup_plugin_(config.client.output().dir),
			optimizer()
		],
		preserveEntrySignatures: false,
		onwarn,
	},
	server: {
		input: config.server.input().server.replace(/\.js$/, '.mjs'),
		output: server_output,
		context: 'global',
		plugins: [
			replace(http_replace_r),
			svelte({
				preprocess,
				compilerOptions: {
					generate: 'ssr',
					hydratable: true,
					dev,
				},
			}),
			commonjs(),
			node_resolve({
				dedupe: ['svelte'],
				extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
				preferBuiltins: true,
				// exportConditions: ['solid', 'node']
			}),
			json(),
			optimizer(true)
		],
		external,
		preserveEntrySignatures: 'strict',
		onwarn,
	},
	serviceworker: {
		input: config.serviceworker.input().replace(/\.js$/, '.mjs'),
		output: config.serviceworker.output(),
		plugins: [
			node_resolve(),
			replace(http_replace_r),
			json(),
			commonjs(),
			optimizer()
		],
		preserveEntrySignatures: false,
		onwarn,
	}
}
