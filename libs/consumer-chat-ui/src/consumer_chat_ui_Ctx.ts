import type { webConfig_Ctx } from '@menus/web-config'
import type { chat_Ctx } from '@menus/chat'
import type { notyf_Ctx } from '@menus/notyf'
import type { socket_io_Ctx } from '@menus/socket.io'
export interface consumer_chat_ui_Ctx extends chat_Ctx, notyf_Ctx, socket_io_Ctx, webConfig_Ctx {}
