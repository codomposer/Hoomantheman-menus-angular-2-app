import { tup } from '@ctx-core/array'
import { event_log$_b } from '@ctx-core/event-log'
import { run } from '@ctx-core/function'
import { isNumber } from '@ctx-core/number'
import { be_, assign, B, clone } from '@ctx-core/object'
import { derived$, Readable$, StoreSequence_I, } from '@ctx-core/store'
import { case_insensitive_eql } from '@ctx-core/string'
import {
	fetch_search_menus_masterheading as super_fetch_search_menus_masterheading,
	search_menus_menu_requestData_ as super_search_menus_menu_requestData_,
	get_restaurant_hours_requestData_ as super_get_restaurant_hours_requestData_,
	search_menus_heading_payload_T, search_menus_masterheading_payload_T, search_menus_menuitems_payload_T,
	consumer_http_client_b, search_menus_menu_payload_T, fetch_search_menus_menuitems_b,
	fetch_search_menus_masterheading_b, fetch_search_menus_menu_b,
} from '@menus/consumer-http'
import type { Heading_I, Masterheading_I } from '@menus/consumer-menu'
import { default_location$_b, UserAddress, userAddress$_b } from '@menus/consumer-user-address'
import { consumer_login_user$_b } from '@menus/consumer-user-common'
import type { location_T } from '@menus/geolocatable'
import { params_cuisine$_b, params_fireFlyID$_b, params_name$_b } from '@menus/page'
import type { GetRestaurantHoursRequestQuery, RestaurantHours_I } from '@menus/restaurant-hours-lib'
import { restaurant_url_, not_found_goto_url, RestaurantUrlData_I } from '@menus/route'
import { SearchMenuitem_I, SearchMenuRequestQuery } from '@menus/search-menu-common'
import { isDeliverable_, ServiceType, serviceType$_b, ServiceTypeId } from '@menus/service-type'
import { get_restaurant_hours_payload_T, fetch_get_restaurant_hours_b } from '@menus/shared-http'
import { userAddress_coordinate_ } from '@menus/user-address-common'
import { url_slug_ } from '@menus/util'
import type { restaurant_frame_Ctx } from './restaurant_frame_Ctx.js'
import {
	restaurant_frame_fetch_search_menus_menuitems_requestData_
} from './restaurant_frame_fetch_search_menus_menuitems_requestData_.js'
import { restaurant_frame_in_sync_ } from './restaurant_frame_in_sync_.js'
import type { restaurant_frame_sync_T } from './restaurant_frame_sync_T.js'
const key = 'restaurant_frame$'
export const restaurant_frame$_b:B<restaurant_frame_Ctx, typeof key> = be_(key, ctx=>{
	let get_restaurant_hours_payload_ctx:get_restaurant_hours_payload_ctx_T
	let restaurant_frame_reload_params:RestaurantFrame_I
	let search_menus_menu_payload_ctx:search_menus_menu_payload_ctx_T
	let search_menus_menuitems_payload_ctx:search_menus_menuitems_payload_ctx_T
	let search_menus_masterheading_payload_ctx:search_menus_masterheading_payload_ctx_T
	let search_menus_heading_payload_ctx:search_menus_heading_payload_ctx_T
	const consumer_http_client = consumer_http_client_b(ctx)
	const consumer_login_user$ = consumer_login_user$_b(ctx)
	const default_location$ = default_location$_b(ctx)
	const event_log$ = event_log$_b(ctx)
	const fetch_search_menus_menu = fetch_search_menus_menu_b(ctx)
	const fetch_get_restaurant_hours = fetch_get_restaurant_hours_b(ctx)
	const fetch_search_menus_menuitems = fetch_search_menus_menuitems_b(ctx)
	const params_cuisine$ = params_cuisine$_b(ctx)
	const params_fireFlyID$ = params_fireFlyID$_b(ctx)
	const params_name$ = params_name$_b(ctx)
	const serviceType$ = serviceType$_b(ctx)
	const userAddress$ = userAddress$_b(ctx)
	const restaurant_frame_reload_params$ = restaurant_frame_reload_params$_()
	const menu_restaurant_frame_reload_params$ = menu_restaurant_frame_reload_params$_()
	const search_menus_menu_payload_ctx$ = search_menus_menu_payload_ctx$_()
	const search_menus_masterheading_payload_ctx$ = search_menus_masterheading_payload_ctx$_()
	const search_menus_heading_payload_ctx$ = search_menus_heading_payload_ctx$_()
	const search_menus_menuitems_payload_ctx$ = search_menus_menuitems_payload_ctx$_()
	const get_restaurant_hours_payload_ctx$ = get_restaurant_hours_payload_ctx$_()
	const menu_ctx$ = menu_ctx$_()
	const restaurant_frame$ = restaurant_frame$_()
	const busy$ = busy$_()
	const masterheadings$ = masterheadings$_()
	const gallery_menuitems$ = gallery_menuitems$_()
	const menuitems$ = menuitems$_()
	restaurant_frame$.subscribe((restaurant_frame:RestaurantFrame_I)=>{
		const menuitems_0 = restaurant_frame?.search_menus_menuitems_payload?.Data?.[0]
		if (menuitems_0) {
			const { Latitude, Longitude } = menuitems_0
			const lat = parseFloat(Latitude as string)
			const lng = parseFloat(Longitude as string)
			if (!isNumber(lat) || !isNumber(lng)) return
			default_location$.set({
				lat,
				lng,
			} as location_T)
		}
	})
	return assign(restaurant_frame$, {
		hydrate, busy$, gallery_menuitems$, masterheadings$, menuitems$,
		restaurant_frame_reload_params$,
		menu_restaurant_frame_reload_params$,
		search_menus_masterheading_payload_ctx$,
		search_menus_heading_payload_ctx$,
		search_menus_menuitems_payload_ctx$,
		get_restaurant_hours_payload_ctx$,
		search_menus_menu_payload_ctx$,
		menu_ctx$,
	}) as restaurant_frame$_T
	function hydrate(restaurant_frame:RestaurantFrame_I) {
		const {
			fireFlyID, serviceType, name, cuisine, userAddress,
			search_menus_masterheading_payload,
			search_menus_heading_payload,
			search_menus_menuitems_payload,
		} = restaurant_frame
		const restaurant_frame_reload_params:restaurant_frame_reload_params_T = {
			fireFlyID, serviceType, name, cuisine, userAddress
		}
		if (search_menus_masterheading_payload) {
			search_menus_masterheading_payload_ctx = {
				restaurant_frame_reload_params,
				search_menus_masterheading_payload,
				step: 'hydrate',
				done: true,
			} as search_menus_masterheading_payload_ctx_T
		}
		if (search_menus_heading_payload) {
			search_menus_heading_payload_ctx = {
				restaurant_frame_reload_params,
				search_menus_heading_payload,
				step: 'hydrate',
				done: true,
			} as search_menus_masterheading_payload_ctx_T
		}
		if (search_menus_menuitems_payload) {
			search_menus_menuitems_payload_ctx = {
				restaurant_frame_reload_params,
				search_menus_menuitems_payload,
				step: 'hydrate',
				done: true,
			} as search_menus_masterheading_payload_ctx_T
		}
	}
	function restaurant_frame_reload_params$_():restaurant_frame_reload_params$_T {
		const restaurant_frame_reload_params$ = derived$(tup(
			serviceType$, params_cuisine$, params_name$,
			params_fireFlyID$, userAddress$, consumer_login_user$,
		), (
			[
				serviceType, params_cuisine, params_name,
				params_fireFlyID, userAddress, consumer_login_user,
			], set
		)=>{
			if (
				serviceType == null
				|| !params_cuisine
				|| !params_name
				|| !params_fireFlyID
			) {
				restaurant_frame_reload_params = null
				set(null)
				return
			}
			const pending_restaurant_frame_reload_params = {
				serviceType,
				cuisine: params_cuisine,
				name: params_name,
				fireFlyID: params_fireFlyID,
				userAddress,
			} as RestaurantFrame_I
			if (
				serviceType != null
				&& params_cuisine
				&& params_name
				&& params_fireFlyID
				&& (
					!restaurant_frame_in_sync_(
						pending_restaurant_frame_reload_params,
						restaurant_frame_reload_params,
					)
				)
			) {
				restaurant_frame_reload_params = pending_restaurant_frame_reload_params
				set(restaurant_frame_reload_params)
			} else {
				event_log$.add({
					'restaurant_frame.restaurant_frame_reload_params': restaurant_frame_reload_params,
					noop: true,
					step: 'dependencies pending',
					step_data: {
						serviceType,
						params_cuisine,
						params_name,
						params_fireFlyID,
						restaurant_frame_reload_params,
						pending_restaurant_frame_reload_params,
						consumer_login_user,
						'isDeliverable_($serviceType$)': isDeliverable_(serviceType),
						'userAddress?.ID': (userAddress as UserAddress)?.ID,
					}
				})
			}
		}) as restaurant_frame_reload_params$_T
		restaurant_frame_reload_params$.subscribe(restaurant_frame_reload_params=>{
			event_log$.add({
				'restaurant_frame.restaurant_frame_reload_params': restaurant_frame_reload_params
			})
		})
		return restaurant_frame_reload_params$ as restaurant_frame_reload_params$_T
	}
	function menu_restaurant_frame_reload_params$_():restaurant_frame_reload_params$_T {
		const menu_restaurant_frame_reload_params$:restaurant_frame_reload_params$_T = derived$(restaurant_frame_reload_params$, (
			restaurant_frame_reload_params
		)=>menu_restaurant_frame_reload_params_(restaurant_frame_reload_params))
		menu_restaurant_frame_reload_params$.subscribe(menu_restaurant_frame_reload_params=>{
			event_log$.add({
				'restaurant_frame.menu_restaurant_frame_reload_params': menu_restaurant_frame_reload_params
			})
		})
		return menu_restaurant_frame_reload_params$
	}
	function menu_restaurant_frame_reload_params_(restaurant_frame_reload_params:restaurant_frame_reload_params_T) {
		return restaurant_frame_reload_params
	}
	function search_menus_menu_payload_ctx$_():search_menus_menu_payload_ctx$_T {
		const search_menus_menu_payload_ctx$:search_menus_menu_payload_ctx$_T =
			derived$(menu_restaurant_frame_reload_params$,
				(menu_restaurant_frame_reload_params, set)=>{
					if (!menu_restaurant_frame_reload_params) {
						search_menus_menu_payload_ctx = null
						set(null)
						return
					}
					if (
						search_menus_menu_payload_ctx
						&& menu_restaurant_frame_reload_params.fireFlyID === (
							search_menus_menu_payload_ctx
								.menu_restaurant_frame_reload_params
								.fireFlyID
						)
						&& menu_restaurant_frame_reload_params.serviceType === (
							search_menus_menu_payload_ctx
								.menu_restaurant_frame_reload_params
								.serviceType
						)
					) {
						return
					}
					const requestData = search_menus_menu_requestData_(menu_restaurant_frame_reload_params)
					// const serviceType$ = ServiceType.SERVICE_TYPE_ALL
					run(async ()=>{
						const search_menus_menu_payload = await fetch_search_menus_menu(requestData)
						const reference_restaurant_frame_reload_params = menu_restaurant_frame_reload_params$.$
						if (
							restaurant_frame_in_sync_(
								menu_restaurant_frame_reload_params,
								reference_restaurant_frame_reload_params
							)
						) {
							search_menus_menu_payload_ctx = {
								menu_restaurant_frame_reload_params,
								requestData,
								search_menus_menu_payload,
								step: 'done',
								done: true,
							} as search_menus_menu_payload_ctx_T
							set(search_menus_menu_payload_ctx)
						} else {
							if (
								restaurant_frame_in_sync_(
									search_menus_menu_payload_ctx?.menu_restaurant_frame_reload_params,
									reference_restaurant_frame_reload_params
								)
							) {
								event_log$.add({
									'restaurant_frame.search_menus_menu_payload_ctx': search_menus_menu_payload_ctx,
									noop: true,
									step: 'restaurant_frame_reload_params$ not in sync',
									step_data: {
										restaurant_frame_reload_params,
										reference_restaurant_frame_reload_params,
										'search_menus_menu_payload_ctx?.menu_restaurant_frame_reload_params':
										search_menus_menu_payload_ctx?.menu_restaurant_frame_reload_params,
									}
								})
							} else {
								search_menus_menu_payload_ctx = {
									step: 'menu_restaurant_frame_reload_params|out_of_sync',
									step_data: {
										menu_restaurant_frame_reload_params,
										reference_restaurant_frame_reload_params,
									},
									done: false,
									menu_restaurant_frame_reload_params,
								} as search_menus_menu_payload_ctx_T
								set(search_menus_menu_payload_ctx)
							}
						}
					}).then()
				})
		search_menus_menu_payload_ctx$.subscribe(search_menus_menu_payload_ctx=>{
			event_log$.add({
				'restaurant_frame.search_menus_menu_payload_ctx': search_menus_menu_payload_ctx
			})
		})
		return search_menus_menu_payload_ctx$
	}
	function search_menus_menu_requestData_(menu_restaurant_frame_reload_params:restaurant_frame_reload_params_T) {
		const { fireFlyID } = menu_restaurant_frame_reload_params
		const requestData = super_search_menus_menu_requestData_()
		requestData.restaurantid = 0
		requestData.ff = fireFlyID
		requestData.menuType = ServiceTypeId[ServiceType.SERVICE_TYPE_ALL]
		requestData.page = 1
		requestData.pageSize = 1
		return requestData
	}
	function search_menus_masterheading_payload_ctx$_():search_menus_masterheading_payload_ctx$_T {
		const cancel_StoreSequence_ = cancel_StoreSequence_2()
		const fetch_search_menus_masterheading = fetch_search_menus_masterheading_b(ctx)
		const search_menus_masterheading_payload_ctx$:search_menus_masterheading_payload_ctx$_T =
			derived$(restaurant_frame_reload_params$, (restaurant_frame_reload_params, set)=>{
				const { cancel, StoreSequence } = cancel_StoreSequence_(
					restaurant_frame_reload_params, search_menus_masterheading_payload_ctx
				)
				if (StoreSequence) {
					const T_StoreSequence = StoreSequence as search_menus_masterheading_payload_ctx_T
					search_menus_masterheading_payload_ctx = T_StoreSequence
					set(T_StoreSequence)
				}
				if (cancel) return
				if (
					search_menus_masterheading_payload_ctx
					&& (
						restaurant_frame_in_sync_(
							search_menus_masterheading_payload_ctx.restaurant_frame_reload_params, {
								fireFlyID: params_fireFlyID$.$,
								userAddress: userAddress$.$,
								serviceType: serviceType$.$,
							})
					)
				) {
					search_menus_masterheading_payload_ctx = {
						step: 'before_http|in_sync',
						done: false,
						restaurant_frame_reload_params,
					} as search_menus_masterheading_payload_ctx_T
					set(search_menus_masterheading_payload_ctx)
				}
				const requestData = _search_menus_masterheading_requestData(restaurant_frame_reload_params)
				run(async ()=>{
					const search_menus_masterheading_payload = await fetch_search_menus_masterheading(requestData)
					const restaurant_frame_reload_params_$ = restaurant_frame_reload_params$.$
					if (restaurant_frame_in_sync_(restaurant_frame_reload_params, restaurant_frame_reload_params_$)) {
						search_menus_masterheading_payload_ctx = {
							restaurant_frame_reload_params,
							requestData,
							search_menus_masterheading_payload,
							step: 'done',
							done: true,
						} as search_menus_masterheading_payload_ctx_T
						set(search_menus_masterheading_payload_ctx)
					} else {
						if (
							restaurant_frame_in_sync_(
								search_menus_masterheading_payload_ctx?.restaurant_frame_reload_params,
								restaurant_frame_reload_params_$
							)
						) {
							event_log$.add({
								'restaurant_frame.search_menus_masterheading_payload_ctx': search_menus_masterheading_payload_ctx,
								noop: true,
								step: 'already_in_sync',
								step_data: {
									restaurant_frame_reload_params,
									restaurant_frame_reload_params_$,
									'search_menus_masterheading_payload_ctx?.restaurant_frame_reload_params':
									search_menus_masterheading_payload_ctx?.restaurant_frame_reload_params,
								}
							})
						} else {
							search_menus_masterheading_payload_ctx = {
								step: 'restaurant_frame_reload_params|out_of_sync',
								step_data: {
									restaurant_frame_reload_params,
									restaurant_frame_reload_params_$,
								},
								done: false,
								restaurant_frame_reload_params,
							} as search_menus_masterheading_payload_ctx_T
							set(search_menus_masterheading_payload_ctx)
						}
					}
				}).then()
			})
		search_menus_masterheading_payload_ctx$.subscribe(search_menus_masterheading_payload_ctx=>{
			event_log$.add({
				'restaurant_frame.search_menus_masterheading_payload_ctx': search_menus_masterheading_payload_ctx
			})
		})
		return search_menus_masterheading_payload_ctx$
	}
	function _search_menus_masterheading_requestData(restaurant_frame_reload_params:restaurant_frame_reload_params_T) {
		const {
			fireFlyID,
			serviceType,
			userAddress,
		} = restaurant_frame_reload_params
		const requestData = super_fetch_search_menus_masterheading()
		requestData.restaurantid = 0
		requestData.ff = fireFlyID
		requestData.menuType = ServiceTypeId[serviceType]
		if (userAddress) {
			requestData.coordinate = userAddress_coordinate_(userAddress)
			requestData.proximity = 100
		}
		return requestData
	}
	function search_menus_heading_payload_ctx$_():search_menus_heading_payload_ctx$_T {
		const cancel_StoreSequence_ = cancel_StoreSequence_2()
		const search_menus_heading_payload_ctx$:search_menus_heading_payload_ctx$_T = derived$(
			restaurant_frame_reload_params$, (
				restaurant_frame_reload_params, set
			)=>{
				const { cancel, StoreSequence } = cancel_StoreSequence_(
					restaurant_frame_reload_params, search_menus_heading_payload_ctx
				)
				if (StoreSequence) {
					const T_StoreSequence = StoreSequence as search_menus_heading_payload_ctx_T
					search_menus_heading_payload_ctx = T_StoreSequence
					set(T_StoreSequence)
				}
				if (cancel) return
				const requestData = search_menus_heading_requestData_(restaurant_frame_reload_params)
				run(async ()=>{
					const search_menus_heading_payload = await consumer_http_client.search_menus_heading(requestData)
					const restaurant_frame_reload_params_$ = restaurant_frame_reload_params$.$
					if (restaurant_frame_in_sync_(restaurant_frame_reload_params, restaurant_frame_reload_params_$)) {
						search_menus_heading_payload_ctx = {
							restaurant_frame_reload_params,
							requestData,
							search_menus_heading_payload,
							step: 'done',
							done: true,
						} as search_menus_heading_payload_ctx_T
						set(search_menus_heading_payload_ctx)
					} else {
						if (
							restaurant_frame_in_sync_(
								search_menus_heading_payload_ctx?.restaurant_frame_reload_params,
								restaurant_frame_reload_params_$
							)
						) {
							event_log$.add({
								search_menus_heading_payload_ctx,
								noop: true,
								step: 'already_in_sync',
								step_data: {
									search_menus_heading_payload_ctx,
									'search_menus_heading_payload_ctx?.restaurant_frame_reload_params':
									search_menus_heading_payload_ctx?.restaurant_frame_reload_params,
									restaurant_frame_reload_params_$,
								},
							})
						} else {
							search_menus_heading_payload_ctx = {
								restaurant_frame_reload_params,
								step: 'restaurant_frame_reload_params|out_of_sync',
								step_data: {
									restaurant_frame_reload_params,
									restaurant_frame_reload_params_$,
								},
								done: false,
							} as search_menus_heading_payload_ctx_T
							set(search_menus_heading_payload_ctx)
						}
					}
				}).then()
			})
		search_menus_heading_payload_ctx$.subscribe(search_menus_heading_payload_ctx=>{
			event_log$.add({
				'restaurant_frame.search_menus_heading_payload_ctx': search_menus_heading_payload_ctx
			})
		})
		return search_menus_heading_payload_ctx$
	}
	function search_menus_heading_requestData_(restaurant_frame_reload_params:restaurant_frame_reload_params_T) {
		const {
			fireFlyID,
			serviceType,
			userAddress,
		} = restaurant_frame_reload_params
		const requestData = new SearchMenuRequestQuery()
		requestData.restaurantid = 0
		requestData.ff = fireFlyID
		requestData.menuType = ServiceTypeId[serviceType] // SERVICE_TYPE_DINEIN;
		if (userAddress) {
			requestData.coordinate = userAddress_coordinate_(userAddress)
			requestData.proximity = 100
		}
		return requestData
	}
	function search_menus_menuitems_payload_ctx$_():search_menus_menuitems_payload_ctx$_T {
		const cancel_StoreSequence_ = cancel_StoreSequence_2()
		const search_menus_menuitems_payload_ctx$:search_menus_menuitems_payload_ctx$_T =
			derived$(restaurant_frame_reload_params$, (restaurant_frame_reload_params, set)=>{
				const { cancel, StoreSequence } = cancel_StoreSequence_(
					restaurant_frame_reload_params, search_menus_menuitems_payload_ctx
				)
				if (StoreSequence) {
					const T_StoreSequence = StoreSequence as search_menus_menuitems_payload_ctx_T
					search_menus_menuitems_payload_ctx = T_StoreSequence
					set(T_StoreSequence)
				}
				if (cancel) return
				const requestData = restaurant_frame_fetch_search_menus_menuitems_requestData_(restaurant_frame_reload_params)
				run(async ()=>{
					const search_menus_menuitems_payload = await fetch_search_menus_menuitems(requestData)
					const restaurant_frame_reload_params_$ = restaurant_frame_reload_params$.$
					if (
						restaurant_frame_in_sync_(restaurant_frame_reload_params, restaurant_frame_reload_params_$)
					) {
						search_menus_menuitems_payload_ctx = {
							restaurant_frame_reload_params,
							requestData,
							search_menus_menuitems_payload,
							step: 'done',
							done: true,
						} as search_menus_menuitems_payload_ctx_T
						set(search_menus_menuitems_payload_ctx)
					} else {
						if (
							restaurant_frame_in_sync_(
								search_menus_menuitems_payload_ctx?.restaurant_frame_reload_params,
								restaurant_frame_reload_params_$
							)
						) {
							event_log$.add({
								search_menus_menuitems_payload_ctx,
								noop: true,
								step: 'already_in_sync',
								step_data: {
									search_menus_menuitems_payload_ctx,
									'search_menus_menuitems_payload_ctx?.restaurant_frame_reload_params':
									search_menus_menuitems_payload_ctx?.restaurant_frame_reload_params,
									restaurant_frame_reload_params_$,
								},
							})
						} else {
							search_menus_menuitems_payload_ctx = {
								step: 'restaurant_frame_reload_params|out_of_sync',
								step_data: {
									restaurant_frame_reload_params,
									'search_menus_menuitems_payload_ctx?.restaurant_frame_reload_params':
									search_menus_menuitems_payload_ctx?.restaurant_frame_reload_params,
									'restaurant_frame_reload_params_$':
									restaurant_frame_reload_params_$,
								},
								done: false,
							} as search_menus_menuitems_payload_ctx_T
							set(search_menus_menuitems_payload_ctx)
						}
					}
				}).then()
			})
		search_menus_menuitems_payload_ctx$.subscribe(search_menus_menuitems_payload_ctx=>{
			event_log$.add({
				'restaurant_frame.search_menus_menuitems_payload_ctx': search_menus_menuitems_payload_ctx
			})
		})
		return search_menus_menuitems_payload_ctx$
	}
	function get_restaurant_hours_payload_ctx$_():get_restaurant_hours_payload_ctx$_T {
		const cancel_StoreSequence_ = cancel_StoreSequence_2()
		const get_restaurant_hours_payload_ctx$:get_restaurant_hours_payload_ctx$_T = derived$(restaurant_frame_reload_params$, (restaurant_frame_reload_params, set)=>{
			const { cancel, StoreSequence } =
				cancel_StoreSequence_(
					restaurant_frame_reload_params, get_restaurant_hours_payload_ctx
				)
			if (StoreSequence) {
				const T_StoreSequence = StoreSequence as get_restaurant_hours_payload_ctx_T
				get_restaurant_hours_payload_ctx = T_StoreSequence
				set(T_StoreSequence)
			}
			if (cancel) return
			const requestData = get_restaurant_hours_requestData_(restaurant_frame_reload_params)
			run(async ()=>{
				const get_restaurant_hours_payload = await fetch_get_restaurant_hours(requestData)
				const restaurant_frame_reload_params_$ = restaurant_frame_reload_params$.$
				if (
					restaurant_frame_in_sync_(
						restaurant_frame_reload_params, restaurant_frame_reload_params_$
					)
				) {
					get_restaurant_hours_payload_ctx = {
						restaurant_frame_reload_params,
						requestData,
						get_restaurant_hours_payload,
						step: 'done',
						done: true,
					} as get_restaurant_hours_payload_ctx_T
					set(get_restaurant_hours_payload_ctx)
				} else {
					if (
						restaurant_frame_in_sync_(
							get_restaurant_hours_payload_ctx?.restaurant_frame_reload_params,
							restaurant_frame_reload_params_$
						)
					) {
						event_log$.add({
							get_restaurant_hours_payload_ctx,
							noop: true,
							step: 'already_in_sync',
							step_data: {
								get_restaurant_hours_payload_ctx,
								'get_restaurant_hours_payload_ctx?.restaurant_frame_reload_params':
								get_restaurant_hours_payload_ctx?.restaurant_frame_reload_params,
								restaurant_frame_reload_params_$,
							},
						})
					} else {
						get_restaurant_hours_payload_ctx = {
							step: 'restaurant_frame_reload_params|out_of_sync',
							step_data: {
								restaurant_frame_reload_params,
								'get_restaurant_hours_payload_ctx?.restaurant_frame_reload_params':
								get_restaurant_hours_payload_ctx?.restaurant_frame_reload_params,
								'restaurant_frame_reload_params_$': restaurant_frame_reload_params_$,
							},
							done: false,
						} as get_restaurant_hours_payload_ctx_T
						set(get_restaurant_hours_payload_ctx)
					}
				}
			}).then()
		})
		return get_restaurant_hours_payload_ctx$
	}
	function get_restaurant_hours_requestData_(restaurant_frame_reload_params:restaurant_frame_reload_params_T) {
		const { fireFlyID } = restaurant_frame_reload_params
		const requestData = super_get_restaurant_hours_requestData_()
		requestData.ff = fireFlyID
		return requestData
	}
	function menu_ctx$_():menu_ctx$_T {
		const menu_ctx$:Readable$<StoreSequence_I> = derived$(search_menus_menu_payload_ctx$, (
			search_menus_menu_payload_ctx
		)=>{
			if (!search_menus_menu_payload_ctx) return {
				step: '!search_menus_menu_payload_ctx', done: false
			} as menu_ctx_T
			const { search_menus_menu_payload } = search_menus_menu_payload_ctx
			const Data = search_menus_menu_payload?.Data
			if (!Data) {
				return {
					step: '!search_menus_menu_payload.Data', done: false, menu: false
				}
			}
			const menu = Data[0]
			if (!menu) return {
				step: 'done|!menu', done: true, menu: false,
				goto_url: not_found_goto_url
			}
			const cuisine = url_slug_(menu.CuisineName)
			const restName = url_slug_(menu.RestaurantName)
			const address = url_slug_(menu.Address)
			const name = `${restName}-${address}`
			const {
				Address, RestaurantName, isDelivery, isPickup, isCatering, isDiningIn
			} = menu
			return {
				menu, cuisine, restName, address, name,
				Address, RestaurantName, isDelivery, isPickup, isCatering, isDiningIn,
				step: 'done', done: true
			} as menu_ctx_T
		})
		menu_ctx$.subscribe(menu_ctx=>{
			event_log$.add({
				'restaurant_frame.menu_ctx': menu_ctx
			})
		})
		return menu_ctx$ as menu_ctx$_T
	}
	function cancel_StoreSequence_2() {
		let current_restaurant_frame_reload_params:restaurant_frame_reload_params_T
		return function cancel_StoreSequence_(
			restaurant_frame_reload_params:restaurant_frame_reload_params_T,
			payload_ctx:restaurant_frame_payload_ctx_T,
		):cancel_StoreSequence_T {
			if (!restaurant_frame_reload_params) {
				return {
					cancel: true,
					StoreSequence: {
						restaurant_frame_reload_params,
						step: 'cancel_StoreSequence_|!restaurant_frame_reload_params',
						done: false
					} as StoreSequence_I
				}
			}
			const source_syncable = {
				fireFlyID: params_fireFlyID$.$,
				userAddress: userAddress$.$,
				serviceType: serviceType$.$,
			}
			if (
				payload_ctx?.done
				&& (
					restaurant_frame_in_sync_(
						payload_ctx.restaurant_frame_reload_params,
						source_syncable
					)
					||
					restaurant_frame_in_sync_(
						restaurant_frame_reload_params,
						current_restaurant_frame_reload_params
					)
				)
			) {
				return {
					cancel: true,
					StoreSequence: payload_ctx,
				}
			}
			let StoreSequence:StoreSequence_I
			if (payload_ctx) {
				StoreSequence = {
					restaurant_frame_reload_params,
					step: 'cancel_StoreSequence_|updating',
					step_data: {
						payload_ctx,
						'payload_ctx.restaurant_frame_reload_params': payload_ctx.restaurant_frame_reload_params,
						source_syncable,
						restaurant_frame_reload_params,
						current_restaurant_frame_reload_params,
					},
					done: false,
				} as StoreSequence_I
			}
			current_restaurant_frame_reload_params = restaurant_frame_reload_params
			return {
				cancel: false,
				StoreSequence,
			}
		}
	}
	function restaurant_frame$_():restaurant_frame$_T {
		let restaurant_frame_change_data:Partial<{
			fireFlyID:string, isDelivery:boolean, isPickup:boolean, isCatering:boolean,
			isDiningIn:boolean, page_title:string, menu:SearchMenuitem_I
		}> = {}
		const restaurant_frame$:Readable$<restaurant_frame_T> = derived$(tup(
			restaurant_frame_reload_params$,
			search_menus_menu_payload_ctx$,
			search_menus_masterheading_payload_ctx$,
			search_menus_heading_payload_ctx$,
			search_menus_menuitems_payload_ctx$,
			get_restaurant_hours_payload_ctx$,
			menu_ctx$,
		), (
			[
				restaurant_frame_reload_params,
				search_menus_menu_payload_ctx,
				search_menus_masterheading_payload_ctx,
				search_menus_heading_payload_ctx,
				search_menus_menuitems_payload_ctx,
				get_restaurant_hours_payload_ctx,
				menu_ctx,
			]
		)=>{
			const restaurant_frame = clone(restaurant_frame_reload_params) as RestaurantFrame_I
			if (
				!case_insensitive_eql([
					restaurant_frame_reload_params?.fireFlyID,
					restaurant_frame_change_data?.fireFlyID
				])
			) {
				restaurant_frame_change_data = {}
			}
			if (
				!search_menus_masterheading_payload_ctx?.done
				|| !search_menus_heading_payload_ctx?.done
				|| !search_menus_menuitems_payload_ctx?.done
				|| !search_menus_menu_payload_ctx?.done
				|| !get_restaurant_hours_payload_ctx?.done
			) {
				return assign(restaurant_frame, restaurant_frame_change_data, {
					step: '!payload_ctx.done',
					step_data: {
						search_menus_masterheading_payload_ctx,
						search_menus_heading_payload_ctx,
						search_menus_menuitems_payload_ctx,
						search_menus_menu_payload_ctx,
						get_restaurant_hours_payload_ctx,
					},
					done: false,
				})
			}
			const { fireFlyID, serviceType } = restaurant_frame_reload_params
			const { search_menus_masterheading_payload } = search_menus_masterheading_payload_ctx
			const { search_menus_heading_payload } = search_menus_heading_payload_ctx
			const { search_menus_menuitems_payload } = search_menus_menuitems_payload_ctx
			const { search_menus_menu_payload } = search_menus_menu_payload_ctx
			const { get_restaurant_hours_payload } = get_restaurant_hours_payload_ctx
			const menuitems:SearchMenuitem_I[] = search_menus_menuitems_payload?.Data || []
			const {
				menu, cuisine, name, Address, RestaurantName, isDelivery, isPickup, isCatering, isDiningIn
			} = menu_ctx
			if (cuisine !== restaurant_frame.cuisine || name !== restaurant_frame.name) {
				return assign(restaurant_frame, {
					step: 'done|goto_url',
					done: true,
					goto_url: restaurant_url_({
						serviceType: restaurant_frame.serviceType,
						cuisine,
						name,
						fireFlyID: restaurant_frame.fireFlyID,
					} as RestaurantUrlData_I)
				})
			}
			let masterheadings = search_menus_masterheading_payload
			const headings = search_menus_heading_payload
			const gallery_menuitems:SearchMenuitem_I[] =
				menuitems.filter(m=>m.ShowImageInGallery && m.MenuImageExist)
			const restaurant_hours = get_restaurant_hours_payload
			if (masterheadings.length && headings.length && menuitems.length) {
				for (const masterheading of masterheadings) {
					masterheading.heads = []
					masterheading.menuitems = []
					for (const heading of headings) {
						if (heading.Mhid === masterheading.Mhid) {
							masterheading.heads.push(heading)
							heading.menuitems = []
							for (const menuitem of menuitems) {
								if (menuitem.HeadingID === heading.Hid) {
									masterheading.menuitems.push(menuitem)
									heading.menuitems.push(menuitem)
								}
							}
						}
					}
				}
				masterheadings = masterheadings.filter(masterheading=>
					masterheading.menuitems.length
				)
			} else {
				masterheadings = []
			}
			const page_title = `${RestaurantName} - Menu - ${Address} - Menu.com`
			restaurant_frame_change_data = {
				fireFlyID, isDelivery, isPickup, isCatering, isDiningIn, page_title, menu
			}
			assign(restaurant_frame, {
				restaurant_frame_reload_params,
				fireFlyID,
				serviceType,
				isDeliverable: isDeliverable_(serviceType),
				gallery_menuitems,
				masterheadings,
				headings,
				menuitems,
				restaurant_hours,
				page_title,
				search_menus_masterheading_payload,
				search_menus_heading_payload,
				search_menus_menuitems_payload,
				search_menus_menu_payload,
				get_restaurant_hours_payload,
				menu,
				isDelivery,
				isPickup,
				isCatering,
				isDiningIn,
			})
			if (!menu_ctx.done) {
				if (menu_ctx.step === '!menu') {
					restaurant_frame.goto_url = not_found_goto_url
				}
				assign(restaurant_frame, {
					step: '!menu_ctx.done',
					data: {
						menu_ctx,
						search_menus_masterheading_payload_ctx,
						search_menus_heading_payload_ctx,
						search_menus_menuitems_payload_ctx,
						search_menus_menu_payload_ctx,
					},
					done: false,
				})
			} else {
				assign(restaurant_frame, {
					step: 'done',
					done: true,
				})
			}
			return restaurant_frame as RestaurantFrame_I
		})
		restaurant_frame$.subscribe(restaurant_frame=>{
			event_log$.add({ restaurant_frame })
		})
		return restaurant_frame$ as restaurant_frame$_T
	}
	function busy$_():restaurant_frame_busy$_T {
		const busy$:restaurant_frame_busy$_T = derived$(tup(
			restaurant_frame_reload_params$,
			restaurant_frame$,
		), (
			[
				restaurant_frame_reload_params,
				restaurant_frame
			]
		)=>{
			return !!(
				restaurant_frame_reload_params
				&& (
					!restaurant_frame
					|| (
						!(restaurant_frame as RestaurantFrame_I).goto_url && !restaurant_frame.done
					)
				)
			)
		})
		busy$.subscribe(busy=>{
			event_log$.add({ 'restaurant_frame$.busy$': busy })
		})
		return busy$
	}
	function masterheadings$_():masterheadings_T {
		const masterheadings$:masterheadings_T = derived$(restaurant_frame$,
			restaurant_frame=>{
				const masterheadings = (restaurant_frame as RestaurantFrame_I)?.masterheadings
				return masterheadings
			}
		)
		masterheadings$.subscribe(masterheadings=>{
			event_log$.add({ 'restaurant_frame$.masterheadings$': masterheadings })
		})
		return masterheadings$
	}
	function gallery_menuitems$_():gallery_menuitems_T {
		const gallery_menuitems$:gallery_menuitems_T = derived$(restaurant_frame$, restaurant_frame=>
			(restaurant_frame as RestaurantFrame_I)?.gallery_menuitems
		)
		gallery_menuitems$.subscribe(gallery_menuitems=>{
			event_log$.add({ 'restaurant_frame$.gallery_menuitems$': gallery_menuitems })
		})
		return gallery_menuitems$
	}
	function menuitems$_():menuitems_T {
		const menuitems$:menuitems_T = derived$(masterheadings$, masterheadings=>{
			if (!masterheadings) return
			const menuitems:SearchMenuitem_I[] = []
			for (const masterheading of masterheadings) {
				for (const head of masterheading.heads) {
					menuitems.push(...(head.menuitems || []))
				}
			}
			return menuitems
		})
		menuitems$.subscribe(menuitems=>{
			event_log$.add({ 'restaurant_frame$.menuitems$': menuitems })
		})
		return menuitems$
	}
})
export interface RestaurantFrame_I extends/*@formatter:off*/
  restaurant_frame_sync_T, RestaurantUrlData_I, menu_ctx_T, StoreSequence_I
/*@formatter:on*/
{
	fireFlyID:string
	serviceType:ServiceType
	name:string
	cuisine:string
	userAddress:UserAddress
	isDelivery:boolean
	isPickup:boolean
	isCatering:boolean
	isDiningIn:boolean
	page_title:string
	menu:SearchMenuitem_I,
	masterheadings:Masterheading_I[]
	headings:Heading_I[]
	menuitems:SearchMenuitem_I[]
	gallery_menuitems:SearchMenuitem_I[]
	restaurant_hours:RestaurantHours_I
	goto_url:string
	search_menus_heading_payload:search_menus_heading_payload_T
	search_menus_masterheading_payload:search_menus_masterheading_payload_T
	search_menus_menuitems_payload:search_menus_menuitems_payload_T
	isDeliverable:boolean
}
export type restaurant_frame_T = RestaurantFrame_I
export interface restaurant_frame$_T extends Readable$<restaurant_frame_T> {
	hydrate:(restaurant_frame:restaurant_frame_T)=>void
	busy$:restaurant_frame_busy$_T
	masterheadings$:masterheadings_T
	gallery_menuitems$:gallery_menuitems_T
	menuitems$:menuitems_T
	menu_ctx$:menu_ctx$_T
	search_menus_menu_payload_ctx$:search_menus_menu_payload_T
	restaurant_frame_reload_params$:restaurant_frame_reload_params$_T
	menu_restaurant_frame_reload_params$:restaurant_frame_reload_params$_T
	search_menus_masterheading_payload_ctx$:search_menus_masterheading_payload_ctx$_T
	search_menus_heading_payload_ctx$:search_menus_heading_payload_ctx$_T
	search_menus_menuitems_payload_ctx$:search_menus_menuitems_payload_ctx$_T
	get_restaurant_hours_payload_ctx$:get_restaurant_hours_payload_ctx$_T
}
export interface restaurant_frame_reload_params_T extends restaurant_frame_sync_T {
	fireFlyID:string
	serviceType:ServiceType
	name:string
	cuisine:string
	userAddress?:UserAddress|false
}
export type restaurant_frame_reload_params$_T = Readable$<restaurant_frame_reload_params_T>
export interface search_menus_menu_payload_ctx_T extends StoreSequence_I {
	menu_restaurant_frame_reload_params:restaurant_frame_reload_params_T
	requestData?:SearchMenuRequestQuery
	search_menus_menu_payload:search_menus_menu_payload_T
}
export type search_menus_menu_payload_ctx$_T = Readable$<search_menus_menu_payload_ctx_T>
export interface search_menus_menuitems_payload_ctx_T extends restaurant_frame_payload_ctx_T {
	search_menus_menuitems_payload?:search_menus_menuitems_payload_T
}
export type search_menus_menuitems_payload_ctx$_T = Readable$<search_menus_menuitems_payload_ctx_T>
export interface get_restaurant_hours_payload_ctx_T extends restaurant_frame_payload_ctx_T {
	restaurant_frame_reload_params:restaurant_frame_reload_params_T
	requestData?:GetRestaurantHoursRequestQuery
	get_restaurant_hours_payload:get_restaurant_hours_payload_T
}
export type get_restaurant_hours_payload_ctx$_T = Readable$<get_restaurant_hours_payload_ctx_T>
export interface menu_ctx_T extends StoreSequence_I {
	menu:SearchMenuitem_I
	cuisine:string
	restName:string
	address:string
	name:string
	Address:string
	RestaurantName:string
	isDelivery:boolean
	isPickup:boolean
	isCatering:boolean
	isDiningIn:boolean
}
export type menu_ctx$_T = Readable$<menu_ctx_T>
export interface search_menus_masterheading_payload_ctx_T extends restaurant_frame_payload_ctx_T {
	search_menus_masterheading_payload?:search_menus_masterheading_payload_T
}
export type search_menus_masterheading_payload_ctx$_T = Readable$<search_menus_masterheading_payload_ctx_T>
export interface search_menus_heading_payload_ctx_T extends restaurant_frame_payload_ctx_T {
	search_menus_heading_payload?:search_menus_heading_payload_T
}
export type search_menus_heading_payload_ctx$_T = Readable$<search_menus_heading_payload_ctx_T>
export interface restaurant_frame_payload_ctx_T extends StoreSequence_I {
	restaurant_frame_reload_params:restaurant_frame_reload_params_T
	requestData?:SearchMenuRequestQuery|GetRestaurantHoursRequestQuery
}
export type gallery_menuitems_T = Readable$<SearchMenuitem_I[]>
export type menuitems_T = Readable$<SearchMenuitem_I[]>
export type masterheadings_T = Readable$<Masterheading_I[]>
export type restaurant_frame_busy$_T = Readable$<boolean>
export interface cancel_StoreSequence_T {
	cancel:boolean,
	StoreSequence:StoreSequence_I
}
