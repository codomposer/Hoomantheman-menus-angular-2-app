import { B, be_ } from '@ctx-core/object'
import { readable$_set_ctx_, Readable$ } from '@ctx-core/store'
import { second_tick$_b } from './second_tick$_b.js'
import type { date_Ctx } from './date_Ctx.js'
const key = 'minute_tick$'
export const minute_tick$_b:B<date_Ctx, typeof key> = be_(key, ctx=>{
	const second_tick$ = second_tick$_b(ctx)
	const { store: minute_tick$, set } = readable$_set_ctx_<Date>(undefined)
	second_tick$.subscribe(second_tick=>{
		const minute_tick = minute_tick$.$
		if (
			!minute_tick
			|| (second_tick.getTime() >= (minute_tick.getTime() + 60_000))
		) {
			set(second_tick)
		}
	})
	return minute_tick$ as minute_tick$_T
})
export type minute_tick$_T = Readable$<Date>
