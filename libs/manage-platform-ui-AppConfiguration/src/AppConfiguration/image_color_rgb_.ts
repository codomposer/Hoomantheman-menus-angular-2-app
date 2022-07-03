import { image_color_T } from './image_color_T.js'
export function image_color_rgb_(image_color:image_color_T) {
	const { r, g, b } = image_color.rgb
	return `rgb(${r},${g},${b})`
}
