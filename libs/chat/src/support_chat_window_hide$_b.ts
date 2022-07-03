import { B, be_ } from '@ctx-core/object'
import type { Writable$ } from '@ctx-core/store'
import { idb_writable_ } from '@menus/idb'
import type { chat_Ctx } from './chat_Ctx.js'
const key = 'support_chat_window_hide$'
export const support_chat_window_hide$_b:B<chat_Ctx, typeof key> = be_(key, ()=>
	idb_writable_<boolean>(
		'support_chat_window_hide', support_chat_window_hide=>
			support_chat_window_hide == null ? true : support_chat_window_hide
	) as support_chat_window_hide$_T
)
export type support_chat_window_hide$_T = Writable$<boolean>
