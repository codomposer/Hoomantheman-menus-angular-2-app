import { round } from '@ctx-core/number'
export function rounding(node:HTMLElement, precision = 2) {
	node.addEventListener('input', oninput)
	node.addEventListener('change', oninput)
	return {
		destroy() {
			node.removeEventListener('input', oninput)
			node.removeEventListener('change', oninput)
		}
	}
	function oninput(evt:InputEvent) {
		const target = evt.target as precision_node_T
		target.value = round(parseFloat(target.value), precision).toString()
	}
}
export type precision_node_T = HTMLInputElement
