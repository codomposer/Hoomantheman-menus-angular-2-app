import type { NotyfNotification } from 'notyf'
import { NotyfEvent } from 'notyf'
import { assign, B, be_ } from '@ctx-core/object'
import { Readable$, readable$_set_ctx_ } from '@ctx-core/store'
import { notyf } from './notyf.js'
import type { notyf_Ctx } from './notyf_Ctx.js'
import { notyf_error_b } from './notyf_error_b.js'
const key = 'notyf_banner_error_map$'
export const notyf_banner_error_map$_b:B<notyf_Ctx, typeof key> = be_(key, (ctx)=>{
	const notyf_error = notyf_error_b(ctx)
	const notyf_banner_error_map = new Map<string, Promise<NotyfNotification>>()
	const { store: _notyf_banner_error_map$, set } = readable$_set_ctx_<notyf_banner_error_map_T>(notyf_banner_error_map)
	const notyf_banner_error_map$ = _notyf_banner_error_map$ as notyf_banner_error_map$_T
	set(notyf_banner_error_map)
	return assign(notyf_banner_error_map$, {
		async activate(message) {
			let notification:NotyfNotification
			if (notyf_banner_error_map.has(message)) {
				notification = await notyf_banner_error_map.get(message)
			} else {
				const notification_promise = notyf_error({
					message,
					duration: 0,
				})
				notyf_banner_error_map.set(message, notification_promise)
				notification = await notification_promise
				notification.on(NotyfEvent.Dismiss, ()=>{
					notyf_banner_error_map$.dismiss(message)
				})
			}
			return notification
		},
		async dismiss(message) {
			const notification_promise = notyf_banner_error_map.get(message)
			if (notification_promise) {
				notyf_banner_error_map.delete(message)
				const notification = await notification_promise
				notyf.dismiss(notification)
			}
		},
	})
})
export type notyf_banner_error_map_T = Map<string, Promise<NotyfNotification>>
export interface notyf_banner_error_map$_T extends Readable$<notyf_banner_error_map_T> {
	activate(message:string):Promise<NotyfNotification>
	dismiss(message:string):Promise<void>
}
