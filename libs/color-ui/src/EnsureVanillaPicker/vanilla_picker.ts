import type Picker from 'vanilla-picker'
import type { vanilla_picker_color_T } from './vanilla_picker_color_T.js'
export function vanilla_picker(node:HTMLInputElement, color:string) {
	let VanillaPicker = null
	let picker:Picker
	let vanilla_picker_color:vanilla_picker_color_T
	node.addEventListener('focus', onfocus)
	return {
		update,
		destroy() {
			node.removeEventListener('focus', onfocus)
		}
	}
	function update(color_) {
		color = color_
		picker?.setColor(color, false)
	}
	async function onfocus(_evt:FocusEvent) {
		if(!VanillaPicker) {
			VanillaPicker = (await import('vanilla-picker')).default
		}

		if (!picker) {
			picker = new VanillaPicker({
				parent: node.parentElement,
				alpha: false,
				color,
				popup: 'bottom',
				onChange,
				onDone,
			})
		}
		picker.show()
	}
	function onChange(vanilla_picker_color_:vanilla_picker_color_T) {
		vanilla_picker_color = vanilla_picker_color_
		node.dispatchEvent(
			new CustomEvent<vanilla_picker_color_T>(
				'color', { detail: vanilla_picker_color })
		)
	}
	function onDone(_vanilla_picker_color:vanilla_picker_color_T) {
		picker?.destroy()
		picker = null
	}
}
declare global {
	interface Window {
		Picker:typeof Picker
	}
}
