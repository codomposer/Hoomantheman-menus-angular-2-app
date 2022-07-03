import { DEFAULT_LAT, DEFAULT_LNG } from '@menus/web-config'
import { BaseGeolocatable } from './BaseGeolocatable.js'
export const default_geolocatable = Object.freeze(
	new BaseGeolocatable({
		Latitude: DEFAULT_LAT,
		Longitude: DEFAULT_LNG,
	})
)
