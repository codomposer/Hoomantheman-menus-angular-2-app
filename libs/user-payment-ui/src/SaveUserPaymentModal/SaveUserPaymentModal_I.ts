import type { Modal_I } from '@menus/modal'
import type { UserPayment_I } from '@menus/user-payment'
export interface SaveUserPaymentModal_open_T {userPayment?:UserPayment_I}
export interface SaveUserPaymentModal_close_interface {
	action:string
}
export type SaveUserPaymentModal_close_T =
	SaveUserPaymentModal_open_T
	&SaveUserPaymentModal_close_interface
export interface SaveUserPaymentModal_I
	extends Modal_I<SaveUserPaymentModal_open_T, SaveUserPaymentModal_close_T> {
}
