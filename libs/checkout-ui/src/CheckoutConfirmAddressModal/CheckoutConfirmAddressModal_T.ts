import type { SvelteComponentTyped } from 'svelte'
import type { Modal_I_close_T, Modal_I_open_T } from '@menus/modal'
import type { CheckoutConfirmAddressModal_c } from './CheckoutConfirmAddressModal_c.js'
import type {
	CheckoutConfirmAddressModal_close_T, CheckoutConfirmAddressModal_open_T
} from './CheckoutConfirmAddressModal_I.js'
export interface CheckoutConfirmAddressModal_T extends SvelteComponentTyped {
	readonly _:CheckoutConfirmAddressModal_c
	readonly open:Modal_I_open_T<CheckoutConfirmAddressModal_open_T, CheckoutConfirmAddressModal_close_T>
	readonly close:Modal_I_close_T<CheckoutConfirmAddressModal_close_T>
}
