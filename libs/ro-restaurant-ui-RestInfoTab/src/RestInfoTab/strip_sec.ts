export function strip_sec(time_str:string) {
	return time_str.split(':').slice(0, 2).join(':')
}
