import { assign } from '@ctx-core/object'
import { DEFAULT_LAT, DEFAULT_LNG } from '@menus/web-config'
import type { ExtendedGeolocatable_I } from './ExtendedGeolocatable_I.js'
export function assign_extended_geolocatable(
	self:Partial<ExtendedGeolocatable_I>, ...arg_a:Partial<ExtendedGeolocatable_I>[]
):ExtendedGeolocatable_I {
	const extended_geolocatable = assign(self, ...arg_a)
	return assign(extended_geolocatable, {
		Longitude: parseFloat(extended_geolocatable.Longitude as string) || DEFAULT_LNG,
		Latitude: extended_geolocatable.Latitude as string || DEFAULT_LAT,
	})
}
