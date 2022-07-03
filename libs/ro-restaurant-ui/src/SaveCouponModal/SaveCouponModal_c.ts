import { assign } from '@ctx-core/object'
import { tup } from '@ctx-core/array'
import { derived$, Readable$, writable$, Writable$ } from '@ctx-core/store'
import { BaseModalController } from '@menus/modal'
import {
	COUPON_TYPE_ITEM_BASED, COUPON_TYPE_ORDER_BASED, EMPTY_TIME, STATUS_SUCCESS, DISCOUNT_TYPE_PERCENT,
	DISCOUNT_TYPE_AMOUNT, DISCOUNT_CRITERIA_FULL, DURATION_TYPE_ALWAYS, DURATION_TYPE_DATE,
} from '@menus/web-config'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import { RoCoupon, RoMenuitem } from '@menus/ro-shared-models'
import { deep_clone, log, merge } from '@menus/util'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import { CouponAPIRequestQuery, ro_httpClient_b } from '@menus/ro-http'
import type { SaveCouponModal_close_T, SaveCouponModal_open_T, SaveCouponModal_I } from './SaveCouponModal_I.js'
import type { ro_restaurant_ui_Ctx } from '../ro_restaurant_ui_Ctx.js'
import { RoRestaurant_I } from '@menus/ro-restaurant'
export const TYPE_ORDER_BASED = COUPON_TYPE_ORDER_BASED
export const TYPE_ITEM_BASED = COUPON_TYPE_ITEM_BASED
const Controller_name = 'SaveCouponModal_c'
export class SaveCouponModal_c
	extends BaseModalController<SaveCouponModal_open_T, SaveCouponModal_close_T, ro_restaurant_ui_Ctx>
	implements SaveCouponModal_I {
	fireFlyID:string
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly save_busy$:Writable$<boolean> = writable$(false)
	readonly ro_coupon$:refresh_writable_T<RoCoupon> = refresh_writable_(new RoCoupon())
	readonly coupon_code_exists_errors$:Writable$<string[]> = writable$([])
	readonly MenuItems$:Writable$<RoMenuitem[]> = writable$([])
	readonly MenuItems_is_open$ = writable$<boolean>(false)
	readonly menuitems_error$:Readable$<string[]> = derived$(tup(this.ro_coupon$, this.MenuItems$),//region
		([ro_coupon, MenuItems])=>{
			return (
				(ro_coupon?.CouponType === TYPE_ITEM_BASED && MenuItems?.length === 0)
				? ['Please choose at least one item.']
				: []
			)
		})//endregion
	/* coupon: date_range: [StartDate, EndDate] */
	readonly date_range$:Writable$<[string, string]> = writable$(null)
	readonly ro_restaurant$:Writable$<RoRestaurant_I> = writable$(null)
	readonly buttons_disabled$:Readable$<boolean> = derived$(tup(this.ro_coupon$, this.MenuItems_is_open$),//region
		([ro_coupon, MenuItems_is_open])=>{
			return ro_coupon?.CouponType === COUPON_TYPE_ITEM_BASED && MenuItems_is_open
		}
	)//endregion
	readonly can_update_coupon$:Readable$<boolean> = derived$(this.ro_coupon$,//region
		(ro_coupon)=>{
			return ro_coupon?.RedeemCount === 0
		}
	)//endregion
	readonly DailyEndTime_errors$:Readable$<string[]> = derived$(this.ro_coupon$,//region
		(ro_coupon)=>{
			return (
				(
					ro_coupon
					&& ro_coupon.DurationType === DURATION_TYPE_DATE
					&& ro_coupon.DailyStartTime !== EMPTY_TIME
					&& ro_coupon.DailyEndTime !== EMPTY_TIME
					&& ro_coupon.DailyStartTime >= ro_coupon.DailyEndTime
				)
				? ['End Time should be greater then Start Time']
				: []
			)
		}
	)//endregion
	readonly Discount_errors$:Readable$<string[]> = derived$(this.ro_coupon$,//region
		(ro_coupon)=>{
			if (ro_coupon.DiscountType === DISCOUNT_TYPE_PERCENT) {
				if (ro_coupon.DiscountValue > 100) {
					return [`Discount must be less then or equal to 100%`]
				}
			}
			return []
		}
	)//endregion
	readonly is_new_coupon$:Readable$<boolean> = derived$(this.ro_coupon$,//region
		(ro_coupon)=>{
			return !ro_coupon?.ID
		}
	)//endregion
	/* ro_coupon: MaxRedeem >= MaxRedeemPerCustomer: errors */
	readonly MaxRedeem_gte_MaxRedeemPerCustomer_errors$:Readable$<string[]> = derived$(this.ro_coupon$,//region
		(ro_coupon)=>{
			return (
				(
					ro_coupon
					&& (ro_coupon.MaxRedeem && ro_coupon.MaxRedeemPerCustomer)
					&& (parseFloat(ro_coupon.MaxRedeem.toString()) < parseFloat(ro_coupon.MaxRedeemPerCustomer.toString()))
				)
				? [`Total Coupons must be greater then or equal to Total Coupons (Per Customer)`]
				: []
			)
		}
	)//endregion
	/* ro_coupon: MaxOrder >= MinOrder: errors */
	readonly MaxOrder_gte_MinOrder_errors$:Readable$<string[]> = derived$(this.ro_coupon$,//region
		(ro_coupon)=>{
			if (ro_coupon && ro_coupon.MaxOrder && ro_coupon.MinOrder) {
				if (
					parseFloat(ro_coupon.MaxOrder.toString()) < parseFloat(ro_coupon.MinOrder.toString())
				) {
					return [`Max Subtotal must be greater then or equal to Min Subtotal`]
				}
			}
			return []
		}
	)//endregion
	readonly serviceType_errors$:Readable$<string[]> = derived$(this.ro_coupon$,//region
		(ro_coupon)=>{
			return (
				(ro_coupon && !ro_coupon.Delivery && !ro_coupon.Pickup && !ro_coupon.Catering && !ro_coupon.DiningIn)
				? ['At least one Service type is required.']
				: []
			)
		}
	)//endregion
	private in_coupon:RoCoupon
	readonly onInit = async ()=>{
		this.unsubscribers.push(
			this.ro_coupon$.subscribe(()=>this.coupon_code_exists_errors$.$ = []),
			this.ro_coupon$.subscribe(ro_coupon=>{
				if (ro_coupon) {
					if (!ro_coupon.DailyStartTime) ro_coupon.DailyStartTime = EMPTY_TIME
					if (!ro_coupon.DailyEndTime) ro_coupon.DailyEndTime = EMPTY_TIME
				}
			}),
		)
	}
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly before_open_modal = async (data:SaveCouponModal_open_T)=>{
		log(this.ctx, Controller_name, 'init')
		this.fireFlyID = data.fireFlyID
		this.ro_restaurant$.$ = data.ro_restaurant
		let ro_coupon
		if (data.ro_coupon) {
			this.in_coupon = data.ro_coupon
			ro_coupon = deep_clone(this.in_coupon)
			this.ro_coupon$.$ = ro_coupon
		} else {
			ro_coupon = new RoCoupon()
			this.ro_coupon$.$ = ro_coupon
			ro_coupon.DiscountType = DISCOUNT_TYPE_AMOUNT
			ro_coupon.DurationType = DURATION_TYPE_ALWAYS
			ro_coupon.DiscountCriteria = DISCOUNT_CRITERIA_FULL
			ro_coupon.RedeemCount = 0
			this.change_CouponType(TYPE_ORDER_BASED)
		}
		if (ro_coupon.StartDate || ro_coupon.EndDate) {
			this.date_range$.$ = [
				ro_coupon.StartDate,
				ro_coupon.EndDate,
			]
		}
		this.load_data().then()
		log(this.ctx, Controller_name, 'ro_coupon', this.ro_coupon$.$)
	}
	readonly load_data = async ()=>{
		log(this.ctx, Controller_name, 'load_data()')
		this.busy$.$ = true
		try {
			const requestData = new CouponAPIRequestQuery()
			CouponAPIRequestQuery.fill_fireFlyID(requestData, this.fireFlyID)
			const payload = await this.ro_httpClient.API_COUPONS_menuitem(requestData)
			const MenuItems = payload.Data
			const ro_coupon = this.ro_coupon$.$
			for (const menuitem of MenuItems) {
				const selected_menuitems = ro_coupon.MenuItems || []
				for (const selected_menuitem of selected_menuitems) {
					if (menuitem.Name.toLowerCase() === selected_menuitem.toLowerCase()) {
						menuitem.is_selected = true
					}
				}
			}
			this.MenuItems$.$ = MenuItems
			log(this.ctx, Controller_name, 'API_COUPONS_menuitem', payload)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly select_serviceType = (
		service_type_column:keyof RoCoupon, service_type_column_label:string, service_type_enabled:boolean
	)=>{
		if (this.can_update_coupon$.$) {
			this.ro_coupon$.refresh({
				[service_type_column]:
					service_type_enabled
					? !this.ro_coupon$.$[service_type_column]
					: false
			})
			if (!service_type_enabled) {
				this.notyf_error(`${service_type_column_label} is not enabled in your Restaurant.`)
			}
		}
	}
	readonly change_CouponType = (CouponType?:number)=>{
		const coupon_refresh_a1 = []
		if (CouponType) {
			coupon_refresh_a1.push({ CouponType })
		}
		if (this.ro_coupon$.$.CouponType === TYPE_ITEM_BASED) {
			coupon_refresh_a1.push({
				DiscountType: DISCOUNT_TYPE_PERCENT,
				DiscountCriteria: DISCOUNT_CRITERIA_FULL,
			})
		}
		if (coupon_refresh_a1.length) {
			this.ro_coupon$.refresh(assign({}, ...coupon_refresh_a1))
		}
	}
	readonly changeDiscountValue = ()=>{
		log(this.ctx, 'changeDiscountValue', this.ro_coupon$.$.DiscountValue)
	}
	readonly save = async (evt:MouseEvent)=>{
		const ro_coupon = this.ro_coupon$.$
		const date_range = this.date_range$.$
		log(this.ctx, Controller_name, 'save', evt, date_range)
		const MenuItems = this.MenuItems$.$.filter(item=>item.is_selected)
		this.save_busy$.$ = true
		try {
			if (date_range) {
				ro_coupon.StartDate = date_range[0]
				ro_coupon.EndDate = date_range[1]
			}
			ro_coupon.MenuItems = MenuItems.map(m=>m.Name)
			const data = {
				fireFlyID: this.fireFlyID,
				ro_coupon,
			}
			this.ro_coupon$.refresh()
			const payload = await this.ro_httpClient.save_API_COUPONS(data)
			if (this.is_new_coupon$.$ === true) {
				if (payload.Status === STATUS_SUCCESS) {
					const ro_coupon:RoCoupon = payload.Data
					this.in_coupon = ro_coupon
					this.ro_coupon$.$ = deep_clone(this.in_coupon)
					this.dispatch('additem', {
						ro_coupon,
					})
				} else {
					this.notyf_error('Sorry, Unable to save item')
					console.error('SaveCouponModal|save|is_new_coupon|error', {
						payload
					})
				}
			} else {
				if (payload.Status === STATUS_SUCCESS) {
					merge(this.in_coupon, this.ro_coupon$.$)
				} else {
					this.notyf_error('Sorry, Unable to save item')
					console.error('SaveCouponModal|save|!is_new_coupon|error', {
						payload
					})
				}
			}
			if (payload.Status === STATUS_SUCCESS) {
				this.notyf_success('RoCoupon saved successfully.')
				await this.close(this.ro_coupon$.$)
			} else {
				if (payload.Code === 'ERR_COUPON_EXIST') {
					this.coupon_code_exists_errors$.$ = [`Coupon code already exists`]
				}
			}
			log(this.ctx, Controller_name, 'save', payload)
		} catch (err) {
			this.notyf_error('Unable to perform operation at the moment. Please try later.')
			console.error(err)
			throw err
		} finally {
			this.save_busy$.$ = false
		}
	}
}
