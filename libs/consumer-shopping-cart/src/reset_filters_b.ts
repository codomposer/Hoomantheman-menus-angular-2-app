import { B, be_ } from '@ctx-core/object'
import { SERVICE_TYPE_DINEIN, ServiceType } from '@menus/service-type-common'
import {
	delivery_fee_step$_b, max_price$_b, min_order_step$_b, min_price$_b, proximity$_b, FILTER_DEFAULT_VALUES,
} from '@menus/filters-common'
import { search_dishTypes$_b } from '@menus/search-menu'
import { serviceType$_b, serviceType_confirmModal$_b } from '@menus/service-type'
import type { restaurant_cartitems_T, RestaurantCartitem_I } from '@menus/shopping-cart'
import { consumer_shopping_cart_Ctx } from './consumer_shopping_cart_Ctx.js'
import { shopping_cart_b } from './shopping_cart_b.js'
const key = 'reset_filters'
export const reset_filters_b:B<consumer_shopping_cart_Ctx, typeof key> = be_(key, ctx=>{
	const proximity = proximity$_b(ctx)
	const delivery_fee_step = delivery_fee_step$_b(ctx)
	const min_order_step = min_order_step$_b(ctx)
	const min_price = min_price$_b(ctx)
	const max_price = max_price$_b(ctx)
	const search_dishTypes = search_dishTypes$_b(ctx)
	const shopping_cart = shopping_cart_b(ctx)
	const restaurant_cartitems$ = shopping_cart.restaurant_cartitems$
	const remove_restaurant_cartitems = shopping_cart.remove_restaurant_cartitems
	const serviceType$ = serviceType$_b(ctx)
	const serviceType_confirmModal = serviceType_confirmModal$_b(ctx)
	return reset_filters as reset_filters_T
	async function reset_filters() {
		await confirm_set_serviceType(SERVICE_TYPE_DINEIN)
		// proximity.set(FILTER_DEFAULT_VALUES.PROXIMITY)
		// delivery_fee_step.set(FILTER_DEFAULT_VALUES.DELIVERY_FEE_STEP)
		// min_order_step.set(FILTER_DEFAULT_VALUES.MIN_ORDER_STEP)
		// min_price.set(FILTER_DEFAULT_VALUES.MIN_PRICE)
		// max_price.set(FILTER_DEFAULT_VALUES.MAX_PRICE)
		search_dishTypes.reset()
	}
	async function confirm_set_serviceType(serviceType:ServiceType) {
		if (serviceType$.$ === serviceType) return null
		const unsupported_restaurant_cartitems:RestaurantCartitem_I[] = []
		const $restaurant_cartitems:restaurant_cartitems_T = restaurant_cartitems$.$
		for (const restaurant_cartitem of $restaurant_cartitems) {
			if (restaurant_cartitem.serviceTypes.indexOf(serviceType) === -1) {
				unsupported_restaurant_cartitems.push(restaurant_cartitem)
			}
		}
		if (unsupported_restaurant_cartitems.length > 0) {
			let message = ''
			for (let i = 0; i < unsupported_restaurant_cartitems.length; i += 1) {
				const restaurant_cartitem = unsupported_restaurant_cartitems[i]
				const { menu_cartitems } = restaurant_cartitem
				message += menu_cartitems[0].menuitem.RestaurantName
				if (parseInt(i.toString(), 10) < unsupported_restaurant_cartitems.length - 1) {
					message += ', '
				}
			}
			message += ` doesn't offer ${serviceType} service. If you change the service type then the restaurant(s) will be removed from cart.`
			const confirmModal = serviceType_confirmModal.$
			const confirm = (
				confirmModal
				&& await confirmModal.open({ message })
			)
			if (confirm) {
				await remove_restaurant_cartitems(unsupported_restaurant_cartitems)
				serviceType$.set(serviceType)
				return true
			} else {
				return false
			}
		} else {
			serviceType$.set(serviceType)
			return true
		}
	}
})
export type reset_filters_T = ()=>Promise<void>
