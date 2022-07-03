import { B, be_ } from '@ctx-core/object'
import { copy_targets_async_b } from './copy_targets_async_b.js'
import { copy_targets_rollup_plugin_, copy_targets_rollup_plugin_T } from './copy_targets_rollup_plugin_.js'
import type { web_build_Ctx } from './web_build_Ctx.js'
const key = 'copy_targets_rollup_plugin_async'
/**
 *	```
 *	copy_targets_rollup_plugin_async_b
 *		copy_targets_async_b
 *			node_modules_src_aa_async_b
 *			node_modules_src_basename_aa_async_b
 *				node_modules_src_aa_async_b
 *			asset_absolute_path_r_asset_relative_path_async_b
 *				asset_path_a_async_b
 *			client_output_dir$_b
 *			file_copy_targets__b
 *				client_output_dir$_b
 *			src_client_path_dist_client_path_aa_async_b
 *				node_modules_src_aa_async_b
 *				node_modules_src_basename_aa_async_b
 *					node_modules_src_aa_async_b
 *			map_basename_r_client_asset_path_a_async_b
 *				node_modules_src_aa_async_b
 *				node_modules_src_basename_aa_async_b
 *					node_modules_src_aa_async_b
 *	```
 */
export const copy_targets_rollup_plugin_async_b:B<web_build_Ctx, typeof key> = be_(key, async (ctx)=>{
	const copy_targets = await copy_targets_async_b(ctx)
	return copy_targets_rollup_plugin_('copy_targets_rollup_plugin', copy_targets)
})
export type copy_targets_rollup_plugin_async_T = Promise<copy_targets_rollup_plugin_T>
