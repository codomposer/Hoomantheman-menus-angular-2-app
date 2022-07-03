import { _b, B } from '@ctx-core/object'
import { Writable$, writable$ } from '@ctx-core/store'
import type { web_build_Ctx } from './web_build_Ctx.js'
const key = 'client_output_dir$'
export const client_output_dir$_b:B<web_build_Ctx, typeof key> = _b(key, ()=>
	writable$(undefined)
)
export type client_output_dir$_T = Writable$<string|undefined>
