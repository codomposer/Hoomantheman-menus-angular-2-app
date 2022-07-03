import { _b, B } from '@ctx-core/object'
import type { web_build_Ctx } from './web_build_Ctx.js'
import { copy_versioned_targets_async_b } from './copy_versioned_targets_async_b.js'
import { copy_targets_rollup_plugin_, copy_targets_rollup_plugin_T } from './copy_targets_rollup_plugin_.js'
const key = 'copy_versioned_targets_rollup_plugin_async'
/**
 *	copy_versioned_targets_rollup_plugin_async_b
 *		copy_versioned_targets_async_b
 *			node_modules_src_aa_async_b
 *			version_node_modules_src_basename_aa_async_b
 *				node_modules_src_aa_async_b
 *			asset_path_r_client_asset_version_path_async_b
 *				asset_path_a_async_b
 *			client_output_dir$_b
 *			file_copy_targets__b
 *				client_output_dir$_b
 */
export const copy_versioned_targets_rollup_plugin_async_b:B<web_build_Ctx, typeof key> = _b(key, async ctx=>{
	const copy_versioned_targets = await copy_versioned_targets_async_b(ctx)
	return copy_targets_rollup_plugin_('copy_versioned_targets_rollup_plugin', copy_versioned_targets)
})
export type copy_versioned_targets_rollup_plugin_async_T = Promise<copy_targets_rollup_plugin_T>
