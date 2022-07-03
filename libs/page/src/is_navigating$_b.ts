import { assign, B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { page_Ctx } from './page_Ctx.js'
import { promise_timeout } from '@ctx-core/function'
const key = 'is_navigating$'
export const is_navigating$_b:B<page_Ctx, typeof key> = be_(key, ()=>{
	const is_navigating$ = writable$(false) as is_navigating$_T
	return assign(is_navigating$, {
		start,
	})
	async function start<T>(fn:()=>Promise<T>, timeout = 3000) {
		is_navigating$.$ = true
	  try {
			return await promise_timeout<T>(fn, timeout)
		} catch (err) {
			console.trace(err)
		} finally {
			is_navigating$.$ = false
		}
	}
})
export interface is_navigating$_T extends Writable$<boolean> {
	start<T>(fn:()=>T, timeout?:number):Promise<T>
}
