import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { device_ui_Ctx } from './device_ui_Ctx.js'
const key = 'devices_loaded$'
export const devices_loaded$_b:B<device_ui_Ctx, typeof key> = be_(key, ()=>
	writable$<boolean>(false) as devices_loaded_T
)
export type devices_loaded_T = Writable$<boolean>
