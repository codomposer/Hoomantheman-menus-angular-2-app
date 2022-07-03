import type { event_log_Ctx } from '@ctx-core/event-log'
import type { notyf_Ctx } from '@menus/notyf'
import type { user_address_common_ctx_I } from './user_address_common_ctx_I.generated.js'
export interface user_address_common_Ctx extends user_address_common_ctx_I, event_log_Ctx, notyf_Ctx {}
