import { B, be_ } from '@ctx-core/object'
import type { Writable$ } from '@ctx-core/store'
import { idb_writable_ } from '@menus/idb'
import type { consumer_shopping_cart_Ctx } from './consumer_shopping_cart_Ctx.js'
const key = 'deliveryNotes$'
export const deliveryNotes$_b:B<consumer_shopping_cart_Ctx, typeof key> = be_(key, ()=>
	idb_writable_<string>('deliveryNotes', (deliveryNotes?)=>
		deliveryNotes == null ? '' : deliveryNotes
	) as deliveryNotes$_T
)
export type deliveryNotes$_T = Writable$<string>
