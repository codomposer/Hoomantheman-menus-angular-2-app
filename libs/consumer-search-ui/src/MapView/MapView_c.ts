import { I } from '@ctx-core/combinators'
import { has_dom } from '@ctx-core/dom'
import { noop } from '@ctx-core/function'
import { assign, clone, deep_clone } from '@ctx-core/object'
import { page_query$_b, page_query$_T } from '@ctx-core/sapper'
import { writable$, subscribe, subscribe_wait_timeout, Writable$ } from '@ctx-core/store'
import { query_str_ } from '@ctx-core/uri'
import { init_google_maps_promise_b } from '@menus/app'
import { search_menus_menu_requestData_, consumer_http_client_b, fetch_search_menus_menu_b } from '@menus/consumer-http'
import type { Menuitem_I } from '@menus/consumer-menu'
import { userAddress$_b, userAddress_coordinate_, } from '@menus/consumer-user-address'
import { deep_equal } from '@menus/fast-deep-equal'
import {
	assign_extended_geolocatable, ExtendedGeolocatable_I, Geolocatable_I, LatLng_, LatLngLiteral_
} from '@menus/geolocatable'
import { platform_settings$_b } from '@menus/http'
import { idb_writable_, idb_writable_T } from '@menus/idb'
import { GMapOverlayView, draw_user_marker, remove_mapMarkers, DEFAULT_MAP_OPTIONS, map_center$_b } from '@menus/maps'
import { notyf_error_b } from '@menus/notyf'
import { navigating_goto_b } from '@menus/page'
import { isPopular_, SearchMenuitem_I, SearchMenuRequestQuery, SearchMenuRequestQuery_I } from '@menus/search-menu-common'
import {
	search_menus_menuitems_termsinclude$_b, active_search_dishTypes$_b, geolocatable_center$_b
} from '@menus/search-menu'
import {
	min_price$_b, max_price$_b, proximity$_b, min_order_step$_b, delivery_fee_step$_b, DELIVERY_STEPS_VAL, MIN_ORDER_STEPS_VAL
} from '@menus/filters-common'
import { serviceType$_b, ServiceTypeId } from '@menus/service-type'
import { BaseController, fork_map_icon_ } from '@menus/shared-ui-lib'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import { log } from '@menus/util'
import {
	GRID_SEARCH_VIEW, MAP_REST_ACTIVE_ZINDEX, MAP_REST_ZINDEX, COLOR_POPULARRESTMAPICON, timeout_ms,
} from '@menus/web-config'
import type { consumer_search_ui_Ctx } from '../consumer_search_ui_Ctx.js'
import type { MapView_I } from './MapView_I.js'
const Controller_name = 'MapView_c'

export enum MapViewContext {
	RESTAURANT = 'restaurant',
	MENU = 'menu'
}

export class MapView_c extends BaseController<consumer_search_ui_Ctx> implements MapView_I {
	overlayView:GMapOverlayView
	readonly active_search_dishTypes$ = active_search_dishTypes$_b(this.ctx)
	readonly consumer_http_client = consumer_http_client_b(this.ctx)
	readonly fetch_search_menus_menu = fetch_search_menus_menu_b(this.ctx)
	readonly geolocatable_center$ = geolocatable_center$_b(this.ctx)
	readonly init_google_maps_promise = init_google_maps_promise_b(this.ctx)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly page_query$:page_query$_T = page_query$_b(this.ctx)
	readonly platform_settings$ = platform_settings$_b(this.ctx)
	readonly search_menus_menuitems_termsinclude$ = search_menus_menuitems_termsinclude$_b(this.ctx)
	readonly serviceType$ = serviceType$_b(this.ctx)
	readonly userAddress$ = userAddress$_b(this.ctx)

	// Filters
	readonly min_price$ = min_price$_b(this.ctx)
	readonly max_price$ = max_price$_b(this.ctx)
	readonly delivery_fee_step$ = delivery_fee_step$_b(this.ctx)
	readonly min_order_step$ = min_order_step$_b(this.ctx)
	readonly proximity$ = proximity$_b(this.ctx)

	readonly active_item$:Writable$<SearchMenuitem_I> = writable$(undefined)
	readonly active_item_element$:Writable$<HTMLDivElement> = writable$(undefined)
	readonly active_mapMarker$ = refresh_writable_<google.maps.Marker>(null)
	readonly in_map_center$:Writable$<ExtendedGeolocatable_I> = writable$(null)
	readonly map_center$ = map_center$_b(this.ctx)
	readonly map$:Writable$<google.maps.Map> = writable$(null)
	readonly map_element$:Writable$<HTMLDivElement> = writable$(null)
	readonly map_ready$:Writable$<boolean> = writable$(false)
	readonly map_view_data$:idb_writable_T<MapViewData> = idb_writable_<MapViewData>('map_view_data')
	readonly mapMarkers$:refresh_writable_T<google.maps.Marker[]> = refresh_writable_([])
	readonly search_menuitem_a$ = writable$<SearchMenuitem_I[]>([])
	readonly context$ = writable$<MapViewContext>(null)
	readonly search_menuitem_marker_a$:Writable$<Marker[]> = writable$([])
	readonly selected_menuitem$:Writable$<SearchMenuitem_I> = writable$(null)
	bounds:google.maps.LatLngBounds|google.maps.LatLngBoundsLiteral
	draw_map_called = false
	icon:string
	iconPopular:string
	iconSelected:string
	userMarker:google.maps.Marker
	get active_item():SearchMenuitem_I {return this.active_item$.$}
	get active_mapMarker():google.maps.Marker {return this.active_mapMarker$.$}
	get dish_T_name_a():string[] {return this.active_search_dishTypes$.$.map(dishType=>dishType.Name)}
	get LatLng():string {return LatLng_(this.map_center)}
	get map_center():Geolocatable_I {return this.map_center$.$ || this.geolocatable_center$.$}
	get map():google.maps.Map {return this.map$.$}
	get mapMarkers():google.maps.Marker[] {return this.mapMarkers$.$}
	get termsinclude():string {return this.dish_T_name_a.join('|')}
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		let current_geolocatable_center:Geolocatable_I
		this.unsubscribers.push(
			this.in_map_center$.subscribe(in_map_center=>{
				if (!deep_equal(in_map_center, this.map_center$.$)) {
					this.map_center$.$ = in_map_center
				}
			}),
			this.geolocatable_center$.subscribe(geolocatable_center=>{
				const { map_center$ } = this
				if (current_geolocatable_center || !map_center$.$) {
					map_center$.$ = assign_extended_geolocatable(geolocatable_center)
				}
				current_geolocatable_center = geolocatable_center
			}),
		)
		await this.init_google_maps_promise
		await subscribe_wait_timeout(this.platform_settings$, I, timeout_ms)
		this.icon = fork_map_icon_(this.platform_settings$.$?.Color_RestMapIcon)
		this.iconPopular = fork_map_icon_(COLOR_POPULARRESTMAPICON)
		this.iconSelected = fork_map_icon_(this.platform_settings$.$?.Color_SelectedMapIcon)
		await this.load_data()
		await this.draw_map()
	}
	async onDestroy() {
		if (this.overlayView) {
			this.overlayView.onDestroy()
		}
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly load_data = async ()=>{
		if (has_dom) {
			const search_menuitem_marker_a = this.search_menuitem_marker_a$.$
			const search_menuitem_a = this.search_menuitem_a$.$ || []
			// Add markers to map if it is a browser
			for (let i = 0; i < search_menuitem_a.length; i++) {
				const menuitem = search_menuitem_a[i]
				const marker:Marker = new google.maps.Marker({
					position: {
						lat: parseFloat(menuitem.Latitude.toString()),
						lng: parseFloat(menuitem.Longitude.toString()),
					},
					map: this.map$.$,
				})
				marker.customInfo = menuitem
				search_menuitem_marker_a.push(marker)
				google.maps.event.addListenerOnce(marker, 'click', ()=>{
					this.choose_marker(marker)
				})
				if (i == 0) {
					this.choose_marker(marker)
				}
			}
			this.search_menuitem_marker_a$.$ = search_menuitem_marker_a
			// Removes the old marker cluster, if exist
			// if (this.markerCluster) {
			//   this.markerCluster.clearMarkers()
			// }
			// // Add a marker clusterer to manage the markers.
			// this.markerCluster = new MarkerClusterer(this.menuMap, this.search_menuitem_marker_a$.$,
			//   {
			//     imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
			//     minimumClusterSize: 25
			//   }
			// )
			console.info('MapView_c', { search_menuitem_a: this.search_menuitem_a$.$ })
		}
	}
	readonly choose_marker = (marker:Marker)=>{
		const menuitem:Menuitem_I = marker.customInfo
		this.selected_menuitem$.$ = menuitem
		google.maps.event.addListenerOnce(marker, 'click', ()=>{
			this.choose_marker(marker)
		})
		console.info('choose_marker', menuitem)
	}
	readonly draw_map = async ()=>{
		if (!has_dom || this.draw_map_called) return
		this.draw_map_called = true
		await this.init_google_maps_promise
		const map_options = assign(deep_clone(DEFAULT_MAP_OPTIONS), {
			center: LatLngLiteral_(this.map_center),
			zoom: 15,
		})
		await subscribe_wait_timeout(this.map_element$, I, timeout_ms)
		const map = new google.maps.Map(this.map_element$.$, map_options)
		this.map$.$ = map
		await subscribe_wait_timeout(this.active_item_element$, I, timeout_ms)
		this.overlayView = new GMapOverlayView(
			this.active_item_element$.$, map, noop, { marginBottom: 56 }
		)
		google.maps.event.addListenerOnce(map, 'idle', async ()=>{
			this.map_ready$.$ = true
			this.unsubscribers.push(
				subscribe(this.search_menuitem_a$, this.populate_map)
			)
		})
		google.maps.event.addListener(map, 'click', ()=>{
			this.unset_active_item()
		})
		google.maps.event.addListener(map, 'idle', ()=>{
			this.overlayView.draw()
			this.store_map_view_data()
		})
		google.maps.event.addListener(map, 'bounds_changed', ()=>{
			this.overlayView.draw()
		})
		google.maps.event.addListener(map, 'center_changed', ()=>{
			const _map_center = map.getCenter()
			this.map_center$.$ = assign_extended_geolocatable(
				{}, {
					Latitude: _map_center.lat(),
					Longitude: _map_center.lng(),
				} as Partial<ExtendedGeolocatable_I>
			)
		})
		this.unsubscribers.push(
			subscribe(this.userAddress$, this.draw_user_marker)
		)
	}
	readonly draw_mapMarkers = async ()=>{
		if (!has_dom) return
		this.mapMarkers$.$.length = 0
		this.mapMarkers$.refresh()
		const map = this.map$.$
		const search_menuitem_a = await subscribe_wait_timeout(this.search_menuitem_a$, I, timeout_ms)
		for (const item_idx in search_menuitem_a) {
			if (!search_menuitem_a.hasOwnProperty(item_idx)) continue
			const item = search_menuitem_a[item_idx]
			const Latitude = parseFloat(item.Latitude.toString())
			const Longitude = parseFloat(item.Longitude.toString())
			const mapMarker:Marker = new google.maps.Marker({
				position: new google.maps.LatLng(Latitude, Longitude),
				map,
				icon: {
					url: this.item_icon(item),
				},
				zIndex: MAP_REST_ZINDEX,
			})
			mapMarker.args = { item }
			// TODO: Use custom layers instead
			// https://developers.google.com/maps/documentation/javascript/layers
			// const infowindow = new google.maps.InfoWindow({
			//   content: `$${item.AVGPrice}`,
			//   disableAutoPan: true,
			//   zIndex:MAP_INFO_ZINDEX,
			// });
			//
			// infowindow.setOptions({
			//   pixelOffset: new google.maps.Size(0, 100)
			// });
			//
			// infowindow.open(this.map$.$, mapMarker);
			mapMarker.addListener('click', async (event:google.maps.MapMouseEvent)=>{
				const { item: clickItem } = mapMarker.args
				if (clickItem && this.active_item$.$ && mapMarker === this.active_mapMarker$.$) {
					await this.unset_active_item()
				} else {
					await this.set_active_with_overlay(clickItem, mapMarker)
				}
				assign(event, {
					index: item_idx,
					item: clickItem,
					mapMarker,
				})
				this.dispatch('clickMapMarker', event)
			})
			mapMarker.addListener('mouseover', (event:google.maps.MapMouseEvent)=>{
				assign(event, {
					index: item_idx,
					item,
					mapMarker,
				})
				this.dispatch('mouseoverMapMarker', event)
			})
			mapMarker.addListener('mouseout', (event:google.maps.MapMouseEvent)=>{
				assign(event, {
					index: item_idx,
					item,
					mapMarker,
				})
				this.dispatch('mouseoutMapMarker', event)
			})
			this.mapMarkers$.$.push(mapMarker)
			this.mapMarkers$.refresh()
		}
		// Removes the old marker cluster, if exist
		// if (this.markerCluster) {
		// 	this.markerCluster.clearMarkers();
		// }
		// // Add a marker clusterer to manage the markers.
		// this.markerCluster = new MarkerClusterer(this.map$.$, markers, {
		// 	imagePath: 'assets/img/markercluster/m',
		// 	minimumClusterSize: 25
		// });
		// sets first item to be active
		// if (search_menuitem_a.length > 0) {
		// 	this.set_active_with_overlay(search_menuitem_a[0]);
		// }
	}
	readonly draw_user_marker = ()=>{
		if (!this.userAddress$.$) return
		if (this.userMarker) this.userMarker.setMap(null)
		this.userMarker = draw_user_marker(this.userAddress$.$, this.map$.$)
	}
	readonly fitBounds = async (bounds?:google.maps.LatLngBounds|google.maps.LatLngBoundsLiteral)=>{
		this.setZoom(15)
		if (!bounds) {
			bounds = await this.init_bounds()
		}
		if (bounds) {
			await this.map$.$.fitBounds(bounds, { left: 120, right: 120, top: 100, bottom: 100 })
		}
	}
	readonly init_bounds = async ()=>{
		if (this.bounds) return this.bounds
		const search_menuitem_a = await subscribe_wait_timeout(this.search_menuitem_a$, I, timeout_ms)
		if (!search_menuitem_a || search_menuitem_a.length <= 1) {
			return null
		}
		let minLatitude:number, maxLatitude:number, minLongitude:number, maxLongitude:number
		for (const item of search_menuitem_a) {
			const Latitude = parseFloat(item.Latitude.toString())
			const Longitude = parseFloat(item.Longitude.toString())
			if (!minLongitude || Longitude < minLongitude) {
				minLongitude = Longitude
			}
			if (!minLatitude || Latitude < minLatitude) {
				minLatitude = Latitude
			}
			if (!maxLongitude || Longitude > maxLongitude) {
				maxLongitude = Longitude
			}
			if (!maxLatitude || Latitude > maxLatitude) {
				maxLatitude = Latitude
			}
		}
		return (
			(minLatitude && maxLatitude && minLongitude && maxLongitude)
			? (
				new google.maps.LatLngBounds(
					new google.maps.LatLng(maxLatitude, minLongitude),
					new google.maps.LatLng(minLatitude, maxLongitude),
				)
			)
			: null
		)
	}
	readonly item_icon = (item:SearchMenuitem_I)=>{
		return isPopular_(item) && this.context$.$ === MapViewContext.MENU ? this.iconPopular : this.icon
	}
	readonly open_grid_view = async ()=>{
		await this.navigating_goto([
			window.location.pathname,
			query_str_(
				clone(
					this.page_query$.$, {
						search_view: GRID_SEARCH_VIEW,
					}
				)
			)
		])
	}
	readonly populate_map = async ()=>{
		if (!has_dom) return
		if (this.active_item$.$ && this.active_mapMarker$.$) {
			await this.reset_active_with_overlay(true, true)
		}
		const oldMapMarkers = this.mapMarkers$.$.slice()
		await this.draw_mapMarkers()
		remove_mapMarkers(oldMapMarkers)
		this.setOptions({ draggable: true, zoomControl: true })
		this.setCenter()
		await this.fitBounds()
		if (this.active_item$.$) {
			const mapMarker = this.mapMarkers$.$.find(
				(mapMarker2:Marker)=>
					mapMarker2.args.item.RestaurantID === this.active_item$.$.RestaurantID
			)
			if (mapMarker) {
				await this.set_active_with_overlay(this.active_item$.$, mapMarker)
			}
		}
	}
	readonly reset_active_with_overlay = async (resetIcon:boolean, closeOverlayView:boolean)=>{
		const active_mapMarker = this.active_mapMarker$.$
		if (resetIcon && active_mapMarker) {
			active_mapMarker.setIcon({
				url: this.item_icon(this.active_item$.$),
			})
			active_mapMarker.setZIndex(MAP_REST_ZINDEX)
			this.active_mapMarker$.refresh()
		}
		if (closeOverlayView) {
			await this.set_active(null, null)
			this.overlayView.close()
		}
	}
	readonly search_request_data = (item:SearchMenuitem_I)=>{
		const requestData = search_menus_menu_requestData_({
			menuType: ServiceTypeId[this.serviceType$.$],
			coordinate: userAddress_coordinate_(LatLng_(this.userAddress$.$)),
			ff: item.FFID,
		} as SearchMenuRequestQuery_I)
		const { termsinclude } = this
		if (termsinclude) requestData.termsinclude = termsinclude

		if(typeof this.min_price$.$ === 'number') {
			requestData.min_price = this.min_price$.$
		}

		if(typeof this.max_price$.$ === 'number') {
			requestData.max_price = this.max_price$.$
		}

		if(typeof this.delivery_fee_step$.$ === 'number' && typeof DELIVERY_STEPS_VAL[this.delivery_fee_step$.$] === 'number') {
			requestData.deliveryfee = DELIVERY_STEPS_VAL[this.delivery_fee_step$.$]
		}

		if(typeof this.min_order_step$.$ === 'number' && typeof DELIVERY_STEPS_VAL[this.min_order_step$.$] === 'number') {
			requestData.minimumorder = MIN_ORDER_STEPS_VAL[this.min_order_step$.$]
		}

		if(this.proximity$.$) {
			requestData.proximity = this.proximity$.$
		}

		return requestData
	}
	readonly set_active = async (active_item:SearchMenuitem_I, active_mapMarker:google.maps.Marker)=>{
		const previous_active_mapMarker = this.active_mapMarker$.$
		const previous_$active_item = this.active_item$.$
		this.active_item$.$ = active_item
		this.active_mapMarker$.$ = active_mapMarker
		if (previous_active_mapMarker && (previous_active_mapMarker !== this.active_mapMarker$.$)) {
			previous_active_mapMarker.setIcon({
				url: this.item_icon(previous_$active_item),
			})
			previous_active_mapMarker.setZIndex(MAP_REST_ZINDEX)
		}
		if (active_mapMarker) {
			active_mapMarker.setIcon({
				url: this.iconSelected,
			})
			active_mapMarker.setZIndex(MAP_REST_ACTIVE_ZINDEX)
			this.active_mapMarker$.refresh()
		}
		await this.store_map_view_data()
	}
	readonly set_active_with_overlay = async (item:SearchMenuitem_I, mapMarker:Marker)=>{
		log(this.ctx, Controller_name, 'set_active_with_overlay', item, this.active_item$.$)
		mapMarker.setOptions({
			cursor: 'wait',
		})
		let active_item:SearchMenuitem_I
		const requestData = this.search_request_data(item)
		const payload = await this.fetch_search_menus_menu(requestData)
		if (payload?.Data?.length) {
			active_item = payload.Data[0]
			// Previous Active Restaurant Item
			if (this.active_item$.$) {
				await this.reset_active_with_overlay(true, false)
			}
			// NEW Active Restaurant Item
			if (this.active_item$.$ !== active_item || !this.active_mapMarker$.$) {
				await this.set_active(active_item, mapMarker)
				if (active_item) {
					this.overlayView.open(
						this.active_mapMarker$.$.getPosition(),
						this.active_item$.$)
				} else {
					this.overlayView.close()
				}
			} else {
				await this.reset_active_with_overlay(false, true)
			}
		} else {
			await this.notyf_error(
				`Sorry, this ${this.search_menus_menuitems_termsinclude$.$ ? 'menu item' : 'restaurant'} is not available.`,
			)
		}
		mapMarker.setOptions({
			cursor: 'pointer'
		})
	}
	readonly setCenter = ()=>{
		this.map$.$.setCenter(LatLngLiteral_(this.map_center))
	}
	readonly setOptions = (options:google.maps.MapOptions|null)=>{
		this.map$.$.setOptions(options)
	}
	readonly setZoom = (zoom:number)=>{
		this.map$.$.setZoom(zoom)
	}
	readonly store_map_view_data = async ()=>{
		if (!has_dom) return
		const { search } = window.location
		const map = await subscribe_wait_timeout(this.map$, I, timeout_ms)
		const center = map.getCenter().toJSON()
		const bounds = map.getBounds().toJSON()
		const active_item = this.active_item$.$
		const map_view_data:MapViewData = { search, center, bounds, active_item_RestaurantID: active_item?.RestaurantID }
		this.map_view_data$.$ = map_view_data
	}
	readonly unset_active_item = async ()=>{
		this.overlayView.close()
		await this.reset_active_with_overlay(true, true)
	}
}
interface MapViewData {
	search:string
	center:google.maps.LatLngLiteral
	bounds:google.maps.LatLngBoundsLiteral
	active_item_RestaurantID:number
}
interface Marker extends google.maps.Marker {
	args?:any
	customInfo?:any
}
