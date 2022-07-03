import type { Modal_I } from '@menus/modal'
export type CheckoutConfirmAddressModal_open_T = void
export type CheckoutConfirmAddressModal_close_T = boolean
export interface CheckoutConfirmAddressModal_I
	extends Modal_I<CheckoutConfirmAddressModal_open_T, CheckoutConfirmAddressModal_close_T> {}
