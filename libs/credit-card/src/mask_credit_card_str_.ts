export function mask_credit_card_str_(value:string):string {
	if (!value) return value
	const arr = value.split('x')
	if (arr.length > 0) {
		return `**** **** **** ${arr[arr.length - 1]}`
	} else {
		return value
	}
}
