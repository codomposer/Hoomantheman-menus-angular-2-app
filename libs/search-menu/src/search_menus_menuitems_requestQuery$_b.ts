import { no_dom } from '@ctx-core/dom'
import { B, be_, clone } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { search_menus_menu_requestData_, search_menus_dishseo_requestData_ } from '@menus/consumer-http'
import { deep_equal } from '@menus/fast-deep-equal'
import type { SearchMenuRequestQuery_I } from '@menus/search-menu-common'
import { ServiceType, ServiceTypeId } from '@menus/service-type-common'
import { userAddress_coordinate_ } from '@menus/user-address-common'
import { geolocatable_center$_b, geolocatable_center$_T } from './geolocatable_center$_b'
import { search_dish_requestQuery$_b, search_dish_requestQuery$_T } from './search_dish_requestQuery$_b.js'
import type { search_menu_Ctx } from './search_menu_Ctx.js'
import { search_menus_menuitems_page$_b, search_menus_menuitems_page$_T } from './search_menus_menuitems_page$_b.js'
import { search_menus_menuitems_sort$_b, search_menus_menuitems_sort$_T } from './search_menus_menuitems_sort$_b.js'
import {
	search_menus_menuitems_termsinclude$_b, search_menus_menuitems_termsinclude$_T
} from './search_menus_menuitems_termsinclude$_b.js'
const pageSize = 20
const key = 'search_menus_menuitems_requestQuery$'
export const search_menus_menuitems_requestQuery$_b:B<search_menu_Ctx, typeof key> = be_(key, ctx=>{
	const search_menus_menuitems_requestQuery$:search_menus_menuitems_requestQuery$_T = derived$<[
		search_dish_requestQuery$_T,
		search_menus_menuitems_termsinclude$_T,
		search_menus_menuitems_sort$_T,
		search_menus_menuitems_page$_T,
		geolocatable_center$_T,
	], SearchMenuRequestQuery_I>([
		search_dish_requestQuery$_b(ctx),
		search_menus_menuitems_termsinclude$_b(ctx),
		search_menus_menuitems_sort$_b(ctx),
		search_menus_menuitems_page$_b(ctx),
		geolocatable_center$_b(ctx),
	], ([
				search_dish_requestQuery,
				search_menus_menuitems_termsinclude,
				search_menus_menuitems_sort,
				search_menus_menuitems_page,
				geolocatable_center,
			], set)=>{
		if (!search_dish_requestQuery || no_dom) {
			set(null)
			return
		}
		const search_menus_menuitems_requestQuery = (
			search_menus_menuitems_termsinclude
			? search_menus_menu_requestData_
			: search_menus_dishseo_requestData_
		)(clone(search_dish_requestQuery))
		if (search_menus_menuitems_termsinclude) {
			search_menus_menuitems_requestQuery.termsinclude = search_menus_menuitems_termsinclude
		}
		search_menus_menuitems_requestQuery.coordinate = userAddress_coordinate_(geolocatable_center)
		search_menus_menuitems_requestQuery.menuType = ServiceTypeId[ServiceType.SERVICE_TYPE_ALL]
		search_menus_menuitems_requestQuery.page = search_menus_menuitems_page
		search_menus_menuitems_requestQuery.pageSize = pageSize
		search_menus_menuitems_requestQuery.sort = search_menus_menuitems_sort
		search_menus_menuitems_requestQuery.usemap = 1
		if (!deep_equal(search_menus_menuitems_requestQuery$.$, search_menus_menuitems_requestQuery)) {
			set(search_menus_menuitems_requestQuery)
		}
	})
	return search_menus_menuitems_requestQuery$
})
export type search_menus_menuitems_requestQuery$_T = Readable$<SearchMenuRequestQuery_I>
