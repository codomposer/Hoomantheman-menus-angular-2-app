import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { grecaptcha_Ctx } from './grecaptcha_Ctx.js'
const key = 'grecaptcha_loaded$'
export const grecaptcha_loaded$_b:B<grecaptcha_Ctx, typeof key> = be_(key, ()=>
	writable$<boolean>(false) as grecaptcha_loaded$_T
)
export type grecaptcha_loaded$_T = Writable$<boolean>
