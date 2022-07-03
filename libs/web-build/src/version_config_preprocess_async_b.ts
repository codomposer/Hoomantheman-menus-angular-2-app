import 'postcss'
import { B, be_ } from '@ctx-core/object'
import type { preprocess_T } from '@ctx-core/svelte'
import { version_vurl_async_b } from './version_vurl_async_b.js'
import type { web_build_Ctx } from './web_build_Ctx.js'
import { config_preprocess_ } from './config_preprocess_.js'
const key = 'version_config_preprocess_async'
export const version_config_preprocess_async_b:B<web_build_Ctx, typeof key> = be_(key, async (ctx)=>{
	return config_preprocess_(ctx, await version_vurl_async_b(ctx))
})
export type version_config_preprocess_async_T = Promise<preprocess_T>
