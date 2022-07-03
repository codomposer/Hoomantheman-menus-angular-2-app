import type { page_Ctx } from '@menus/page'
import type { event_log_Ctx } from '@ctx-core/event-log'
import type { service_type_ctx_I } from './service_type_ctx_I.generated.js'
export interface service_type_Ctx extends service_type_ctx_I, page_Ctx, event_log_Ctx {}
