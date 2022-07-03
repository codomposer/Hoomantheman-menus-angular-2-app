import type { notyf_Ctx } from '@menus/notyf'
import type { consumer_user_address_Ctx } from '@menus/consumer-user-address'
import type { app_initializer_Ctx } from '@menus/app'
import { shared_ui_ctx_I } from './shared_ui_ctx_I.generated.js'
export interface shared_ui_Ctx extends shared_ui_ctx_I, notyf_Ctx, consumer_user_address_Ctx, app_initializer_Ctx {}
