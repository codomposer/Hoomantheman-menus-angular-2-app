import { B, be_ } from '@ctx-core/object'
import { goto_b } from '@menus/ui'
import { Path } from '@menus/route'
import type { ro_restaurant_ui_Ctx } from './ro_restaurant_ui_Ctx.js'
const key = 'goto_order_edit$'
export const goto_order_edit$_b:B<ro_restaurant_ui_Ctx, typeof key> = be_(key, ctx=>{
	const goto = goto_b(ctx)
	return goto_order_edit
	async function goto_order_edit(fireFlyID, orderID) {
		await goto(`${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}/${fireFlyID}/${Path.RO.ORDER_DETAILS}/${orderID}/edit`)
	}
})
export type goto_order_edit$_T = (fireFlyID:string, orderID:number)=>void
