import type { mhid_T } from './mhid_T.js'
export interface RoRequestQuery_I {
	qt:string // Query Type
	act:string // Action
	uid:number // Ro_User ID
	ff:string // Firefly
	ffadd:string // Firefly Add
	ffdelete:string // Firefly
	authcode:string // Ro_User Auth Code
	pcpk:string // key
	i:number // ID
	token:string // Token
	x:string // Captcha Code
	search:string // Search
	ps:number|string // Page Size
	proximity:number // Proximity
	ds:string // Date Start
	de:string // Date End
	mtype:number // Service Type
	excludecatering:boolean
	sid:number // Order Status ID
	showresttabnav:boolean
	callrestaurant:boolean
	// Request Demo
	f:string
	l:string
	// Add/Update Ro_User
	first:string // FirstName
	middle:string // MiddleName
	last:string // MiddleName
	e:string // Email
	p:string|number // Password|Page
	ul:number // Ro_User Level
	enabled:boolean // Ro_User Level
	SubscriptionID:number
	notificationtone:string
	// Orders
	oid:number // Order ID
	// Menus
	zid:number // Menu Item Size ID
	mid:number // Menu Item ID
	moid:number // Menu Option ID
	mhid:mhid_T // Master Heading ID
	hid:number // Heading ID
	of:number
	menuitems:any
	OrderDetail:any
	// Signup
	z:string // Zip Code
	rn:string // Rest Name
	t:string // Title
	a:string // Rest Address
	c:string // Verify code
	n:string // customer name
	op:string // Old password
	np:string // New password
	terms:boolean // Terms and conditions
	plan:number // Pricing plan
	// Rest Info
	DeliveryZone:any[]
	DeliveryHours:any[]
	WorkingHours:any[]
	Holidays:any[]
	// Schedule
	CateringHours:any[]
	DiningHours:any[]
	PickupHours:any[]
	// Reset Password
	p2:string // Confirm Password
	// Support email
	ns:string
}
