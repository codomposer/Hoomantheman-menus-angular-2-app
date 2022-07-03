import { B, be_ } from '@ctx-core/object'
import { preprocess_sass_, preprocess_sass_I } from '@ctx-core/sass'
import { version_vurl_async_b } from './version_vurl_async_b.js'
import type { web_build_Ctx } from './web_build_Ctx.js'
const key = 'version_preprocess_sass_async'
export const version_preprocess_sass_async_b:B<web_build_Ctx, typeof key> = be_(key, async (ctx)=>{
	const version_vurl = await version_vurl_async_b(ctx)
	return preprocess_sass_({
		functions: {
			'url($url)': version_vurl,
			'vurl($url)': version_vurl,
		},
	})
})
export type version_preprocess_sass_async_T = Promise<preprocess_sass_I>
