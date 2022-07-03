import { LatLng_, Geolocatable_I } from '@menus/geolocatable'
const LAT_LNG_SEPRATOR = ','
export function userAddress_coordinate_(location_or_geolocatable:string|Geolocatable_I):string {
	const geolocatable = location_or_geolocatable as Geolocatable_I
	const location =
		typeof geolocatable === 'string'
		? location_or_geolocatable as string
		: LatLng_(geolocatable)
	if (!location) return ''
	const LatLng = location.split(LAT_LNG_SEPRATOR)
	return LatLng ? `${LatLng[1]},${LatLng[0]}` : ''
}
