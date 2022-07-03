import { basename, join } from 'path'
import { B, be_ } from '@ctx-core/object'
import { node_modules_src_aa_async_b } from './node_modules_src_aa_async_b.js'
import { version_node_modules_src_basename_aa_async_b } from './version_node_modules_src_basename_aa_async_b.js'
import type { web_build_Ctx } from './web_build_Ctx.js'
const key = 'client_src_client_version_src_aa_async'
export const client_src_client_version_src_aa_async_b:B<web_build_Ctx, typeof key> = be_(key, async (ctx)=>{
	const node_module_src_aa = await node_modules_src_aa_async_b(ctx)
	const version_src_basename_aa = await version_node_modules_src_basename_aa_async_b(ctx)
	return node_module_src_aa.map(([node_module_src], idx)=>{
		const client_basename = basename(node_module_src)
		return [
			join('/client', client_basename),
			join('/client', version_src_basename_aa[idx][0]),
		]
	}, {}) as [string, string][]
})
export type client_src_client_version_src_aa_async_T = Promise<[string, string][]>
