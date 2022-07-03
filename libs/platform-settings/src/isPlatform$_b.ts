import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { platform_settings$_b } from '@menus/http'
import { isPlatform_ } from './isPlatform_.js'
import type { platform_settings_Ctx } from './platform_settings_Ctx.js'
const key = 'isPlatform$'
export const isPlatform$_b:B<platform_settings_Ctx, typeof key> = be_(key, ctx=>{
	const platform_settings = platform_settings$_b(ctx)
	return derived$(
		platform_settings,
		platform_settings=>
			isPlatform_(platform_settings)
	) as isPlatform$_T
})
export type isPlatform$_T = Readable$<boolean>
