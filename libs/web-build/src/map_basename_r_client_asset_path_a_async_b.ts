import { B, be_, clone } from '@ctx-core/object'
import type { web_build_Ctx } from './web_build_Ctx.js'
import { node_modules_src_aa_async_b } from './node_modules_src_aa_async_b.js'
import { node_modules_src_basename_aa_async_b } from './node_modules_src_basename_aa_async_b.js'
import { basename } from 'path'
const key = 'map_basename_r_client_asset_path_a_async'
export const map_basename_r_client_asset_path_a_async_b:B<web_build_Ctx, typeof key> = be_(key, async (ctx)=>{
	const node_module_src_aa = await node_modules_src_aa_async_b(ctx)
	const src_basename_aa = await node_modules_src_basename_aa_async_b(ctx)
	return clone(...node_module_src_aa.flatMap((src_a, idx)=>{
		return src_a.map((src, idx2)=>{
			if (!/\.map$/.test(src)) return {}
			const src_basename = basename(src)
			return {
				[src_basename]: `client/${src_basename_aa[idx][idx2]}`
			}
		})
	})) as Record<string, string>
})
export type map_basename_r_client_asset_path_a_async_T = Promise<Record<string, string>>
