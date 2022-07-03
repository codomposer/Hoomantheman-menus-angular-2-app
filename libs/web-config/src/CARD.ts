export const CARD_MONTHS:CARD_MONTH_T[] = []
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
for (let i = 0; i < monthNames.length; i++) {
	CARD_MONTHS.push({
		label: monthNames[i],
		value: i + 1,
	})
}
const currentYear = (new Date()).getFullYear()
export const CARD_YEARS:CARD_YEAR_T[] = []
for (let i = 0; i <= 10; i++) {
	const year = currentYear + i
	CARD_YEARS.push({
		label: year,
		value: `${year}`.substr(2),
	})
}
export const CARD_TYPE_CLASS = {
	MasterCard: 'mastercard',
	Visa: 'visa',
	Discover: 'discover',
	'American Express': 'amex',
}
export interface CARD_MONTH_T {
	label:string
	value:number
}
export interface CARD_YEAR_T {
	label:number
	value:string
}
