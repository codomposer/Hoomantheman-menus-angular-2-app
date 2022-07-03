import type { ui_Ctx } from '@menus/ui'
import type { open_modal_T } from './open_modal_b.js'
import type { modal_ctx_I } from './modal_ctx_I.generated.js'
export interface modal_Ctx<In extends unknown = unknown, Out extends unknown = unknown>
	extends modal_ctx_I, ui_Ctx {
	open_modal?:open_modal_T<In, Out>
}
