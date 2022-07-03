import type { consumer_http_Ctx } from '@menus/consumer-http'
import type { consumer_user_common_Ctx } from '@menus/consumer-user-common'
import type { filters_common_Ctx } from '@menus/filters-common'
import type { http_Ctx } from '@menus/http'
import type { notyf_Ctx } from '@menus/notyf'
import type { load_home_data_T } from './load_home_data_b.js'
export interface home_ui_Ctx extends consumer_http_Ctx,
	consumer_user_common_Ctx,
	filters_common_Ctx,
	http_Ctx,
	notyf_Ctx {
	load_home_data?:load_home_data_T
}
