import { run } from '@ctx-core/function'
import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { App_Splash$_b } from '@menus/platform-settings'
import type { manage_platform_ui_AppConfiguration_Ctx } from '../manage_platform_ui_AppConfiguration_Ctx.js'
import { palette_o__b, palette_o__T, palette_o_T } from './palette_o__b.js'
const key = 'manage_App_Splash_palette_o$'
export const manage_App_Splash_palette_o$_b:B<manage_platform_ui_AppConfiguration_Ctx, typeof key> = be_(key, (ctx)=>{
	const App_Splash$ = App_Splash$_b(ctx)
	const palette_o_:palette_o__T = palette_o__b(ctx)
	return derived$(App_Splash$, (App_Splash, set)=>{
		if (!App_Splash) {
			set(null)
			return
		}
		run(async()=>{
			set(await palette_o_(App_Splash))
		}).then()
	})
})
export type manage_App_Splash_palette_o$_T = Readable$<palette_o_T>
