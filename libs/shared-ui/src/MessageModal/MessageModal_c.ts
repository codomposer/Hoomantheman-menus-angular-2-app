import { Writable$, writable$ } from '@ctx-core/store'
import { BaseModalController } from '@menus/modal'
import { MessageModal_open_data_C } from '@menus/shared-ui-lib'
import type { shared_ui_Ctx } from '../shared_ui_Ctx.js'
import type { MessageModal_close_T, MessageModal_open_T, MessageModal_I, } from './MessageModal_I.js'
export class MessageModal_c
	extends BaseModalController<MessageModal_open_T, MessageModal_close_T, shared_ui_Ctx>
	implements MessageModal_I {
	readonly data$:Writable$<MessageModal_open_data_C> = writable$(null)
	readonly before_open_modal = async (data:Partial<MessageModal_open_data_C>)=>{
		this.data$.$ = new MessageModal_open_data_C(data)
	}
}
