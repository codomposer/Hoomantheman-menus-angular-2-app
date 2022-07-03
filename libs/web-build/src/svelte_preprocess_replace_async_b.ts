import { be_ } from '@ctx-core/object'
import { client_src_client_version_src_aa_async_b } from './client_src_client_version_src_aa_async_b.js'
import type { web_build_Ctx } from './web_build_Ctx.js'
import { asset_path_r_client_asset_version_path_async_b } from './asset_path_r_client_asset_version_path_async_b.js'
const key = 'svelte_preprocess_replace_async'
export function svelte_preprocess_replace_async_b(ctx:web_build_Ctx):svelte_preprocess_replace_async_T {
	return be_<web_build_Ctx, typeof key>(key, async (ctx)=>{
		const asset_path_r_client_asset_version_path = await asset_path_r_client_asset_version_path_async_b(ctx)
		return [
			...await client_src_client_version_src_aa_async_b(ctx),
			...Object.entries(asset_path_r_client_asset_version_path),
		]
	})(ctx) as svelte_preprocess_replace_async_T
	// TODO: Remove type casting on upstream fix
	// https://github.com/sveltejs/svelte-preprocess/issues/228
}
export type svelte_preprocess_replace_async_T = Promise<[string, string][]>
