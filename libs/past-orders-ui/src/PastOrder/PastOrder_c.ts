import { neql_ } from '@ctx-core/function'
import { tup } from '@ctx-core/array'
import { derived$, Readable$, subscribe_wait_timeout, Writable$, writable$ } from '@ctx-core/store'
import { BaseController } from '@menus/shared-ui-lib'
import { OrderDetailsAPIRequestQuery, OrderItemsDetailsAPIRequestQuery } from '@menus/consumer-order'
import type { Order, OrderItem, OrderItem_I, } from '@menus/shared-order'
import { consumer_http_client_b } from '@menus/consumer-http'
import { consumer_login_user$_b } from '@menus/consumer-user-common'
import { navigating_goto_b } from '@menus/page'
import { goto_b, goto_T } from '@menus/ui'
import type { API_error_T } from '@menus/api'
import { STATUS_ERROR, timeout_ms } from '@menus/web-config'
import type { Address } from '@menus/address'
import { userAddress_a$_b } from '@menus/consumer-user-address'
import type { past_orders_ui_Ctx } from '../past_orders_ui_Ctx.js'
const Controller_name = 'PastOrder_c'
export class PastOrder_c extends BaseController<past_orders_ui_Ctx> {
	readonly orderID$:Writable$<number> = writable$(null)
	readonly consumer_http_client = consumer_http_client_b(this.ctx)
	readonly goto:goto_T = goto_b(this.ctx)
	readonly consumer_login_user$ = consumer_login_user$_b(this.ctx)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly userAddress_a$ = userAddress_a$_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly order$:Writable$<Order> = writable$(null)
	readonly order_items$:Writable$<OrderItem[]> = writable$([])
	readonly coupon_discount$:Readable$<number> = derived$(this.order$,//region
		order=>(
			(order?.Coupons || []).reduce((sum, Coupon)=>
				sum += Coupon.DiscountPrice || 0.0, 0.0)
		)
	)//endregion
	readonly delivery_address$:Readable$<Address> = derived$(tup(this.order$, this.userAddress_a$),//region
		([order, userAddress_a])=>{
			if (!order || !userAddress_a) return
			const { DeliveryAddressID } = order
			return userAddress_a.find(userAddress=>userAddress.ID === DeliveryAddressID)
		}
	)//endregion
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.load_data().then()
	};
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly load_data = async ()=>{
		this.busy$.$ = true
		try {
			const orderID = this.orderID$.$
			await subscribe_wait_timeout(this.consumer_login_user$, neql_(undefined), timeout_ms)
			// Past Order details
			const order_requestData = new OrderDetailsAPIRequestQuery()
			order_requestData.o = orderID
			// Past Order Items Details
			const order_items_requestData = new OrderItemsDetailsAPIRequestQuery()
			order_items_requestData.a = orderID
			const [raw_orders, raw_order_items] = await Promise.all([
				this.consumer_http_client.get_past_orders(order_requestData),
				this.consumer_http_client.get_past_order_items_details(order_items_requestData),
			])
			const error_orders = raw_orders as API_error_T
			const error_order_items = raw_order_items as API_error_T
			if (error_orders.Status === STATUS_ERROR || error_order_items.Status === STATUS_ERROR) {
				return
			}
			const orders = raw_orders as Order[]
			const order_items = raw_order_items as OrderItem_I[]
			if ((orders as Order[])?.length) {
				this.order$.$ = orders[0]
			} else {
				await this.goto('/past-orders')
			}
			this.order_items$.$ = order_items
		} finally {
			this.busy$.$ = false
		}
	}
	readonly goBack = async ()=>{
		await this.navigating_goto('/past-orders')
	}
}
