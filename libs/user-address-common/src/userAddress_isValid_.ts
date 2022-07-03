import type { UserAddress } from './UserAddress.js'
export function userAddress_isValid_(userAddress:UserAddress) {
	return (
		userAddress
		&& userAddress.Address
		&& userAddress.City
		&& userAddress.Country
		&& userAddress.Latitude
		&& userAddress.Longitude
		&& userAddress.State
		&& userAddress.Zip
	)
}
