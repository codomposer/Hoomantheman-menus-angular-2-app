import { AttributesAssignableGeolocatable, BaseGeolocatable } from '@menus/geolocatable'
import { isPopular_, SearchMenuitem_I } from '@menus/search-menu-common'
import type { ServiceType } from '@menus/service-type-common'
import type {
	RestaurantHour_I, RestaurantHourCtx_I, RestaurantHours_I, schedule_n0_T
} from '@menus/restaurant-hours-lib'
export class BaseRestaurantCard extends BaseGeolocatable implements SearchMenuitem_I {
	constructor(attributes:AttributesAssignableGeolocatable = {}) {
		super(attributes)
	}
	public RestaurantID:number
	public FFID:string
	public RestaurantName:string
	public Address:string
	public ZipCode:string
	public Phone:string
	public Latitude:number
	public Longitude:number
	public Checkout_Message:string
	public SegmentID:number
	public SegmentName:string
	public CuisineID:number
	public CuisineName:string
	public isDiningIn:boolean
	public isCatering:boolean
	public isDelivery:boolean
	public isPickup:boolean
	public MasterheadingID:number
	public MasterheadingName:string
	public HeadingID:number
	public HeadingName:string
	public MenuItemID:number
	public MenuImageExist:boolean
	public RestImageExist:boolean
	public MenuItemName:string
	public MenuItemDescription:string
	public ETA:string
	public ETAMin:number
	public ETAMax:number
	public DeliveryModeID:number
	public DeliveryCharge:number
	public MinOrder:number
	public IsSingleSize:boolean
	public PriceLevelID:number
	public PriceLevel:string
	public Price:number
	public IsActualPrice:number
	public Distance:string
	public ItemCount:number
	public ItemOrders:number
	public PopularLevel?:number
	public SoldOutAction:string
	public MenuHour:string
	public Availability:string
	public IsOpen:boolean
	public SortOrder:number
	public UTC_OpeningTime:string
	public UTC_ClosingTime:string
	public MHSortID:0
	public HSortID:0
	public FileName:string
	public CuisineFileName:string
	public Menus_SourceID:number
	public SubscriptionID:number
	public IsPlatform:boolean
	public MenusServiceFee:number
	public PayMenusServiceFee:boolean
	public Within_Zone:boolean
	public Zone_Range:number
	public RestRating:number
	public RestRatingCount:number
	public WithCoupon:boolean
	public CouponCode:string
	public CouponDiscount:number
	public ShowImageInGallery:boolean
	public DishCodeID:number
	public Dish:string
	public DishFileName:string
	public TotalRow:number
	public TotalPages:number
	public RestImage:string
	public MenuItemImage:string
	public cartCount:number
	public WithMenuSense:number
	// ui
	public is_selected:boolean
	public serviceType:ServiceType
	public minute_tick:Date
	public service_restaurant_hours:RestaurantHour_I[]
	public current_day_restaurant_hour:RestaurantHour_I
	public restaurant_hours:RestaurantHours_I
	public restaurant_hour_ctx_a:RestaurantHourCtx_I[]
	public ASAP_available:boolean
	public is_open:boolean
	public schedule_n0_a:schedule_n0_T[]
	public schedule_n0_value:string
	public schedule_n1_value:string
	get isPopular() {
		return isPopular_(this)
	}
}
