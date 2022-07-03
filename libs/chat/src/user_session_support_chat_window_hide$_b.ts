import { B, be_ } from '@ctx-core/object'
import type { Writable$ } from '@ctx-core/store'
import { idb_writable_ } from '@menus/idb'
import type { chat_Ctx } from './chat_Ctx.js'
const key = 'user_session_support_chat_window_hide$'
export const user_session_support_chat_window_hide$_b:B<chat_Ctx, typeof key> = be_(key, ()=>
	idb_writable_<boolean>('user_session_support_chat_window_hide',
		user_session_support_chat_window_hide=>
			(
				user_session_support_chat_window_hide == null
				? false
				: user_session_support_chat_window_hide
			)
	) as user_session_support_chat_window_hide$_T
)
export type user_session_support_chat_window_hide$_T = Writable$<boolean>
