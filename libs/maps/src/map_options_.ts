import { assign } from '@ctx-core/object'
import { DEFAULT_LAT, DEFAULT_LNG } from '@menus/web-config'
export function map_options_(
	in_map_options?:google.maps.MapOptions
):google.maps.MapOptions {
	return assign({
		draggable: true,
		streetViewControl: false,
		zoom: 12,
		center: {
			lat: DEFAULT_LAT,
			lng: DEFAULT_LNG,
		},
		disableDoubleClickZoom: false,
		mapTypeId:
			(typeof google !== 'undefined' && google)
			? google.maps.MapTypeId.ROADMAP
			: 'roadmap',
		mapTypeControl: false,
		clickableIcons: false,
		disableDefaultUI: true,
		scrollwheel: true,
		styles: [
			{
				featureType: 'water',
				elementType: 'geometry',
				stylers: [
					{
						color: '#e9e9e9'
					},
					{
						lightness: 17
					}
				]
			},
			{
				featureType: 'landscape',
				elementType: 'geometry',
				stylers: [
					{
						color: '#f5f5f5'
					},
					{
						lightness: 20
					}
				]
			},
			{
				featureType: 'road.highway',
				elementType: 'geometry.fill',
				stylers: [
					{
						color: '#ffffff'
					},
					{
						lightness: 17
					}
				]
			},
			{
				featureType: 'road.highway',
				elementType: 'geometry.stroke',
				stylers: [
					{
						color: '#ffffff'
					},
					{
						lightness: 29
					},
					{
						weight: 0.2
					}
				]
			},
			{
				featureType: 'road.arterial',
				elementType: 'geometry',
				stylers: [
					{
						color: '#ffffff'
					},
					{
						lightness: 18
					}
				]
			},
			{
				featureType: 'road.local',
				elementType: 'geometry',
				stylers: [
					{
						color: '#ffffff'
					},
					{
						lightness: 16
					}
				]
			},
			{
				featureType: 'poi',
				elementType: 'geometry',
				stylers: [
					{
						color: '#f5f5f5'
					},
					{
						lightness: 21
					}
				]
			},
			{
				featureType: 'poi.park',
				elementType: 'geometry',
				stylers: [
					{
						color: '#dedede'
					},
					{
						lightness: 21
					}
				]
			},
			{
				elementType: 'labels.text.stroke',
				stylers: [
					{
						visibility: 'on'
					},
					{
						color: '#ffffff'
					},
					{
						lightness: 16
					}
				]
			},
			{
				elementType: 'labels.text.fill',
				stylers: [
					{
						saturation: 36
					},
					{
						color: '#333333'
					},
					{
						lightness: 40
					}
				]
			},
			{
				elementType: 'labels.icon',
				stylers: [
					{
						visibility: 'off'
					}
				]
			},
			{
				featureType: 'transit',
				elementType: 'geometry',
				stylers: [
					{
						color: '#f2f2f2'
					},
					{
						lightness: 19
					}
				]
			},
			{
				featureType: 'administrative',
				elementType: 'geometry.fill',
				stylers: [
					{
						color: '#fefefe'
					},
					{
						lightness: 20
					}
				]
			},
			{
				featureType: 'administrative',
				elementType: 'geometry.stroke',
				stylers: [
					{
						color: '#fefefe'
					},
					{
						lightness: 17
					},
					{
						weight: 1.2
					}
				]
			}
		]
	}, in_map_options) as google.maps.MapOptions
}
