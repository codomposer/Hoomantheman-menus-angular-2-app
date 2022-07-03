export function hasProperty(obj:any, array:string[]):boolean {
	let hasProperty = true
	for (const i in array) {
		const item = array[i]
		if (typeof obj[item] === 'undefined') {
			hasProperty = false
			break
		}
	}
	return hasProperty
}
