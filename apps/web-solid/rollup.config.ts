import { dirname } from 'path'
import { promisify } from 'util'
import { exists } from 'fs'
import { copyFile, readFile, writeFile } from 'fs/promises'
const exists_async = promisify(exists)
import { resolve } from '@menus/import-meta-resolve'
import node_resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import node_globals from 'rollup-plugin-node-globals'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import svelte from 'rollup-plugin-svelte'
import css from 'rollup-plugin-css-only'
// import typescript from '@rollup/plugin-typescript'
const font_awesome_pkg = JSON.parse((await readFile(
	new URL(await resolve('font-awesome/package.json', import.meta.url)).pathname
)).toString())
import { clone } from '@ctx-core/object'
import { exec } from '@ctx-core/monorepo'
import {
	version_config_preprocess_async_b, copy_versioned_targets_async_b, dev_b, replace_r_async_b, run_replace_r, client_output_dir$_b
} from '@menus/web-build'
const pkg = JSON.parse((await readFile(
	new URL(await resolve('./package.json', import.meta.url)).pathname
)).toString())
export default default_()
export async function default_():Promise<any> {
	const ctx = {}
	client_output_dir$_b(ctx).$ = 'dist/dom/client'
	const replace_r = await replace_r_async_b(ctx)
	const preprocess = await version_config_preprocess_async_b(ctx)
	const dev = dev_b(ctx)
	const copy_targets = (await copy_versioned_targets_async_b(ctx)).map(target=>{
		const { src } = target
		if (
			['staticassets/manifest.json'].some(v=>~src.indexOf(v))
			|| /\.js$/.test(src)
			|| /\.css$/.test(src)
		) {
			target.transform = async (target)=>{
				const { src } = target
				const content = await readFile(src)
				return run_replace_r(replace_r, content).toString()
			}
		}
		if (['font-awesome.min.css'].some(v=>~src.indexOf(v))) {
			target.transform = async (target)=>{
				const { src } = target
				const font_awesome_version = font_awesome_pkg.version
				const content = await readFile(src)
				return run_replace_r(clone(replace_r, {
					[`../fonts/fontawesome-webfont.eot?v=${font_awesome_version}`]:
						replace_r['/assets/fonts/fontawesome-webfont.eot'],
					[`../fonts/fontawesome-webfont.woff2?v=${font_awesome_version}`]:
						replace_r['/assets/fonts/fontawesome-webfont.woff2'],
					[`../fonts/fontawesome-webfont.woff?v=${font_awesome_version}`]:
						replace_r['/assets/fonts/fontawesome-webfont.woff'],
					[`../fonts/fontawesome-webfont.ttf?v=${font_awesome_version}`]:
						replace_r['/assets/fonts/fontawesome-webfont.ttf'],
					[`../fonts/fontawesome-webfont.svg?v=${font_awesome_version}`]:
						replace_r['/assets/fonts/fontawesome-webfont.svg'],
				}), content).toString()
			}
		}
		return target
	})
	const onwarn = (warning, onwarn)=>
		(warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
		(warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) ||
		onwarn(warning)
	return [
		{
			input: 'src/ssr/index.jsx',
			output: [
				{
					dir: 'dist/ssr',
					format: 'cjs'
				}
			],
			external: ['solid-js', 'solid-js/web', 'path', 'express', 'stream'],
			plugins: [
				replace(replace_r),
				svelte({
					preprocess,
					compilerOptions: {
						generate: 'ssr',
						hydratable: true,
						dev,
					},
				}),
				css({}),
				babel({
					babelHelpers: 'bundled',
					extensions: ['.js', '.jsx', '.mjs', '.html', '.svelte'],
					exclude: ['**/@babel/**'],
					presets: [['solid', { generate: 'ssr', hydratable: true }]],
				}),
				node_resolve({
					preferBuiltins: true,
					exportConditions: ['solid', 'node'],
					extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
				}),
				commonjs(),
				// typescript(),
				node_globals(),
				json(),
				onwarn,
			],
			preserveEntrySignatures: false
		},
		{
			input: 'src/dom/index.jsx',
			output: [
				{
					dir: 'dist/dom/client',
					format: 'esm'
				}
			],
			context: 'window',
			preserveEntrySignatures: false,
			plugins: [
				replace(replace_r),
				svelte({
					emitCss: true,
					preprocess,
					compilerOptions: {
						dev,
						hydratable: true,
					},
				}),
				css({}),
				babel({
					babelHelpers: 'bundled',
					extensions: ['.js', '.jsx', '.mjs', '.html', '.svelte'],
					exclude: ['**/@babel/**'],
					presets: [['solid', { generate: 'dom', hydratable: true }]],
				}),
				node_resolve({
					exportConditions: ['solid'],
					extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
				}),
				commonjs(),
				// typescript(),
				node_globals(),
				json(),
				{
					// See https://lihautan.com/12-line-rollup-plugin/
					name: 'copy-lite',
					async generateBundle() {
						for (const target of copy_targets) {
							const { src, dest, transform } = target
							const dest_dir = dirname(dest)
							if (!await exists_async(dest_dir)) {
								await exec(`mkdir -p ${dest_dir}`)
							}
							if (transform) {
								await writeFile(dest, await transform(target))
							} else {
								await copyFile(src, dest)
							}
						}
					}
				},
				onwarn,
			],
		}
	]
}
