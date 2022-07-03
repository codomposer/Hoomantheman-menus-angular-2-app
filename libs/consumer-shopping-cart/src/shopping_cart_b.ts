import { has_dom } from '@ctx-core/dom'
import { isDeliverable$_b, serviceType$_b } from '@menus/service-type'
import { consumer_login_user$_b } from '@menus/consumer-user-common'
import { userAddress_eq_, userAddress$_b, UserAddress } from '@menus/consumer-user-address'
import { shopping_cart__b, shopping_cart_T } from '@menus/shopping-cart'
import type { consumer_shopping_cart_Ctx } from './consumer_shopping_cart_Ctx.js'
const out_shopping_cart_b = shopping_cart__b<consumer_shopping_cart_Ctx>({
	serviceType$_b,
	login_user$_b: consumer_login_user$_b,
	key_: k=>k
})
export function shopping_cart_b(ctx:consumer_shopping_cart_Ctx):shopping_cart_T {
	const shopping_cart = out_shopping_cart_b(ctx)
	const serviceType$ = serviceType$_b(ctx)
	const isDeliverable$ = isDeliverable$_b(ctx)
	if (has_dom) {
		init_subscriptions()
	}
	return shopping_cart
	function init_subscriptions() {
		let current_serviceType
		serviceType$.subscribe(serviceType=>{
			if (current_serviceType && current_serviceType != serviceType) {
				shopping_cart.clear()
			}
			current_serviceType = serviceType
		})
		const userAddress$ = userAddress$_b(ctx)
		let current_userAddress:UserAddress|undefined
		userAddress$.subscribe((userAddress:UserAddress|undefined)=>{
			if (userAddress === undefined) return
			if (
				current_userAddress
				&& isDeliverable$.$
				&& !userAddress_eq_(current_userAddress, userAddress)
			) {
				// TODO: Apply address change logic on restaurant_cartitems
				// https://trello.com/c/WM5WXhAB/2145-shopping-card-issue-for-change-address
				shopping_cart.clear()
			}
			current_userAddress = userAddress
		})
	}
}
export type { shopping_cart_T }
