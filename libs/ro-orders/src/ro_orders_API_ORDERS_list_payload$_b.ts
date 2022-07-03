import { I } from '@ctx-core/combinators'
import { has_dom, no_dom } from '@ctx-core/dom'
import { assign, B, be_ } from '@ctx-core/object'
import { Readable$, readable$_set_ctx_, subscribe_wait_timeout, writable$, Writable$ } from '@ctx-core/store'
import { millis_ } from '@menus/date'
import { params_fireFlyID$_b } from '@menus/page'
import {
	API_ORDERS_list_b, API_ORDERS_list_payload_T, API_ORDERS_list_request__b, RoRequestQuery
} from '@menus/ro-http'
import { ro_restaurant$_b } from '@menus/ro-restaurant'
import { globalSettings$_b, ro_login_user_NotificationTone_audio$_b } from '@menus/ro-user'
import { ro_login_user$_b, Ro_User } from '@menus/ro-user-common'
import type { Order } from '@menus/shared-order'
import { show_Notification } from '@menus/util'
import { timeout_ms } from '@menus/web-config'
import { orders_tab_pageSize } from './orders_tab_pageSize.js'
import type { ro_orders_Ctx } from './ro_orders_Ctx.js'
import { ro_orders_export_url$_b } from './ro_orders_export_url$_b.js'
import { ro_orders_filter_date_range$_b } from './ro_orders_filter_date_range$_b.js'
import { ro_orders_filter_order_StatusID$_b } from './ro_orders_filter_order_StatusID$_b.js'
import { ro_orders_filter_serviceTypeId$_b } from './ro_orders_filter_serviceTypeId$_b.js'
import { ro_orders_last_requestData$_b } from './ro_orders_last_requestData$_b.js'
import { ro_orders_latest_top_order$_b } from './ro_orders_latest_top_order$_b.js'
import { ro_orders_orders_tab_page$_b } from './ro_orders_orders_tab_page$_b.js'
import { ro_orders_OrderList_a$_b } from './ro_orders_OrderList_a$_b.js'
import { ro_orders_Pagination$_b } from './ro_orders_Pagination$_b'
import { ro_orders_search$_b } from './ro_orders_search$_b.js'
const key = 'ro_orders_API_ORDERS_list_payload$'
export const ro_orders_API_ORDERS_list_payload$_b:B<ro_orders_Ctx, typeof key> = be_(key, (ctx)=>{
	const { store: busy$, set: set_busy$ } = readable$_set_ctx_(false)
	const API_ORDERS_list = API_ORDERS_list_b(ctx)
	const API_ORDERS_list_request_ = API_ORDERS_list_request__b(ctx)
	const globalSettings$ = globalSettings$_b(ctx)
	const params_fireFlyID$ = params_fireFlyID$_b(ctx)
	const refreshInterval$:Writable$<NodeJS.Timeout> = writable$(null)
	const ro_login_user$ = ro_login_user$_b(ctx)
	const ro_login_user_NotificationTone_audio$ = ro_login_user_NotificationTone_audio$_b(ctx)
	const ro_orders_export_url$ = ro_orders_export_url$_b(ctx)
	const ro_orders_filter_date_range$ = ro_orders_filter_date_range$_b(ctx)
	const ro_orders_filter_order_StatusID$ = ro_orders_filter_order_StatusID$_b(ctx)
	const ro_orders_filter_serviceTypeId$ = ro_orders_filter_serviceTypeId$_b(ctx)
	const ro_orders_last_requestData$ = ro_orders_last_requestData$_b(ctx)
	const ro_orders_latest_top_order$ = ro_orders_latest_top_order$_b(ctx)
	const ro_orders_OrderList_a$ = ro_orders_OrderList_a$_b(ctx)
	const ro_orders_orders_tab_page$ = ro_orders_orders_tab_page$_b(ctx)
	const ro_orders_Pagination$ = ro_orders_Pagination$_b(ctx)
	const ro_orders_search$ = ro_orders_search$_b(ctx)
	const ro_restaurant$ = ro_restaurant$_b(ctx)
	const { store: _ro_orders_API_ORDERS_list_payload$, set } = readable$_set_ctx_<API_ORDERS_list_payload_T>(undefined)
	const ro_orders_API_ORDERS_list_payload$ = assign(_ro_orders_API_ORDERS_list_payload$, {
		busy$, load, refresh, refreshInterval$, reset
	}) as ro_orders_API_ORDERS_list_payload$_T
	let latest_order:Order
	if (has_dom) {
		schedule_refresh()
		load().then()
	}
	return ro_orders_API_ORDERS_list_payload$
	function schedule_refresh() {
		if (no_dom) return
		const refreshInterval = refreshInterval$.$
		if (refreshInterval) clearInterval(refreshInterval)
		refresh().then()
		refreshInterval$.$ = setInterval(async ()=>{
			await refresh()
		}, (globalSettings$.$.OrdersRefreshRate || 60) * 1000) // Guard against falsy value
	}
	async function refresh() {
		const params_fireFlyID = params_fireFlyID$.$
		if (!params_fireFlyID) {
			ro_orders_API_ORDERS_list_payload$.refresh_promise = null
			return
		}
		if (
			ro_orders_API_ORDERS_list_payload$.refresh_promise
			&& millis_() <= ro_orders_API_ORDERS_list_payload$.refresh_promise_millis + 1_000 // debouncing
		) {
			return await ro_orders_API_ORDERS_list_payload$.refresh_promise
		}
		const refresh_promise = new Promise<void>(async resolve=>{
			try {
				const requestData = new RoRequestQuery()
				RoRequestQuery.fill_fireFlyID(requestData, params_fireFlyID)
				RoRequestQuery.fill_page(requestData, 1)
				RoRequestQuery.fill_pageSize(requestData, 1)
				const ro_orders_API_ORDERS_list_payload = await API_ORDERS_list(requestData)
				const { OrderList } = ro_orders_API_ORDERS_list_payload
				const ro_orders_latest_top_order = ro_orders_latest_top_order$.$
				if (OrderList?.length) {
					latest_order = OrderList[0]
				}
				const old_ro_orders_UnRead = ro_orders_API_ORDERS_list_payload$.$?.UnRead
				const ro_orders_UnRead = ro_orders_API_ORDERS_list_payload.UnRead
				// If `count` changed
				if (old_ro_orders_UnRead !== ro_orders_UnRead) {
					const ro_login_user_NotificationTone_audio = ro_login_user_NotificationTone_audio$.$
					if (ro_login_user_NotificationTone_audio) {
						ro_login_user_NotificationTone_audio.pause()
						ro_login_user_NotificationTone_audio$.refresh({ currentTime: 0 })
					}
					if ((ro_login_user$.$ as Ro_User)?.NotificationTone) {
						try {
							await ro_login_user_NotificationTone_audio.play()
						} catch (e) {
							console.error(e)
						}
					}
					const ro_restaurant = await subscribe_wait_timeout(ro_restaurant$, I, timeout_ms)
					await show_Notification({
						title: `${ro_restaurant.Name}`,
						body: `${ro_orders_UnRead} New Order${ro_orders_UnRead === 1 ? '' : 's'}`,
					})
				}
				if (ro_orders_latest_top_order && latest_order) {
					if (ro_orders_latest_top_order.ID !== latest_order.ID) {
						console.info(ctx, key, 'Orders NOT matches')
						await load()
					} else {
						console.info(ctx, key, 'Orders Up-to-Date')
					}
					console.info(ctx, key, 'Orders', ro_orders_latest_top_order.ID, latest_order.ID)
				}
			} finally {
				ro_orders_API_ORDERS_list_payload$.refresh_promise = null
				resolve()
			}
		})
		ro_orders_API_ORDERS_list_payload$.refresh_promise_millis = millis_()
		ro_orders_API_ORDERS_list_payload$.refresh_promise = refresh_promise
	}
	// Load Orders for OrdersTab
	async function load() {
		if (no_dom) return
		if (ro_orders_API_ORDERS_list_payload$.load_promise) {
			return await ro_orders_API_ORDERS_list_payload$.load_promise
		}
		const load_promise = new Promise<void>(async resolve=>{
			let first_page_without_filters = true
			let ro_orders_filter_date_range = ro_orders_filter_date_range$.$
			set_busy$(true)
			try {
				const requestData = new RoRequestQuery()
				const params_fireFlyID = await subscribe_wait_timeout(params_fireFlyID$, I, timeout_ms)
				RoRequestQuery.fill_fireFlyID(requestData, params_fireFlyID)
				const ro_orders_orders_tab_page = ro_orders_orders_tab_page$.$
				if (ro_orders_orders_tab_page > 1) {
					first_page_without_filters = false
				}
				RoRequestQuery.fill_page(requestData, ro_orders_orders_tab_page)
				RoRequestQuery.fill_pageSize(requestData, orders_tab_pageSize)
				const ro_orders_search = ro_orders_search$.$
				if (ro_orders_search.length) {
					first_page_without_filters = false
					RoRequestQuery.fill_search(requestData, ro_orders_search)
				}
				ro_orders_filter_date_range = ro_orders_filter_date_range || []
				if (ro_orders_filter_date_range.length >= 2) {
					first_page_without_filters = false
					requestData.ds = ro_orders_filter_date_range[0]
					requestData.de = ro_orders_filter_date_range[1]
				}
				const ro_orders_filter_serviceTypeId = ro_orders_filter_serviceTypeId$.$
				if (ro_orders_filter_serviceTypeId > -1) {
					first_page_without_filters = false
					requestData.mtype = ro_orders_filter_serviceTypeId
				}
				const ro_orders_filter_order_StatusID = ro_orders_filter_order_StatusID$.$
				if (ro_orders_filter_order_StatusID > -1) {
					first_page_without_filters = false
					requestData.sid = ro_orders_filter_order_StatusID
				}
				await subscribe_wait_timeout(ro_login_user$, I, timeout_ms)
				const API_ORDERS_list_request = await API_ORDERS_list_request_(requestData)
				ro_orders_last_requestData$.$ = (API_ORDERS_list_request.data as RoRequestQuery)
				ro_orders_export_url$.$ = `${API_ORDERS_list_request.url}&export=1`
				// TODO: Why is ro_login_user$.ready$ false over here on page load when tab=orders
				await subscribe_wait_timeout(ro_login_user$.ready$, I, timeout_ms)
				const ro_orders_API_ORDERS_list_payload = await API_ORDERS_list(requestData)
				set(ro_orders_API_ORDERS_list_payload)
				const { OrderList, Pagination } = ro_orders_API_ORDERS_list_payload
				ro_orders_Pagination$.$ = Pagination
				ro_orders_OrderList_a$.update(ro_orders_OrderList_a=>{
					ro_orders_OrderList_a[ro_orders_orders_tab_page] = OrderList
					return ro_orders_OrderList_a
				})
				if (first_page_without_filters && OrderList?.length) {
					ro_orders_latest_top_order$.$ = OrderList[0]
				}
			} finally {
				set_busy$(false)
				resolve()
			}
		})
		ro_orders_API_ORDERS_list_payload$.load_promise = load_promise
		try {
			await load_promise
		} finally {
			ro_orders_API_ORDERS_list_payload$.load_promise = null
		}
	}
	function reset() {
		ro_orders_filter_date_range$.reset()
		ro_orders_orders_tab_page$.reset()
		ro_orders_OrderList_a$.reset()
		ro_orders_search$.reset()
		ro_orders_filter_order_StatusID$.reset()
		ro_orders_filter_serviceTypeId$.reset()
	}
})
export interface ro_orders_API_ORDERS_list_payload$_T extends Readable$<API_ORDERS_list_payload_T> {
	busy$:Readable$<boolean>
	refresh():Promise<void>
	load():Promise<void>
	load_promise?:Promise<void>
	refresh_promise?:Promise<void>
	refresh_promise_millis:number
	refreshInterval$:Writable$<NodeJS.Timeout>
	reset():void
}
