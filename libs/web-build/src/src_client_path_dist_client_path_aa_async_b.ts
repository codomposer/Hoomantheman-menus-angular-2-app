import { basename, join } from 'path'
import { B, be_ } from '@ctx-core/object'
import type { web_build_Ctx } from './web_build_Ctx.js'
import { node_modules_src_aa_async_b } from './node_modules_src_aa_async_b.js'
import { node_modules_src_basename_aa_async_b } from './node_modules_src_basename_aa_async_b.js'
const key = 'src_client_path_dist_client_path_aa_async'
export const src_client_path_dist_client_path_aa_async_b:B<web_build_Ctx, typeof key> = be_(key, async (ctx)=>{
	const node_module_src_aa = await node_modules_src_aa_async_b(ctx)
	const node_modules_src_basename_aa = await node_modules_src_basename_aa_async_b(ctx)
	return node_module_src_aa.map(([node_module_src], idx)=>{
		const node_module_src_basename = basename(node_module_src)
		return [
			join('/client', node_module_src_basename),
			node_modules_src_basename_aa[idx][0],
		]
	}, {}) as [string, string][]
})
export type src_client_path_dist_client_path_aa_async_T = Promise<[string, string][]>
