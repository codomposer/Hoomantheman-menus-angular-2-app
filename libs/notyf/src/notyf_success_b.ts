import type { INotyfNotificationOptions, NotyfNotification } from 'notyf'
import { be_, assign, B } from '@ctx-core/object'
import { active_notyf_o_a$_b } from './active_notyf_o_a$_b.js'
import type { notyf_Ctx } from './notyf_Ctx.js'
import type { notyf_fn_T } from './notyf_fn_T.js'
import { notyf_options_ } from './notyf_options_.js'
const key = 'notyf_success'
export const notyf_success_b:B<notyf_Ctx, typeof key> = be_(key, ctx=>{
	const active_notyf_o_a$ = active_notyf_o_a$_b(ctx)
	const { notyf_message } = active_notyf_o_a$
	return notyf_success as notyf_success_T
	function notyf_success(in_payload_arg:string|Partial<INotyfNotificationOptions>):Promise<NotyfNotification> {
		const notyf_options = assign(notyf_options_(in_payload_arg), {
			type: 'success'
		})
		return notyf_message(notyf_options)
	}
})
export type notyf_success_T = notyf_fn_T
