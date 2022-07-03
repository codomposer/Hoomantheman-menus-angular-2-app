import { tup } from '@ctx-core/array'
import { page_query$_b } from '@ctx-core/sapper'
import { has_dom } from '@ctx-core/dom'
import { query_str_ } from '@ctx-core/uri'
import { derived$, writable$, Writable$, subscribe_wait_timeout } from '@ctx-core/store'
import { consumer_http_client_b, search_menus_servicetype_requestData_ } from '@menus/consumer-http'
import { userAddress$_b, userAddress_coordinate_ } from '@menus/consumer-user-address'
import { DELIVERY_STEPS_VAL, MIN_ORDER_STEPS_VAL } from '@menus/filters-common'
import { I } from '@ctx-core/combinators'
import { timeout_ms } from '@menus/web-config'
import { LatLng_ } from '@menus/geolocatable'
import { serviceType$_b } from '@menus/service-type'
import { shopping_cart_b } from '@menus/consumer-shopping-cart'
import {
	query_keywords$_b, query_lat$_b, query_lng$_b, query_page$_b,
	query_pageSize$_b
} from '@menus/page'
import {
	min_price$_b, max_price$_b, proximity$_b, min_order_step$_b, delivery_fee_step$_b
} from '@menus/filters-common'
import { ChangeAddressModal_i$_b } from '@menus/user-address-ui'
import { navigating_goto_b } from '@menus/page'
import { open_modal_b } from '@menus/modal'
import { confirmModal$_b } from '@menus/shared-ui'
import { BaseRestaurantCard } from '@menus/restaurant'
import { SearchMenuRequestQuery, SearchMenuRequestQuery_I } from '@menus/search-menu-common'
import { ServiceType, ServiceTypeId, ServiceTypeID_r_ServiceType } from '@menus/service-type-common'
import { BaseController } from '@menus/shared-ui-lib'
import { MAP_SEARCH_VIEW, SEARCH_VIEW_T } from '@menus/web-config'
import type { search_ui_Ctx } from '../search_ui_Ctx.js'
import { clone, deep_clone } from '@ctx-core/object'
const Controller_name = 'Menu_c'
export class Menu_c extends BaseController<search_ui_Ctx> {
	readonly consumer_http_client = consumer_http_client_b(this.ctx)
	readonly open_modal = open_modal_b(this.ctx)
	readonly ChangeAddressModal_i$ = ChangeAddressModal_i$_b(this.ctx)
	readonly search_view$:Writable$<SEARCH_VIEW_T> = writable$(MAP_SEARCH_VIEW)
	readonly busyMenuNames$:Writable$<boolean> = writable$(false)
	readonly busyMap$:Writable$<boolean> = writable$(false)
	readonly busyList$:Writable$<boolean> = writable$(false)
	readonly hasMoreList$:Writable$<boolean> = writable$(false)

	readonly search_menu_names_a$:Writable$<any[]> = writable$([])
	readonly search_restaurants_a$:Writable$<BaseRestaurantCard[]> = writable$([])
	readonly search_menuitem_a$:Writable$<BaseRestaurantCard[]> = writable$([])
	selectedMenuNames = []
	selectedSort = null

	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly page_query$ = page_query$_b(this.ctx)
	readonly confirmModal$ = confirmModal$_b(this.ctx)
	readonly shopping_cart = shopping_cart_b(this.ctx)
	readonly restaurant_cartitems$ = this.shopping_cart.restaurant_cartitems$

	menuNamesRequestData = new SearchMenuRequestQuery()
	mapRequestData = new SearchMenuRequestQuery()
	listRequestData = new SearchMenuRequestQuery()

	readonly userAddress$ = userAddress$_b(this.ctx)

	readonly query_keywords$ = query_keywords$_b(this.ctx)
	readonly query_lat$ = query_lat$_b(this.ctx)
	readonly query_lng$ = query_lng$_b(this.ctx)

	readonly serviceType$ = serviceType$_b(this.ctx)

	// Filters
	readonly min_price$ = min_price$_b(this.ctx)
	readonly max_price$ = max_price$_b(this.ctx)
	readonly delivery_fee_step$ = delivery_fee_step$_b(this.ctx)
	readonly min_order_step$ = min_order_step$_b(this.ctx)
	readonly proximity$ = proximity$_b(this.ctx)

	readonly query_page$ = query_page$_b(this.ctx)
	readonly query_pageSize$ = query_pageSize$_b(this.ctx)

	readonly default_no_result_config = {
		icon: 'restaurant-menu-icon',
		title: "We can't find restaurant(s)",
		subtitle: 'Try to change your filters or search for something else.'
	}

	restNoResultConfig$ = writable$(null)

	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this

		// if there is no keywords, then redirect to /search page
		if(!this.page_query$.$.keywords) {
			await this.navigating_goto(['/search'])
		} else {
			this.listen_to_events_change()
		}
	}

	readonly listen_to_events_change = () => {
		if (has_dom) {
			this.unsubscribers.push(
				// Listen to filters change
				derived$(tup(
					userAddress$_b(this.ctx),

					serviceType$_b(this.ctx),

					query_keywords$_b(this.ctx),

					min_price$_b(this.ctx),
					max_price$_b(this.ctx),
					delivery_fee_step$_b(this.ctx),
					min_order_step$_b(this.ctx),
					proximity$_b(this.ctx)
				), (
					[
						userAddress,
						serviceType,
						query_keywords,
						min_price,
						max_price,
						delivery_fee_step,
						min_order_step,
						proximity
					]
				)=> {
					this.search_restaurants_a$.$ = []
					this.search_menuitem_a$.$ = []

					// If `service type` and `user address` is available, or in case `user address` is not available then `service type` must be `pickup` or `dine-in`
					if(
						serviceType && 
						userAddress !== undefined &&
						(
							userAddress !== null || 
							(
								userAddress === null && 
								[ServiceType.SERVICE_TYPE_PICKUP, ServiceType.SERVICE_TYPE_DINEIN].indexOf(serviceType) > -1
							)
						)
						&& min_price !== undefined
						&& max_price !== undefined
						&& delivery_fee_step !== undefined
						&& min_order_step !== undefined
						&& proximity !== undefined
					) {
						// Prevents APIs getting called when user navigates away from this page
						if(window.location.pathname === '/menu') {
							this.search_menu_names_if_needed()

							this.get_map_restaurants_if_needed()

							this.get_list_restaurants_if_needed(false)
						}
					}
				}).subscribe(() => { })
			)
		}
	}

	readonly isRequestChanged = (request1: SearchMenuRequestQuery, request2: SearchMenuRequestQuery) => {
		return JSON.stringify(request1) !== JSON.stringify(request2)
	}

	readonly create_get_base_request = () => {
		const requestData = new SearchMenuRequestQuery()

		if(typeof this.min_price$.$ === 'number') {
			requestData.min_price = this.min_price$.$
		}

		if(typeof this.max_price$.$ === 'number') {
			requestData.max_price = this.max_price$.$
		}

		if(typeof this.delivery_fee_step$.$ === 'number' && typeof DELIVERY_STEPS_VAL[this.delivery_fee_step$.$] === 'number') {
			requestData.deliveryfee = DELIVERY_STEPS_VAL[this.delivery_fee_step$.$]
		}

		if(typeof this.min_order_step$.$ === 'number' && typeof DELIVERY_STEPS_VAL[this.min_order_step$.$] === 'number') {
			requestData.minimumorder = MIN_ORDER_STEPS_VAL[this.min_order_step$.$]
		}

		if(this.proximity$.$) {
			requestData.proximity = this.proximity$.$
		}

		if(this.serviceType$.$) {
			requestData.menuType = ServiceTypeId[this.serviceType$.$]
		}

		if(this.query_keywords$.$) {
			requestData.keywords = this.query_keywords$.$
		}

		if(this.userAddress$.$) {
			requestData.coordinate = userAddress_coordinate_(LatLng_(this.userAddress$.$))
		}

		return requestData
	}

	readonly create_get_restaurants_request = () => {
		const requestData = this.create_get_base_request()

		if(this.selectedSort) {
			requestData.sort = this.selectedSort
		}

		if(this.selectedMenuNames && this.selectedMenuNames.length > 0) {
			requestData.termsinclude = this.selectedMenuNames.map(m => m.Name).join('|')
		}

		return requestData
	}

	readonly search_menu_names_if_needed = async () => {
		const requestData = this.create_get_base_request()

		if(this.isRequestChanged(this.menuNamesRequestData, requestData)) {
			this.busyMenuNames$.$ = true
			try {
				this.menuNamesRequestData = requestData

				const menuNamesPayload = await this.consumer_http_client.search_menus_menuname(clone(requestData))

				this.search_menu_names_a$.$ = menuNamesPayload.Table
			} finally {
				this.busyMenuNames$.$ = false
			}
		}
	}

	readonly get_map_restaurants_if_needed = async ()=>{
		const requestData = this.create_get_restaurants_request()
		requestData.page = 1
		requestData.pageSize = 100

		if(this.isRequestChanged(this.mapRequestData, requestData)) {
			this.restNoResultConfig$.$ = null

			this.busyMap$.$ = true
			try {
				this.mapRequestData = requestData

				const restaurantsPayload = await this.consumer_http_client.search_menus_restaurants(clone(requestData))

				this.search_restaurants_a$.$ = restaurantsPayload.Data
			} finally {
				// If no results are found
				if(this.search_restaurants_a$.$.length === 0) {
					await this.load_search_menus_menu_no_result_config(this.mapRequestData)
				}

				this.busyMap$.$ = false
			}
		}
	}

	readonly get_list_restaurants_if_needed = async (loadMore: boolean)=>{
		const requestData = this.create_get_restaurants_request()
		requestData.page = loadMore ? this.listRequestData.page + 1 : 1
		requestData.pageSize = 20

		if(this.isRequestChanged(this.listRequestData, requestData)) {
			this.busyList$.$ = true
			try {
				this.listRequestData = requestData

				const menuPayload = await this.consumer_http_client.search_menus_menu(requestData)

				this.hasMoreList$.$ = menuPayload.Data.length === requestData.pageSize

				if(loadMore) {
					this.search_menuitem_a$.$ = [...this.search_menuitem_a$.$, ...menuPayload.Data]
				} else {
					this.search_menuitem_a$.$ = menuPayload.Data
				}
			} finally {
				this.busyList$.$ = false
			}
		}
	}

	readonly click_serviceType = async (serviceType:ServiceType)=>{
		if (serviceType !== this.serviceType$.$) {
			if (
				!this.restaurant_cartitems$.$?.length
				|| (
					await this.confirmModal$.$.open({
						message: 'If you change your service type, then all your shopping cart items will be removed.',
						ok_text: 'Update',
						cancel_text: 'Cancel',
						cancel_class: 'btn-gray',
					})
				)
			) {
				// Navigating to search component page with queryParams
				await this.navigating_goto([
					'/menu',
					query_str_(
						clone(
							this.page_query$.$, {
								serviceType: serviceType
							}
						)
					)
				])
				return
			}
		}
	}

	readonly load_search_menus_menu_no_result_config = async(search_menus_menuitems_requestQuery:SearchMenuRequestQuery_I) => {
		const search_menus_menu_available_serviceTypes_requestData = search_menus_servicetype_requestData_(
			deep_clone(search_menus_menuitems_requestQuery)
		)
		const available_serviceTypes_payload =
			await this.consumer_http_client.search_menus_servicetype(
				search_menus_menu_available_serviceTypes_requestData
			)
		const buttons = []
		const search_menus_menu_no_result_config = {
			icon: 'restaurant-menu-icon',
			title: `We can't find restaurants for ${this.serviceType$.$} service.`,
			subtitle: 'But we found results in other service types.',
			buttons,
		}
		const available_serviceTypes = available_serviceTypes_payload.Table || []
		let available_serviceType_exists_count = 0
		for (const available_serviceType of available_serviceTypes) {
			if (available_serviceType.isExist) {
				const serviceType = ServiceTypeID_r_ServiceType[available_serviceType.MenuType]
				buttons.push({
					title: serviceType,
					type: 'service-type',
					action: (
						(serviceType:ServiceType)=>{
							return ()=>{
								this.click_serviceType(serviceType)
							}
						})(ServiceTypeID_r_ServiceType[available_serviceType.MenuType])
				})
				available_serviceType_exists_count++
			}
		}

		if(available_serviceType_exists_count === 0) {
			this.restNoResultConfig$.$ = deep_clone(this.default_no_result_config)
		} else {
			this.restNoResultConfig$.$ = search_menus_menu_no_result_config
		}
	}

	readonly open_ChangeAddressModal_i = async ()=>{
		const userAddress = this.userAddress$.$
		const ChangeAddressModal_i = await subscribe_wait_timeout(this.ChangeAddressModal_i$, I, timeout_ms)
		await this.open_modal(ChangeAddressModal_i, { userAddress })
	}

	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}

	onMenuNameSelected = async ({ detail: selectedMenuNames }) => {
		this.selectedMenuNames = selectedMenuNames

		this.get_map_restaurants_if_needed()

		this.get_list_restaurants_if_needed(false)
	}

	onSortChanged = (_event) => {
		const { value } = _event.detail.target

		this.selectedSort = value

		this.get_map_restaurants_if_needed()

		this.get_list_restaurants_if_needed(false)
	}

	onloadMore = async (_event)=>{
		if(this.hasMoreList$.$ && !this.busyList$.$) {
			this.get_list_restaurants_if_needed(true)
		}
	}
}
