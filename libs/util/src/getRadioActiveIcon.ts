export function getRadioActiveIcon(color:string):string {
	if (!color) color = '#39CE7B'
	const template = `<?xml version="1.0" encoding="UTF-8"?><svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>radio-on</title><defs></defs><g id="UI" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="radio-on"><g id="Group-3"><rect id="Rectangle" x="0" y="0" width="24" height="24"></rect><g id="Group" transform="translate(2.000000, 2.000000)"><circle id="Oval" fill="${color}" cx="10" cy="10" r="5"></circle><circle id="Oval-Copy" stroke="${color}" stroke-width="1.66666667" cx="10" cy="10" r="9.16666667"></circle></g></g></g></g></svg>`
	return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(template)}`
}
