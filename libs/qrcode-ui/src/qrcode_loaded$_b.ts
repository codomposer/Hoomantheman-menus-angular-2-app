import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { qrcode_ui_Ctx } from './qrcode_ui_Ctx.js'
const key = 'qrcode_loaded$'
export const qrcode_loaded$_b:B<qrcode_ui_Ctx, typeof key> = be_(key, ()=>
	writable$<boolean>(false) as qrcode_loaded$_T
)
export type qrcode_loaded$_T = Writable$<boolean>
