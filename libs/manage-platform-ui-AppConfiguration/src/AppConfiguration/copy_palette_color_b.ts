import { B, be_ } from '@ctx-core/object'
import { notyf_success_b } from '@menus/notyf'
import type { manage_platform_ui_AppConfiguration_Ctx } from '../manage_platform_ui_AppConfiguration_Ctx.js'
const key = 'copy_palette_color'
export const copy_palette_color_b:B<manage_platform_ui_AppConfiguration_Ctx, typeof key> = be_(key, (ctx)=>{
	const notyf_success = notyf_success_b(ctx)
	return copy_palette_color as copy_palette_color_T
	async function copy_palette_color(color:string) {
		await navigator.clipboard.writeText(color)
		notyf_success({
			message: 'Color copied',
			duration: 3_000,
		})
	}
})
export type copy_palette_color_T = (color:string)=>Promise<void>
