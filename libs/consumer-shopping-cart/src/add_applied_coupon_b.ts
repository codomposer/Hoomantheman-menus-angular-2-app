import { B, be_ } from '@ctx-core/object'
import { notyf_error_b } from '@menus/notyf'
import { log } from '@menus/util'
import { STATUS_SUCCESS } from '@menus/web-config'
import {
	consumer_login_user$_b, consumer_login_user_T, ValidateCouponCodeRequestQuery
} from '@menus/consumer-user-common'
import { consumer_http_client_b } from '@menus/consumer-http'
import type { CartCoupon_I, CouponError } from '@menus/shopping-cart'
import type { RestaurantCartitem_I } from '@menus/shopping-cart'
import { shopping_cart_b } from './shopping_cart_b.js'
import type { consumer_shopping_cart_Ctx } from './consumer_shopping_cart_Ctx.js'
const LOG_TAG = 'add_applied_coupon_b.js'
const key = 'add_applied_coupon'
export const add_applied_coupon_b:B<consumer_shopping_cart_Ctx, typeof key> = be_(key, ctx=>{
	const consumer_http_client = consumer_http_client_b(ctx)
	const consumer_login_user$ = consumer_login_user$_b(ctx)
	const notyf_error = notyf_error_b(ctx)
	const shopping_cart = shopping_cart_b(ctx)
	return add_applied_coupon as add_applied_coupon_T
	async function add_applied_coupon(restaurant_cartitem:RestaurantCartitem_I) {
		const duplicateCouponExist =
			restaurant_cartitem.applied_coupons.filter(c=>
				c.CouponCode === restaurant_cartitem.coupon_code
			)
		if (duplicateCouponExist.length > 0) {
			notyf_error('RoCoupon Code is already applied')
			return
		}
		restaurant_cartitem.addCouponCode_busy = true
		try { // create a request to send to validate coupon code
			const request = new ValidateCouponCodeRequestQuery()
			request.a = restaurant_cartitem.FFID
			request.b = restaurant_cartitem.coupon_code
			// add auth code and customer id to the request if user is logged in
			const consumer_login_user = consumer_login_user$.$ as consumer_login_user_T
			if (consumer_login_user) {
				request.i = consumer_login_user.ID
				request.x = consumer_login_user.AuthCode
			}
			const payload = await consumer_http_client.validate_coupon_code(request)
			restaurant_cartitem.coupon_code = ''
			if (payload.Status === STATUS_SUCCESS) {
				const cart_coupon:CartCoupon_I = payload
				restaurant_cartitem.applied_coupons.push(cart_coupon)
				shopping_cart.restaurant_cartitems$.refresh()
				log(ctx, LOG_TAG, 'add_applied_coupon => success')
				return []
			} else {
				return [{ message: 'Unable to apply coupon' }]
			}
		} finally {
			restaurant_cartitem.addCouponCode_busy = false
		}
	}
})
export type add_applied_coupon_T =
	(restaurant_cartitem:RestaurantCartitem_I)=>Promise<CouponError[]>
