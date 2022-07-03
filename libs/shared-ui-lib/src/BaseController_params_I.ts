import type { EventDispatcher } from '@ctx-core/svelte'
import type { ui_Ctx } from '@menus/ui'
export interface BaseController_params_I<Ctx extends ui_Ctx = ui_Ctx> {
	ctx:Ctx
	dispatch?:EventDispatcher
}
