import { deep_equal } from '@menus/fast-deep-equal'
import { neql_, noop, not } from '@ctx-core/function'
import { be_, assign, B, Be } from '@ctx-core/object'
import { difference_, tup } from '@ctx-core/array'
import { round } from '@ctx-core/number'
import { I } from '@ctx-core/combinators'
import { has_dom } from '@ctx-core/dom'
import { derived$, Readable$, subscribe_wait_timeout, Unsubscriber, Writable$ } from '@ctx-core/store'
import type { cache_ctx_value$_T } from '@ctx-core/cache'
import {
	isDeliverable_, isDeliverable$_b, ServiceTypeId, ServiceTypeID_r_ServiceType, ServiceType,
} from '@menus/service-type'
import { log } from '@menus/util'
import type { refresh_writable_T } from '@menus/store'
import {
	MENU_CARTITEM_MAX_LIMIT, MENU_CARTITEM_QTY_MAX_LIMIT, MENU_CARTITEM_QTY_UPDATED, MENU_CARTITEM_QTY_ZERO_LIMIT,
	COUPON_TYPE_ITEM_BASED, COUPON_TYPE_ORDER_BASED, DELIVERY_MODE_RESTAURANT, DELIVERY_MODE_RESTOWNER,
	DISCOUNT_CRITERIA_FULL, DISCOUNT_CRITERIA_INCREMENTAL, DISCOUNT_TYPE_AMOUNT, DISCOUNT_TYPE_PERCENT,
	DURATION_TYPE_DATE, EMPTY_TIME, timeout_ms,
} from '@menus/web-config'
import type { MenuCartitem_I } from '@menus/consumer-menu'
import {
	consumer_user_common_Ctx, login_user$_T, TaxRateAPIRequestQuery, User, UserWithLogin_I
} from '@menus/consumer-user-common'
import { HH_mm_ss_, mm_dd_YY_, minute_tick$_b } from '@menus/date'
import { consumer_http_client_b, fetch_get_visible_coupons_b } from '@menus/consumer-http'
import { idb_writable_, idb_writable_T } from '@menus/idb'
import { mixin_refresh, refresh_mixin_T } from '@menus/store'
import { UserAddress, userAddress$_b } from '@menus/consumer-user-address'
import {
	restaurant_frame_in_sync_, restaurant_frame_in_sync_warn_, restaurant_frame_sync_T
} from '@menus/restaurant-frame'
import { params_fireFlyID$_b } from '@menus/page'
import {
	schedule_ctx_, restaurant_hours_cache_ctx$_b, restaurant_hours_cache_ctx_value$_T, RestaurantHours_I, schedule_ctx_I
} from '@menus/restaurant-hours'
import { restaurant_cartitem_, RestaurantCartitem_I } from './RestaurantCartitem'
import { calculate_menuitem_subTotal } from './calculate_menuitem_subTotal.js'
import type { CartCoupon_I } from './CartCoupon_I.js'
import type { CouponError } from './CouponError.js'
import { assign_menuitem_restaurant_cartitem } from './assign_menuitem_restaurant_cartitem.js'
import { fetch_get_visible_coupons_RequestQuery_ } from './fetch_get_visible_coupons_RequestQuery_.js'
import type { shopping_cart_Ctx } from './shopping_cart_Ctx.js'
const base_key = 'shopping_cart.js'
export function shopping_cart__b<Ctx extends shopping_cart_Ctx>(
	params:shopping_cart__b_params_T
):Be<Ctx, keyof Ctx, shopping_cart_T> {
	const key_ = params.key_ || I
	const in_driverTip_percent_ =
		params.driverTip_percent_
		|| (
			(driverTip_percent?:number)=>
				driverTip_percent == null ? 10 : driverTip_percent
		)
	const { login_user$_b, serviceType$_b } = params
	return be_<Ctx, keyof Ctx, shopping_cart_T>(key_(base_key) as keyof Ctx, ctx=>{
		const consumer_http_client = consumer_http_client_b(ctx)
		const fetch_get_visible_coupons = fetch_get_visible_coupons_b(ctx)
		const serviceType$ = serviceType$_b(ctx)
		const login_user$ = login_user$_b(ctx)
		const { logout_time$ } = login_user$
		const isDeliverable$ = isDeliverable$_b(ctx)
		const minute_tick$ = minute_tick$_b(ctx)
		const params_fireFlyID$ = params_fireFlyID$_b(ctx)
		const restaurant_hours_cache_ctx$ = restaurant_hours_cache_ctx$_b(ctx)
		const userAddress$ = userAddress$_()
		const restaurant_cartitems$ = restaurant_cartitems$_()
		const menu_cartitems$ = menu_cartitems$_()
		const driverTip_percent$ = driverTip_percent$_()
		const MenuItemID_h_menu_cartitem$ = MenuItemID_h_menu_cartitem$_()
		const calculatedTotals_restaurant_cartitems$ = calculatedTotals_restaurant_cartitems$_()
		const ETAMax$ = ETAMax$_()
		const ETAMin$ = ETAMin$_()
		const is_shopping_cart_opened$ = is_shopping_cart_opened$_()
		const min_order_restaurant_cartitems$ = min_order_restaurant_cartitems$_()
		const subTotal$ = subTotal$_()
		const driverTip$ = driverTip$_()
		const total$ = total$_()
		const menuitems_quantity$ = menuitems_quantity$_()
		const schedule_ctx_restaurant_cartitems$ = schedule_ctx_restaurant_cartitems$_()
		const calculated_restaurant_cartitems$ = calculated_restaurant_cartitems$_()
		if (has_dom) {
			subscribe_userAddress_assign_restaurant_cartitems()
			subscribe_logout_time_clear_menu_cartitems()
			subscribe_menu_cartitems_is_shopping_cart_opened()
			subscribe_restaurant_cartitems_validate_cartitems_in_sync()
			subscribe_minute_tick_refresh_schedule_ctx()
		}
		return {
			menu_cartitems$,
			calculated_restaurant_cartitems$,
			schedule_ctx_restaurant_cartitems$,
			restaurant_cartitems$,
			MenuItemID_h_menu_cartitem$,
			driverTip$,
			driverTip_percent$,
			ETAMax$,
			ETAMin$,
			is_shopping_cart_opened$,
			min_order_restaurant_cartitems$,
			subTotal$,
			total$,
			menuitems_quantity$,
			serviceType$,
			clear,
			remove,
			splice,
			add_menu_cartitem,
			remove_restaurant_cartitems,
			remove_menu_cartitem,
			open_shopping_cart,
			close_shopping_cart,
			toggle_shopping_cart,
			update_menu_cartitem_quantity,
			validate_cartitems_in_sync,
		} as unknown as shopping_cart_T
		function userAddress$_() {
			return userAddress$_b(ctx)
		}
		function menu_cartitems$_() {
			const menu_cartitems$ = derived$(restaurant_cartitems$, restaurant_cartitems=>{
				return (restaurant_cartitems || []).map(
					restaurant_cartitem=>restaurant_cartitem.menu_cartitems || []
				).flat()
			}) as menu_cartitems$_T
			return menu_cartitems$
		}
		function driverTip_percent$_() {
			const driverTip_percent$ = mixin_refresh(idb_writable_<number>(
				key_('driverTip_percent'), in_driverTip_percent_
			)) as driverTip_percent_T
			return driverTip_percent$
		}
		function restaurant_cartitems$_():restaurant_cartitems$_T {
			const restaurant_cartitems$ =
				mixin_refresh(
					idb_writable_<restaurant_cartitems_T>(
						key_('restaurant_cartitems'),
						(restaurant_cartitems:restaurant_cartitems_T)=>{
							return restaurant_cartitems == null ? [] : restaurant_cartitems
						}
					)
				) as restaurant_cartitems$_T
			return restaurant_cartitems$ as restaurant_cartitems$_T
		}
		function MenuItemID_h_menu_cartitem$_() {
			const MenuItemID_h_menu_cartitem$:MenuItemID_h_menu_cartitem$_T = derived$(
				restaurant_cartitems$,
				(restaurant_cartitems:restaurant_cartitems_T)=>{
					const MenuItemID_h_menu_cartitem:MenuItemID_h_menu_cartitem_T = {}
					for (const restaurant_cartitem of restaurant_cartitems || []) {
						for (const menu_cartitem of restaurant_cartitem.menu_cartitems || []) {
							MenuItemID_h_menu_cartitem[menu_cartitem.menuitem.MenuItemID] = menu_cartitem
						}
					}
					return MenuItemID_h_menu_cartitem
				})
			return MenuItemID_h_menu_cartitem$
		}
		function calculatedTotals_restaurant_cartitems$_() {
			const calculatedTotals_restaurant_cartitems$:calculatedTotals_restaurant_cartitems$_T = derived$(
				tup(restaurant_cartitems$, isDeliverable$, driverTip_percent$),
				(
					[restaurant_cartitems, isDeliverable, driverTip_percent]
				)=>{
					if (!restaurant_cartitems) return
					let menuitems_quantity = 0, total = 0, subTotal = 0, driverTip = 0
					let ETAMin:number = null, ETAMax:number = null
					const min_order_restaurant_cartitems = []
					for (let i = 0; i < restaurant_cartitems.length; i++) {
						const restaurant_cartitem = restaurant_cartitems[i]
						const { menu_cartitems } = restaurant_cartitem
						let restaurant_cartitem_subTotal = 0
						for (const menu_cartitem of menu_cartitems || []) {
							const menuitem_subTotal = calculate_menuitem_subTotal(menu_cartitem)
							menu_cartitem.subTotal = menuitem_subTotal
							restaurant_cartitem_subTotal += menuitem_subTotal
							menuitems_quantity += menu_cartitem.quantity
						}
						const round_restaurant_cartitem_subTotal = round(restaurant_cartitem_subTotal)
						subTotal += round_restaurant_cartitem_subTotal
						const restaurant_cartitem_coupon_discount =
							apply_coupons(restaurant_cartitem, round_restaurant_cartitem_subTotal)
						const round_restaurant_cartitem_coupon_discount = round(restaurant_cartitem_coupon_discount)
						const restaurant_cartitem_delivery =
							isDeliverable
							? restaurant_cartitem.DeliveryCharge
							: 0
						const round_restaurant_cartitem_delivery = round(restaurant_cartitem_delivery)
						const restaurant_cartitem_driverTip =
							isDeliverable
							? (
								(restaurant_cartitem_subTotal - round_restaurant_cartitem_coupon_discount)
								* (driverTip_percent || 0) as number
								* .01
							)
							: 0
						const round_restaurant_cartitem_driverTip = round(restaurant_cartitem_driverTip)
						driverTip += round_restaurant_cartitem_driverTip
						restaurant_cartitem.driverTip = round_restaurant_cartitem_driverTip
						restaurant_cartitem.delivery = round_restaurant_cartitem_delivery
						restaurant_cartitem.subTotal = round_restaurant_cartitem_subTotal
						restaurant_cartitem.coupon_discount = round_restaurant_cartitem_coupon_discount
						const restaurant_cartitem_tax_base =
							round_restaurant_cartitem_subTotal
							- round_restaurant_cartitem_coupon_discount
							+ (
								~[DELIVERY_MODE_RESTAURANT, DELIVERY_MODE_RESTOWNER].indexOf(
									menu_cartitems?.[0]?.menuitem?.DeliveryModeID
								)
								? round_restaurant_cartitem_delivery
								: 0
							)
						const round_restaurant_cartitem_tax_base = round(restaurant_cartitem_tax_base)
						const restaurant_cartitem_tax = round_restaurant_cartitem_tax_base * restaurant_cartitem.taxRate
						const round_restaurant_cartitem_tax = round(restaurant_cartitem_tax)
						restaurant_cartitem.tax = round_restaurant_cartitem_tax
						let restaurant_cartitem_total =
							round(
								round_restaurant_cartitem_subTotal
								- round_restaurant_cartitem_coupon_discount
								+ round_restaurant_cartitem_tax
								+ round_restaurant_cartitem_delivery
								+ round_restaurant_cartitem_driverTip
							)

						restaurant_cartitem.serviceFee = restaurant_cartitem.menusServiceFee ? round(restaurant_cartitem_total * restaurant_cartitem.menusServiceFee) : 0

						restaurant_cartitem_total = round(restaurant_cartitem_total + restaurant_cartitem.serviceFee)
						total += restaurant_cartitem_total
						restaurant_cartitem.total = restaurant_cartitem_total
						
						if (restaurant_cartitem.ETAMax > ETAMax) {
							ETAMin = restaurant_cartitem.ETAMin
							ETAMax = restaurant_cartitem.ETAMax
						}
						const restaurant_cartitem_require_min_order =
							isDeliverable
							&& (restaurant_cartitem.MinOrder > restaurant_cartitem_subTotal)
						if (restaurant_cartitem_require_min_order) {
							min_order_restaurant_cartitems.push(restaurant_cartitem)
						}
						restaurant_cartitem.require_min_order = restaurant_cartitem_require_min_order
					}
					return {
						ETAMax,
						ETAMin,
						min_order_restaurant_cartitems,
						subTotal: round(subTotal),
						driverTip: round(driverTip),
						total: round(total),
						menuitems_quantity,
					} as calculatedTotals_restaurant_cartitems_T
				}
			)
			return calculatedTotals_restaurant_cartitems$
		}
		function ETAMax$_() {
			const ETAMax$:ETAMax$_T = derived$(calculatedTotals_restaurant_cartitems$,
				(restaurant_cartitems_calculatedTotals:calculatedTotals_restaurant_cartitems_T)=>{
					return restaurant_cartitems_calculatedTotals?.ETAMax
				}
			)
			return ETAMax$
		}
		function ETAMin$_() {
			const ETAMin$:ETAMin$_T = derived$(calculatedTotals_restaurant_cartitems$,
				(restaurant_cartitems_calculatedTotals:calculatedTotals_restaurant_cartitems_T)=>{
					return restaurant_cartitems_calculatedTotals?.ETAMin
				}
			)
			return ETAMin$
		}
		function is_shopping_cart_opened$_() {
			const is_shopping_cart_opened$ = idb_writable_<boolean>(
				key_('is_shopping_cart_opened'), is_shopping_cart_opened=>
					is_shopping_cart_opened == null ? false : is_shopping_cart_opened
			)
			return is_shopping_cart_opened$
		}
		function min_order_restaurant_cartitems$_() {
			const min_order_restaurant_cartitems$:min_order_restaurant_cartitems$_T = derived$(calculatedTotals_restaurant_cartitems$,
				(restaurant_cartitems_calculatedTotals:calculatedTotals_restaurant_cartitems_T)=>{
					return restaurant_cartitems_calculatedTotals?.min_order_restaurant_cartitems
				}
			)
			return min_order_restaurant_cartitems$
		}
		function subTotal$_() {
			const subTotal$:subTotal$_T = derived$(calculatedTotals_restaurant_cartitems$,
				(restaurant_cartitems_calculatedTotals:calculatedTotals_restaurant_cartitems_T)=>{
					return restaurant_cartitems_calculatedTotals?.subTotal
				}
			)
			return subTotal$
		}
		function driverTip$_() {
			const driverTip$:driverTip$_T = derived$(calculatedTotals_restaurant_cartitems$,
				(restaurant_cartitems_calculatedTotals:calculatedTotals_restaurant_cartitems_T)=>{
					return restaurant_cartitems_calculatedTotals?.driverTip
				}
			)
			return driverTip$
		}
		function total$_() {
			const total$:total$_T = derived$(calculatedTotals_restaurant_cartitems$,
				(restaurant_cartitems_calculatedTotals:calculatedTotals_restaurant_cartitems_T)=>{
					return restaurant_cartitems_calculatedTotals?.total
				}
			)
			return total$
		}
		function menuitems_quantity$_() {
			const menuitems_quantity$:menuitems_quantity$_T = derived$(calculatedTotals_restaurant_cartitems$,
				calculatedTotals_restaurant_cartitems=>{
					return calculatedTotals_restaurant_cartitems?.menuitems_quantity
				}
			)
			return menuitems_quantity$
		}
		function schedule_ctx_restaurant_cartitems$_() {
			const restaurant_cartitems_to_schedule_ctx2_a$:restaurant_cartitems_to_schedule_ctx2_a$_T = derived$(
				restaurant_cartitems$, restaurant_cartitems=>
					(restaurant_cartitems || []).map(restaurant_cartitem=>{
						return {
							restaurant_hours_cache_ctx_value: restaurant_hours_cache_ctx$.be(restaurant_cartitem.fireFlyID),
							restaurant_cartitem
						} as restaurant_cartitems_to_schedule_ctx2_T
					}) as restaurant_cartitems_to_schedule_ctx2_T[]
			)
			let unsubscribers:Unsubscriber[] = []
			const schedule_ctx_restaurant_cartitems$:Readable$<RestaurantCartitem_I[]> = derived$(
				restaurant_cartitems_to_schedule_ctx2_a$,
				(restaurant_cartitems_to_schedule_ctx2_a:restaurant_cartitems_to_schedule_ctx2_T[], set)=>{
					const restaurant_hours_cache_ctx_value_a:cache_ctx_value$_T<RestaurantHours_I>[] = restaurant_cartitems_to_schedule_ctx2_a.map(
						restaurant_cartitems_to_schedule_ctx=>
							restaurant_cartitems_to_schedule_ctx.restaurant_hours_cache_ctx_value
					)
					unsubscribers.forEach(u=>u())
					unsubscribers = [
						derived$(
							restaurant_hours_cache_ctx_value_a as [cache_ctx_value$_T<RestaurantHours_I>, ...cache_ctx_value$_T<RestaurantHours_I>[]],
							(restaurant_hours_cache_ctx_value_a:RestaurantHours_I[])=>{
								set(
									(restaurant_hours_cache_ctx_value_a || []).map<RestaurantCartitem_I>((restaurant_hours, idx)=>{
										const restaurant_cartitems_to_schedule_ctx2 = restaurant_cartitems_to_schedule_ctx2_a[idx]
										const { restaurant_cartitem } = restaurant_cartitems_to_schedule_ctx2
										assign(restaurant_cartitem, { restaurant_hours })
										schedule_ctx_(restaurant_cartitem, { validated: true })
										return restaurant_cartitem
									})
								)
							}
						).subscribe(noop)
					]
				})
			return schedule_ctx_restaurant_cartitems$
		}
		function calculated_restaurant_cartitems$_() {
			const calculated_restaurant_cartitems$ = derived$(
				tup(restaurant_cartitems$, calculatedTotals_restaurant_cartitems$, schedule_ctx_restaurant_cartitems$),
				([restaurant_cartitems])=>
					restaurant_cartitems
			) as calculated_restaurant_cartitems$_T
			return calculated_restaurant_cartitems$
		}
		function apply_coupons(restaurant_cartitem:RestaurantCartitem_I, subTotal:number) {
			const { applied_coupons } = restaurant_cartitem
			let restaurant_cartitem_coupon_discount = 0
			for (const applied_coupon of (applied_coupons || [])) {
				log(ctx, 'applied_coupon', applied_coupon)
				const applied_coupon_errors = applied_coupon_errors_(restaurant_cartitem, applied_coupon, subTotal)
				applied_coupon.errors = applied_coupon_errors
				if (applied_coupon_errors?.length) {
					continue
				}
				// Calculating Item Based Discount
				if (applied_coupon.CouponType === COUPON_TYPE_ITEM_BASED) {
					const applied_coupon_MenuItems = applied_coupon.MenuItems
					const { menu_cartitems } = restaurant_cartitem
					for (const menu_cartitem of menu_cartitems) {
						if (~applied_coupon_MenuItems.indexOf(menu_cartitem.menuitem.MenuItemName)) {
							// Discount Type Percent
							if (
								applied_coupon.DiscountType === DISCOUNT_TYPE_PERCENT
								&& applied_coupon.DiscountCriteria === DISCOUNT_CRITERIA_FULL
							) {
								restaurant_cartitem_coupon_discount +=
									menu_cartitem.subTotal * applied_coupon.DiscountValue
							}
						}
					}
				}
				// Calculating Order Based Discount
				else if (applied_coupon.CouponType === COUPON_TYPE_ORDER_BASED) {
					// Discount Type Percent
					if (applied_coupon.DiscountType === DISCOUNT_TYPE_PERCENT) {
						// Discount Criteria Full
						if (applied_coupon.DiscountCriteria === DISCOUNT_CRITERIA_FULL) {
							if (applied_coupon.MaxOrder && subTotal > applied_coupon.MaxOrder) {
								subTotal = applied_coupon.MaxOrder
							}
							restaurant_cartitem_coupon_discount += subTotal * applied_coupon.DiscountValue
						}
						// Discount Criteria Incremental
						if (applied_coupon.DiscountCriteria === DISCOUNT_CRITERIA_INCREMENTAL) {
							let totalDiscountsCount = 1
							if (applied_coupon.MinOrder) {
								if (applied_coupon.MaxOrder && subTotal > applied_coupon.MaxOrder) {
									subTotal = applied_coupon.MaxOrder
								}
								totalDiscountsCount = Math.floor(subTotal / applied_coupon.MinOrder)
							}
							restaurant_cartitem_coupon_discount += totalDiscountsCount * (
								applied_coupon.MinOrder * applied_coupon.DiscountValue
							)
						}
					}
					// Discount Type Amount
					else if (applied_coupon.DiscountType === DISCOUNT_TYPE_AMOUNT) {
						// Discount Criteria Full
						if (applied_coupon.DiscountCriteria === DISCOUNT_CRITERIA_FULL) {
							restaurant_cartitem_coupon_discount += applied_coupon.DiscountValue
						}
						// Discount Criteria Incremental
						if (applied_coupon.DiscountCriteria === DISCOUNT_CRITERIA_INCREMENTAL) {
							let totalDiscountsCount = 1
							if (applied_coupon.MinOrder) {
								if (applied_coupon.MaxOrder && subTotal > applied_coupon.MaxOrder) {
									subTotal = applied_coupon.MaxOrder
								}
								totalDiscountsCount = Math.floor(subTotal / applied_coupon.MinOrder)
							}
							restaurant_cartitem_coupon_discount += (totalDiscountsCount * applied_coupon.DiscountValue)
						}
					}
				}
			}
			return Math.min(restaurant_cartitem_coupon_discount, subTotal)
		}
		function applied_coupon_errors_(
			restaurant_cartitem:RestaurantCartitem_I, applied_coupon:CartCoupon_I, subTotal:number
		) {
			log(ctx, 'applied_coupon_errors_', restaurant_cartitem, applied_coupon)
			const serviceType = serviceType$.$
			const serviceTypeID = ServiceTypeId[serviceType]
			const currentDate = mm_dd_YY_()
			let startDate:string, endDate:string
			if (applied_coupon.DurationType === DURATION_TYPE_DATE) {
				if (applied_coupon.StartDate) {
					startDate = mm_dd_YY_(applied_coupon.StartDate)
				}
				if (applied_coupon.EndDate) {
					endDate = mm_dd_YY_(applied_coupon.EndDate)
				}
			}
			// Time
			const currentTime = HH_mm_ss_('HH:mm:ss')
			let startTime = null
			let endTime = null
			let validTime = true
			if (applied_coupon.DurationType === DURATION_TYPE_DATE) {
				if (applied_coupon.DailyStartTime) {
					startTime = applied_coupon.DailyStartTime
				}
				if (applied_coupon.DailyEndTime) {
					endTime = applied_coupon.DailyEndTime
				}
				if (startTime && endTime) {
					validTime = false
					// Ignore if both times are equal to EMPTY_TIME (00:00:00)
					if (startTime === EMPTY_TIME && endTime === EMPTY_TIME) {
						validTime = true
					} else {
						if (currentTime >= startTime) {
							if (currentTime <= endTime) {
								validTime = true
							} else if (currentTime > endTime && endTime < startTime) {
								validTime = true
							}
						}
					}
				}
			}
			const errors:CouponError[] = []
			// Invalid RoCoupon
			if (applied_coupon.invalid) {
				errors.push({
					message: 'Coupon is not valid.'
				})
			}
				// Max Customer Limit
				// else if (
				//     applied_coupon.CustomerRedeemCount
				//     && applied_coupon.MaxRedeemPerCustomer > 0
				//     && applied_coupon.CustomerRedeemCount >= applied_coupon.MaxRedeemPerCustomer
				// ) {
				//     errors.push({
				//         message: "You can't use this applied_coupon. Max usage limit reached."
				//     });
				// }
			// Date Limit
			else if (
				startDate && endDate && (currentDate < startDate || currentDate > endDate)
			) {
				errors.push({
					message: 'RoCoupon is expired.'
				})
			}
			// Time Limit
			else if (!validTime) {
				errors.push({
					message: `Coupon is valid between ${startTime} and ${endTime}`
				})
			} else {
				// Validate Subtotal
				if (
					applied_coupon.MinOrder && subTotal < applied_coupon.MinOrder
				) {
					errors.push({
						message: `Coupon is only applicable with Min Subtotal of $${
							applied_coupon.MinOrder
						}.`
					})
				}
				// Validate Service Types
				if (!~applied_coupon.ServiceTypes.indexOf(serviceTypeID)) {
					if (applied_coupon.ServiceTypes.length > 0) {
						errors.push({
							message:
								`Coupon is only applicable with ${
									applied_coupon.ServiceTypes.map(c=>ServiceTypeID_r_ServiceType[c]).join(', ')
								} service type(s).`
						})
					} else {
						errors.push({
							message:
								`Coupon is not applicable with service type ${ServiceTypeID_r_ServiceType[serviceTypeID]}`
						})
					}
				}
				// Validate Menu Items
				if (applied_coupon.CouponType === COUPON_TYPE_ITEM_BASED) {
					let itemFound = false
					const couponMenuItems = applied_coupon.MenuItems
					for (const menu_cartitem of restaurant_cartitem.menu_cartitems || []) {
						const index = couponMenuItems.indexOf(menu_cartitem.menuitem.MenuItemName)
						if (index > -1) {
							itemFound = true
						}
					}
					if (!itemFound) {
						errors.push({
							message: 'Coupon is not applicable with current menu items in the cart'
						})
					}
				}
				// Duplicate Order Based RoCoupon
				const duplicateOrderCouponExist = restaurant_cartitem.applied_coupons.filter((c)=>{
					return (
						c.CouponType === COUPON_TYPE_ORDER_BASED
						&& c.CouponID !== applied_coupon.CouponID
					)
				})
				// Validate Duplicate Order Based RoCoupon
				if (
					applied_coupon.CouponType === COUPON_TYPE_ORDER_BASED
					&& duplicateOrderCouponExist.length > 0
				) {
					errors.push({
						message: 'You can only add one order based applied_coupon'
					})
				}
				// Other Applied Coupons
				const otherAppliedCoupons = restaurant_cartitem.applied_coupons.filter((c)=>{
					return c.CouponID !== applied_coupon.CouponID
				})
				if (!applied_coupon.Is_AllowBundle && otherAppliedCoupons.length > 0) {
					errors.push({
						message: 'Coupon is not bundleable with other coupons.'
					})
				}
			}
			return errors
		}
		function clear() {
			restaurant_cartitems$.set([])
		}
		async function remove(index:number) {
			return await splice(index, 1)
		}
		async function splice(index:number, deleteCount?:number, ...added_menu_cartitems:menu_cartitems_T) {
			let rv = undefined
			const menu_cartitems = (menu_cartitems$.$ || []).slice()
			rv = menu_cartitems.splice(index, deleteCount, ...added_menu_cartitems)
			await set_menu_cartitems_to_restaurant_cartitems(menu_cartitems)
			return rv
		}
		async function add_menu_cartitem(in_menu_cartitem:MenuCartitem_I) {
			const menu_cartitems = (menu_cartitems$.$ || []) as menu_cartitems_T
			for (const menu_cartitem of menu_cartitems) {
				if (menu_cartitem_eq_(menu_cartitem, in_menu_cartitem)) {
					menu_cartitem.quantity += in_menu_cartitem.quantity || 0
					await set_menu_cartitems_to_restaurant_cartitems(menu_cartitems)
					return
				}
			}
			menu_cartitems.push(in_menu_cartitem)
			await set_menu_cartitems_to_restaurant_cartitems(menu_cartitems)
		}
		async function remove_restaurant_cartitems(remove_restaurant_cartitems:RestaurantCartitem_I[]) {
			const menu_cartitems = menu_cartitems$.$
			await set_menu_cartitems_to_restaurant_cartitems(
				difference_([
					menu_cartitems,
					...remove_restaurant_cartitems.map(restaurant_cartitem=>
						restaurant_cartitem.menu_cartitems
					)
				])
			)
		}
		async function remove_menu_cartitem(in_remove_menu_cartitem:MenuCartitem_I) {
			const menu_cartitems = menu_cartitems$.$
			const remove_menu_cartitem = menu_cartitems.find(menu_cartitem=>{
				return menu_cartitem_eq_(menu_cartitem, in_remove_menu_cartitem)
			})
			await set_menu_cartitems_to_restaurant_cartitems(
				difference_([menu_cartitems, remove_menu_cartitem])
			)
		}
		function open_shopping_cart() {
			is_shopping_cart_opened$.set(true)
		}
		function close_shopping_cart() {
			is_shopping_cart_opened$.set(false)
		}
		function toggle_shopping_cart() {
			is_shopping_cart_opened$.update(not)
		}
		async function update_menu_cartitem_quantity(in_menu_cartitem:MenuCartitem_I, value:number) {
			const menu_cartitem = menu_cartitems$.$.find(
				menu_cartitem=>
					menu_cartitem_eq_(in_menu_cartitem, menu_cartitem)
			)
			if ((menu_cartitem.quantity + value) > MENU_CARTITEM_MAX_LIMIT) {
				return MENU_CARTITEM_QTY_MAX_LIMIT
			} else if ((menu_cartitem.quantity + value) < 1) {
				return MENU_CARTITEM_QTY_ZERO_LIMIT
			}
			menu_cartitem.quantity += value
			await set_menu_cartitems_to_restaurant_cartitems()
			return MENU_CARTITEM_QTY_UPDATED
		}
		function menu_cartitem_eq_(in1_menu_cartitem:MenuCartitem_I, in2_menu_cartitem:MenuCartitem_I) {
			return (
				in1_menu_cartitem.menuitem.MenuItemID === in2_menu_cartitem.menuitem.MenuItemID
				&& (
					deep_equal(
						in1_menu_cartitem.selected_menuoptionsize,
						in2_menu_cartitem.selected_menuoptionsize
					)
				)
				&& (
					deep_equal(
						in1_menu_cartitem.menuoptions.sort(
							(a, b)=>
								a.OptionID - b.OptionID),
						in2_menu_cartitem.menuoptions.sort(
							(a, b)=>
								a.OptionID - b.OptionID
						)
					)
				)
			)
		}
		function validate_cartitems_in_sync() {
			if (!restaurant_cartitems$.$) return
			const params_fireFlyID = params_fireFlyID$.$
			const userAddress = userAddress$.$
			const serviceType = serviceType$.$
			const restaurant_cartitems = restaurant_cartitems$.$
			let cartitems_in_sync = true
			for (const restaurant_cartitem of restaurant_cartitems) {
				const fireFlyID = params_fireFlyID || restaurant_cartitem.fireFlyID
				if (
					!validate_restaurant_cartitem_in_sync(restaurant_cartitem, {
						fireFlyID,
						userAddress,
						serviceType,
					})
				) {
					cartitems_in_sync = false
				}
			}
			if (!cartitems_in_sync) {
				// This is here for debugging purposes. If this case occurs, we have a bug.
				// clear()
				if (login_user$.$) {
					console.warn('The Shopping Cart is out of sync.')
				}
			}
			return cartitems_in_sync
		}
		function subscribe_userAddress_assign_restaurant_cartitems() {
			userAddress$.subscribe((userAddress:UserAddress)=>{
				if (userAddress == null) return
				if (!validate_cartitems_in_sync()) return
				for (const restaurant_cartitem of restaurant_cartitems$.$ || []) {
					restaurant_cartitem.userAddress = userAddress
				}
				restaurant_cartitems$.refresh()
			})
		}
		function subscribe_logout_time_clear_menu_cartitems() {
			logout_time$.subscribe((logout_time:number)=>{
				if (logout_time) {
					clear()
				}
			})
		}
		async function set_menu_cartitems_to_restaurant_cartitems(
			menu_cartitems:menu_cartitems_T = menu_cartitems$.$
		) {
			if (menu_cartitems == null || restaurant_cartitems$.$ == null) {
				return
			}
			if (!menu_cartitems) {
				clear()
				return
			}
			const RestaurantID_h_restaurant_cartitems:Record<number, RestaurantCartitem_I> = {}
			const restaurant_cartitems:restaurant_cartitems_T = []
			for (const restaurant_cartitem of (restaurant_cartitems$.$ || []) as restaurant_cartitems_T) {
				RestaurantID_h_restaurant_cartitems[restaurant_cartitem.RestaurantID] = restaurant_cartitem
			}
			const RestaurantID_h_menu_cartitems:Record<number, menu_cartitems_T> = {}
			const new_restaurant_cartitems = []
			const queue = []
			const serviceType = serviceType$.$
			const isDeliverable = isDeliverable_(serviceType)
			const userAddress = userAddress$.$
			for (const menu_cartitem of menu_cartitems) {
				const { menuitem } = menu_cartitem
				const { RestaurantID } = menuitem
				let restaurant_cartitem = RestaurantID_h_restaurant_cartitems[menuitem.RestaurantID]
				if (!restaurant_cartitem) {
					restaurant_cartitem = restaurant_cartitem_(
						assign_menuitem_restaurant_cartitem({
							coupons: [],
							tax: 0,
							RestaurantID,
							menu_cartitems: [] as menu_cartitems_T,
							serviceType,
							isDeliverable,
							userAddress,
						} as RestaurantCartitem_I, menuitem)
					)
					RestaurantID_h_restaurant_cartitems[RestaurantID] = restaurant_cartitem
					new_restaurant_cartitems.push(restaurant_cartitem)
					queue.push(async ()=>{
						await Promise.all(new_restaurant_cartitems.map(async (restaurant_cartitem:RestaurantCartitem_I)=>{
							const restaurant_hours:restaurant_hours_cache_ctx_value$_T = await restaurant_hours_cache_ctx$.ensure(
								restaurant_cartitem.fireFlyID
							)
							assign(restaurant_cartitem, {
								restaurant_hours: restaurant_hours.$,
								minute_tick: minute_tick$.$,
							} as Partial<schedule_ctx_I>)
							schedule_ctx_(restaurant_cartitem)
						}))
					})
					queue.push(async ()=>{
						await Promise.all(new_restaurant_cartitems.map(async (restaurant_cartitem:RestaurantCartitem_I)=>{
							const menu_cartitem = restaurant_cartitem.menu_cartitems[0]
							const { menuitem } = menu_cartitem
							// Gets tax rate according to restaurant zip code
							const requestData = new TaxRateAPIRequestQuery()
							requestData.z = restaurant_cartitem.ZipCode
							const taxRate_json = await consumer_http_client.get_tax_rate(requestData)
							if (taxRate_json?.[0]) {
								restaurant_cartitem.taxRate = taxRate_json[0].Value
							}
							restaurant_cartitem.DeliveryCharge = menuitem.DeliveryCharge || 0
							restaurant_cartitem.DeliveryPercentOfSubTotal = 0
						}))
					})
					queue.push(async ()=>{
						const login_user = await subscribe_wait_timeout(
							login_user$, neql_(undefined), timeout_ms
						) as User
						const get_visible_coupons_payload = await fetch_get_visible_coupons(
							fetch_get_visible_coupons_RequestQuery_(restaurant_cartitem, login_user)
						)
						restaurant_cartitem.coupons = get_visible_coupons_payload.Data
					})
				}
				let menu_cartitems = RestaurantID_h_menu_cartitems[RestaurantID] || []
				restaurant_cartitem.menu_cartitems = menu_cartitems
				RestaurantID_h_menu_cartitems[RestaurantID] = menu_cartitems
				menu_cartitems.push(menu_cartitem)
				if (!~restaurant_cartitems.indexOf(restaurant_cartitem)) {
					restaurant_cartitems.push(restaurant_cartitem)
				}
			}
			await Promise.all(queue.map(fn=>fn()))
			restaurant_cartitems$.set(restaurant_cartitems)
		}
		function subscribe_menu_cartitems_is_shopping_cart_opened() {
			menu_cartitems$.subscribe((menu_cartitems:MenuCartitem_I[])=>{
				if (menu_cartitems && !menu_cartitems.length) {
					if (is_shopping_cart_opened$.ready$.$) {
						is_shopping_cart_opened$.set(false)
					}
				}
			})
		}
		function subscribe_restaurant_cartitems_validate_cartitems_in_sync() {
			restaurant_cartitems$.subscribe(async ()=>{
				const login_user = await subscribe_wait_timeout(
					login_user$, neql_(undefined), timeout_ms
				)
				if (login_user) {
					await subscribe_wait_timeout(
						userAddress$, neql_(undefined), timeout_ms
					)
				}
				validate_cartitems_in_sync()
			})
		}
		function subscribe_minute_tick_refresh_schedule_ctx() {
			minute_tick$.subscribe(()=>{
				const minute_tick = minute_tick$.$
				const restaurant_cartitems:RestaurantCartitem_I[] = restaurant_cartitems$.$
				for (const restaurant_cartitem of restaurant_cartitems || []) {
					restaurant_cartitem.minute_tick = minute_tick
					schedule_ctx_(restaurant_cartitem)
				}
				restaurant_cartitems$.refresh()
			})
		}
	})
	function validate_restaurant_cartitem_in_sync(
		compare_restaurant_cartitem:RestaurantCartitem_I,
		source_syncable:restaurant_frame_sync_T,
	) {
		if (!restaurant_frame_in_sync_(compare_restaurant_cartitem, source_syncable)) {
			console.warn('restaurant_cartitem not in sync', {
				compare_restaurant_cartitem, source_syncable
			})
			restaurant_frame_in_sync_warn_(compare_restaurant_cartitem, source_syncable)
			return false
		}
		return true
	}
}
export type serviceType$_T = Readable$<ServiceType>
export type serviceType$_b_T = B<shopping_cart_Ctx, 'serviceType$', serviceType$_T>
export type login_user$_b_T =
	B<consumer_user_common_Ctx, 'consumer_login_user$', login_user$_T<UserWithLogin_I>>
export interface shopping_cart__b_params_I {
	key_:(in_key:string)=>string
	driverTip_percent_:()=>number
	serviceType$_b:serviceType$_b_T
	login_user$_b:login_user$_b_T
}
export type shopping_cart__b_params_T = Partial<shopping_cart__b_params_I>
export interface shopping_cart_T {
	menu_cartitems$:menu_cartitems$_T
	calculated_restaurant_cartitems$:calculated_restaurant_cartitems$_T
	schedule_ctx_restaurant_cartitems$:schedule_ctx_restaurant_cartitems$_T
	restaurant_cartitems$:restaurant_cartitems$_T
	MenuItemID_h_menu_cartitem$:MenuItemID_h_menu_cartitem$_T
	driverTip$:driverTip$_T
	driverTip_percent$:driverTip_percent_T
	ETAMax$:ETAMax$_T
	ETAMin$:ETAMin$_T
	is_shopping_cart_opened$:is_shopping_cart_opened$_T
	min_order_restaurant_cartitems$:min_order_restaurant_cartitems$_T
	subTotal$:subTotal$_T
	total$:total$_T
	menuitems_quantity$:menuitems_quantity$_T
	serviceType$:serviceType$_T
	clear():void
	remove(index:number):Promise<undefined|MenuCartitem_I|MenuCartitem_I[]>
	splice(index:number, deleteCount?:number, ...add_menu_cartitems:MenuCartitem_I[]):Promise<void>
	add_menu_cartitem:add_menu_cartitem_T
	remove_restaurant_cartitems:remove_restaurant_cartitems_T
	remove_menu_cartitem:remove_menu_cartitem_T
	open_shopping_cart:open_shopping_cart_T
	close_shopping_cart:close_shopping_cart_T
	toggle_shopping_cart:toggle_shopping_cart_T
	update_menu_cartitem_quantity:update_menu_cartitem_quantity_T
	validate_cartitems_in_sync:validate_cartitems_in_sync_T
}
export interface calculatedTotals_restaurant_cartitems_T {
	ETAMax?:number
	ETAMin?:number
	min_order_restaurant_cartitems:RestaurantCartitem_I[]
	serviceFee: number
	subTotal:number
	driverTip:number
	total:number
	menuitems_quantity:number
}
export type menu_cartitems_T = MenuCartitem_I[]
export type menu_cartitems$_T = Readable$<menu_cartitems_T>
export type restaurant_cartitems_T = RestaurantCartitem_I[]
export type restaurant_cartitems$_T = refresh_writable_T<restaurant_cartitems_T>
export interface restaurant_cartitems_to_schedule_ctx2_T {
	restaurant_hours_cache_ctx_value:cache_ctx_value$_T<RestaurantHours_I>
	restaurant_cartitem:RestaurantCartitem_I
}
export type restaurant_cartitems_to_schedule_ctx2_a$_T =
	Readable$<restaurant_cartitems_to_schedule_ctx2_T[]>
export type schedule_ctx_restaurant_cartitems$_T = Readable$<RestaurantCartitem_I[]>
export type calculated_restaurant_cartitems$_T = Readable$<RestaurantCartitem_I[]>
export type driverTip$_T = Readable$<number>
export interface driverTip_percent_T
	extends idb_writable_T<number>,
		refresh_mixin_T<number> {}
export type calculatedTotals_restaurant_cartitems$_T = Readable$<calculatedTotals_restaurant_cartitems_T>
export type ETAMax$_T = Readable$<number>
export type ETAMin$_T = Readable$<number>
export type is_shopping_cart_opened$_T = Writable$<boolean>
export type MenuItemID_h_menu_cartitem_T = Record<string, MenuCartitem_I>
export type MenuItemID_h_menu_cartitem$_T = Readable$<MenuItemID_h_menu_cartitem_T>
export type min_order_restaurant_cartitems$_T = Readable$<RestaurantCartitem_I[]>
export type subTotal$_T = Readable$<number>
export type total$_T = Readable$<number>
export type menuitems_quantity$_T = Readable$<number>
export type remove_restaurant_cartitems_T = (restaurant_cartitems:RestaurantCartitem_I[])=>Promise<void>
export type add_menu_cartitem_T = (menu_cartitem:MenuCartitem_I)=>Promise<void>
export type remove_menu_cartitem_T = (menu_cartitem:MenuCartitem_I)=>Promise<void>
export type open_shopping_cart_T = ()=>void
export type close_shopping_cart_T = ()=>void
export type toggle_shopping_cart_T = ()=>void
export type update_menu_cartitem_quantity_T = (menu_cartitem:MenuCartitem_I, value:number)=>Promise<number>
export type validate_cartitems_in_sync_T = ()=>boolean
