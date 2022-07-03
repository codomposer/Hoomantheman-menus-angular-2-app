import { last_, tup, compact } from '@ctx-core/array'
import { run } from '@ctx-core/function'
import { derived$, noinit_subscribe, Readable$, writable$, Writable$ } from '@ctx-core/store'
import { query_str_, query_value_T } from '@ctx-core/uri'
import { millis_, day_minutes, minute_tick$_b } from '@menus/date'
import { navigating_goto_b, params_fireFlyID$_b } from '@menus/page'
import { GetRestaurantHoursRequestQuery, RestaurantHour_I } from '@menus/restaurant-hours-lib'
import { ro_httpClient_b } from '@menus/ro-http'
import {
	goto_order_details_b, order_is_cancelled_, ro_orders_API_ORDERS_list_payload$_b, ro_orders_filter_date_range$_b,
	ro_orders_filter_order_StatusID$_b, ro_orders_filter_serviceTypeId$_b, ro_orders_OrderList_a$_b,
	ro_orders_orders_tab_page$_b, ro_orders_ordersSearch$_b, ro_orders_search$_b, ro_orders_TotalRow$_b
} from '@menus/ro-orders'
import type { OrderStatusHistoryModal_I } from '@menus/ro-orders-ui'
import { ro_restaurant$_b } from '@menus/ro-restaurant'
import { globalSettings$_b, ro_login_user$_b, ro_login_user$_T } from '@menus/ro-user'
import { Path } from '@menus/route'
import { fetch_get_restaurant_hours_b, get_restaurant_hours_payload_T } from '@menus/shared-http'
import type { Order } from '@menus/shared-order'
import { BaseController } from '@menus/shared-ui-lib'
import { log } from '@menus/util'
import { ORDERS_TAB } from '@menus/web-config'
import type { ro_orders_ui_OrdersTab_Ctx } from '../ro_orders_ui_OrdersTab_Ctx.js'
const Controller_name = 'OrdersTab_c'
export enum view_selection_T {
	ALL = 'ALL',
	TODAY = 'TODAY',
	LATER = 'LATER',
}
export class OrdersTab_c extends BaseController<ro_orders_ui_OrdersTab_Ctx> {
	readonly ro_orders_API_ORDERS_list_payload$ = ro_orders_API_ORDERS_list_payload$_b(this.ctx)
	readonly busy$ = this.ro_orders_API_ORDERS_list_payload$.busy$
	readonly fetch_get_restaurant_hours = fetch_get_restaurant_hours_b(this.ctx)
	readonly globalSettings$ = globalSettings$_b(this.ctx)
	readonly goto_order_details = goto_order_details_b(this.ctx)
	readonly minute_tick$ = minute_tick$_b(this.ctx)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly order_status_history_modal$:Writable$<OrderStatusHistoryModal_I> = writable$(null)
	readonly params_fireFlyID$ = params_fireFlyID$_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly ro_login_user$:ro_login_user$_T = ro_login_user$_b(this.ctx)
	readonly ro_orders_filter_date_range$ = ro_orders_filter_date_range$_b(this.ctx)
	readonly ro_orders_filter_order_StatusID$ = ro_orders_filter_order_StatusID$_b(this.ctx)
	readonly ro_orders_filter_serviceTypeId$ = ro_orders_filter_serviceTypeId$_b(this.ctx)
	readonly ro_orders_OrderList_a$ = ro_orders_OrderList_a$_b(this.ctx)
	readonly ro_orders_orders_tab_page$ = ro_orders_orders_tab_page$_b(this.ctx)
	readonly ro_orders_ordersSearch$ = ro_orders_ordersSearch$_b(this.ctx)
	readonly ro_orders_search$ = ro_orders_search$_b(this.ctx)
	readonly ro_orders_TotalRow$ = ro_orders_TotalRow$_b(this.ctx)
	readonly ro_restaurant$ = ro_restaurant$_b(this.ctx)
	readonly show_filters$:Writable$<boolean> = writable$(false)
	readonly selected_order$:Writable$<Order> = writable$(null)
	readonly view_selection$:Writable$<view_selection_T> = writable$(view_selection_T.TODAY)
	readonly order_a$:Readable$<Order[]> = derived$(this.ro_orders_OrderList_a$,/*region*/
		ro_orders_OrderList_a=>{
			if (!ro_orders_OrderList_a) return []
			return compact(ro_orders_OrderList_a.flat())
		}
	)//endregion
	readonly get_restaurant_hours_payload$:Readable$<get_restaurant_hours_payload_T> = derived$(this.params_fireFlyID$,//region
		(params_fireFlyID, set)=>{
			if (!params_fireFlyID) {
				set(null)
				return
			}
			run(async ()=>{
				const get_restaurant_hours_payload = await this.load_get_restaurant_hours_payload()
				set(get_restaurant_hours_payload)
			}).then()
		}
	)//endregion
	readonly load_get_restaurant_hours_payload = async ()=>{
		const requestData = new GetRestaurantHoursRequestQuery()
		requestData.ff = this.params_fireFlyID$.$
		return await this.fetch_get_restaurant_hours(requestData)
	}
	readonly WorkingHours$:Readable$<RestaurantHour_I[]> = derived$(this.get_restaurant_hours_payload$,//region
		(get_restaurant_hours_payload)=>{
			return get_restaurant_hours_payload?.WorkingHours
		}
	)//endregion
	readonly WorkingHour_ctx_a$:Readable$<WorkingHour_ctx_T[]> = derived$(//region
		tup(this.WorkingHours$, this.minute_tick$),
		([WorkingHours, minute_tick])=>{
			const tick_ms = millis_(minute_tick)
			const WorkingHour_ctx_a:Partial<WorkingHour_ctx_T>[] = WorkingHours?.map(WorkingHour=>{
				const end_ms = millis_(last_(WorkingHour.Time).End_ISO)
				const is_active = tick_ms < end_ms
				return {
					minute_tick,
					WorkingHour,
					start_ms: millis_(WorkingHour.Time[0].Start_ISO),
					end_ms,
					TzOffsetMilliSeconds: WorkingHour.Time[0].TzOffsetMilliSeconds,
					is_active,
				}
			})
			let today_identified = false
			for (const WorkingHour_ctx of WorkingHour_ctx_a || []) {
				const { is_active, start_ms, end_ms } = WorkingHour_ctx
				if (is_active) {
					if (
						(start_ms <= tick_ms && tick_ms <= end_ms)
						|| (
							((tick_ms + day_minutes * 60 * 1000) >= end_ms)
							&& !today_identified
						)
					) {
						today_identified = true
						WorkingHour_ctx.is_today = true
						WorkingHour_ctx.is_future = false
					} else {
						WorkingHour_ctx.is_today = false
						WorkingHour_ctx.is_future = true
					}
				}
			}
			return WorkingHour_ctx_a as WorkingHour_ctx_T[]
		}
	)//endregion
	readonly view_order_a_tup_a$:Readable$<[string, Order[]][]> = derived$(//region
		tup(this.order_a$, this.WorkingHour_ctx_a$),
		([order_a, WorkingHour_ctx_a])=>{
			const today_order_a_tup = tup(view_selection_T.TODAY, [])
			const scheduled_order_a_tup = tup(view_selection_T.LATER, [])
			const view_order_a_tup_a:[view_selection_T, Order[]][] = [
				tup(view_selection_T.ALL, order_a),
				today_order_a_tup,
				scheduled_order_a_tup,
			]
			if (WorkingHour_ctx_a?.length) {
				const { TzOffsetMilliSeconds } = WorkingHour_ctx_a[0]
				for (const order of order_a || []) {
					if (
						order_is_cancelled_(order)
						|| order.Is_Completed
						|| !order.OrderETA
					) continue
					const OrderETA_ms = Date.parse(`${order.OrderETA}Z`) - TzOffsetMilliSeconds
					if (OrderETA_ms < WorkingHour_ctx_a[0].start_ms) continue
					for (const WorkingHour_ctx of WorkingHour_ctx_a) {
						const { end_ms } = WorkingHour_ctx
						if (OrderETA_ms <= end_ms) {
							if (WorkingHour_ctx.is_today) {
								today_order_a_tup[1].push(order)
							} else {
								scheduled_order_a_tup[1].push(order)
							}
							break
						}
					}
				}
				sort_order_a(today_order_a_tup[1])
				sort_order_a(scheduled_order_a_tup[1])
			}
			return view_order_a_tup_a
			function sort_order_a(order_a:Order[]) {
				order_a.sort(
					(l, r)=>{
						const l_order_sort_score_tup = order_sort_score_tup_(l)
						const r_order_sort_score_tup = order_sort_score_tup_(r)
						for (const idx in l_order_sort_score_tup) {
							const i_diff = l_order_sort_score_tup[idx] - r_order_sort_score_tup[idx]
							if (i_diff) return i_diff
						}
						return 0
					}
				)
			}
			function order_sort_score_tup_(order:Order):[number] {
				return tup(
					-Date.parse(`${order.OrderDate}Z`)
				)
			}
		}
	)//endregion
	readonly view_order_a$:Readable$<Order[]> = derived$(tup(//region
			this.view_order_a_tup_a$, this.view_selection$
		),
		([view_order_a_tup_a, view_selection])=>{
			const view_order_a_tup = view_order_a_tup_a.find(view_order_a_tup=>
				view_order_a_tup[0] === view_selection
			)
			return (
				view_order_a_tup
				? view_order_a_tup[1]
				: view_order_a_tup_a[0]
					? view_order_a_tup_a[0][1]
					: []
			)
		}
	)//endregion
	readonly filtered_view_order_a$:Readable$<Order[]> = derived$(tup(/*region*/
		this.view_order_a$, this.ro_orders_search$
	), ([view_order_a, ro_orders_search])=>{
		return view_order_a.filter(view_order=>
			[
				view_order.OrderNumber, view_order.CustomerName, view_order.ServiceType, view_order.RestaurantOrderStatusText,
				view_order.Instructions
			].some(val=>
				~val.indexOf(ro_orders_search)
			)
		)
	})//endregion
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.unsubscribers.push(
			noinit_subscribe(this.ro_orders_ordersSearch$, ordersSearch=>{
				this.ro_orders_search$.$ = ordersSearch
				this.ro_orders_orders_tab_page$.$ = 1
				this.ro_orders_API_ORDERS_list_payload$.load().then()
			}),
		)
		this.ro_orders_API_ORDERS_list_payload$.reset()
		await this.ro_orders_API_ORDERS_list_payload$.load()
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly enter_ro_orders_search = async (clearText:boolean)=>{
		log(this.ctx, Controller_name, 'enter_ro_orders_search()')
		if (clearText) {
			this.ro_orders_search$.$ = ''
		}
		this.ro_orders_orders_tab_page$.$ = 1
		// await this.onchange_orders_tab_page()
	}
	readonly onchange_orders_tab_page = async ()=>{
		const query_params = {} as orders_tab_queryParams_T
		query_params.tab = ORDERS_TAB
		const ro_orders_search = this.ro_orders_search$.$
		if (ro_orders_search.length) {
			query_params.ro_orders_search = ro_orders_search
		}
		await this.navigating_goto([
			Path.RO.BASE, Path.RO.MANAGE_RESTAURANT,
			this.params_fireFlyID$.$,
			query_str_(query_params),
		])
		log(this.ctx, Controller_name, 'onchange_orders_tab_page', query_params)
	}
	readonly show_order_details = (order: Order) => {
		if(order !== this.selected_order$.$) {
			this.selected_order$.$ = null
			setTimeout(() => this.selected_order$.$ = order);
		} else {
			this.selected_order$.$ = null
		}
	}
	readonly hide_order_details = () => {
		this.selected_order$.$ = null
	}
	readonly change_view_selection = (view_selection: string) => {
		this.view_selection$.$ = view_selection as view_selection_T
		this.selected_order$.$ = null
	}
	readonly open_order_status_history_modal = async (event:Event, order:Order)=>{
		event.stopPropagation()
		await this.order_status_history_modal$.$.open({ order })
	}
	readonly load_next_page_order_list = async (evt:Event)=>{
		if (this.ro_orders_TotalRow$.$ <= this.order_a$.$?.length) return
		const { currentTarget } = evt
		const { scrollTop, offsetHeight, scrollHeight } = currentTarget as HTMLDivElement
		if (scrollHeight <= (scrollTop + offsetHeight + 200)) {
			if (!this.ro_orders_API_ORDERS_list_payload$.load_promise) {
				this.ro_orders_orders_tab_page$.$ += 1
				await this.ro_orders_API_ORDERS_list_payload$.load()
			}
		}
	}
}
interface orders_tab_queryParams_T {
	[key:string]:query_value_T
	tab:string
	page:number
	pageSize:number
	ordersSearch:string
}
export interface WorkingHour_ctx_T {
	minute_tick:Date
	WorkingHour:RestaurantHour_I
	start_ms:number
	end_ms:number
	TzOffsetMilliSeconds:number
	is_active:boolean
	is_today:boolean
	is_future:boolean
}
