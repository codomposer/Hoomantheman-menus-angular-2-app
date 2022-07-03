import { SvelteComponent } from 'svelte'
import { be_ } from '@ctx-core/object'
import { active_modal$_b } from './active_modal$_b.js'
import type { modal_Ctx } from './modal_Ctx.js'
const key = 'open_modal'
export function open_modal_b<In extends unknown = unknown, Out extends unknown = unknown>(
	ctx:modal_Ctx<In, Out>
) {
	return (be_<modal_Ctx<In, Out>, typeof key>(key, ()=>{
		const active_modal$ = active_modal$_b(ctx)
		return open_modal as open_modal_T<In, Out>
		async function open_modal(active_modal:SvelteComponent, data?:In):Promise<Out> {
			if (active_modal$.$) {
				throw 'active_modal$ already present'
			}
			active_modal$.set(active_modal)
			try {
				return await active_modal.open(data)
			} finally {
				active_modal$.set(null)
			}
		}
	}))(ctx) as open_modal_T<In, Out>
}
export type open_modal_T<In extends unknown = unknown, Out extends unknown = unknown> =
	(modal:SvelteComponent, data?:In)=>Promise<Out>
