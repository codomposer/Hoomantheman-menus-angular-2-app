export function epoch_days_(date = new Date()):number {
	const time = date.getTime()
	const res = Math.abs(time - (time / 1000)) / 1000
	return Math.floor(res / 86400)
}
