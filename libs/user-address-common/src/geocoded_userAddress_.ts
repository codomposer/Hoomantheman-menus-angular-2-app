import { assign } from '@ctx-core/object'
import { userAddress_ } from './userAddress_.js'
import { ensure_geocoded } from './ensure_geocoded.js'
import type { UserAddress } from './UserAddress.js'
import type { Geocoded } from './Geocoded.js'
export async function geocoded_userAddress_(
	place_result:Geocoded
):Promise<UserAddress|undefined> {
	const geocoded = await ensure_geocoded(place_result)
	if (!geocoded) return
	const userAddress = userAddress_()
	assign(userAddress, {
		Address: geocoded.formatted_address,
		Latitude: geocoded.geometry.location.lat(),
		Longitude: geocoded.geometry.location.lng(),
	})
	for (const i in geocoded.address_components) {
		if (!geocoded.address_components.hasOwnProperty(i)) continue
		const address_component = geocoded.address_components[i]
		const type = address_component.types[0]
		// if (type == 'street_number') {
		//     addr.Address = a.short_name;
		// }
		// else if (type == 'route') {
		//     addr.Address = addr.Address || '';
		//     addr.Address += (addr.Address.length ? ' ' : '') + a.short_name;
		// }
		// else if (type == 'neighborhood') {
		//     addr.Address = addr.Address || '';
		//     addr.Address += (addr.Address.length ? ', ' : '') + a.short_name;
		// }
		// else
		if (type === 'postal_code') {
			userAddress.Zip = address_component.short_name
		} else if (type === 'locality') {
			userAddress.City = address_component.short_name
		} else if (type === 'administrative_area_level_1') {
			userAddress.State = address_component.short_name
		} else if (type === 'country') {
			userAddress.Country = address_component.short_name
		}
	}
	return userAddress
}
