import type { Geolocatable_I } from './Geolocatable_I.js'
export interface ExtendedGeolocatable_I extends Geolocatable_I {
	LatLng:string
	LngLat:string
	LatLngLiteral:google.maps.LatLngLiteral
}
