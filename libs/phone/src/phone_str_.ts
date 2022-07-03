export function phone_str_(value:string):string {
	if (!value) return value
	value = value.replace('+1', '')
	return value.replace(/(\d{3})(\d{3})(\d{4})/, '($1)$2-$3')
}
