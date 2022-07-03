import type { Palette } from '@vibrant/color'
import { B, be_, } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import type { manage_platform_ui_AppConfiguration_Ctx } from '../manage_platform_ui_AppConfiguration_Ctx.js'
import { manage_App_Icon_palette_o$_b } from './manage_App_Icon_palette_o$_b'
const key = 'manage_App_Icon_palette$'
export const manage_App_Icon_palette$_b:B<manage_platform_ui_AppConfiguration_Ctx, typeof key> = be_(key, (ctx)=>{
	const manage_App_Icon_palette_o$ = manage_App_Icon_palette_o$_b(ctx)
	return derived$(manage_App_Icon_palette_o$, manage_App_Icon_palette_o=>manage_App_Icon_palette_o?.palette)
})
export type manage_App_Icon_palette$_T = Readable$<Palette>
