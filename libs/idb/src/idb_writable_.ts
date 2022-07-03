import { get as iget, set as iset, del as idel } from 'idb-keyval'
import { run } from '@ctx-core/function'
import { assign } from '@ctx-core/object'
import { has_dom } from '@ctx-core/dom'
import { noinit_subscribe, writable$, Writable$ } from '@ctx-core/store'
import { ready$_, ready$_T } from '@menus/store'
export function idb_writable_<I extends unknown = unknown>(
	ikey:string, val_:idb_writable_val__T<I> = (val:I)=>val
):idb_writable_T<I> {
	const store$ = writable$<I>(
		has_dom ? undefined : val_()
	) as idb_writable_T<I>
	const {
		store: ready$,
		set: set_ready,
	} = ready$_(!has_dom)
	const unsubscribers = []
	if (has_dom) {
		run(async ()=>{
			const current_val = store$.$
			const in_val:I = await iget(ikey)
			if (current_val === store$.$) {
				const store = val_(in_val)
				store$.$ = store
			}
			unsubscribers.push(
				noinit_subscribe(store$, store=>{
					return store ? iset(ikey, store) : idel(ikey)
				})
			)
			set_ready(true)
		}).then()
	} else {
		set_ready(true)
	}
	return assign(store$, {
		ready$,
		destroy() {
			unsubscribers.forEach(fn=>fn())
		}
	}) as idb_writable_T<I>
}
export type idb_writable_val__T<I> = (value?:I)=>I
export interface idb_T {
	ready$:ready$_T
	destroy():void
}
export interface idb_writable_T<I> extends Writable$<I>, idb_T {
}
