export function is_between_UTC_time(openingTime, closingTime) {
	let is_between = false
	const now = new Date()
	const currentUtcTime = `${now.getUTCHours()}:${now.getUTCMinutes()}:${now.getUTCSeconds()}`
	// When Opening Time < Closing Time
	if (openingTime < closingTime && currentUtcTime >= openingTime && currentUtcTime <= closingTime) {
		is_between = true
	}
	// When Opening Time > Closing Time
	else if (
		openingTime > closingTime
		&& (
			(currentUtcTime >= openingTime && currentUtcTime <= '23:59:59')
			|| (currentUtcTime >= '00:00:00' && currentUtcTime <= closingTime)
		)
	) {
		is_between = true
	}
	return is_between
}
