import { B, be_ } from '@ctx-core/object'
import { tup } from '@ctx-core/array'
import { derived$, Readable$ } from '@ctx-core/store'
import { APP_VERSION$_b } from './APP_VERSION$_b.js'
import { initial_APP_VERSION$_b } from './initial_APP_VERSION$_b.js'
import type { version_refresh_ui_Ctx } from './version_refresh_ui_Ctx.js'
const key = 'APP_VERSION_dirty$'
export const APP_VERSION_dirty$_b:B<version_refresh_ui_Ctx, typeof key> = be_(key, ctx=>{
	const APP_VERSION$ = APP_VERSION$_b(ctx)
	const initial_APP_VERSION$ = initial_APP_VERSION$_b(ctx)
	return derived$(tup(APP_VERSION$, initial_APP_VERSION$),
		([APP_VERSION, initial_APP_VERSION])=>
			initial_APP_VERSION != null
			&& APP_VERSION != null
			&& initial_APP_VERSION !== APP_VERSION
	) as APP_VERSION_dirty$_T
})
export type APP_VERSION_dirty$_T = Readable$<boolean>
