export const increment_minutes = 15
export function sanitized_date_(in_date:Date|string|number) {
	const date = new Date(in_date)
	date.setMinutes(
		Math.ceil(date.getMinutes() / increment_minutes)
		* increment_minutes
	)
	date.setSeconds(0)
	date.setMilliseconds(0)
	return date
}
