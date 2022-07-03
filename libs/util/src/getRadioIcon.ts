export function getRadioIcon():string {
	const color = '#455A64'
	const template = `<?xml version="1.0" encoding="UTF-8"?><svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>radio-off</title><defs></defs><g id="UI" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="radio-off"><g id="Group-3"><rect id="Rectangle" x="0" y="0" width="24" height="24"></rect><g id="Group" transform="translate(2.000000, 2.000000)" stroke-width="2" stroke="${color}"><circle id="Oval-Copy" cx="10" cy="10" r="9"></circle></g></g></g></g></svg>`
	return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(template)
}
