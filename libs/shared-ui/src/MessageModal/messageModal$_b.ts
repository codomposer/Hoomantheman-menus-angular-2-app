import { B, be_ } from '@ctx-core/object'
import { Writable$, writable$ } from '@ctx-core/store'
import type { shared_ui_Ctx } from '../shared_ui_Ctx.js'
import type { MessageModal_I } from './MessageModal_I.js'
const key = 'messageModal$'
export const messageModal$_b:B<shared_ui_Ctx, typeof key> = be_(key, ()=>
	writable$<MessageModal_I>(null) as messageModal$_T
)
export type messageModal$_T = Writable$<MessageModal_I>
