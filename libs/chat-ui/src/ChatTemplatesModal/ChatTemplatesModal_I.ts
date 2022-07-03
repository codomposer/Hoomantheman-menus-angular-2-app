import type { Modal_I } from '@menus/modal'
import type { MessageTemplate } from '@menus/chat'
export interface ChatTemplatesModal_open_T {
	messageTemplates:MessageTemplate[]
}
export interface ChatTemplatesModal_close_T {
	messageTemplate:MessageTemplate
}
export interface ChatTemplatesModal_I
	extends Modal_I<ChatTemplatesModal_open_T, ChatTemplatesModal_close_T> {}
