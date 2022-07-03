import { B, be_ } from '@ctx-core/object'
import { Path } from '@menus/route'
import { goto_b } from '@menus/ui'
import type { ro_orders_Ctx } from './ro_orders_Ctx.js'
const key = 'goto_order_details'
export const goto_order_details_b:B<ro_orders_Ctx, typeof key> = be_(key, ctx=>{
	const goto = goto_b(ctx)
	return goto_order_details as goto_order_details_T
	async function goto_order_details(fireFlyID:string, orderID:number) {
		await goto(`${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}/${fireFlyID}/${Path.RO.ORDER_DETAILS}/${orderID}`)
	}
})
export type goto_order_details_T = (fireFlyID:string, orderID:number)=>void
