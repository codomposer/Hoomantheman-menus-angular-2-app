import { has_dom } from '@ctx-core/dom'
import { assign, B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { dom_Ctx } from './dom_Ctx.js'
const key = 'innerWidth$'
export const innerWidth$_b:B<dom_Ctx, typeof key> = be_(key, ()=>{
	const innerWidth$ = writable$<number>(has_dom ? window.innerWidth : null)
	if (has_dom) {
		window.addEventListener('orientationchange', refresh)
		window.addEventListener('resize', refresh)
	}
	return assign(innerWidth$, {
		refresh
	}) as innerWidth$_T
	function refresh() {
	  innerWidth$.set(window.innerWidth)
	}
})
export interface innerWidth$_T extends Writable$<number> {
	refresh():void
}
