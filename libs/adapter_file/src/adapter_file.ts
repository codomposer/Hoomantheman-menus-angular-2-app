import type { Adapter } from '@sveltejs/kit'
/**
 * @param {{
 *   pages?: string;
 *   assets?: string;
 *   fallback?: string;
 * }} [opts]
 */
export function adapter_file(
	{ pages = 'build', assets = pages, fallback }:adapter_file_opts_T = {}
):Adapter {
	/** @type {import('@sveltejs/kit').Adapter} */
	const adapter = {
		async adapt({ utils }) {
			utils.copy_static_files(assets)
			utils.copy_client_files(assets)
			await utils.prerender({
				fallback,
				all: !fallback,
				dest: pages
			})
		}
	} as Adapter
	return adapter
}
export interface adapter_file_opts_T {
	pages?:string
	assets?:string
	fallback?:string
}
