import { Sortable_sort_evt_T } from '@menus/dnd'
import { notyf_error_b } from '@menus/notyf'
import { params_fireFlyID$_b } from '@menus/page'
import { API_MENUS_menuoptionitem_sort_b, RoRequestQuery } from '@menus/ro-http'
import { RoMenuoptionitem_I, set_list_SortID } from '@menus/ro-shared-models'
import { SORT_ERROR_MSG } from '@menus/sort-shared'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { ro_menuoptionitems$_b } from '../ro_menuoptionitems$_b.js'
import { B, be_ } from '@ctx-core/object'
const key = 'onsort_ro_menuoptionitems'
export const onsort_ro_menuoptionitems_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, (ctx)=>{
	const API_MENUS_menuoptionitem_sort = API_MENUS_menuoptionitem_sort_b(ctx)
	const params_fireFlyID$ = params_fireFlyID$_b(ctx)
	const ro_menuoptionitems$ = ro_menuoptionitems$_b(ctx)
	return onsort_ro_menuoptionitems as onsort_ro_menuoptionitems_T
	async function onsort_ro_menuoptionitems(evt:Sortable_sort_evt_T<RoMenuoptionitem_I[]>) {
		const ro_menuoptionitems = evt.detail.out_list
		const rollback_value = ro_menuoptionitems$.$
		set_list_SortID(ro_menuoptionitems)
		ro_menuoptionitems$.$ = ro_menuoptionitems
		const rollback = ()=>{
			notyf_error_b(ctx)(SORT_ERROR_MSG)
			ro_menuoptionitems$.$ = rollback_value
		}
		try {
			const requestData = new RoRequestQuery()
			RoRequestQuery.fill_fireFlyID(requestData, params_fireFlyID$.$)
			const body = {
				SortDetails: []
			}
			for (const menuoptionitem of ro_menuoptionitems$.$) {
				if (menuoptionitem.ID > 0) {
					body.SortDetails.push({
						ID: menuoptionitem.ID,
						SortID: menuoptionitem.SortID,
					})
				}
			}
			const payload = await API_MENUS_menuoptionitem_sort(requestData, body)
			if (payload.Status !== 'success') {
				rollback()
			}
		} catch (err) {
			rollback()
			throw err
		}
	}
})
export type onsort_ro_menuoptionitems_T = (evt:Sortable_sort_evt_T<RoMenuoptionitem_I[]>)=>Promise<void>
