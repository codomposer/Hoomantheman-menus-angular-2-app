import { isNumber } from '@ctx-core/number'
import type { Geolocatable_I } from './Geolocatable_I.js'
export function LatLngLiteral_(
	geolocatable:Geolocatable_I|undefined
):google.maps.LatLngLiteral {
	if (!geolocatable) return
	const { Latitude, Longitude } = geolocatable
	if (!isNumber(Latitude) || !isNumber(Longitude)) return
	return {
		lat: parseFloat(Latitude as string),
		lng: parseFloat(Longitude as string),
	}
}
