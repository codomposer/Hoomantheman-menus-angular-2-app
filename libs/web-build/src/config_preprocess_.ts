import sass from 'sass'
import svelte_preprocess from 'svelte-preprocess'
import { parse, transform } from '@swc/core'
import { preprocess_, preprocess_T } from '@ctx-core/svelte'
import { svelte_preprocess_replace_async_b } from './svelte_preprocess_replace_async_b.js'
import { svg_preprocess_b } from './svg_preprocess_b.js'
import type { web_build_Ctx } from './web_build_Ctx.js'
import { swc_plugin_options } from './swc_plugin_i.js'
export async function config_preprocess_(ctx:web_build_Ctx, vurl:vurl_T):Promise<preprocess_T> {
	const svelte_preprocess_replace = await svelte_preprocess_replace_async_b(ctx)
	const svg_preprocess = svg_preprocess_b(ctx)
	return preprocess_([
		// preprocess_sass,
		svelte_preprocess({
			scss: {
				functions: {
					'url($url)': vurl,
					'vurl($url)': vurl,
				}
			},
			replace: svelte_preprocess_replace,
			async typescript({ content, filename }) {
				const ast = await parse(content, {
					syntax: 'typescript', target: 'es2020'
				})
				const expression_statement_set = new Set<string>()
				for (const statement of ast.body) {
					if (statement.type === 'ImportDeclaration' && (statement as any).typeOnly === false) {
						for (const specifier of statement.specifiers) {
							if (specifier.type === 'ImportDefaultSpecifier' || specifier.type === 'ImportSpecifier') {
								expression_statement_set.add(specifier.local.value)
							}
						}
					}
				}
				const expression_statement_a = [...expression_statement_set]
				if (expression_statement_a.length) {
					const expression_statement = `${expression_statement_a.join(', ')};`
					const { code, map } = await transform(`${content}\n${expression_statement}`, swc_plugin_options)
					return {
						code: code.replace(`\n${expression_statement}`, ''), filename, map
					}
				} else {
					const { code, map } = await transform(content, swc_plugin_options)
					return {
						code, filename, map
					}
				}
			}
		}),
		svg_preprocess,
	])
}
export type vurl_done_T = (replacement:sass.types.String)=>void
export type vurl_T = (url_String:sass.types.String, done:vurl_done_T)=>void
