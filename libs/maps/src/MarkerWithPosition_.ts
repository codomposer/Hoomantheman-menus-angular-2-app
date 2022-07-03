export function MarkerWithPosition_(opts?:google.maps.MarkerOptions) {
	return new google.maps.Marker(opts) as MarkerWithPosition_T
}
export interface MarkerWithPosition_T extends google.maps.Marker {
	position:google.maps.LatLngLiteral
}
