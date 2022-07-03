import { DEFAULT_OPTIONS, INotyfNotificationOptions, INotyfPosition, NotyfNotification } from 'notyf'
import { deep_equal } from '@menus/fast-deep-equal'
import { remove } from '@ctx-core/array'
import { debounce } from '@ctx-core/function'
import { assign, B, be_, pick } from '@ctx-core/object'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import { notyf } from './notyf.js'
import { notyf_config } from './notyf_config.js'
import type { notyf_Ctx } from './notyf_Ctx.js'
import { notyf_options_ } from './notyf_options_.js'
const key = 'active_notyf_o_a$'
export const active_notyf_o_a$_b:B<notyf_Ctx, typeof key> = be_(key, ()=>{
	const active_notyf_o_a$ = refresh_writable_<active_payload_o_T[]>([])
	return assign(active_notyf_o_a$, {
		notyf_message
	})
	function notyf_message(in_payload_arg:string|Partial<INotyfNotificationOptions>):Promise<NotyfNotification> {
		const in_payload = notyf_options_(in_payload_arg)
		const in_debounce_payload_key = pick(in_payload, 'type', 'position') as payload_key_T
		const active_payload_o_a = active_notyf_o_a$.$
		let active_payload_o = active_payload_o_a.find(active_payload_o=>
			deep_equal(active_payload_o.key, in_debounce_payload_key)
		)
		let payload:INotyfNotificationOptions
		const active_payload_o_payload = active_payload_o?.payload
		if (active_payload_o_payload) {
			payload = active_payload_o_payload
			payload.message = `
				${payload.message || ''}
				<hr>
				<div class="${in_payload.className}">${in_payload.message}</div>
			`.replace(/^\t{4}/gm, '').trim()
		} else {
			payload = in_payload
			active_payload_o = {
				key: in_debounce_payload_key,
				payload,
				debounced_notyf_message: debounce<NotyfNotification>(()=>{
					const notification = notyf['success'](in_payload)
					remove(active_payload_o_a, active_payload_o)
					active_notyf_o_a$.refresh()
					return notification
				}, 500),
			}
			active_payload_o_a.push(active_payload_o)
			active_notyf_o_a$.refresh()
		}
		const { debounced_notyf_message } = active_payload_o
		payload.duration = Math.max(payload.duration, in_payload.duration || 0)
		payload.ripple = payload.ripple || in_payload.ripple || false
		payload.dismissible =
			payload.dismissible
			|| in_payload.dismissible
			|| notyf_config.dismissible
			|| DEFAULT_OPTIONS.dismissible
		return debounced_notyf_message()
	}
})
export interface active_notyf_o_a$_T extends refresh_writable_T<active_payload_o_T[]> {
	notyf_message(in_payload_arg:string|Partial<INotyfNotificationOptions>):Promise<NotyfNotification>
}
export interface active_payload_o_T {
	key:payload_key_T
	payload:INotyfNotificationOptions
	debounced_notyf_message:()=>Promise<NotyfNotification>
}
export interface payload_key_T {
	type:string
	position:INotyfPosition
}
