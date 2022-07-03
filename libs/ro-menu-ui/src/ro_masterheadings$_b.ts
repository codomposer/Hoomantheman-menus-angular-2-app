import { B, be_, assign } from '@ctx-core/object'
import type { Writable$ } from '@ctx-core/store'
import { refresh_writable_, invalidate_mixin_T, refresh_mixin_T } from '@menus/store'
import type { RoMasterheading_I } from '@menus/ro-shared-models'
import {
	API_MENUS_masterheading_list_payload$_b, success_API_MENUS_masterheading_list_payload_T
} from '@menus/ro-restaurant-ui'
import type { ro_menu_ui_Ctx } from './ro_menu_ui_Ctx.js'
const key = 'ro_masterheadings$'
export const ro_masterheadings$_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, ctx=>{
	const ro_masterheadings$ = refresh_writable_(null)
	const API_MENUS_masterheading_list_payload$ = API_MENUS_masterheading_list_payload$_b(ctx)
	API_MENUS_masterheading_list_payload$.subscribe(API_MENUS_masterheading_list_payload=>{
		const ro_masterheadings = (
			API_MENUS_masterheading_list_payload as success_API_MENUS_masterheading_list_payload_T
		)?.Data
		if (ro_masterheadings) {
			ro_masterheadings$.$ = ro_masterheadings
		} else {
			ro_masterheadings$.$ = null
		}
	})
	return assign(ro_masterheadings$, {
		invalidate() {
			API_MENUS_masterheading_list_payload$.invalidate()
		}
	}) as ro_masterheadings$_T
})
export interface ro_masterheadings$_T
	extends Writable$<RoMasterheading_I[]>,
		refresh_mixin_T<RoMasterheading_I[]>,
		invalidate_mixin_T {}
