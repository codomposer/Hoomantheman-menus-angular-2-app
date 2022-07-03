import { B, be_ } from '@ctx-core/object'
import { RoMenuoption_I } from '@menus/ro-shared-models'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { RoMenuOptionModal_i$_b } from './RoMenuOptionModal_i$_b.js'
const key = 'open_RoMenuOptionModal_i'
export const open_RoMenuOptionModal_i_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, (ctx)=>{
	return open_RoMenuOptionModal_i as open_RoMenuOptionModal_i_T
	async function open_RoMenuOptionModal_i(ro_menuoption?:RoMenuoption_I) {
		await RoMenuOptionModal_i$_b(ctx).$.open({ ro_menuoption })
	}
})
export type open_RoMenuOptionModal_i_T = (ro_menuoption?:RoMenuoption_I)=>Promise<void>
