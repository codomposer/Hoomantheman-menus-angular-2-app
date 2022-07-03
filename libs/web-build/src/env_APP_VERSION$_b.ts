import { _b, B } from '@ctx-core/object'
import { Writable$, writable$ } from '@ctx-core/store'
import type { web_build_Ctx } from './web_build_Ctx.js'
const key = 'env_APP_VERSION$'
export const env_APP_VERSION$_b:B<web_build_Ctx, typeof key> = _b(key, ()=>
	writable$<string>(null)
)
export type env_APP_VERSION$_T = Writable$<string>
