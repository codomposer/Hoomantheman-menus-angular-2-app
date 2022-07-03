import { compact } from '@ctx-core/array'
import { neql_, t } from '@ctx-core/function'
import { extract, assign, clone } from '@ctx-core/object'
import { subscribe_wait_timeout, writable$, Writable$ } from '@ctx-core/store'
import type { API_error_T } from '@menus/api'
import type {
	CheckoutConfirmAddressModal_T, ThankYouOrderModal_open_T, ThankYouOrderModal_I, checkout_ui_Ctx
} from '@menus/checkout-ui'
import {
	add_order_b, add_order_item_b, add_order_item_payload_T, add_order_payload_T, consumer_http_client_b,
	fetch_get_visible_coupons_b, fetch_get_visible_coupons_T, fetch_search_menus_menuitems_b,
	fetch_search_menus_menuitems_T, fetch_search_menus_menuoptions_b, fetch_search_menus_menuoptions_T,
	fetch_search_menus_menuoptionsize_b, fetch_search_menus_menuoptionsize_T, get_visible_coupons_payload_T, goto_login_b,
	pay_order_b, pay_order_payload_T, search_menus_menuitems_payload_T, search_menus_menuoptions_payload_T,
	search_menus_menuoptionsize_payload_T
} from '@menus/consumer-http'
import type { MenuCartitem_I, Menuitem_I, Menuoptionitem_ui_I } from '@menus/consumer-menu'
import { OrderAPIRequestQuery, OrderAPIRequestQuery_I, OrderItemAPIRequestQuery } from '@menus/consumer-order'
import {
	deliveryNotes$_b, restaurant_cartitems_T, is_shopping_cart_busy$_b, shopping_cart_b,
	fetch_get_visible_coupons_RequestQuery_, CartCoupon_I,
} from '@menus/consumer-shopping-cart'
import { aptSuiteNo$_b, userAddress$_b } from '@menus/consumer-user-address'
import { add_points_b, consumer_login_user$_b, User } from '@menus/consumer-user-common'
import { notyf_error_b } from '@menus/notyf'
import { navigating_goto_b } from '@menus/page'
import { schedule_n1_ } from '@menus/restaurant-hours'
import type { schedule_n1_T } from '@menus/restaurant-hours-lib'
import {
	restaurant_frame_fetch_search_menus_menuoptionsize_requestData_,
	restaurant_frame_fetch_search_menus_menuitems_requestData_,
	restaurant_frame_fetch_search_menus_menuoptions_requestData_,
} from '@menus/restaurant-frame'
import { ServiceTypeId, isDeliverable$_b, serviceType$_b } from '@menus/service-type'
import type { OrderResult } from '@menus/shared-order'
import { messageModal$_b, messageModal$_T } from '@menus/shared-ui'
import { BaseController } from '@menus/shared-ui-lib'
import type { RestaurantCartitem_I } from '@menus/shopping-cart'
import { default_userPayment$_b, default_userPayment$_T, UserPayment_I } from '@menus/user-payment'
import { url_slug_, log } from '@menus/util'
import { timeout_ms } from '@menus/web-config'
import { place_order_error_T } from '../place_order_error_T.js'
import { place_order_payload_result_T } from '../place_order_payload_result_T.js'
const Controller_name = 'Checkout_c'
export class Checkout_c extends BaseController<checkout_ui_Ctx> {
	readonly CheckoutConfirmAddressModal_i$:Writable$<CheckoutConfirmAddressModal_T> = writable$(null)
	readonly ThankYouOrderModal_i$:Writable$<ThankYouOrderModal_I> = writable$(null)
	readonly shopping_cart = shopping_cart_b(this.ctx)
	readonly driverTip$ = this.shopping_cart.driverTip$
	readonly driverTip_percent$ = this.shopping_cart.driverTip_percent$
	readonly restaurant_cartitems$ = this.shopping_cart.restaurant_cartitems$
	readonly remove_restaurant_cartitems = this.shopping_cart.remove_restaurant_cartitems
	readonly add_order = add_order_b(this.ctx)
	readonly add_order_item = add_order_item_b(this.ctx)
	readonly add_points = add_points_b(this.ctx)
	readonly aptSuiteNo$ = aptSuiteNo$_b(this.ctx)
	readonly consumer_http_client = consumer_http_client_b(this.ctx)
	readonly consumer_login_user$ = consumer_login_user$_b(this.ctx)
	readonly default_userPayment$:default_userPayment$_T = default_userPayment$_b(this.ctx)
	readonly deliveryNotes$ = deliveryNotes$_b(this.ctx)
	readonly fetch_get_visible_coupons:fetch_get_visible_coupons_T = fetch_get_visible_coupons_b(this.ctx)
	readonly fetch_search_menus_menuitems:fetch_search_menus_menuitems_T = fetch_search_menus_menuitems_b(this.ctx)
	readonly fetch_search_menus_menuoptions:fetch_search_menus_menuoptions_T = fetch_search_menus_menuoptions_b(this.ctx)
	readonly fetch_search_menus_menuoptionsize:fetch_search_menus_menuoptionsize_T = fetch_search_menus_menuoptionsize_b(this.ctx)
	readonly goto_login = goto_login_b(this.ctx)
	readonly is_shopping_cart_busy$ = is_shopping_cart_busy$_b(this.ctx)
	readonly isDeliverable$ = isDeliverable$_b(this.ctx)
	readonly isLoggedOut$ = this.consumer_login_user$.isLoggedOut$
	readonly messageModal$:messageModal$_T = messageModal$_b(this.ctx)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly pay_order = pay_order_b(this.ctx)
	readonly serviceType$ = serviceType$_b(this.ctx)
	readonly total$ = this.shopping_cart.total$
	readonly userAddress$ = userAddress$_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly in_place_order$ = writable$<boolean>(false)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.unsubscribers.push(
			this.isLoggedOut$.subscribe($isLoggedOut=>{
				if ($isLoggedOut) {
					this.goto_login()
				}
			}),
			this.restaurant_cartitems$.subscribe(restaurant_cartitems=>{
				if (restaurant_cartitems && !restaurant_cartitems.length && !this.in_place_order$.$) {
					this.navigating_goto('/')
				}
			}),
		)
		await subscribe_wait_timeout(this.consumer_login_user$.ready$, neql_(undefined), timeout_ms)
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly place_order = async ()=>{
		log(this.ctx, Controller_name, 'place_order')
		this.in_place_order$.$ = true
		try {
			const isDeliverable = this.isDeliverable$.$
			const restaurant_cartitems = this.restaurant_cartitems$.$
			if (!await validate.apply(this)) {
				return
			}
			if (!await confirm.apply(this)) {
				return
			}
			const place_order_payload_results:place_order_payload_result_T[] = []
			this.busy$.$ = true
			this.is_shopping_cart_busy$.$ = true
			const { serviceType } = restaurant_cartitems[0]
			let MISMATCH_TOTAL_change_detected = false
			const remove_restaurant_cartitem_a1:RestaurantCartitem_I[] = []
			try {
				for (const restaurant_cartitem of restaurant_cartitems) {
					await place_restaurant_cartitem.call(this, restaurant_cartitem)
				}

				const total_points = place_order_payload_results.reduce(
					(total_points:number, result:place_order_payload_result_T)=>{
						return total_points + result.AddedCustomerPoints
					}, 0) as number
				if (total_points) {
					this.add_points(total_points)
				}

				if (MISMATCH_TOTAL_change_detected) {
					await this.messageModal$.$.open({
						title: 'Shopping Cart',
						message:
							remove_restaurant_cartitem_a1.map(restaurant_cartitem=>
								`${restaurant_cartitem.RestaurantName} just updated their venue, sorry for inconvenience please restart your order.`
							).join('<br>')
							|| 'Based on availability, your shopping cart has been refreshed, please check and try again',
						ok_text: 'Ok',
					})

					const pay_order_success_cartitems:restaurant_cartitems_T =
						compact(place_order_payload_results.map(result=>result?.pay_order_success))
					await this.remove_restaurant_cartitems(pay_order_success_cartitems)

					if(this.shopping_cart.restaurant_cartitems$.$.length === 0) {
						await this.navigating_goto('/')
					}

					return
				}
			} finally {
				this.busy$.$ = false
				this.is_shopping_cart_busy$.$ = false
			}
			const place_order_successes:restaurant_cartitems_T =
				compact(place_order_payload_results.map(result=>result?.place_order_success))
			const place_order_errors:place_order_error_T[] =
				compact(place_order_payload_results.map(result=>result?.place_order_error))
			const pay_order_successes:restaurant_cartitems_T =
				compact(place_order_payload_results.map(result=>result?.pay_order_success))
			const pay_order_errors:place_order_error_T[] =
				compact(place_order_payload_results.map(result=>result?.pay_order_error))
			console.info('place_order|complete', {
				place_order_successes, place_order_errors,
				pay_order_successes, pay_order_errors,
			})
			// Dont clear cart, only remove those which are successfully placed...
			await this.remove_restaurant_cartitems(pay_order_successes)
			const NewID = pay_order_successes[0]?.orderResult?.NewID
			if (NewID) {
				if (!place_order_errors.length && !pay_order_errors.length) {
					this.shopping_cart.clear()
				}
				await this.ThankYouOrderModal_i$.$.open({
					pay_order_successes, place_order_errors, pay_order_errors,
				} as ThankYouOrderModal_open_T)
				if (!place_order_errors.length && !pay_order_errors.length) {
					await this.navigating_goto('/')
				}
			}
			log(this.ctx, Controller_name, 'checkout', {
				place_order_successes, place_order_errors,
				pay_order_successes, pay_order_errors,
			})
			return
			async function validate(this:Checkout_c):Promise<boolean> {
				if (!await validate_userAddress.apply(this)) {
					return false
				}
				await subscribe_wait_timeout(this.default_userPayment$, neql_(undefined), timeout_ms)
				if (this.default_userPayment$.$ === null) {
					this.notyf_error('Please choose at least 1 payment method.')
					return false
				} else if (!restaurant_cartitems.length) {
					this.notyf_error('Shopping Cart is empty.')
					return false
				}
				return true
			}
			async function validate_userAddress(this:Checkout_c):Promise<boolean> {
				const userAddress = await subscribe_wait_timeout(
					this.userAddress$, neql_(undefined), timeout_ms
				)
				if (isDeliverable) {
					if (!userAddress) {
						this.notyf_error('Please choose your address.')
						return false
					}
					try {
						await subscribe_wait_timeout(
							this.userAddress$, $userAddress=>!!$userAddress.ID, 5_000
						)
					} catch (e) {
						console.error(e)
						if (!(userAddress.ID > 0)) {
							// This should not happen but is here for debugging purposes
							this.notyf_error('Address is not yet saved. Please reload page & Complete Order again.')
						}
						throw e
					}
				}
				return true
			}
			async function confirm(this:Checkout_c):Promise<boolean> {
				return (
					isDeliverable
					? await this.CheckoutConfirmAddressModal_i$.$.open()
					: true
				)
			}
			async function place_restaurant_cartitem(this:Checkout_c, restaurant_cartitem:RestaurantCartitem_I) {
				const add_order_payload:add_order_payload_T = await add_order_payload_.apply(this)
				if (add_order_payload?.Code === 'COUPON_CODE_INVALID') {
					await refresh_coupons.apply(this, [restaurant_cartitem])
				}
				if (add_order_payload?.Code !== 'ADD_ORDER') {
					place_order_payload_results.push({
						AddedCustomerPoints: 0,
						place_order_error: {
							payload: add_order_payload as API_error_T,
							restaurant_cartitem,
						} as place_order_error_T,
					} as place_order_payload_result_T)
					return
				}
				const orderResult = add_order_payload as OrderResult
				restaurant_cartitem.orderResult = orderResult
				const orderID = parseInt(orderResult.NewID)
				// Order items
				await place_menu_cartitems.apply(this)
				// Order pay
				const pay_order_payload = await pay_order_payload_.apply(this)
				await place_restaurant_cartitem_payload.apply(this)
				return
				async function add_order_payload_(this:Checkout_c):Promise<add_order_payload_T> {
					try {
						return await this.consumer_http_client_add_order(restaurant_cartitem)
					} catch (e) {
						await this.notyf_error('There was an an error with the restaurant order. Please try again.')
						throw e
					}
				}
				async function place_menu_cartitems(this:Checkout_c) {
					for (const menu_cartitem of restaurant_cartitem.menu_cartitems || []) {
						const requestData = new OrderItemAPIRequestQuery()
						// Filling login User
						OrderItemAPIRequestQuery.fill_login_user(requestData, this.consumer_login_user$.$)
						// Filling order ID
						requestData.b = orderID
						requestData.m = menu_cartitem.suggestion || ''
						// Filling menu item
						OrderItemAPIRequestQuery.fill_menuitem(requestData, menu_cartitem)
						const body = OrderItemAPIRequestQuery._add_order_menu_cartitem_body(menu_cartitem)
						let add_order_item_payload:add_order_item_payload_T
						try { // Adding order item into order
							add_order_item_payload = await this.add_order_item(requestData, body)
						} catch (e) {
							await this.notyf_error('There was an an error placing the order item. Please try again.')
							throw e
						}
						log(this.ctx, Controller_name, 'order items process completed', add_order_item_payload)
					}
				}
				async function pay_order_payload_(this:Checkout_c):Promise<pay_order_payload_T> {
					try {
						return await this.pay_order({
							b: orderID,
							c: restaurant_cartitem.total,
							// TEST MISMATCH_TOTAL retry logic
							// c: restaurant_cartitem.total + 1,
						} as Partial<OrderAPIRequestQuery_I>) as pay_order_payload_T
					} catch (e) {
						await this.notyf_error('There was an an error with the order payment. Please try again.')
						throw e
					}
				}
				async function place_restaurant_cartitem_payload(this:Checkout_c) {
					if (pay_order_payload?.Code === 'PAY_ORDER_SUCCESS') {
						await place_restaurant_cartitem_payload_success.apply(this)
					} else if (pay_order_payload?.Code === 'MISMATCH_TOTAL') {
						const total = this.total$.$
						await refresh_restaurant_menuitem.apply(this)
						MISMATCH_TOTAL_change_detected = true
						if (this.total$.$ === total) {
							remove_restaurant_cartitem_a1.push(restaurant_cartitem)
							await this.shopping_cart.remove_restaurant_cartitems([restaurant_cartitem])
						}
					} else {
						await place_restaurant_cartitem_payload_error.apply(this)
					}
				}
				async function place_restaurant_cartitem_payload_success(this:Checkout_c) {
					log(this.ctx, Controller_name, 'order payment process completed', pay_order_payload)
					place_order_payload_results.push({
						AddedCustomerPoints: orderResult.AddedCustomerPoints,
						place_order_success: restaurant_cartitem,
						pay_order_success: restaurant_cartitem,
					} as place_order_payload_result_T)
				}
				async function refresh_restaurant_menuitem(this:Checkout_c) {
					const [search_menus_menuitems_payload, get_visible_coupons_payload]:
						[search_menus_menuitems_payload_T, get_visible_coupons_payload_T]
						= await Promise.all([
						this.fetch_search_menus_menuitems(
							restaurant_frame_fetch_search_menus_menuitems_requestData_(restaurant_cartitem)
						),
						this.fetch_get_visible_coupons(fetch_get_visible_coupons_RequestQuery_(
							restaurant_cartitem,
							this.consumer_login_user$.$ as User
						))
					])
					const retry_menuitem_a = search_menus_menuitems_payload.Data
					const { menu_cartitems } = restaurant_cartitem
					let DeliveryCharge:number, MinOrder:number
					const retry_menu_cartitems:MenuCartitem_I[] = compact(
						await Promise.all(
							menu_cartitems.map(async (menu_cartitem)=>{
								const retry_menuitem:null|Menuitem_I = retry_menuitem_a.find(retry_menuitem=>
									retry_menuitem.MenuItemID === menu_cartitem.menuitem.MenuItemID
								)
								if (!retry_menuitem) return
								const [
									search_menus_menuoptionsize_payload, search_menus_menuoptions_payload
								]:[search_menus_menuoptionsize_payload_T, search_menus_menuoptions_payload_T] = await Promise.all([
									this.fetch_search_menus_menuoptionsize(
										restaurant_frame_fetch_search_menus_menuoptionsize_requestData_(retry_menuitem)
									),
									this.fetch_search_menus_menuoptions(
										restaurant_frame_fetch_search_menus_menuoptions_requestData_(
											retry_menuitem, menu_cartitem.selected_menuoptionsize
										)
									)
								])
								let remove_menu_cartitem = false
								const menuoptions =
									search_menus_menuoptions_payload.MenuOptions.map(menuoption=>{
										const c_menuoption =
											menu_cartitem.menuoptions.find(
												c_menuoption=>c_menuoption.OptionID === menuoption.OptionID)
										if (!c_menuoption) return menuoption
										if (
											c_menuoption.Is_Single_Select !== menuoption.Is_Single_Select
											|| c_menuoption.Minimum_Select !== menuoption.Minimum_Select
											|| c_menuoption.Maximum_Select !== menuoption.Maximum_Select
											|| c_menuoption.Minimum_Quantity !== menuoption.Minimum_Quantity
											|| c_menuoption.Maximum_Quantity !== menuoption.Maximum_Quantity
										) {
											remove_menu_cartitem = true
											return
										}
										menuoption.OptionItems = menuoption.OptionItems.map(optionitem=>{
											const c_optionitem =
												c_menuoption.OptionItems.find(c_optionitem=>optionitem.ID === c_optionitem.ID)
											return assign(optionitem,
												c_optionitem
												&& (
													extract<Menuoptionitem_ui_I>(c_optionitem, {
														is_selected: t
													})
												)
											)
										})
										menuoption.selected_OptionItem =
											c_menuoption.selected_OptionItem
											&& menuoption.OptionItems.find(OptionItem=>{
												return OptionItem.ID === c_menuoption.selected_OptionItem.ID
											})
										return menuoption
									})
								if (remove_menu_cartitem) {
									return
								}
								const menuoptionsizes = search_menus_menuoptionsize_payload.Data
								const selected_menuoptionsize = menu_cartitem.selected_menuoptionsize
									&& menuoptionsizes.find(menuoptionsize=>
										menuoptionsize.id === menu_cartitem.selected_menuoptionsize.id
									)
								DeliveryCharge = retry_menuitem.DeliveryCharge || 0
								MinOrder = retry_menuitem.MinOrder || 0
								return clone(menu_cartitem, {
									menuitem: retry_menuitem,
									menuoptions,
									menuoptionsizes,
									selected_menuoptionsize,
								}) as MenuCartitem_I
							})
						)
					)
					if (!retry_menu_cartitems.length && !~remove_restaurant_cartitem_a1.indexOf(restaurant_cartitem)) {
						remove_restaurant_cartitem_a1.push(restaurant_cartitem)
						await this.shopping_cart.remove_restaurant_cartitems([restaurant_cartitem])
					}
					const coupons = get_visible_coupons_payload.Data
					const applied_coupons:CartCoupon_I[] = compact(
						(restaurant_cartitem.applied_coupons || []).map(c_applied_coupon=>{
							return coupons.find(coupon=>coupon.CouponID === c_applied_coupon.CouponID)
						})
					)
					assign(restaurant_cartitem, {
						menu_cartitems: retry_menu_cartitems,
						DeliveryCharge,
						MinOrder,
						coupons,
						applied_coupons,
					})
					this.restaurant_cartitems$.refresh()
				}
				async function place_restaurant_cartitem_payload_error(this:Checkout_c) {
					console.error('pay_order_payload|error', {
						'pay_order_payload?.Code': pay_order_payload?.Code,
						pay_order_payload,
						restaurant_cartitem,
					})
					place_order_payload_results.push({
						AddedCustomerPoints: orderResult.AddedCustomerPoints,
						place_order_success: restaurant_cartitem,
						pay_order_error: {
							restaurant_cartitem,
							payload: pay_order_payload,
						} as place_order_error_T,
					} as place_order_payload_result_T)
				}
			}
			async function refresh_coupons(this:Checkout_c, restaurant_cartitem:RestaurantCartitem_I) {
				const get_visible_coupons_payload = await this.fetch_get_visible_coupons(
					fetch_get_visible_coupons_RequestQuery_(
						restaurant_cartitem,
						this.consumer_login_user$.$ as User
					))
				const coupons = get_visible_coupons_payload.Data
				restaurant_cartitem.coupons = coupons
				this.restaurant_cartitems$.refresh()
			}
		} finally {
			this.in_place_order$.$ = false
		}
	}
	private async consumer_http_client_add_order(restaurant_cartitem:RestaurantCartitem_I) {
		const requestData = new OrderAPIRequestQuery()
		OrderAPIRequestQuery.fill_cartitem(requestData, restaurant_cartitem)
		OrderAPIRequestQuery.fill_login_user(requestData, this.consumer_login_user$.$)
		if (restaurant_cartitem.isDeliverable) {
			const { userAddress } = restaurant_cartitem
			if (userAddress) {
				OrderAPIRequestQuery.fill_userAddress(requestData, userAddress)
			}
		}
		OrderAPIRequestQuery.fill_userPayment(requestData, this.default_userPayment$.$ as UserPayment_I)
		// Filling info
		requestData.s = ServiceTypeId[restaurant_cartitem.serviceType]
		const isDeliverable = this.isDeliverable$.$
		requestData.dt = isDeliverable ? this.driverTip$.$ : 0
		requestData.dtp = isDeliverable ? this.driverTip_percent$.$ : 0
		requestData.m = this.aptSuiteNo$.$
		requestData.n = this.deliveryNotes$.$
		const value = (schedule_n1_(restaurant_cartitem) as schedule_n1_T)?.value
		if (value) {
			requestData.st = value
		}
		const applied_coupons = restaurant_cartitem.applied_coupons.filter(
			c=>!c.errors?.length
		)
		const body = {
			Coupons: applied_coupons.map(c=>c.CouponCode),
		}
		// Placing order
		return this.add_order(requestData, body)
	}
}
