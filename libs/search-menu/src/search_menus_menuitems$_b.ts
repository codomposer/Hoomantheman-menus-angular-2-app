import { nullish } from '@ctx-core/function'
import { B, be_, assign } from '@ctx-core/object'
import { readable$_set_ctx_, Readable$, subscribe } from '@ctx-core/store'
import {
	search_menus_servicetype_requestData_, consumer_http_client_b, fetch_search_menus_menu_b
} from '@menus/consumer-http'
import type { SearchMenuitem_I } from '@menus/search-menu-common'
import { SearchMenuRequestQuery_I } from '@menus/search-menu-common'
import { ServiceTypeID_r_ServiceType, serviceType$_b, ServiceType } from '@menus/service-type'
import { deep_clone, log } from '@menus/util'
import type { search_menu_Ctx } from './search_menu_Ctx.js'
import { search_menus_menuitems_ } from './search_menus_menuitems_page$_b.js'
import { search_menus_menuitems_requestQuery$_b } from './search_menus_menuitems_requestQuery$_b.js'
const LOG_TAG = 'search_menus_menuitems$_b.js'
const key = 'search_menus_menuitems$'
export const search_menus_menuitems$_b:B<search_menu_Ctx, typeof key> = be_(key, ctx=>{
	const consumer_http_client = consumer_http_client_b(ctx)
	const fetch_search_menus_menu = fetch_search_menus_menu_b(ctx)
	const search_menus_menuitems_requestQuery$ = search_menus_menuitems_requestQuery$_b(ctx)
	const serviceType$ = serviceType$_b(ctx)
	const { store: search_menus_menuitems_busy$, set: set_search_menus_menuitems_busy } =
		readable$_set_ctx_<boolean>(false)
	const { store: search_menus_menu_no_result_config$, set: set_search_menus_menu_no_result_config } =
		readable$_set_ctx_<NoResultConfig>(null)
	const { store: search_menus_menuitems$, set: set_search_menus_menuitems } =
		readable$_set_ctx_<SearchMenuitem_I[]>(null)
	subscribe(search_menus_menuitems_requestQuery$, load_search_menus_menuitems)
	let debounce_search_menus_menuitems_requestQuery:SearchMenuRequestQuery_I
	return assign(search_menus_menuitems$, {
		search_menus_menuitems_busy$,
		search_menus_menu_no_result_config$,
	}) as search_menus_menuitems$_T
	async function load_search_menus_menuitems(search_menus_menuitems_requestQuery:SearchMenuRequestQuery_I) {
		if (!search_menus_menuitems_requestQuery) {
			set_search_menus_menuitems(null)
			return
		}
		set_search_menus_menuitems_busy(true)
		try {
			debounce_search_menus_menuitems_requestQuery = search_menus_menuitems_requestQuery
			const search_menus_menuitems_payload = await fetch_search_menus_menu(search_menus_menuitems_requestQuery)
			if (search_menus_menuitems_requestQuery !== debounce_search_menus_menuitems_requestQuery) return
			const is_first_page = (search_menus_menuitems_requestQuery?.page === search_menus_menuitems_())
			let search_menus_menuitems =
				is_first_page
				? []
				: search_menus_menuitems$.$
			const TotalRow = search_menus_menuitems_payload?.Pagination?.TotalRow
			if (TotalRow) {
				if (TotalRow > (search_menus_menuitems?.length || 0)) {
					search_menus_menuitems = (search_menus_menuitems || []).concat(search_menus_menuitems_payload.Data)
					set_search_menus_menuitems(search_menus_menuitems)
				}
				set_search_menus_menu_no_result_config(null)
			} else {
				await load_search_menus_menu_no_result_config(search_menus_menuitems_requestQuery)
			}
		} finally {
			set_search_menus_menuitems_busy(false)
		}
	}
	async function load_search_menus_menu_no_result_config(search_menus_menuitems_requestQuery:SearchMenuRequestQuery_I) {
		const search_menus_menu_available_serviceTypes_requestData = search_menus_servicetype_requestData_(
			deep_clone(search_menus_menuitems_requestQuery)
		)
		const available_serviceTypes_payload =
			await consumer_http_client.search_menus_servicetype(
				search_menus_menu_available_serviceTypes_requestData
			)
		const buttons:button_T[] = []
		const search_menus_menu_no_result_config = {
			icon: 'restaurant-menu-icon',
			title: `We can't find restaurants for ${serviceType$.$} service.`,
			subtitle: 'But we found results in other service types.',
			buttons,
		} as NoResultConfig
		const available_serviceTypes = available_serviceTypes_payload.Table || []
		let available_serviceType_exists = false
		for (const available_serviceType of available_serviceTypes) {
			if (available_serviceType.isExist) {
				const serviceType = ServiceTypeID_r_ServiceType[available_serviceType.MenuType]
				buttons.push({
					title: serviceType,
					type: 'service-type',
					action: (
						(serviceType:ServiceType)=>{
							return ()=>{
								serviceType$.set(serviceType)
								log(ctx, LOG_TAG, 'Change service type', serviceType)
							}
						})(ServiceTypeID_r_ServiceType[available_serviceType.MenuType])
				})
				available_serviceType_exists = true
			}
		}
		set_search_menus_menu_no_result_config(
			available_serviceType_exists
			? search_menus_menu_no_result_config
			: search_menus_menu_no_result_config_()
		)
	}
})
interface button_T {
	title:ServiceType
	type:string
	action:()=>void
}
interface NoResultConfig {
	icon:string
	title:string
	subtitle:string
	buttons?:NoResultConfigButton[]
}
interface NoResultConfigButton {
	title:string
	type:string
	action():void
}
export interface search_menus_menuitems$_T extends Readable$<SearchMenuitem_I[]|nullish> {
	search_menus_menuitems_busy$:search_menus_menuitems_busy$_T
	search_menus_menu_no_result_config$:search_menus_menu_no_result_config$_T
}
export type search_menus_menuitems_busy$_T = Readable$<boolean>
export type search_menus_menu_no_result_config$_T = Readable$<NoResultConfig>
export function search_menus_menu_no_result_config_(search_menus_menu_no_result_config$?:NoResultConfig) {
	return (
		search_menus_menu_no_result_config$
		? {
				icon: 'burger-search-fail-icon',
				title: `We can't find menu items`,
				subtitle: 'Try to change your filters or search for something else.',
			} : search_menus_menu_no_result_config$
	)
}
