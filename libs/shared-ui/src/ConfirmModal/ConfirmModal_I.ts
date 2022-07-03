import type { is_modal_open$_T, Modal_I } from '@menus/modal'
import type { ConfirmModal_open_data_I } from '@menus/shared-ui-lib'
export interface ConfirmModal_I
	extends Modal_I<ConfirmModal_open_T, ConfirmModal_close_T> {
	is_modal_open$?:is_modal_open$_T
}
export type ConfirmModal_open_T = Partial<ConfirmModal_open_data_I>
export type ConfirmModal_close_T = boolean
