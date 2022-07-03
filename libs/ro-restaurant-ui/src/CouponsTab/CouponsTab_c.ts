import { I } from '@ctx-core/combinators'
import { subscribe_wait_for_timeout, writable$, Writable$ } from '@ctx-core/store'
import { BaseController, confirmModal$_b } from '@menus/shared-ui'
import type { RoCoupon } from '@menus/ro-shared-models'
import { STATUS_SUCCESS, timeout_ms } from '@menus/web-config'
import { log } from '@menus/util'
import {
	ro_httpClient_b, RoRequestQuery, success_API_COUPONS_list_payload_T, success_API_RESTAURANT_info_payload_T
} from '@menus/ro-http'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import { params_fireFlyID$_b } from '@menus/page'
import { RoRestaurant_I } from '@menus/ro-restaurant'
import type { SaveCouponModal_I, SaveCouponModal_additem_evt_T, } from '../SaveCouponModal'
import type { ro_restaurant_ui_Ctx } from '../ro_restaurant_ui_Ctx.js'
const Controller_name = 'CouponsTab_c'
export class CouponsTab_c extends BaseController<ro_restaurant_ui_Ctx> {
	readonly confirmModal$ = confirmModal$_b(this.ctx)
	readonly params_fireFlyID$ = params_fireFlyID$_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly SaveCouponModal_i$:Writable$<SaveCouponModal_I> = writable$(null)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly ro_coupons$:refresh_writable_T<RoCoupon[]> = refresh_writable_([])
	readonly search$:Writable$<string> = writable$('')
	ro_restaurant:RoRestaurant_I
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.load_data(true).then()
	};
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly load_data = async (first_time:boolean)=>{
		this.busy$.$ = true
		try {
			const [
				getCouponList_payload, API_RESTAURANT_info_payload,
			] = await Promise.all([
				this.load_coupon_list(), first_time && this.load_restaurant_info()
			]) as [success_API_COUPONS_list_payload_T, success_API_RESTAURANT_info_payload_T]
			if (getCouponList_payload.Status === STATUS_SUCCESS) {
				this.ro_coupons$.$ = getCouponList_payload.Data
			}
			if (API_RESTAURANT_info_payload) {
				this.ro_restaurant = (
					API_RESTAURANT_info_payload as success_API_RESTAURANT_info_payload_T
				).Data
			}
			log(this.ctx, Controller_name, 'load_data', [getCouponList_payload, API_RESTAURANT_info_payload])
		} finally {
			this.busy$.$ = false
		}
	}
	readonly load_restaurant_info = async ()=>{
		const requestData = new RoRequestQuery()
		const params_fireFlyID = await subscribe_wait_for_timeout(this.params_fireFlyID$, I, timeout_ms)
		RoRequestQuery.fill_fireFlyID(requestData, params_fireFlyID)
		return this.ro_httpClient.API_RESTAURANT_info(requestData)
	}
	readonly load_coupon_list = async ()=>{
		const requestData = new RoRequestQuery()
		requestData.ff = await subscribe_wait_for_timeout(this.params_fireFlyID$, I, timeout_ms)
		if (this.search$.$?.length) {
			requestData.search = this.search$.$
		}
		return this.ro_httpClient.API_COUPONS_list(requestData)
	}
	readonly searchEnter = async ()=>{
		await this.load_data(false)
	}
	readonly open_SaveCouponModal_i = async (ro_coupon?:RoCoupon)=>{
		const saved_coupon = await this.SaveCouponModal_i$.$.open({
			fireFlyID: this.params_fireFlyID$.$,
			ro_coupon,
			ro_restaurant: this.ro_restaurant
		})
		const ro_coupons = this.ro_coupons$.$
		if (saved_coupon) {
			const index = ro_coupons.indexOf(ro_coupon)
			if (~index) {
				ro_coupons.splice(index, 1, saved_coupon)
			} else {
				ro_coupons.unshift(saved_coupon)
			}
		}
		this.ro_coupons$.refresh()
	}
	readonly onadditem_SaveCouponModal_i = (evt:SaveCouponModal_additem_evt_T)=>{
		const $coupon:RoCoupon = evt.ro_coupon
		this.ro_coupons$.$.unshift($coupon)
		log(this.ctx, Controller_name, 'SaveCouponModal_iEvents', evt)
	}
	readonly save_coupon = async (ro_coupon:RoCoupon)=>{
		ro_coupon.busy = true
		try {
			const data = {
				fireFlyID: this.params_fireFlyID$.$,
				ro_coupon,
			}
			const payload = await this.ro_httpClient.save_API_COUPONS(data)
			if (payload.Status === STATUS_SUCCESS) {
				this.notyf_success('Coupon saved successfully.')
			}
			log(this.ctx, Controller_name, 'save_coupon', ro_coupon)
		} catch (err) {
			this.notyf_error('Unable to perform operation at the moment. Please try later.')
			console.error(err)
			throw err
		} finally {
			ro_coupon.busy = false
			this.ro_coupons$.refresh()
		}
	}
	readonly delete_coupon = async (coupon_index:number, ro_coupon:RoCoupon)=>{
		const confirm = await this.confirmModal$.$.open({
			message:
				`Are you sure you want to ${
					ro_coupon.RedeemCount === 0 ? 'delete' : 'archive'
				} ${ro_coupon.CouponCode}?`,
		})
		if (confirm) {
			log(this.ctx, Controller_name, 'delete_coupon()')
			ro_coupon.busyDelete = true
			try {
				const requestData = new RoRequestQuery()
				RoRequestQuery.fill_fireFlyID(requestData, this.params_fireFlyID$.$)
				RoRequestQuery.fill_ID(requestData, ro_coupon.ID)
				const payload = await this.ro_httpClient.API_COUPONS_del(requestData)
				if (payload.Status === STATUS_SUCCESS) {
					this.ro_coupons$.$.splice(coupon_index, 1)
					this.ro_coupons$.refresh()
				} else {
					this.notyf_error('Unable to delete item, Please try later.')
				}
				log(this.ctx, Controller_name, 'delete_coupon', payload)
			} finally {
				ro_coupon.busyDelete = false
			}
		}
	}
}
