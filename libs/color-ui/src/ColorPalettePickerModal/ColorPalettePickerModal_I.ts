import type { Modal_I } from '@menus/modal'
import type { colorPalette_T } from '@menus/color'
export interface ColorPalettePickerModal_open_T {}
export interface ColorPalettePickerModal_close_T {
	colorPalette:colorPalette_T
}
export interface ColorPalettePickerModal_I
	extends Modal_I<ColorPalettePickerModal_open_T, ColorPalettePickerModal_close_T> {}
