import type { date_Ctx } from '@menus/date'
import type { dom_Ctx } from '@menus/dom'
import type { modal_Ctx } from '@menus/modal'
import type { notyf_Ctx } from '@menus/notyf'
import type { ui_Ctx } from '@menus/ui'
import type { OrderStatusHistoryModal_c } from './OrderStatusHistoryModal/OrderStatusHistoryModal_c.js'
import { ro_orders_ui_ctx_I } from './ro_orders_ui_ctx_I.generated.js'
export interface ro_orders_ui_Ctx extends ro_orders_ui_ctx_I, dom_Ctx, ui_Ctx, notyf_Ctx, date_Ctx, modal_Ctx {
	OrderStatusHistoryModal_c?:OrderStatusHistoryModal_c
}
