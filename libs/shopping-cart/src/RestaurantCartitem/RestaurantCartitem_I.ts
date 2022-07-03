import type { MenuCartitem_I } from '@menus/consumer-menu'
import type { OrderResult } from '@menus/shared-order'
import type { UserAddress } from '@menus/user-address-common'
import type { ServiceType } from '@menus/service-type-common'
import type { restaurant_frame_sync_T } from '@menus/restaurant-frame'
import type { schedule_ctx_I } from '@menus/restaurant-hours'
import type { CartCoupon_I } from '../CartCoupon_I.js'
export interface RestaurantCartitem_I/*@formatter:off*/
  extends RestaurantCartitem_ui_I,
    RestaurantCartitem_refreshable_I,
    restaurant_frame_sync_T,
    schedule_ctx_I/*@formatter:on*/
{
	RestaurantID:number
	fireFlyID:string
	FFID:string
	serviceTypes:ServiceType[]
	subscriptionID:number
	delivery:number
	serviceFee:number
	driverTip:number
	addCouponCode_busy:boolean
	DeliveryPercentOfSubTotal:number
	coupon_discount:number
	subTotal:number
	total:number
	coupons:CartCoupon_I[]
	applied_coupons:CartCoupon_I[]
	menu_cartitems:MenuCartitem_I[]
	orderResult:OrderResult
	NewID:number
	serviceType:ServiceType
	isDeliverable:boolean
	userAddress:UserAddress
	require_min_order:boolean
}
export interface RestaurantCartitem_ui_I {
	coupon_code:string // ephemeral: bound to RoCoupon Code ui input & cleared when successfully applied
}
export interface RestaurantCartitem_refreshable_I {
	ZipCode:string
	RestaurantName:string
	CuisineName:string
	Address:string
	ETA:string
	ETAMin:number
	ETAMax:number
	DeliveryModeID:number
	DeliveryCharge:number
	MinOrder:number
	Availability:string
	FileName:string
	RestImageExist:boolean
	RestImage:string
	menusServiceFee:number
	tax:number
	taxRate:number
}
