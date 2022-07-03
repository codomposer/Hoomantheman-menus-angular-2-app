import type { app_initializer_Ctx } from '@menus/app'
import type { breadcrumb_Ctx } from '@menus/breadcrumb'
import type { dom_Ctx } from '@menus/dom'
import type { notyf_Ctx } from '@menus/notyf'
import type { page_Ctx } from '@menus/page'
import type { ro_layout_ui_Ctx } from '@menus/ro-layout-ui'
import type { ro_user_common_Ctx } from '@menus/ro-user-common'
import type { shared_ui_Ctx } from '@menus/shared-ui'
import type { ui_Ctx } from '@menus/ui'
import type { ro_restaurant_ui_ctx_I } from './ro_restaurant_ui_ctx_I.generated.js'
export interface ro_restaurant_ui_Ctx extends ro_restaurant_ui_ctx_I,
	app_initializer_Ctx,
	breadcrumb_Ctx,
	dom_Ctx,
	page_Ctx,
	notyf_Ctx,
	ro_layout_ui_Ctx,
	ro_user_common_Ctx,
	shared_ui_Ctx,
	ui_Ctx {}
