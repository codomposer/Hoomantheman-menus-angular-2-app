export function getCheckboxIcon():string {
	const color = '#455A64'
	const template = '<?xml version="1.0" encoding="UTF-8"?><svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>checkbox-off</title><defs></defs><g id="UI" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="checkbox-off"><g id="Group-3"><rect id="Rectangle" x="0" y="0" width="24" height="24"></rect><path d="M19.7777778,3 C20.4542202,3 21,3.5476683 21,4.22222222 L21,19.7777778 C21,20.4523317 20.4542202,21 19.7777778,21 L4.22222222,21 C3.54577979,21 3,20.4523317 3,19.7777778 L3,4.22222222 C3,3.5476683 3.54577979,3 4.22222222,3 L19.7777778,3 Z" id="Shape" stroke="' + color + '" stroke-width="2" fill-rule="nonzero"></path></g></g></g></svg>'
	return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(template)
}
