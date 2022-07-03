import { tup } from '@ctx-core/array'
import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { Enable_HiWaiter$_b } from '@menus/platform-settings'
import { support_chat_window_hide$_b } from './support_chat_window_hide$_b.js'
import { user_session_support_chat_window_hide$_b } from './user_session_support_chat_window_hide$_b.js'
import type { chat_Ctx } from './chat_Ctx.js'
const key = 'support_chat_window_show$'
export const support_chat_window_show$_b:B<chat_Ctx, typeof key> = be_(key, ctx=>{
	const support_chat_window_show$ = derived$(
		tup(
			Enable_HiWaiter$_b(ctx),
			support_chat_window_hide$_b(ctx),
			user_session_support_chat_window_hide$_b(ctx),
		), (
			[
				Enable_HiWaiter,
				support_chat_window_hide,
				user_session_support_chat_window_hide,
			]
		)=>
			Enable_HiWaiter
			&& !support_chat_window_hide
			&& !user_session_support_chat_window_hide
	)
	return support_chat_window_show$ as support_chat_window_show$_T
})
export type support_chat_window_show$_T = Readable$<boolean>
