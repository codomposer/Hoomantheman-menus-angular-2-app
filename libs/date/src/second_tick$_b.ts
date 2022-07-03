import { B, be_ } from '@ctx-core/object'
import { has_dom } from '@ctx-core/dom'
import { readable$_set_ctx_, Readable$ } from '@ctx-core/store'
import { now_ } from './now_.js'
import type { date_Ctx } from './date_Ctx.js'
const key = 'second_tick$'
export const second_tick$_b:B<date_Ctx, typeof key> = be_(key, ()=>{
	const { store: second_tick, set } = readable$_set_ctx_(now_())
	if (has_dom) {
		setInterval(()=>{
			set(now_())
		}, 1_000)
	}
	return second_tick as second_tick$_T
})
export type second_tick$_T = Readable$<Date>
