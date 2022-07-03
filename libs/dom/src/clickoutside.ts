export function clickoutside(node:HTMLElement, handler:(evt:CustomEvent)=>void) {
	const event_name = is_touchScreen() ? 'touchstart' : 'click'
	document.addEventListener(event_name, handle_document_click)
	return {
		destroy() {
			document.removeEventListener(event_name, handle_document_click)
		}
	}
	function is_touchScreen() {
		return 'ontouchstart' in window
	}
	function handle_document_click(evt:CustomEvent<MouseEvent>) {
		if (evt.target !== node && !node.contains(evt.target as HTMLElement)) {
			handler(evt)
		}
	}
}
