import { writable$, Writable$ } from '@ctx-core/store'
import { BaseModalController } from '@menus/modal'
import type { Order } from '@menus/shared-order'
import type { ro_orders_ui_Ctx } from '../ro_orders_ui_Ctx.js'
import type {
	OrderStatusHistoryModal_close_T, OrderStatusHistoryModal_open_T, OrderStatusHistoryModal_I
} from './OrderStatusHistoryModal_I'
const Controller_name = 'OrderStatusHistoryModal_c.js'
export class OrderStatusHistoryModal_c
	extends BaseModalController<OrderStatusHistoryModal_open_T, OrderStatusHistoryModal_close_T, ro_orders_ui_Ctx>
	implements OrderStatusHistoryModal_I {
	readonly order$:Writable$<Order> = writable$(null)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	before_open_modal = async ({ order }:OrderStatusHistoryModal_open_T)=>{
		this.order$.$ = order
	}
}
