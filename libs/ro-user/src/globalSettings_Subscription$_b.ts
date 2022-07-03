import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import type { Subscription } from '@menus/ro-user-common'
import { globalSettings$_b } from './globalSettings$_b.js'
import type { ro_user_Ctx } from './ro_user_Ctx.js'
const key = 'globalSettings_Subscription$'
export const globalSettings_Subscription$_b:B<ro_user_Ctx, typeof key> = be_(key, (ctx)=>{
	const globalSettings$ = globalSettings$_b(ctx)
	return derived$(globalSettings$, globalSettings=>
		globalSettings?.Subscription
	)
})
export type globalSettings_Subscription$_T = Readable$<Subscription[]>
