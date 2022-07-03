import { assign_extended_geolocatable } from './assign_extended_geolocatable.js'
import type { AttributesAssignableGeolocatable } from './AttributesAssignableGeolocatable.js'
import type { ExtendedGeolocatable_I } from './ExtendedGeolocatable_I.js'
import { LatLng_ } from './LatLng_.js'
import { LatLngLiteral_ } from './LatLngLiteral_.js'
import { LngLat_ } from './LngLat_.js'
export class BaseGeolocatable implements ExtendedGeolocatable_I {
	constructor(attributes:AttributesAssignableGeolocatable = {}) {
		assign_extended_geolocatable(this, attributes)
	}
	public Latitude:number
	public Longitude:number
	public get LatLng() {
		return LatLng_(this)
	}
	public get LngLat() {
		return LngLat_(this)
	}
	public get LatLngLiteral():google.maps.LatLngLiteral {
		return LatLngLiteral_(this)
	}
}
