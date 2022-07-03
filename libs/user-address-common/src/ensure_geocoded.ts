import type { Geocoded } from './Geocoded.js'
export async function ensure_geocoded(
	geocoded:Geocoded
):Promise<null|google.maps.places.PlaceResult> {
	const place_result = geocoded as google.maps.places.PlaceResult
	if (place_result.geometry) {
		return place_result
	}
	const geocoder = new google.maps.Geocoder()
	return new Promise(resolve=>{
		geocoder.geocode(
			{
				address: geocoded.name
			},
			async results=>{
				const geocoded = results[0]
				if (geocoded?.geometry) {
					resolve(geocoded)
				} else {
					resolve(null)
				}
			})
	})
}
