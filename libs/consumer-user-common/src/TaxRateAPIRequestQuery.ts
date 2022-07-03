import { APIRequestQuery } from '@menus/api'
import type { UserAddress } from '@menus/user-address-common'
export class TaxRateAPIRequestQuery extends APIRequestQuery {
	public z:string // Zip
	public s:string // State
	public static fill_userAddress(requestData:TaxRateAPIRequestQuery, userAddress:UserAddress) {
		requestData.z = userAddress.Zip
		requestData.s = userAddress.State
	}
}
