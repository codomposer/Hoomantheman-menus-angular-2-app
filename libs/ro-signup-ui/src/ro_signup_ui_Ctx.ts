import type { ro_user_Ctx } from '@menus/ro-user'
import type { notyf_Ctx } from '@menus/notyf'
import type { ro_signup_ui_ctx_I } from './ro_signup_ui_ctx_I.generated.js'
export interface ro_signup_ui_Ctx extends ro_signup_ui_ctx_I, ro_user_Ctx, notyf_Ctx {
}
