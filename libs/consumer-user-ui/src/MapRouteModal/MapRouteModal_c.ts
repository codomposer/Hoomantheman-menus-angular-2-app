import { I } from '@ctx-core/combinators'
import { subscribe_wait_timeout, Writable$, writable$ } from '@ctx-core/store'
import { init_app_promise_b } from '@menus/app'
import { Menuitem } from '@menus/consumer-menu'
import { userAddress$_b } from '@menus/consumer-user-address'
import { LatLngLiteral_ } from '@menus/geolocatable'
import { MarkerWithPosition_, DEFAULT_MAP_OPTIONS, GMapOverlayView } from '@menus/maps'
import { BaseModalController } from '@menus/modal'
import { Color_RestMapIcon$_b } from '@menus/platform-settings'
import { fork_map_icon_ } from '@menus/shared-ui-lib'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import { deep_clone, log } from '@menus/util'
import { timeout_ms } from '@menus/web-config'
import type { consumer_user_ui_Ctx } from '../consumer_user_ui_Ctx.js'
import type { MapRouteModal_I, MapRouteModal_close_T, MapRouteModal_open_T } from './MapRouteModal_I.js'
const Controller_name = 'MapRouteModal_c.js'
export class MapRouteModal_c
	extends BaseModalController<MapRouteModal_open_T, MapRouteModal_close_T, consumer_user_ui_Ctx>
	implements MapRouteModal_I {
	customerOverlay:GMapOverlayView
	restOverlay:GMapOverlayView
	readonly Color_RestMapIcon$ = Color_RestMapIcon$_b(this.ctx)
	readonly init_app_promise = init_app_promise_b(this.ctx)
	readonly userAddress$ = userAddress$_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly customer_overlay_div$:Writable$<HTMLDivElement> = writable$(null)
	readonly customer_route_map_div$:Writable$<HTMLDivElement> = writable$(null)
	readonly restaurant$:Writable$<Menuitem> = writable$(null)
	readonly rest_overlay_div$:Writable$<HTMLDivElement> = writable$(null)
	readonly route$:refresh_writable_T<Route> = refresh_writable_({
		distance: '',
		duration: '',
	})
	get user_LatLngLiteral() {return LatLngLiteral_(this.userAddress$.$)}
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.customerOverlay) {
			this.customerOverlay.onDestroy()
		}
		if (this.restOverlay) {
			this.restOverlay.onDestroy()
		}
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly before_open_modal = async (data:MapRouteModal_open_T)=>{
		this.restaurant$.$ = new Menuitem(data.restaurant)
		this.busy$.$ = true
		this.init_map().then()
	}
	readonly init_map = async ()=>{
		log(this.ctx, Controller_name, 'init_map()')
		await this.init_app_promise
		await subscribe_wait_timeout(this.customer_route_map_div$, I, timeout_ms)
		await subscribe_wait_timeout(this.customer_overlay_div$, I, timeout_ms)
		const Color_RestMapIcon = await subscribe_wait_timeout(this.Color_RestMapIcon$, I, timeout_ms)
		const restaurant_LatLngLiteral = this.restaurant$.$.LatLngLiteral
		const mapOptions = deep_clone(DEFAULT_MAP_OPTIONS)
		mapOptions.center = this.user_LatLngLiteral
		mapOptions.zoomControl = true
		const map = new google.maps.Map(this.customer_route_map_div$.$, mapOptions)
		// Customer Marker
		const customerMarker = MarkerWithPosition_({
			position: this.user_LatLngLiteral,
			map
		})
		this.customerOverlay = new GMapOverlayView(
			this.customer_overlay_div$.$,
			map,
			null,
			{
				marginBottom: 41,
			})
		this.customerOverlay.open(customerMarker.position, null)
		// Rest Marker
		const restMarker = MarkerWithPosition_({
			position: restaurant_LatLngLiteral,
			map,
			icon: {
				url: fork_map_icon_(Color_RestMapIcon),
			},
		})
		this.restOverlay = new GMapOverlayView(
			this.rest_overlay_div$.$,
			map,
			null,
			{
				marginBottom: 45,
			})
		this.restOverlay.open(restMarker.position, null)
		log(this.ctx, Controller_name, 'InfoWindow')
		google.maps.event.addListenerOnce(map, 'idle', ()=>{
			const directions_service = new google.maps.DirectionsService()
			const directions_display = new google.maps.DirectionsRenderer({
				suppressMarkers: true,
				polylineOptions: {
					strokeColor: '#39CE7B'
				}
			})
			const request = {
				origin: this.user_LatLngLiteral,
				destination: restaurant_LatLngLiteral,
				travelMode: google.maps.TravelMode.DRIVING
			}
			directions_service.route(request, (response, status)=>{
				if (status === google.maps.DirectionsStatus.OK) {
					directions_display.setDirections(response)
					const point = response.routes[0].legs[0]
					this.route$.refresh({
						distance: point.distance.text,
						duration: point.duration.text,
					})
					this.busy$.$ = false
				}
			})
			directions_display.setMap(map)
		})
	}
}
interface Route {
	distance:string
	duration:string
}
