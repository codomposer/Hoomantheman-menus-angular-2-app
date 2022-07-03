import type { user_address_ui_Ctx } from '@menus/user-address-ui'
import type { notyf_Ctx } from '@menus/notyf'
import type { restaurant_frame_Ctx } from '@menus/restaurant-frame'
import type { restaurant_ui_ctx_I } from './restaurant_ui_ctx_I.generated.js'
export interface restaurant_ui_Ctx extends restaurant_ui_ctx_I,
	notyf_Ctx, restaurant_frame_Ctx, user_address_ui_Ctx {
}
