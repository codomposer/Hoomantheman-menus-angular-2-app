import type { Geolocatable_I } from './Geolocatable_I.js'
export function check_geolocatable_(geolocatable:Geolocatable_I):Geolocatable_I|null {
	return (
		(geolocatable?.Latitude && geolocatable.Longitude)
		? geolocatable
		: null
	)
}
