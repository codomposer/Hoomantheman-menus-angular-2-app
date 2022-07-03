import type { ServerRequest, ServerResponse } from '@sveltejs/kit/types/hooks'
import type { event_log_Ctx } from '@ctx-core/event-log'
import type { Gps } from '@menus/platform-settings-lib'
import { WebConfig } from '@menus/web-config'
import { ui_ctx_I } from './ui_ctx_I.generated.js'
export interface ui_Ctx extends ui_ctx_I, event_log_Ctx {
	gps?:Gps
	gps_url:string
	webConfig:WebConfig
	request?:ServerRequest<Record<string, any>>
	response?:ServerResponse
}
