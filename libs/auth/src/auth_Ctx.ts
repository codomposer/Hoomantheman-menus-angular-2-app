import type { ui_Ctx } from '@menus/ui'
import type { sapper_Ctx } from '@ctx-core/sapper'
import { auth_ctx_I } from './auth_ctx_I.generated.js'
export interface auth_Ctx
	extends auth_ctx_I, sapper_Ctx, ui_Ctx {
}
