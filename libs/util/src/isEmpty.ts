export function isEmpty(value:any):boolean {
	if (typeof value === 'string') {
		value = value.trim()
		return value === ''
	} else if (typeof value === 'object' && typeof value.length !== 'undefined') {
		return value.length === 0
	} else {
		throw `isEmpty() value must be of type string or array. ${typeof value} is given`
	}
}
