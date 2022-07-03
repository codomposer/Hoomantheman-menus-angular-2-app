import type { Address } from '@menus/address'
import type { Geolocatable_I } from '@menus/geolocatable'
export interface UserAddress extends Address, Geolocatable_I {
	ID:number
	Is_Default:boolean
	Address:string
	Address1:string
	Address2:string
	City:string
	State:string
	Zip:string
	Country:string
	LatLng:string
	LngLat:string
	Latitude:number
	Longitude:number
}
