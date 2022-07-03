export function LngLat_(this_):string {
	return (
		(this_.Longitude && this_.Latitude)
		? `${this_.Longitude},${this_.Latitude}`
		: ''
	)
}
