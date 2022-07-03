export function unslug(value:string):string {
	// Replace `-` with space
	return value.replace(/\-+/g, ' ').toLowerCase()
}
