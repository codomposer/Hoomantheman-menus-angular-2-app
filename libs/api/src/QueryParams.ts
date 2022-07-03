import type { query_T } from '@ctx-core/uri'
export interface QueryParams_I extends Record<string, string|number|boolean> {
	activeTab?:string
	cuisineID?:string
	fireFlyID?:string
	fsPage?:string|number
	fsPageSize?:string|number
	lat?:string|number
	lng?:string|number
	keywords?:string
	max_price?:number
	menuitemID?:number
	menuType?:string
	min_price?:number
	mode?:string
	ordersPage?:number
	ordersPageSize?:number
	ordersSearch?:string
	page?:number
	pageSize?:number
	proximity?:number
	reset_code?:string
	restaurantID?:number
	returnUrl?:string
	serviceType?:string
	search?:string
	tab?:string
	view?:string
	email?:string
	authcode?:string
	session?:string
}
export type QueryParams = QueryParams_I&query_T
