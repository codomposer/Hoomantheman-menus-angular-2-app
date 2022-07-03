import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import type { manage_platform_ui_AppConfiguration_Ctx } from '../manage_platform_ui_AppConfiguration_Ctx.js'
import { manage_App_Icon_palette_o$_b } from './manage_App_Icon_palette_o$_b.js'
import { image_color_T } from './image_color_T.js'
const key = 'manage_App_Icon_image_color_a$'
export const manage_App_Icon_image_color_a$_b:B<manage_platform_ui_AppConfiguration_Ctx, typeof key> = be_(key, (ctx)=>{
	const manage_App_Icon_palette_o$ = manage_App_Icon_palette_o$_b(ctx)
	return derived$(manage_App_Icon_palette_o$, manage_App_Icon_palette_o=>
		manage_App_Icon_palette_o?.image_color_a
	)
})
export type manage_App_Icon_image_color_a$_T = Readable$<image_color_T[]>
