import { assign } from '@ctx-core/object'
import type { MessageModal_open_data_I } from './MessageModal_open_data_I.js'
export class MessageModal_open_data_C implements MessageModal_open_data_I {
	public title = ''
	public message = ''
	public ok_text = 'Yes'
	public ok_class = 'btn-success.js'
	constructor(attrs?:Partial<MessageModal_open_data_I>) {
		assign(this, attrs)
	}
}
