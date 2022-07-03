import { B, be_ } from '@ctx-core/object'
import { Writable$, writable$ } from '@ctx-core/store'
import type { shared_ui_Ctx } from '../shared_ui_Ctx.js'
import type { ConfirmModal_I } from './ConfirmModal_I.js'
const key = 'confirmModal$'
export const confirmModal$_b:B<shared_ui_Ctx, typeof key> = be_(key, ()=>
	writable$<ConfirmModal_I>(null) as confirmModal$_T
)
export type confirmModal$_T = Writable$<ConfirmModal_I>
