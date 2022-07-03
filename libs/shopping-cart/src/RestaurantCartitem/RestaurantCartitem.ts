import type { search_menus_menuitems_payload_T } from '@menus/consumer-http'
import type { MenuCartitem_I } from '@menus/consumer-menu'
import type { UserAddress } from '@menus/user-address-common'
import type { ServiceType } from '@menus/service-type-common'
import type { RestaurantHourCtx_I, RestaurantHours_I, schedule_n0_T } from '@menus/restaurant-hours-lib'
import type { RestaurantHour_I } from '@menus/restaurant-hours-lib'
import type { CartCoupon_I } from '../CartCoupon_I.js'
import type { RestaurantCartitem_I } from './RestaurantCartitem_I.js'
export class RestaurantCartitem implements RestaurantCartitem_I {
	public RestaurantID:number
	public fireFlyID:string
	public ZipCode:string
	public RestaurantName:string
	public CuisineName:string
	public DeliveryCharge:number = 0
	public DeliveryPercentOfSubTotal:number
	public MinOrder:number
	public serviceTypes:ServiceType[]
	public require_min_order = false
	public subscriptionID = 0
	public delivery = 0
	public serviceFee = 0
	public driverTip = 0
	public tax = 0
	public taxRate = 0
	public addCouponCode_busy:boolean
	public coupon_code:string // ephemeral: bound to RoCoupon Code ui input & cleared when successfully applied
	public coupon_discount = 0
	public subTotal = 0
	public total = 0
	public coupons:CartCoupon_I[] = []
	public applied_coupons:CartCoupon_I[] = []
	public orderResult:any
	public NewID:number
	public serviceType:ServiceType
	public isDeliverable:boolean
	public userAddress:UserAddress
	public search_menus_menuitems_payload:search_menus_menuitems_payload_T
	public menu_cartitems:MenuCartitem_I[]
	public FFID:string
	public Address:string
	public Availability:string
	public FileName:string
	public RestImageExist:boolean
	public RestImage:string
	public ETA:string
	public ETAMin:number
	public ETAMax:number
	public DeliveryModeID:number
	public menusServiceFee:number
	public minute_tick:Date
	public restaurant_hours:RestaurantHours_I
	public restaurant_hour_ctx_a:RestaurantHourCtx_I[]
	public ASAP_available:boolean
	public is_open:boolean
	public service_restaurant_hours:RestaurantHour_I[]
	public current_day_restaurant_hour:RestaurantHour_I
	public schedule_n0_a:schedule_n0_T[]
	public schedule_n0_value:string
	public schedule_n1_value:string
}
