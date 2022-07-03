import { B, be_ } from '@ctx-core/object'
import { Writable$, writable$ } from '@ctx-core/store'
import type { API_PLATFORM_companies_payload_T } from '@menus/ro-http'
import { API_PLATFORM_companies_b, RoRequestQuery } from '@menus/ro-http'
import { ro_login_user$_b } from '@menus/ro-user-common'
import type { manage_platform_ui_Ctx } from './manage_platform_ui_Ctx.js'
const key = 'platform_companies$'
export const platform_companies$_b:B<manage_platform_ui_Ctx, typeof key> = be_(key, ctx=>{
	const API_PLATFORM_companies = API_PLATFORM_companies_b(ctx)
	const ro_login_user$ = ro_login_user$_b(ctx)
	const platform_companies$ = writable$(undefined) as platform_companies$_T
	ro_login_user$.subscribe(async (ro_login_user)=>{
		if (ro_login_user) {
			await load()
		} else {
			platform_companies$.set(undefined)
		}
	})
	return platform_companies$
	async function load() {
		// https://dev.api.menu.com/APIOwner/a/t.aspx?key=API_TEST_KEY&authcode=HOP65043566993153A1FEE2340FFA9C006E5924D9679&qt=companies&uid=161
		const platform_companies = await API_PLATFORM_companies(new RoRequestQuery())
		platform_companies$.$ = platform_companies
	}
})
export type platform_companies$_T = Writable$<API_PLATFORM_companies_payload_T>
