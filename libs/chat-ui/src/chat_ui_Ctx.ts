import { ui_Ctx } from '@menus/ui'
import { notyf_Ctx } from '@menus/notyf'
import { socket_io_Ctx } from '@menus/socket.io'
export interface chat_ui_Ctx
	extends ui_Ctx, notyf_Ctx, socket_io_Ctx {
}
