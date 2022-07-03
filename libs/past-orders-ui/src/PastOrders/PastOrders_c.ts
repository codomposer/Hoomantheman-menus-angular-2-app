import { run } from '@ctx-core/function'
import { tup } from '@ctx-core/array'
import { currency_str_ } from '@ctx-core/currency'
import { derived$, writable$, Readable$, Writable$ } from '@ctx-core/store'
import { BaseController } from '@menus/shared-ui-lib'
import {
	consumer_login_user$_b, User, UserAPIRequestQuery,
} from '@menus/consumer-user-common'
import { page_query$_b, Query } from '@ctx-core/sapper'
import { consumer_http_client_b, goto_login_b } from '@menus/consumer-http'
import { PublicKey$_b } from '@menus/http'
import type { Order } from '@menus/shared-order'
import { OrderDetailsAPIRequestQuery } from '@menus/consumer-order'
import { navigating_goto_b } from '@menus/page'
import { mediumDateTime_ } from '@menus/date'
import type { past_orders_ui_Ctx } from '../past_orders_ui_Ctx.js'
const Controller_name = 'PastOrders_c'
export class PastOrders_c extends BaseController<past_orders_ui_Ctx> {
	readonly consumer_http_client = consumer_http_client_b(this.ctx)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly goto_login = goto_login_b(this.ctx)
	readonly consumer_login_user$ = consumer_login_user$_b(this.ctx)
	readonly page_query$ = page_query$_b(this.ctx)
	readonly isLoggedIn$ = this.consumer_login_user$.isLoggedIn$
	readonly isLoggedOut$ = this.consumer_login_user$.isLoggedOut$
	readonly PublicKey$ = PublicKey$_b(this.ctx)
	readonly keywords$:Writable$<string> = writable$('')
	readonly orders$:Readable$<Order[]> = derived$(tup(this.isLoggedIn$, this.consumer_login_user$, this.PublicKey$),//region
		([isLoggedIn, consumer_login_user, PublicKey], set)=>{
			if (isLoggedIn == null || PublicKey == null) {
				set(null)
				return
			} else if (!isLoggedIn) {
				return
			}
			const requestData = new UserAPIRequestQuery()
			OrderDetailsAPIRequestQuery.fill_login_user(requestData, consumer_login_user as User)
			run(async ()=>{
				const request_PublicKey = PublicKey
				const orders = await this.consumer_http_client.get_past_orders(requestData) as Order[]
				if (request_PublicKey === PublicKey) {
					set(orders)
				}
			}).then()
		}
	)//endregion
	readonly filtered_orders$:Readable$<Order[]> = derived$(tup(this.orders$, this.keywords$),//region
		([orders, search_text])=>{
			if (!orders || !search_text) return orders
			return orders.filter(order=>(
				~order.RestaurantName.indexOf(search_text)
				|| ~order.OrderNumber.toString().indexOf(search_text)
				|| ~mediumDateTime_(order.OrderDate_ISO).indexOf(search_text)
				|| ~mediumDateTime_(order.ETADate_ISO).indexOf(search_text)
				|| (order.ConsumerOrderStatusText && ~order.ConsumerOrderStatusText.indexOf(search_text))
				|| ~order.ServiceType.indexOf(search_text)
				|| ~currency_str_(order.Total, 'USD').indexOf(search_text)
			))
		}
	)//endregion
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.unsubscribers.push(
			this.isLoggedOut$.subscribe(isLoggedOut=>{
				if (isLoggedOut) {
					this.goto_login()
				}
			})
		)
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly openOrderDetails = async (order:Order)=>{
		await this.navigating_goto([
			'/past-orders', order.ID
		])
	}
	readonly openOrderChat = async (order:Order)=>{
		await this.navigating_goto([
			`/past-orders/chat`, order.OrderNumber
		])
	}
	readonly onclick_goback = async ()=>{
		const page_query:Query = this.page_query$.$
		const returnUrl = page_query.returnUrl || '/'
		await this.navigating_goto(returnUrl)
	}
}
