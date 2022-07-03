import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { isPlatform_ } from '@menus/platform-settings'
import { manage_platform_settings$_b } from './manage_platform_settings$_b.js'
import type { manage_platform_ui_Ctx } from './manage_platform_ui_Ctx.js'
const key = 'manage_platform_isPlatform$'
export const manage_platform_isPlatform$_b:B<manage_platform_ui_Ctx, typeof key> = be_(key, function (ctx) {
	const manage_platform_settings$ = manage_platform_settings$_b(ctx)
	return derived$(manage_platform_settings$, isPlatform_) as manage_platform_isPlatform$_T
})
export type manage_platform_isPlatform$_T = Readable$<boolean>
