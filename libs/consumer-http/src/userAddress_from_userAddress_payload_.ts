import type { UserAddress } from '@menus/user-address-common'
import type { userAddress_payload_T } from './get_userAddresses.js'
export function userAddress_from_userAddress_payload_(payload:userAddress_payload_T):UserAddress {
	const [Latitude, Longitude] = payload.LatLng.split(',').map(parseFloat)
	return {
		ID: payload.ID,
		Is_Default: payload.Is_Default,
		Address: payload.Address,
		Address2: payload.Address2,
		City: payload.City,
		State: payload.State,
		Zip: payload.Zip,
		Country: payload.Country,
		Latitude,
		Longitude,
	} as UserAddress
}
