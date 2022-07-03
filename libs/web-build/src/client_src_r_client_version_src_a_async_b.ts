import { B, be_ } from '@ctx-core/object'
import { client_src_client_version_src_aa_async_b } from './client_src_client_version_src_aa_async_b.js'
import { unzip, unzip_ret_T } from './unzip.js'
import type { web_build_Ctx } from './web_build_Ctx.js'
const key = 'client_src_r_client_version_src_a_async'
export const client_src_r_client_version_src_a_async_b:B<web_build_Ctx, typeof key> = be_(key, async (ctx)=>{
	const client_src_client_version_src_aa = await client_src_client_version_src_aa_async_b(ctx)
	return unzip(client_src_client_version_src_aa)
})
export type client_src_r_client_version_src_a_async_T = Promise<unzip_ret_T>
