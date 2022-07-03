import { APIRequestQuery } from '@menus/api'
import type { Cuisine } from '@menus/cuisine'
import { LatLng_ } from '@menus/geolocatable'
import type { ServiceType, ServiceTypeId_T } from '@menus/service-type-common'
import { ServiceTypeId } from '@menus/service-type-common'
import type { SearchMenuRequestQuery_I } from './SearchMenuRequestQuery_I.js'
export class SearchMenuRequestQuery extends APIRequestQuery implements SearchMenuRequestQuery_I {
	public qtype:string
	public page:number
	public pageSize:number
	public min_price:number
	public max_price:number
	public proximity:number
	public deliveryfee:number
	public minimumorder:number
	public menuType:ServiceTypeId_T
	public keywords:string
	public zip:string
	public coordinate:string
	public recache: number
	public option:number
	public menuitemid:number
	public zid:number
	public mid:number
	public restaurantid:number
	public mhid:number
	public cuisineID:string
	public termsinclude:string
	public usemap = 1
	public ff:string // FireFlyID
	public Menus_SourceID:number
	public filter:string
	public sort:number
	public static fillQueryParams = (requestData:SearchMenuRequestQuery, params:SearchMenuRequestQuery_params_I)=>{
		requestData.min_price = params.min_price
		requestData.max_price = params.max_price
		requestData.menuType = ServiceTypeId[params.serviceType]
		requestData.proximity = params.proximity
		requestData.keywords = params.keywords
		requestData.coordinate = LatLng_({
			Latitude: params.lat,
			Longitude: params.lng,
		})
	}
	public static fillSharedData = (
		requestData:SearchMenuRequestQuery,
		selected_cuisines:Cuisine[]
	)=>{
		// Get selected cuisines
		const selectedCuisineIDs = []
		for (const i in selected_cuisines) {
			const cuisine = selected_cuisines[i]
			selectedCuisineIDs.push(cuisine.id)
		}
		requestData.cuisineID = selectedCuisineIDs.join(',')
	}
	public static compareQueryParams = (requestData:SearchMenuRequestQuery, queryParams:SearchMenuRequestQuery_params_I)=>{
		if (requestData.min_price != queryParams.min_price) return false
		if (requestData.max_price != queryParams.max_price) return false
		if (requestData.menuType != ServiceTypeId[queryParams.serviceType]) return false
		if (requestData.proximity != queryParams.proximity) return false
		if (requestData.keywords != queryParams.keywords) return false
		if (requestData.coordinate != LatLng_({
			Latitude: queryParams.lat,
			Longitude: queryParams.lng,
		})) return false
		return true
	}
}
export interface SearchMenuRequestQuery_params_I {
	min_price:number
	max_price:number
	serviceType:ServiceType
	proximity:number
	keywords:string
	lat:string
	lng:string
}
