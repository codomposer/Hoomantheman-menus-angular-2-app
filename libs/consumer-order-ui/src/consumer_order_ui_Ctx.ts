import type { ui_Ctx } from '@menus/ui'
import type { notyf_Ctx } from '@menus/notyf'
import type { socket_io_Ctx } from '@menus/socket.io'
import type { modal_Ctx } from '@menus/modal'
export interface consumer_order_ui_Ctx
	extends ui_Ctx, modal_Ctx, notyf_Ctx, socket_io_Ctx {
}
