import { nullish } from '@ctx-core/function'
import { APIRequestQuery } from '@menus/api'
import type { Ro_User } from '@menus/ro-user-common'
import type { ff_T } from './ff_T.js'
import type { mhid_T } from './mhid_T'
import type { RoRequestQuery_I } from './RoRequestQuery_I.js'
export class RoRequestQuery extends APIRequestQuery implements RoRequestQuery_I {
	public qt:string // Query Type
	public act:string // Action
	public uid:number // Ro_User ID
	public ff:ff_T // Firefly
	public ffadd:string // Firefly Add
	public ffdelete:string // Firefly
	public authcode:string // Ro_User Auth Code
	public pcpk:string // public key
	public i:number // ID
	public token:string // Token
	public x:string // Captcha Code
	public search:string // Search
	public ps:number // Page Size
	public proximity:number // Proximity
	public ds:string // Date Start
	public de:string // Date End
	public mtype:number // Service Type
	public excludecatering:boolean
	public sid:number // Order Status ID
	public showresttabnav:boolean
	public callrestaurant:boolean
	// Request Demo
	public f:string
	public l:string
	// Add/Update Ro_User
	public first:string // FirstName
	public middle:string // MiddleName
	public last:string // MiddleName
	public e:string // Email
	public p:string // Password
	public ul:number // Ro_User Level
	public enabled:boolean // Ro_User Level
	public SubscriptionID:number
	public notificationtone:string
	// Orders
	public oid:number // Order ID
	// Menus
	public zid:number // Menu Item Size ID
	public mid:number // Menu Item ID
	public moid:number // Menu Option ID
	public mhid:mhid_T // Master Heading ID
	public hid:number // Heading ID
	public of:number
	public menuitems:any
	public OrderDetail:any
	// Signup
	public z:string // Zip Code
	public rn:string // Rest Name
	public t:string // Title
	public a:string // Rest Address
	public c:string // Verify code
	public n:string // customer name
	public op:string // Old password
	public np:string // New password
	public terms:boolean // Terms and conditions
	public plan:number // Pricing plan
	public pid:number // Subscription ID
	public ccid:number // Credit Card ID
	// Rest Info
	public DeliveryZone:any[]
	public DeliveryHours:any[]
	public WorkingHours:any[]
	public Holidays:any[]
	// Schedule
	public CateringHours:any[]
	public DiningHours:any[]
	public PickupHours:any[]
	// Reset Password
	public p2:string // Confirm Password
	// Support email
	public ns:string
	// Accept Order
	public eta:number
	public static fill_fireFlyID(requestData:Partial<RoRequestQuery_I>, ff:ff_T) {
		requestData.ff = ff
	}
	public static fill_ID(requestData:Partial<RoRequestQuery_I>, ID:number) {
		requestData.i = ID
	}
	public static fill_search(requestData:Partial<RoRequestQuery_I>, search:string) {
		requestData.search = search
	}
	public static fill_page(requestData:Partial<RoRequestQuery_I>, page:number|string) {
		requestData.p = page
	}
	public static fill_pageSize(requestData:Partial<RoRequestQuery_I>, pageSize:number|string) {
		requestData.ps = pageSize
	}
	public static fill_userLevel(requestData:Partial<RoRequestQuery_I>, userLevel:number) {
		requestData.ul = userLevel
	}
	public static fill_OrderID(requestData:Partial<RoRequestQuery_I>, OrderID:number) {
		requestData.oid = OrderID
	}
	public static fill_MasterheadingID(requestData:Partial<RoRequestQuery_I>, MasterheadingID:number) {
		requestData.mhid = MasterheadingID
	}
	public static fill_headID(requestData:Partial<RoRequestQuery_I>, headID:number) {
		requestData.hid = headID
	}
	public static fill_menuitemID(requestData:Partial<RoRequestQuery_I>, MenuItemID:number) {
		requestData.mid = MenuItemID
	}
	public static fill_MenuoptionID(requestData:Partial<RoRequestQuery_I>, MenuoptionID:number) {
		requestData.moid = MenuoptionID
	}
	public static fill_login_user(requestData:Partial<RoRequestQuery_I>, login_user:Ro_User|nullish) {
		if (login_user) {
			requestData.authcode = login_user.AuthCode
			requestData.uid = login_user.id
		}
	}
	public static fill_save_user(
		requestData:Partial<RoRequestQuery_I>, user:Ro_User
	) {
		if (user.id) requestData.i = user.id
		if (user.FirstName) requestData.first = user.FirstName
		if (user.MiddleName) requestData.middle = user.MiddleName
		if (user.LastName) requestData.last = user.LastName
		if (user.Email) requestData.e = user.Email
		if (user.Password) requestData.p = user.Password
		if (user.UserLevel) RoRequestQuery.fill_userLevel(requestData, user.UserLevel)
		requestData.enabled = user.Enabled || false
		if (user.Terms) requestData.terms = user.Terms
	}
}
