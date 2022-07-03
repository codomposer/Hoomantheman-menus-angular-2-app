import { B, be_, assign } from '@ctx-core/object'
import { readable$_set_ctx_, Readable$ } from '@ctx-core/store'
import type { StateCtx } from '@menus/address'
import { API_GLOBAL_lookupstate_b } from '@menus/ro-http'
import type { ro_address_Ctx } from './ro_address_Ctx.js'
const key = 'ro_states$'
export const ro_states$_b:B<ro_address_Ctx, typeof key> = be_(key, ctx=>{
	const API_GLOBAL_lookupstate = API_GLOBAL_lookupstate_b(ctx)
	const { store: ro_states$, set: set_ro_states } = readable$_set_ctx_<StateCtx[]>(null)
	reload().then()
	return assign(ro_states$, {
		reload,
	}) as ro_states$_T
	async function reload() {
		const ro_states = await API_GLOBAL_lookupstate()
		set_ro_states(ro_states)
	}
})
export interface ro_states$_T extends Readable$<StateCtx[]> {
	reload():Promise<void>
}
