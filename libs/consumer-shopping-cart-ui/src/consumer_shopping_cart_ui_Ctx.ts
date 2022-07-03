import { ui_Ctx } from '@menus/ui'
import { notyf_Ctx } from '@menus/notyf'
import { date_Ctx } from '@menus/date'
import { layout_ui_Ctx } from '@menus/layout-ui'
export interface consumer_shopping_cart_ui_Ctx
	extends ui_Ctx, notyf_Ctx, date_Ctx, layout_ui_Ctx {
}
