import {
	assign_extended_geolocatable, AttributesAssignableGeolocatable, BaseGeolocatable
} from '@menus/geolocatable'
import type { DishZipSeo_I } from './DishZipSeo_I.js'
export class DishZipSeo extends BaseGeolocatable implements DishZipSeo_I {
	ZipCode:number
	Latitude:number
	Longitude:number
	dish:string
	// Custom Fields
	active:boolean
	constructor(attributes:AttributesAssignableGeolocatable = {}) {
		super(attributes)
		assign_extended_geolocatable(this, attributes)
	}
	public get url() {
		return `/dish/${this.dish}/${this.ZipCode}/page/1`
	}
}
