import { B, be_, clone } from '@ctx-core/object'
import type { web_build_Ctx } from './web_build_Ctx.js'
import type { replace_r_async_T } from './replace_r_async_b.js'
import { asset_path_r_client_asset_version_path_async_b } from './asset_path_r_client_asset_version_path_async_b.js'
import { client_src_r_client_version_src_a_async_b } from './client_src_r_client_version_src_a_async_b.js'
import { map_basename_r_client_asset_version_path_a_async_b } from './map_basename_r_client_asset_version_path_a_async_b.js'
import { replace_r_async_b } from './replace_r_async_b.js'
const key = 'http_replace_r_async'
/**
 *	```
 *	http_replace_r_async_b
 * 		replace_r_async_b
 * 			mode_b
 * 		asset_path_r_client_asset_version_path_async_b
 * 			asset_path_r_client_asset_version_path_async_b
 * 				asset_path_a_async_b
 *		client_src_r_client_version_src_a_async_b
 *			client_src_client_version_src_aa_async_b
 *				node_modules_src_aa_async_b
 *				version_node_modules_src_basename_aa_async_b
 *					node_modules_src_aa_async_b
 *		map_basename_r_client_asset_version_path_a_async_b
 *			node_modules_src_aa_async_b
 *			version_node_modules_src_basename_aa_async_b
 *				node_modules_src_aa_async_b
 *	```
 */
export const http_replace_r_async_b:B<web_build_Ctx, typeof key> = be_(key, async (ctx)=>{
	const replace_r = await replace_r_async_b(ctx)
	const asset_path_r_client_asset_version_path = await asset_path_r_client_asset_version_path_async_b(ctx)
	const client_src_r_client_version_src_a = await client_src_r_client_version_src_a_async_b(ctx)
	const map_basename_r_client_asset_version_path = await map_basename_r_client_asset_version_path_a_async_b(ctx)
	return clone(
		// {}, {
		replace_r, {
			preventAssignment: true,
			delimiters: ['', ''],
			...asset_path_r_client_asset_version_path,
			...client_src_r_client_version_src_a,
			...map_basename_r_client_asset_version_path,
		})
})
export type http_replace_r_async_T = replace_r_async_T
