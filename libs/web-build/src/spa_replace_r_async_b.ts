import { B, be_, clone } from '@ctx-core/object'
import type { web_build_Ctx } from './web_build_Ctx.js'
import { replace_r_async_b, replace_r_async_T } from './replace_r_async_b.js'
import { asset_absolute_path_r_asset_relative_path_async_b } from './asset_absolute_path_r_asset_relative_path_async_b.js'
import { src_client_path_r_dist_client_path_async_b } from './src_client_path_r_dist_client_path_async_b.js'
import { map_basename_r_client_asset_path_a_async_b } from './map_basename_r_client_asset_path_a_async_b.js'
const key = 'spa_replace_r_async'
/**
 *	```
 *	spa_replace_r_async_b
 *		replace_r_async_b
 *			mode_b
 *		asset_absolute_path_r_asset_relative_path_async_b
 *			asset_path_a_async_b
 *		src_client_path_r_dist_client_path_async_b
 *			src_client_path_dist_client_path_aa_async_b
 *				node_modules_src_aa_async_b
 *				node_modules_src_basename_aa_async_b
 *					node_modules_src_aa_async_b
 *		map_basename_r_client_asset_path_a_async_b
 *			node_modules_src_aa_async_b
 *			node_modules_src_basename_aa_async_b
 *				node_modules_src_aa_async_b
 *	```
 */
export const spa_replace_r_async_b:B<web_build_Ctx, typeof key> = be_(key, async (ctx)=>{
	const replace_r = await replace_r_async_b(ctx)
	const asset_absolute_path_r_asset_relative_path = await asset_absolute_path_r_asset_relative_path_async_b(ctx)
	const src_client_path_r_dist_client_path = await src_client_path_r_dist_client_path_async_b(ctx)
	const map_basename_r_client_asset_path_a_async = await map_basename_r_client_asset_path_a_async_b(ctx)
	return clone(replace_r, {
		preventAssignment: true,
		delimiters: ['', ''],
		...asset_absolute_path_r_asset_relative_path,
		...src_client_path_r_dist_client_path,
		...map_basename_r_client_asset_path_a_async,
	})
})
export type spa_replace_r_async_T = replace_r_async_T
