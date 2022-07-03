import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import replace from '@rollup/plugin-replace'
import { client_output_dir$_b, version_config_preprocess_async_b, dev_b, replace_r_async_b, } from '@menus/web-build'
const ctx = {}
const dev = dev_b(ctx)
client_output_dir$_b(ctx).$ = 'dist'
const preprocess = await version_config_preprocess_async_b(ctx)
const replace_r = await replace_r_async_b(ctx)
// const copy_versioned_targets_async = await copy_versioned_targets_async_b(ctx)
// copy_versioned_targets_async.push({
//   src: './static/index.html',
//   dest: './dist/index.html'
// })
export default defineConfig({
	rollupOptions: {
	  input: 'src/app.js',
	  format: 'es',
	  preserveEntrySignatures: true,
		chunks: false
	},
	base: '',
	lib: {
		name: 'menu-backoffice-spa',
		entry: './src/app.ts',
		formats: ['iife'],
		preserveEntrySignatures: true
	},
	plugins: [
		replace(replace_r),
		svelte({
			compilerOptions: {
				dev,
			},
			emitCss: true,
			preprocess,
		}),
		// await copy_versioned_targets_rollup_plugin_async_b(ctx),
		// APP_VERSION_rollup_plugin_('dist'),
	],
	build: {}
} as UserConfig)
// { lib: { name: "my-app", entry: "src/main.ts", formats: ["iife"] }}
