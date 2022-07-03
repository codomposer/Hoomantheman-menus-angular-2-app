import type { CouponError } from './CouponError.js'
export interface CartCoupon_I {
	CouponID:number
	CouponType:number
	CouponCode:string
	DurationType:number
	DiscountType:number
	DiscountCriteria:number
	DiscountValue:number
	MinOrder:number
	MaxOrder:number
	StartDate:string
	EndDate:string
	DailyStartTime:string
	DailyEndTime:string
	Is_AllowBundle:boolean
	MenuItems:string[]
	MaxRedeemPerCustomer:number
	CustomerRedeemCount:number
	ServiceTypes:number[]
	// ui
	invalid:boolean
	errors:CouponError[]
}
