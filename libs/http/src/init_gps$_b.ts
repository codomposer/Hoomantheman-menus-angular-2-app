import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { Gps } from '@menus/platform-settings-lib'
import type { http_Ctx } from './http_Ctx.js'
const key = 'init_gps$'
export const init_gps$_b:B<http_Ctx, typeof key> = be_(key, ()=>
	writable$(undefined)
)
export type init_gps$_T = Writable$<Gps>
