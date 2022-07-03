import { assign } from '@ctx-core/object'
import { I } from '@ctx-core/combinators'
import { subscribe_wait_timeout, Writable$, writable$ } from '@ctx-core/store'
import { BaseModalController } from '@menus/modal'
import { deep_clone, log } from '@menus/util'
import { RoRequestQuery, ro_httpClient_b, API_ORDERS_route_payload_T, API_ORDERS_route_b } from '@menus/ro-http'
import { DEFAULT_MAP_OPTIONS } from '@menus/maps'
import { init_google_maps_promise_b } from '@menus/app'
import { refresh_writable_ } from '@menus/store'
import { timeout_ms } from '@menus/web-config'
import type { ro_restaurant_ui_Ctx } from '../ro_restaurant_ui_Ctx.js'
import type {
	MapCustomerRouteModal_close_T, MapCustomerRouteModal_open_T, MapCustomerRouteModal_I
} from './MapCustomerRouteModal_I'
const Controller_name = 'MapCustomerRouteModal_c.js'
export class MapCustomerRouteModal_c
	extends BaseModalController<MapCustomerRouteModal_open_T, MapCustomerRouteModal_close_T, ro_restaurant_ui_Ctx>
	implements MapCustomerRouteModal_I {
	orderID:number
	fireFlyID:string
	ro_httpClient = ro_httpClient_b(this.ctx)
	user_LatLngLiteral:google.maps.LatLngLiteral = null
	rest_LatLngLiteral:google.maps.LatLngLiteral = null
	map:google.maps.Map = null
	readonly API_ORDERS_route = API_ORDERS_route_b(this.ctx)
	readonly init_google_maps_promise = init_google_maps_promise_b(this.ctx)
	readonly busy$ = writable$<boolean>(false)
	readonly customer_route_map$:Writable$<HTMLDivElement> = writable$(null)
	readonly route$ = refresh_writable_<Route>(null)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly before_open_modal = async (data:MapCustomerRouteModal_open_T)=>{
		this.orderID = data.orderID
		this.fireFlyID = data.fireFlyID
		setTimeout(this.load_data)
	}
	readonly load_data = async ()=>{
		log(this.ctx, Controller_name, 'load_data()')
		this.busy$.$ = true
		const requestData = new RoRequestQuery()
		RoRequestQuery.fill_fireFlyID(requestData, this.fireFlyID)
		RoRequestQuery.fill_OrderID(requestData, this.orderID)
		const payload = await this.API_ORDERS_route(requestData)
		const route = _$route({ details: payload })
		this.route$.$ = route
		await this.init_google_maps_promise
		this.user_LatLngLiteral = {
			lat: parseFloat(route.details.Customer_Latitude),
			lng: parseFloat(route.details.Customer_Longitude)
		}
		this.rest_LatLngLiteral = {
			lat: parseFloat(route.details.Restaurant_Latitude),
			lng: parseFloat(route.details.Restaurant_Longitude)
		}
		const mapOptions = deep_clone(DEFAULT_MAP_OPTIONS)
		mapOptions.center = this.user_LatLngLiteral
		await subscribe_wait_timeout(this.customer_route_map$, I, timeout_ms)
		this.map = new google.maps.Map(this.customer_route_map$.$, mapOptions)
		// Customer Marker
		new google.maps.Marker({
			position: this.user_LatLngLiteral,
			map: this.map,
			icon: '/assets/img/ro/customer-map.svg',
		})
		// Rest Marker
		new google.maps.Marker({
			position: this.rest_LatLngLiteral,
			map: this.map,
			icon: '/assets/img/ro/restaurant-map.svg',
		})
		google.maps.event.addListenerOnce(this.map, 'idle', ()=>{
			const directionsService = new google.maps.DirectionsService()
			const directionsDisplay = new google.maps.DirectionsRenderer({
				suppressMarkers: true,
				polylineOptions: {
					strokeColor: '#39CE7B'
				},
			})
			const request = {
				origin: this.user_LatLngLiteral,
				destination: this.rest_LatLngLiteral,
				travelMode: google.maps.TravelMode.DRIVING,
			}
			directionsService.route(request, (response, status)=>{
				if (status === google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response)
					const point = response.routes[0].legs[0]
					this.route$.refresh({
						distance: point.distance.text,
						duration: point.duration.text,
					})
					this.busy$.$ = false
					log(this.ctx, Controller_name, 'directionsDisplay() => route', response)
				}
			})
			directionsDisplay.setMap(this.map)
		})
		log(this.ctx, Controller_name, 'API_ORDERS_route', payload)
	}
}
function _$route(attributes = {}) {
	return assign({
		details: {} as API_ORDERS_route_payload_T,
		distance: 0,
		duration: 0,
	}, attributes) as Route
}
interface Route {
	details:API_ORDERS_route_payload_T,
	distance:number|string,
	duration:number|string,
}
