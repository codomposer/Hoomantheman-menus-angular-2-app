import { B, be_ } from '@ctx-core/object'
import { goto_b } from '@menus/ui'
import { log } from '@menus/util'
import { Path } from '@menus/route'
import { ro_login_user$_b } from '@menus/ro-user-common'
import { confirmModal$_b } from '@menus/shared-ui'
import type { ro_layout_ui_Ctx } from './ro_layout_ui_Ctx.js'
const LOG_TAG = 'ro_logout_b.js'
const key = 'ro_logout'
export const ro_logout_b:B<ro_layout_ui_Ctx, typeof key> = be_(key, ctx=>{
	const confirmModal$ = confirmModal$_b(ctx)
	const ro_login_user$ = ro_login_user$_b(ctx)
	const goto = goto_b(ctx)
	return ro_logout
	async function ro_logout() {
		log(ctx, LOG_TAG, 'ro_logout()')
		const confirm = await confirmModal$.$.open({
			message: `Are you sure you want to logout?`,
		})
		if (confirm) {
			ro_login_user$.set(null)
			await goto(`/${Path.RO.BASE}/${Path.RO.LOGIN}`)
		}
	}
})
export type ro_logout_T = ()=>Promise<void>
