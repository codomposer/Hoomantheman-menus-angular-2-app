import { B, be_ } from '@ctx-core/object'
import { unzip, unzip_ret_T } from './unzip.js'
import type { web_build_Ctx } from './web_build_Ctx.js'
import { src_client_path_dist_client_path_aa_async_b } from './src_client_path_dist_client_path_aa_async_b.js'
const key = 'src_client_path_r_dist_client_path_async'
export const src_client_path_r_dist_client_path_async_b:B<web_build_Ctx, typeof key> = be_(key, async (ctx)=>{
	const src_client_basename_dist_client_basename_aa = await src_client_path_dist_client_path_aa_async_b(ctx)
	return unzip(src_client_basename_dist_client_basename_aa)
})
export type src_client_path_r_dist_client_path_async_T = Promise<unzip_ret_T<string>>
