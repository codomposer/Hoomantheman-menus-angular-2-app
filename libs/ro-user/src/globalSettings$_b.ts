import { B, be_, assign } from '@ctx-core/object'
import { readable$_set_ctx_ } from '@ctx-core/store'
import { GlobalSettings, globalSettings_ } from '@menus/ro-user-common'
import { API_GLOBAL_get_b } from '@menus/ro-http'
import { mixin_refresh, refresh_readable_T } from '@menus/store'
import type { ro_user_Ctx } from './ro_user_Ctx.js'
const key = 'globalSettings$'
export const globalSettings$_b:B<ro_user_Ctx, typeof key> = be_(key, ctx=>{
	const API_GLOBAL_get = API_GLOBAL_get_b(ctx)
	const { store: globalSettings$, set } = readable$_set_ctx_<GlobalSettings>(globalSettings_())
	reload().then()
	return assign(
		mixin_refresh(globalSettings$, set),
		{
			reload,
		}
	) as globalSettings$_T
	async function reload() {
		const globalSettings = await API_GLOBAL_get()
		set(globalSettings)
	}
})
export interface globalSettings$_T extends refresh_readable_T<GlobalSettings> {
	reload():Promise<void>
}
