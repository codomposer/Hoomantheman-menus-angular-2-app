import type { UserAddress } from './UserAddress.js'
export function userAddress_str_(userAddress:UserAddress|false|undefined):string {
	const a = []
	if (userAddress) {
		if (userAddress.Address) a.push(userAddress.Address)
		if (userAddress.Address2) a.push(userAddress.Address2)
		if (userAddress.City) a.push(userAddress.City)
		if (userAddress.State) a.push(userAddress.State)
		if (userAddress.Zip) a.push(userAddress.Zip)
		if (userAddress.Country) a.push(userAddress.Country)
	}
	return a.join(' ')
}
