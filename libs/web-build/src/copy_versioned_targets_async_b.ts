import { basename, dirname, join } from 'path'
import { B, be_ } from '@ctx-core/object'
import { node_modules_src_aa_async_b } from './node_modules_src_aa_async_b.js'
import { asset_path_r_client_asset_version_path_async_b } from './asset_path_r_client_asset_version_path_async_b.js'
import { version_node_modules_src_basename_aa_async_b } from './version_node_modules_src_basename_aa_async_b.js'
import type { web_build_Ctx } from './web_build_Ctx.js'
import { client_output_dir$_b } from './client_output_dir$_b.js'
import { assign_copy_targets_transform } from './assign_copy_targets_transform.js'
import { file_copy_targets__b } from './file_copy_targets__b.js'
import type { Target } from './Target.js'
import { http_replace_r_async_b } from './http_replace_r_async_b.js'
const key = 'copy_versioned_targets_async'
export const copy_versioned_targets_async_b:B<web_build_Ctx, typeof key> = be_(key, async (ctx)=>{
	const node_module_src_aa = await node_modules_src_aa_async_b(ctx)
	const version_node_modules_src_basename_aa = await version_node_modules_src_basename_aa_async_b(ctx)
	const asset_path_r_client_asset_version_path = await asset_path_r_client_asset_version_path_async_b(ctx)
	const client_output_dir = client_output_dir$_b(ctx).$
	const file_copy_targets_ = file_copy_targets__b(ctx)
	const http_replace_r = await http_replace_r_async_b(ctx)
	const copy_targets = assign_copy_targets_transform(http_replace_r, [
		...(
			await Promise.all(node_module_src_aa.map((node_module_src_a, idx)=>
				file_copy_targets_(node_module_src_a, version_node_modules_src_basename_aa[idx])
			)) as Target[][]
		).flat() as Target[],
		...Object.entries(asset_path_r_client_asset_version_path).map(
			([asset_path, client_asset_version_path])=>{
				return {
					src: join('./static', asset_path),
					dest: join(
						client_output_dir,
						dirname(asset_path),
						basename(client_asset_version_path),
					),
				} as Target
			}),
	] as Target[])
	return copy_targets
})
export type copy_versioned_targets_async_T = Promise<Target[]>
