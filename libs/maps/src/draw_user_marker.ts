import { MAP_USER_ZINDEX } from '@menus/web-config'
import type { Geolocatable_I } from '@menus/geolocatable'
export function draw_user_marker(
	geolocatable:Geolocatable_I, map:google.maps.Map
):google.maps.Marker {
	const { Latitude, Longitude } = geolocatable
	return new google.maps.Marker({
		position: new google.maps.LatLng(parseFloat(Latitude as string), parseFloat(Longitude as string)),
		map,
		icon: {
			url: '/assets/img/cr/user-location.svg',
			size: new google.maps.Size(48, 48), // Height and width of icon
			origin: new google.maps.Point(0, -4), // -4px is used to nullify bottom spacing of icon
		},
		zIndex: MAP_USER_ZINDEX,
	})
}
