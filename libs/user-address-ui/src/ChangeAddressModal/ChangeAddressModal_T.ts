import type { SvelteComponentTyped } from 'svelte'
import type { UserAddress } from '@menus/consumer-user-address'
import type { Modal_I } from '@menus/modal'
export interface ChangeAddressModal_open_T {userAddress:UserAddress|undefined}
export interface ChangeAddressModal_close_T {userAddress:UserAddress|undefined}
export interface ChangeAddressModal_I extends Modal_I<ChangeAddressModal_open_T, ChangeAddressModal_close_T> {}
export interface ChangeAddressModal_T
	extends ChangeAddressModal_I,
		SvelteComponentTyped<{
			open:ChangeAddressModal_open_T
			close:ChangeAddressModal_close_T
		}> {}
