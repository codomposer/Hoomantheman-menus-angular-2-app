import { errors_2, validation_args_object_T, validation_args_T } from './errors_2.js'
export function validation(node:validation_node_T, validation_args:validation_args_T):validation_ret_T {
	let errors:validation_errors_T
	let errors_, blank_value = null
	node.addEventListener('input', oninput)
	node.addEventListener('change', onchange)
	node.addEventListener('focus', onfocus)
	node.addEventListener('blur', onblur)
	node.addEventListener('update_errors', onupdate_errors)
	if (node.dataset.validation_status || !(validation_args as validation_args_object_T).noinit) {
		setTimeout(()=>update(validation_args))
	}
	if (!node.dataset.validation_status) {
		node.dataset.validation_status = 'active'
	}
	return {
		update,
		destroy() {
			delete node.dataset.validation_status
			node.removeEventListener('input', oninput)
			node.removeEventListener('change', onchange)
			node.removeEventListener('focus', onfocus)
			node.removeEventListener('blur', onblur)
			node.removeEventListener('update_errors', onupdate_errors)
		},
	}
	function update(update_validation_args:validation_args_T):void {
		validation_args = update_validation_args
		errors_ = errors_2(validation_args)
		update_errors()
	}
	function onchange(evt:InputEvent) {
		blank_value = ''
		oninput(evt)
	}
	function oninput(_evt:InputEvent) {
		update_errors()
	}
	function onupdate_errors(_evt:CustomEvent) {
		update_errors()
	}
	function onfocus(_evt:MouseEvent) {
		const { validationMessages } = (validation_args as validation_args_object_T)
		if (validationMessages) {
			validationMessages.$set({ focus: true })
		}
	}
	function onblur(_evt:MouseEvent) {
		const { validationMessages } = (validation_args as validation_args_object_T)
		if (validationMessages) {
			validationMessages.$set({ focus: false })
		}
	}
	function update_errors() {
		if (!errors_) {
			update(validation_args)
			return
		}
		const value =
			('value' in node && node.value === '')
			? blank_value
			: (node as value_validation_node_T).value
		errors = errors_(value)
		const { validationMessages } = (validation_args as validation_args_object_T)
		if (validationMessages) {
			validationMessages.$set({ errors })
		}
		dispatchEvent_errors()
	}
	function dispatchEvent_errors() {
		node.dispatchEvent(
			new CustomEvent<validation_errors_event_T>(
				'errors',
				{ detail: errors }
			)
		)
	}
}
export interface validation_ret_T {
	update(update_validation_args:validation_args_T):void
	destroy():void
}
export type value_validation_node_T = HTMLInputElement|HTMLSelectElement
export type validation_node_T = value_validation_node_T|HTMLElement
export type validation_errors_T = string[]|string
export type validation_T = ((val:any, label?:string)=>validation_errors_T)|validation_errors_T
export type validation_errors_event_T = validation_errors_T
