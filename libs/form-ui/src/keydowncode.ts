export function keydowncode(node:HTMLElement) {
	node.addEventListener('keydown', onkeydown)
	return {
		destroy() {
			node.removeEventListener('keydown', onkeydown)
		}
	}
	function onkeydown(evt:KeyboardEvent) {
		node.dispatchEvent(
			new KeyboardEvent(`keydown:${evt.code}`, evt)
		)
	}
}
