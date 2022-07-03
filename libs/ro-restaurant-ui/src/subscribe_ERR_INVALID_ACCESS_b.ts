import { B, be_ } from '@ctx-core/object'
import type { Unsubscriber } from '@ctx-core/store'
import { goto_ro_login_b } from '@menus/ro-http'
import { ro_login_user$_b } from '@menus/ro-user-common'
import { goto_b } from '@menus/ui'
import { notyf_error_b } from '@menus/notyf'
import type { is_ERR_INVALID_ACCESS$_T } from '@menus/ro-restaurant'
import type { ro_restaurant_ui_Ctx } from './ro_restaurant_ui_Ctx.js'
const key = 'subscribe_ERR_INVALID_ACCESS'
export const subscribe_ERR_INVALID_ACCESS_b:B<ro_restaurant_ui_Ctx, typeof key> = be_(key, ctx=>{
	const ro_login_user$ = ro_login_user$_b(ctx)
	const goto = goto_b(ctx)
	const goto_ro_login = goto_ro_login_b(ctx)
	const notyf_error = notyf_error_b(ctx)
	return subscribe_ERR_INVALID_ACCESS as subscribe_ERR_INVALID_ACCESS_T
	function subscribe_ERR_INVALID_ACCESS(is_ERR_INVALID_ACCESS$:is_ERR_INVALID_ACCESS$_T, key:string) {
		return is_ERR_INVALID_ACCESS$.subscribe(async (is_ERR_INVALID_ACCESS)=>{
			if (is_ERR_INVALID_ACCESS) {
				console.warn('subscribe_ERR_INVALID_ACCESS|ERR_INVALID_ACCESS', {
					key,
					is_ERR_INVALID_ACCESS$,
				})
				if (ro_login_user$.$) {
					await goto('/backoffice/manage-restaurant')
					notyf_error('You are not authorized to view this page')
				} else {
					await goto_ro_login().then()
					notyf_error('Please login to access this page')
				}
			}
		})
	}
})
export type subscribe_ERR_INVALID_ACCESS_T = (is_ERR_INVALID_ACCESS$:is_ERR_INVALID_ACCESS$_T, key:string)=>Unsubscriber
