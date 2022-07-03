import { Writable$, writable$ } from '@ctx-core/store'
import { BaseController, confirmModal$_b } from '@menus/shared-ui'
import { serviceType$_b } from '@menus/service-type'
import {
	add_applied_coupon_b, shopping_cart_b, RestaurantCartitem, RestaurantCartitem_I,
} from '@menus/consumer-shopping-cart'
import {
	MENU_CARTITEM_MAX_LIMIT, MENU_CARTITEM_QTY_MAX_LIMIT, MENU_CARTITEM_QTY_ZERO_LIMIT, STATUS_SUCCESS
} from '@menus/web-config'
import { log, url_slug_ } from '@menus/util'
import { notyf_error_b } from '@menus/notyf'
import { consumer_http_client_b } from '@menus/consumer-http'
import type { AvailableCouponsModal_I } from '@menus/coupon-ui'
import { consumer_login_user$_b } from '@menus/consumer-user-common'
import { navigating_goto_b } from '@menus/page'
import { goto_b, goto_T } from '@menus/ui'
import { MODE_MODAL, MODE_NORMAL } from './mode.js'
import type { consumer_shopping_cart_ui_Ctx } from '../consumer_shopping_cart_ui_Ctx.js'
const Controller_name = 'ShoppingCart_c'
export class ShoppingCart_c extends BaseController<consumer_shopping_cart_ui_Ctx> {
	readonly consumer_http_client = consumer_http_client_b(this.ctx)
	readonly confirmModal$ = confirmModal$_b(this.ctx)
	readonly goto:goto_T = goto_b(this.ctx)
	readonly consumer_login_user$ = consumer_login_user$_b(this.ctx)
	readonly isLoggedIn$ = this.consumer_login_user$.isLoggedIn$
	readonly shopping_cart = shopping_cart_b(this.ctx)
	readonly in_toggle_shopping_cart = this.shopping_cart.toggle_shopping_cart
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly remove_menu_cartitem = this.shopping_cart.remove_menu_cartitem
	readonly restaurant_cartitems$ = this.shopping_cart.restaurant_cartitems$
	readonly serviceType$ = serviceType$_b(this.ctx)
	readonly AvailableCouponsModal_i:Writable$<AvailableCouponsModal_I> = writable$(null)
	readonly mode$:Writable$<string> = writable$(MODE_MODAL)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
	}
	readonly add_applied_coupon = async (restaurant_cartitem:RestaurantCartitem_I)=>{
		const coupon_errors = await add_applied_coupon_b(this.ctx)(restaurant_cartitem)
		if (coupon_errors?.length) {
			this.notyf_error(coupon_errors[0].message)
		}
	}
	readonly place_order = async ()=>{
		if (this.mode$.$ === MODE_NORMAL) {
			this.dispatch('place_order')
		} else {
			await this.navigating_goto('/checkout')
			this.toggle_shopping_cart()
		}
	}
	readonly remove_applied_coupon = (restaurant_cartitem:RestaurantCartitem_I, index:number)=>{
		restaurant_cartitem.applied_coupons.splice(index, 1)
		this.shopping_cart.restaurant_cartitems$.refresh()
	}
	readonly show_AvailableCouponsModal_i = async ($restaurant_cartitem:RestaurantCartitem_I)=>{
		const data = await this.AvailableCouponsModal_i._.open({
			$restaurant_cartitem,
		})
		if (data?.coupon) {
			$restaurant_cartitem.coupon_code = data.coupon.CouponCode
			await this.add_applied_coupon($restaurant_cartitem)
		}
		log(this.ctx, Controller_name, 'show_AvailableCouponsModal_i', data)
	}
	readonly toggle_shopping_cart = ()=>{
		if (this.mode$.$ === MODE_MODAL) {
			this.in_toggle_shopping_cart()
		}
	}
	readonly update_quantity = async (
		restaurant_cartitem:RestaurantCartitem_I, menu_cartitem_idx:number, increment:number
	)=>{
		const menu_cartitem = restaurant_cartitem.menu_cartitems[menu_cartitem_idx]
		const status = await this.shopping_cart.update_menu_cartitem_quantity(menu_cartitem, increment)
		if (status === MENU_CARTITEM_QTY_MAX_LIMIT) {
			this.notyf_error(`You can't add more then ${MENU_CARTITEM_MAX_LIMIT} items`)
		} else if (status === MENU_CARTITEM_QTY_ZERO_LIMIT) {
			const confirm = await this.confirmModal$.$.open({
				message: `Are you sure you want to delete ${menu_cartitem.menuitem.MenuItemName}?`,
			})
			if (confirm) {
				await this.remove_menu_cartitem(menu_cartitem)
			}
		}
	}
	readonly validate_coupon_code = async (restaurant_cartitem:RestaurantCartitem)=>{
		const duplicate_coupon = restaurant_cartitem.applied_coupons.find(c=>{
			return c.CouponCode === restaurant_cartitem.coupon_code
		})
		if (duplicate_coupon) {
			this.notyf_error('RoCoupon Code is already applied')
			return
		}
		restaurant_cartitem.addCouponCode_busy = true
		this.restaurant_cartitems$.refresh()
		try { // create a request to send to validate coupon code
			const request:any = {
				a: restaurant_cartitem.FFID,
				b: restaurant_cartitem.coupon_code,
			}
			const consumer_login_user = this.consumer_login_user$.$
			// add auth code and customer id to the request if user is logged in
			if (consumer_login_user) {
				request.i = consumer_login_user.ID
				request.x = consumer_login_user.AuthCode
			}
			const payload = await this.consumer_http_client.validate_coupon_code(request)
			restaurant_cartitem.coupon_code = ''
			if (payload.Status === STATUS_SUCCESS) {
				const coupon = payload
				restaurant_cartitem.applied_coupons.push(coupon)
			} else {
				this.notyf_error('Unable to apply coupon')
			}
			this.shopping_cart.restaurant_cartitems$.refresh()
			log(this.ctx, Controller_name, 'validate_coupon_code => success')
		} finally {
			restaurant_cartitem.addCouponCode_busy = false
			this.restaurant_cartitems$.refresh()
		}
	}
	readonly view_menu = async (restaurant_cartitem:RestaurantCartitem_I)=>{
		if (restaurant_cartitem.menu_cartitems?.length) {
			this.toggle_shopping_cart()
			await this.navigating_goto([
				'/restaurant',
				this.serviceType$.$,
				url_slug_(restaurant_cartitem.CuisineName),
				url_slug_([restaurant_cartitem.RestaurantName, restaurant_cartitem.Address]),
				restaurant_cartitem.FFID
			])
		}
	}
	readonly set_coupon_code = (restaurant_cartitem:RestaurantCartitem_I, coupon_code:string)=>{
		restaurant_cartitem.coupon_code = coupon_code
		this.restaurant_cartitems$.refresh()
	}
}
