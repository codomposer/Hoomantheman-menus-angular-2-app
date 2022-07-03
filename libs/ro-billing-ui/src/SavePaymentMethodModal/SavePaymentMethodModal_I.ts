import type { Modal_I } from '@menus/modal'
import type { PaymentMethod_I } from '@menus/ro-shared-models'
export interface SavePaymentMethodModal_open_T {
	paymentMethod:PaymentMethod_I
}
export interface SavePaymentMethodModal_close_T {
	action:string
	paymentMethod:PaymentMethod_I
}
export interface SavePaymentMethodModal_I
	extends Modal_I<SavePaymentMethodModal_open_T, SavePaymentMethodModal_close_T> {}
