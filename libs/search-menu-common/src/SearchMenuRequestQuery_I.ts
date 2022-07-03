import type { ServiceTypeId_T } from '@menus/service-type-common'
export interface SearchMenuRequestQuery_I {
	pcpk?:string
	qtype:string
	page:number
	pageSize:number
	min_price:number
	max_price:number
	proximity:number
	deliveryfee:number
	minimumorder:number
	menuType:ServiceTypeId_T
	keywords:string
	zip:string
	coordinate:string
	option:number
	menuitemid:number
	zid:number
	restaurantid:number
	mhid:number
	cuisineID:string
	termsinclude:string
	usemap:number
	ff:string // FireFlyID
	Menus_SourceID:number
	filter:string
	sort:number
}
