export function validity(node:validity_node_T, errors:string[]) {
	update(errors)
	return {
		update
	}
	function update(update_errors:string[]) {
		if (update_errors.length) {
			const message = update_errors.map(error=>
				error.replace(/\.?\s*$/, '')
			).join('. ')
			node.setCustomValidity(`${message}.`)
			node.reportValidity()
		} else {
			node.setCustomValidity('')
			node.reportValidity()
		}
	}
}
export type validity_node_T = HTMLObjectElement
