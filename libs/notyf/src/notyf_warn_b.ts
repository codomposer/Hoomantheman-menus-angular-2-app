import type { INotyfNotificationOptions, NotyfNotification } from 'notyf'
import { be_, assign, B } from '@ctx-core/object'
import { colors } from '@menus/web-config'
import type { notyf_Ctx } from './notyf_Ctx.js'
import { active_notyf_o_a$_b } from './active_notyf_o_a$_b.js'
import { notyf_options_ } from './notyf_options_.js'
import type { notyf_fn_T } from './notyf_fn_T.js'
const key = 'notyf_warn'
export const notyf_warn_b:B<notyf_Ctx, typeof key> = be_(key, ctx=>{
	const active_notyf_o_a$ = active_notyf_o_a$_b(ctx)
	const { notyf_message } = active_notyf_o_a$
	return notyf_warn as notyf_warn_T
	function notyf_warn(in_payload_arg:string|Partial<INotyfNotificationOptions>):Promise<NotyfNotification> {
		const notyf_options = assign(notyf_options_(in_payload_arg), {
			type: 'success',
			backgroundColor: colors.brandWarning
		})
		return notyf_message(notyf_options)
	}
})
export type notyf_warn_T = notyf_fn_T
