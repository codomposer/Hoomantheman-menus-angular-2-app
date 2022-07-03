import { assign, B, be_ } from '@ctx-core/object'
import { Writable$, writable$ } from '@ctx-core/store'
import type { ModalState } from './ModalState.js'
import type { modal_Ctx } from './modal_Ctx.js'
const key = 'onchange_modal_state'
export const onchange_modal_state_b:B<modal_Ctx, typeof key> = be_(key, ()=>{
	function emit_onchange_modal_state(data:onchange_modal_state_data_T) {
		onchange_modal_state.set(data)
	}
	const onchange_modal_state = writable$<onchange_modal_state_data_T>(null)
	return assign(onchange_modal_state, {
		emit_onchange_modal_state,
	}) as onchange_modal_state_T
})
export interface onchange_modal_state_data_T {
	state:ModalState,
}
export type emit_onchange_modal_state_T = (data:onchange_modal_state_data_T)=>void
export interface onchange_modal_state_T extends Writable$<onchange_modal_state_data_T> {
	emit_onchange_modal_state:emit_onchange_modal_state_T
}
