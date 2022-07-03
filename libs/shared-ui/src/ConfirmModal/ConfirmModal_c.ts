import { Writable$, writable$ } from '@ctx-core/store'
import { BaseModalController } from '@menus/modal'
import { ConfirmModal_open_data_C } from '@menus/shared-ui-lib'
import type { shared_ui_Ctx } from '../shared_ui_Ctx.js'
import type { ConfirmModal_close_T, ConfirmModal_open_T, ConfirmModal_I } from './ConfirmModal_I.js'
export class ConfirmModal_c
	extends BaseModalController<ConfirmModal_open_T, ConfirmModal_close_T, shared_ui_Ctx>
	implements ConfirmModal_I {
	readonly data$:Writable$<ConfirmModal_open_data_C> = writable$(null)
	readonly before_open_modal = async (data:Partial<ConfirmModal_open_data_C>)=>{
		this.data$.$ = new ConfirmModal_open_data_C(data)
	}
}
