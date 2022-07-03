import { assign_extended_geolocatable } from '@menus/geolocatable'
import type { UserAddress } from './UserAddress.js'
export function userAddress_(attributes = {}):UserAddress {
	const userAddress = {
		Address: null,
		Address2: null,
		City: null,
		ID: null,
		Is_Default: null,
		Latitude: null,
		Longitude: null,
		State: null,
		Zip: null,
		Country: null,
	} as UserAddress
	assign_extended_geolocatable(userAddress, attributes)
	return userAddress
}
