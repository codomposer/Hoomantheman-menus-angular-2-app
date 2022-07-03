import { _b, B } from '@ctx-core/object'
import { page_query$_b } from '@ctx-core/sapper'
import { fetch_search_menus_menuitems_b, fetch_search_menus_menuitems_requestData_ } from '@menus/consumer-http'
import { ServiceType, ServiceTypeId } from '@menus/service-type-common'
import { menuitem_restaurant_url_data_ } from './menuitem_restaurant_url_data_.js'
import { restaurant_url_ } from './restaurant_url_.js'
import type { route_Ctx } from './route_Ctx.js'
const key = 'fireFlyID_url_'
export const fireFlyID_url__b:B<route_Ctx, typeof key> = _b(key, ctx=>{
	const fetch_search_menus_menuitems = fetch_search_menus_menuitems_b(ctx)
	const page_query$ = page_query$_b(ctx)
	return fireFlyID_url_ as fireFlyID_url__T
	async function fireFlyID_url_(fireFlyID:string) {
		const requestData = fetch_search_menus_menuitems_requestData_()
		requestData.restaurantid = 0
		requestData.ff = fireFlyID
		requestData.menuType = ServiceTypeId[ServiceType.SERVICE_TYPE_ALL]
		const search_menus_menuitems_payload = await fetch_search_menus_menuitems(requestData)
		const Data = search_menus_menuitems_payload.Data
		const menuitem = Data && Data[0]
		if (menuitem) {
			const restaurant_url = restaurant_url_(
				menuitem_restaurant_url_data_(menuitem, page_query$.$.serviceType as ServiceType)
			)
			return restaurant_url
		} else {
			return '/'
		}
	}
})
export type fireFlyID_url__T = (fireFlyID:string)=>Promise<string|null>
