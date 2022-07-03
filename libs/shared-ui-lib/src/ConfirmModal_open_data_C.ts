import { assign } from '@ctx-core/object'
import type { ConfirmModal_open_data_I } from './ConfirmModal_open_data_I.js'
export class ConfirmModal_open_data_C implements ConfirmModal_open_data_I {
	public title = 'Confirm'
	public message = ''
	public ok_text = 'Yes'
	public ok_class = 'btn-success'
	public cancel_text = 'No'
	public cancel_class = 'btn-danger'
	constructor(attrs?:Partial<ConfirmModal_open_data_I>) {
		assign(this, attrs)
	}
}
