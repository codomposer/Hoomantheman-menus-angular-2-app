import { writable$, Writable$ } from '@ctx-core/store'
import type { MessageTemplate } from '@menus/chat'
import { BaseModalController } from '@menus/modal'
import type { chat_ui_Ctx } from '../chat_ui_Ctx.js'
import type {
	ChatTemplatesModal_close_T, ChatTemplatesModal_open_T, ChatTemplatesModal_I
} from './ChatTemplatesModal_I.js'
export class ChatTemplatesModal_c
	extends BaseModalController<ChatTemplatesModal_open_T, ChatTemplatesModal_close_T, chat_ui_Ctx>
	implements ChatTemplatesModal_I {
	readonly messageTemplates$:Writable$<MessageTemplate[]> = writable$([])
	readonly before_open_modal = async (data:ChatTemplatesModal_open_T)=>{
		this.messageTemplates$.$ = data.messageTemplates
	}
	readonly selectMessageTemplate = (messageTemplate:MessageTemplate)=>{
		this.close({ messageTemplate }).then()
	}
}
