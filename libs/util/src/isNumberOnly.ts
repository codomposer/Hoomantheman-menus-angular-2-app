export function isNumberOnly(text:string):boolean {
	return /^\d+$/.test(text)
}
