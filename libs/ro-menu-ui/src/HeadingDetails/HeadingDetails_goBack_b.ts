import { B, be_ } from '@ctx-core/object'
import { navigating_goto_b, params_fireFlyID$_b, params_MasterheadingID$_b } from '@menus/page'
import { Path } from '@menus/route'
import { log } from '@menus/util'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
const key = 'HeadingDetails_goBack'
export const HeadingDetails_goBack_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, ctx=>{
	const navigating_goto = navigating_goto_b(ctx)
	const params_fireFlyID$ = params_fireFlyID$_b(ctx)
	const params_MasterheadingID$ = params_MasterheadingID$_b(ctx)
	return HeadingDetails_goBack as HeadingDetails_goBack_T
	async function HeadingDetails_goBack() {
		await navigating_goto([
			`${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}`,
			params_fireFlyID$.$,
			Path.RO.MENU_DETAILS,
			params_MasterheadingID$.$
		])
		log(ctx, key)
	}
})
export type HeadingDetails_goBack_T = ()=>Promise<void>
