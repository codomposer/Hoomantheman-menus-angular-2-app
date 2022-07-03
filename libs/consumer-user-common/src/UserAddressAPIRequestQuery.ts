import { LatLng_ } from '@menus/geolocatable'
import type { UserAddress } from '@menus/user-address-common'
import { UserAPIRequestQuery } from './UserAPIRequestQuery.js'
export class UserAddressAPIRequestQuery extends UserAPIRequestQuery {
	public a:number // ID
	public b:string // Address
	public c = '' // Address2
	public d:string // City
	public e:string // State
	public f:string // Zip
	public g:string // ExtendedGeolocatable_I
	public static fill_userAddress(
		requestData:UserAddressAPIRequestQuery,
		userAddress:UserAddress
	) {
		if (userAddress.ID > 0) {
			requestData.a = userAddress.ID
		}
		requestData.b = userAddress.Address || ''
		requestData.d = userAddress.City || ''
		requestData.e = userAddress.State || ''
		requestData.f = userAddress.Zip || ''
		requestData.g = LatLng_(userAddress) || ''
	}
}
