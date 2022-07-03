import { BaseRestaurantCard } from './BaseRestaurantCard.js'
export class RestItem extends BaseRestaurantCard {
	Address:string
	FFID:string
	Menus_SourceID:number
	RestaurantID:number
	RestaurantName:string
	TotalPages:number
	TotalRow:number
	ZipCode:string
	AVGPrice:number
	// ui
	mapMarker:any
}
