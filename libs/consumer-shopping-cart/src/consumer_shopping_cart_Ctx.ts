import type { filters_common_Ctx } from '@menus/filters-common'
import type { service_type_Ctx } from '@menus/service-type'
import type { notyf_Ctx } from '@menus/notyf'
import type { shopping_cart_Ctx } from '@menus/shopping-cart'
import type { consumer_shopping_cart_ctx_I } from './consumer_shopping_cart_ctx_I.generated.js'
export interface consumer_shopping_cart_Ctx extends consumer_shopping_cart_ctx_I,
	service_type_Ctx, shopping_cart_Ctx, notyf_Ctx, filters_common_Ctx {
}
