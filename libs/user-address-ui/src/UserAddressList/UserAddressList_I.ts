import type { SvelteComponentTyped } from 'svelte'
import type { select_userAddress_evt_T } from './select_userAddress_evt_T.js'
export interface UserAddressList_I {}
export interface UserAddressList_T extends SvelteComponentTyped<{}, {
	select_userAddress:select_userAddress_evt_T
}>, UserAddressList_I {}
