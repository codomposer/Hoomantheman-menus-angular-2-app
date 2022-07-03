import { B, be_ } from '@ctx-core/object'
import { preprocess_T } from '@ctx-core/svelte'
import type { web_build_Ctx } from './web_build_Ctx.js'
import { config_preprocess_ } from './config_preprocess_.js'
import { vurl_async_b } from './vurl_async_b.js'
const key = 'config_preprocess_async'
export const config_preprocess_async_b:B<web_build_Ctx, typeof key> = be_(key, async (ctx)=>{
	return config_preprocess_(ctx, await vurl_async_b(ctx))
})
export type config_preprocess_async_T = Promise<preprocess_T>
