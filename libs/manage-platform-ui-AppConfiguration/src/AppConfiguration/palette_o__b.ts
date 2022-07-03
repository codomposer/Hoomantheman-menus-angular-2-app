import type { ImageSource } from '@vibrant/image'
import type { Palette } from '@vibrant/color'
import { Be, be_ } from '@ctx-core/object'
import { I } from '@ctx-core/combinators'
import { subscribe_wait_timeout } from '@ctx-core/store'
import { vibrant_loaded$_b } from '@menus/vibrant'
import { timeout_ms } from '@menus/web-config'
import type { manage_platform_ui_AppConfiguration_Ctx } from '../manage_platform_ui_AppConfiguration_Ctx.js'
import { image_color_T } from './image_color_T.js'
import { rgb_T } from './rgb_T.js'
const key = 'palette_o_'
export const palette_o__b:Be<manage_platform_ui_AppConfiguration_Ctx, typeof key> = be_(key, ctx=>{
	const vibrant_loaded = vibrant_loaded$_b(ctx)
	return palette_o_ as palette_o__T
	async function palette_o_(src:ImageSource) {
		await subscribe_wait_timeout(vibrant_loaded, I, timeout_ms)
		const palette = await window.Vibrant.from(src).getPalette()
		const image_color_a = [] as image_color_T[]
		for (const key in palette) {
			if (!palette.hasOwnProperty(key)) continue
			const item = palette[key]
			let rgb:rgb_T =
				item
				? { r: Math.round(item.r), g: Math.round(item.g), b: Math.round(item.b) }
				: null
			image_color_a.push({
				name: key,
				rgb,
			} as image_color_T)
		}
		return {
			palette,
			image_color_a,
		} as palette_o_T
	}
})
export interface palette_o_T {
	palette:Palette
	image_color_a:image_color_T[]
}
export type palette_o__T = (src:ImageSource)=>Promise<palette_o_T>
