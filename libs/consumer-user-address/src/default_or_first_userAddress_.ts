import { UserAddress } from '@menus/user-address-common'
export function default_or_first_userAddress_(
	userAddress_a:(UserAddress|undefined)[]
):UserAddress|undefined {
	let userAddress:UserAddress|undefined
	for (const i in userAddress_a) {
		if (!userAddress_a.hasOwnProperty(i)) continue
		const a_userAddress = userAddress_a[i]
		if (a_userAddress?.Is_Default) {
			userAddress = a_userAddress
			break
		}
	}
	if (
		!userAddress
		&& typeof userAddress_a !== 'undefined'
		&& userAddress_a
		&& userAddress_a.length > 0
	) {
		userAddress = userAddress_a[0]
	}
	return userAddress
}
