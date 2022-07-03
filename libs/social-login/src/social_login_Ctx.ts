import type { consumer_user_common_Ctx } from '@menus/consumer-user-common'
import type { social_login_data$_T } from './social_login_data$_b.js'
import type { social_login_data_provider$_T } from './social_login_data_provider$_b.js'
import type { social_login_ctx_I } from './social_login_ctx_I.generated.js'
export interface social_login_Ctx extends social_login_ctx_I,
	consumer_user_common_Ctx {
	social_login_data?:social_login_data$_T
	social_login_data_provider?:social_login_data_provider$_T
}
