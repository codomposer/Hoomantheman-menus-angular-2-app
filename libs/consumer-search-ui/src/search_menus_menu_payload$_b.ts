import { run } from '@ctx-core/function'
import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { fetch_search_menus_menu_b, search_menus_menu_payload_T } from '@menus/consumer-http'
import { PublicKey$_b } from '@menus/http'
import {
	query_keywords$_b, query_lat$_b, query_lng$_b, query_max_price$_b, query_min_price$_b, query_page$_b,
	query_pageSize$_b, query_proximity$_b, query_serviceType$_b,
} from '@menus/page'
import { SearchMenuRequestQuery, SearchMenuRequestQuery_params_I } from '@menus/search-menu-common'
import { ServiceType, ServiceTypeId } from '@menus/service-type-common'
import type { consumer_search_ui_Ctx } from './consumer_search_ui_Ctx.js'
const key = 'search_menus_menu_payload$'
export const search_menus_menu_payload$_b:B<consumer_search_ui_Ctx, typeof key> = be_(key, ctx=>{
	const fetch_search_menus_menu = fetch_search_menus_menu_b(ctx)
	const query_keywords$ = query_keywords$_b(ctx)
	const query_lat$ = query_lat$_b(ctx)
	const query_lng$ = query_lng$_b(ctx)
	const query_max_price$ = query_max_price$_b(ctx)
	const query_min_price$ = query_min_price$_b(ctx)
	const query_page$ = query_page$_b(ctx)
	const query_pageSize$ = query_pageSize$_b(ctx)
	const query_proximity$ = query_proximity$_b(ctx)
	const query_serviceType$ = query_serviceType$_b(ctx)
	const PublicKey$ = PublicKey$_b(ctx)
	return derived$([
		query_min_price$, query_max_price$, query_serviceType$, query_proximity$,
		query_keywords$, query_lat$, query_lng$, query_page$,
		query_pageSize$, PublicKey$,
	], (
		[
			query_min_price, query_max_price, query_serviceType, query_proximity,
			query_keywords, query_lat, query_lng, query_page,
			query_pageSize, PublicKey
		], set
	)=>{
		const request_data = new SearchMenuRequestQuery()
		request_data.page = query_page || 1
		request_data.pageSize = query_pageSize || 100
		if (
			query_min_price || query_max_price || query_serviceType || query_proximity
			|| query_keywords || query_lat || query_lng
		) {
			const params:SearchMenuRequestQuery_params_I = {
				min_price: query_min_price,
				max_price: query_max_price,
				serviceType: query_serviceType,
				proximity: query_proximity,
				keywords: query_keywords,
				lat: query_lat,
				lng: query_lng,
			}
			SearchMenuRequestQuery.fillQueryParams(request_data, params)
		} else {
			request_data.menuType = ServiceTypeId[ServiceType.SERVICE_TYPE_ALL]
			request_data.pcpk = PublicKey
			request_data.usemap = 1
		}
		run(async ()=>{
			set(
				await fetch_search_menus_menu(request_data)
			)
		}).then()
	}) as search_menus_menu_payload$_T
})
export type search_menus_menu_payload$_T = Readable$<search_menus_menu_payload_T>
