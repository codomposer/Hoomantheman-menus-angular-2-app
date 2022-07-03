import type { ui_Ctx } from '@menus/ui'
import type { notyf_Ctx } from '@menus/notyf'
import type { dom_Ctx } from '@menus/dom'
import type { modal_Ctx } from '@menus/modal'
export interface checkout_ui_Ctx
	extends ui_Ctx, modal_Ctx, notyf_Ctx, dom_Ctx {
}
