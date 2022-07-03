import type { UserAddress } from './UserAddress.js'
import { userAddress_coordinate_ } from './userAddress_coordinate_.js'
import { userAddress_str_ } from './userAddress_str_.js'
export function userAddress_eq_(
	v1_userAddress:UserAddress|false|undefined, v2_userAddress:UserAddress|false|undefined
) {
	if (
		v1_userAddress
		&& v2_userAddress
		&& v1_userAddress.Latitude
		&& v1_userAddress.Longitude
		&& v2_userAddress.Latitude
		&& v2_userAddress.Longitude
	) {
		return userAddress_coordinate_(v1_userAddress) === userAddress_coordinate_(v2_userAddress)
	}
	return userAddress_str_(v1_userAddress) === userAddress_str_(v2_userAddress)
}
