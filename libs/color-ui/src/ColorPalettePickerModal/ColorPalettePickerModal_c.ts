import { BaseModalController } from '@menus/modal'
import type { colorPalette_T } from '@menus/color'
import type {
	ColorPalettePickerModal_close_T, ColorPalettePickerModal_open_T, ColorPalettePickerModal_I
} from './ColorPalettePickerModal_I.js'
import type { color_ui_Ctx } from '../color_ui_Ctx.js'
export class ColorPalettePickerModal_c
	extends BaseModalController<ColorPalettePickerModal_open_T, ColorPalettePickerModal_close_T, color_ui_Ctx>
	implements ColorPalettePickerModal_I {
	readonly chooseColorPalette = async (colorPalette:colorPalette_T)=>{
		await this.close({ colorPalette })
	}
}
