import { _b, B } from '@ctx-core/object'
import { page_query$_b } from '@ctx-core/sapper'
import { query_str_ } from '@ctx-core/uri'
import { fetch_search_menus_menu_b } from '@menus/consumer-http'
import { Default_or_first_serviceType_ } from '@menus/consumer-menu'
import { platform_settings$_b, PublicKey$_b } from '@menus/http'
import { SearchMenuRequestQuery } from '@menus/search-menu-common'
import { ServiceType, ServiceTypeId } from '@menus/service-type-common'
import { MAP_SEARCH_VIEW } from '@menus/web-config'
import { menuitem_restaurant_url_data_ } from './menuitem_restaurant_url_data_.js'
import { restaurant_url_ } from './restaurant_url_.js'
import type { route_Ctx } from './route_Ctx.js'
const key = 'consumer_home_url_'
export const consumer_home_url__b:B<route_Ctx, typeof key> = _b(key, (ctx)=>{
	const fetch_search_menus_menu = fetch_search_menus_menu_b(ctx)
	const page_query$ = page_query$_b(ctx)
	const platform_settings$ = platform_settings$_b(ctx)
	const PublicKey$ = PublicKey$_b(ctx)
	return consumer_home_url_ as consumer_home_url__T
	async function consumer_home_url_():Promise<string|null> {
		const request_data = new SearchMenuRequestQuery()
		request_data.menuType = ServiceTypeId[ServiceType.SERVICE_TYPE_ALL]
		request_data.page = 1
		request_data.pageSize = 2
		request_data.pcpk = PublicKey$.$
		request_data.usemap = 1
		const search_menus_menu_payload = await fetch_search_menus_menu(request_data)
		const Data = search_menus_menu_payload.Data || []
		const Pagination = search_menus_menu_payload.Pagination
		const { TotalRow } = Pagination
		if (TotalRow === 0) {
			return null
		}
		const menuitem = Data[0]
		const platform_settings = platform_settings$.$
		const page_query = page_query$.$
		const serviceType =
			page_query.serviceType
			|| Default_or_first_serviceType_(platform_settings, menuitem)
		if (TotalRow === 1) {
			return restaurant_url_(menuitem_restaurant_url_data_(menuitem, serviceType))
		} else {
			return `/search${query_str_({
				search_keywords: '',
				search_view: MAP_SEARCH_VIEW,
				serviceType,
			})}`
		}
	}
})
export type consumer_home_url__T = ()=>Promise<string|null>
