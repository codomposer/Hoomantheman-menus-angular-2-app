import { Writable$, writable$ } from '@ctx-core/store'
import { BaseModalController } from '@menus/modal'
import type { Order } from '@menus/shared-order'
import type { consumer_order_ui_Ctx } from '../consumer_order_ui_Ctx.js'
import type {
	ThankYouPointsModal_close_T, ThankYouPointsModal_open_T, ThankYouPointsModal_I
} from './ThankYouPointsModal_I.js'
export class ThankYouPointsModal_c
	extends BaseModalController<ThankYouPointsModal_open_T, ThankYouPointsModal_close_T, consumer_order_ui_Ctx>
	implements ThankYouPointsModal_I {
	readonly order$:Writable$<Order> = writable$(null)
	readonly total_points$:Writable$<number> = writable$(0)
	readonly before_open_modal = async ({ order, total_points }:{ order:Order, total_points:number })=>{
		this.order$.$ = order
		this.total_points$.$ = total_points
	}
}
