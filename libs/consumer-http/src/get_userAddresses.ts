import type { UserAddress } from '@menus/user-address-common'
export interface get_userAddresses_payload_T extends Array<userAddress_payload_T> {
	Status:string
}
export type userAddress_payload_T = UserAddress
