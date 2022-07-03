import type { notyf_Ctx } from '@menus/notyf'
import type { consumer_user_common_Ctx } from '@menus/consumer-user-common'
import type { consumer_http_Ctx } from '@menus/consumer-http'
import type { search_menu_common_Ctx } from '@menus/search-menu-common'
import type { consumer_user_address_ctx_I } from './consumer_user_address_ctx_I.generated.js'
export interface consumer_user_address_Ctx extends consumer_user_address_ctx_I,
	notyf_Ctx, consumer_http_Ctx, consumer_user_common_Ctx, search_menu_common_Ctx {
}
