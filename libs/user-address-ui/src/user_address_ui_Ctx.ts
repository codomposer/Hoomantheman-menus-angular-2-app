import type { modal_Ctx } from '@menus/modal'
import type { app_initializer_Ctx } from '@menus/app'
import type { notyf_Ctx } from '@menus/notyf'
import type { dom_Ctx } from '@menus/dom'
import type { shared_ui_Ctx } from '@menus/shared-ui'
import type { user_address_ui_ctx_I } from './user_address_ui_ctx_I.generated.js'
export interface user_address_ui_Ctx extends user_address_ui_ctx_I,
	modal_Ctx,
	app_initializer_Ctx,
	dom_Ctx,
	notyf_Ctx,
	shared_ui_Ctx {
}
