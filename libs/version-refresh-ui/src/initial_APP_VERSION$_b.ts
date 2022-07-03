import { B, be_ } from '@ctx-core/object'
import { has_dom } from '@ctx-core/dom'
import { I } from '@ctx-core/combinators'
import { readable$_set_ctx_, Readable$, subscribe_wait_timeout } from '@ctx-core/store'
import { APP_VERSION$_b, APP_VERSION_period } from './APP_VERSION$_b.js'
import type { version_refresh_ui_Ctx } from './version_refresh_ui_Ctx.js'
const key = 'initial_APP_VERSION$'
export const initial_APP_VERSION$_b:B<version_refresh_ui_Ctx, typeof key> = be_(key, ctx=>{
	const APP_VERSION$ = APP_VERSION$_b(ctx)
	const {
		store: initial_APP_VERSION$,
		set
	} = readable$_set_ctx_(null)
	if (has_dom) {
		init().then()
	}
	return initial_APP_VERSION$ as initial_APP_VERSION$_T
	async function init() {
		const APP_VERSION =
			await subscribe_wait_timeout(APP_VERSION$, I, 1.5 * APP_VERSION_period)
		set(APP_VERSION)
	}
})
export type initial_APP_VERSION$_T = Readable$<string>
