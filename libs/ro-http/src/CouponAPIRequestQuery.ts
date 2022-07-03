import type { RoCoupon } from '@menus/ro-shared-models'
import { RoRequestQuery } from './RoRequestQuery.js'
export class CouponAPIRequestQuery extends RoRequestQuery {
	public n:string // Name
	public des:string // Description
	public c:string // RoCoupon Code
	public d:number // Discount
	public ds:string // Date Start
	public de:string // Date End
	public daily_start:string
	public daily_end:string
	public ctype:number
	public dtype:number
	public durationtype:number
	public discountcriteria:number
	public minorder:number
	public maxorder:number
	public limitation:string
	public redeem_max:number
	public redeem_percustomer:number
	public enabled:boolean // Enabled
	public visible:boolean // visible
	public delivery:boolean
	public pickup:boolean
	public catering:boolean
	public diningin:boolean
	public bundle:boolean
	public static fillCoupon = (requestData:CouponAPIRequestQuery, ro_coupon:RoCoupon)=>{
		if (ro_coupon.CouponCode) requestData.c = ro_coupon.CouponCode
		if (ro_coupon.Description) requestData.des = ro_coupon.Description
		if (ro_coupon.Limitation) requestData.limitation = ro_coupon.Limitation
		if (ro_coupon.DurationType) requestData.durationtype = ro_coupon.DurationType
		if (ro_coupon.StartDate) requestData.ds = ro_coupon.StartDate
		if (ro_coupon.EndDate) requestData.de = ro_coupon.EndDate
		if (ro_coupon.DailyStartTime) requestData.daily_start = ro_coupon.DailyStartTime
		if (ro_coupon.DailyEndTime) requestData.daily_end = ro_coupon.DailyEndTime
		if (ro_coupon.CouponType) requestData.ctype = ro_coupon.CouponType
		if (ro_coupon.DiscountType) requestData.dtype = ro_coupon.DiscountType
		if (ro_coupon.DiscountValue) requestData.d = ro_coupon.DiscountValue
		if (ro_coupon.DiscountCriteria) requestData.discountcriteria = ro_coupon.DiscountCriteria
		if (ro_coupon.MinOrder) requestData.minorder = ro_coupon.MinOrder
		if (ro_coupon.MaxOrder) requestData.maxorder = ro_coupon.MaxOrder
		if (ro_coupon.MaxRedeemPerCustomer) requestData.redeem_percustomer = ro_coupon.MaxRedeemPerCustomer
		if (ro_coupon.MaxRedeem) requestData.redeem_max = ro_coupon.MaxRedeem
		requestData.enabled = ro_coupon.Enabled || false
		if (ro_coupon.Is_Visible) requestData.visible = ro_coupon.Is_Visible
		if (ro_coupon.Delivery) requestData.delivery = ro_coupon.Delivery
		if (ro_coupon.Pickup) requestData.pickup = ro_coupon.Pickup
		if (ro_coupon.Catering) requestData.catering = ro_coupon.Catering
		if (ro_coupon.DiningIn) requestData.diningin = ro_coupon.DiningIn
		requestData.bundle = ro_coupon.Is_AllowBundle
	}
}
