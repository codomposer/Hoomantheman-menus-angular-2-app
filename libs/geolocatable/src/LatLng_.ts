import type { Geolocatable_I } from './Geolocatable_I.js'
import { check_geolocatable_ } from './check_geolocatable_.js'
export function LatLng_(geolocatable:Geolocatable_I):string {
	const check_geolocatable = check_geolocatable_(geolocatable)
	return (
		check_geolocatable
		? `${check_geolocatable.Latitude},${check_geolocatable.Longitude}`
		: ''
	)
}
