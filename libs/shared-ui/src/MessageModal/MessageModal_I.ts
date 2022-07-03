import type { Modal_I } from '@menus/modal'
import type { ConfirmModal_open_data_I } from '@menus/shared-ui-lib'
export interface MessageModal_I
	extends Modal_I<MessageModal_open_T, MessageModal_close_T> {
}
export type MessageModal_open_T = Partial<ConfirmModal_open_data_I>
export type MessageModal_close_T = boolean
