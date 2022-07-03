export function isPhone(text:string):boolean {
	return /^[0-9\-\+]{10,10}$/.test(text)
}
