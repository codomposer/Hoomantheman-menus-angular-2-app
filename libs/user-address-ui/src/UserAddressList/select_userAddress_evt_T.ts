import type { UserAddress } from '@menus/user-address-common'
export interface select_userAddress_evt_I {
	userAddress:UserAddress
	index:number
}
export interface select_userAddress_evt_T extends CustomEvent<select_userAddress_evt_I> {
}
