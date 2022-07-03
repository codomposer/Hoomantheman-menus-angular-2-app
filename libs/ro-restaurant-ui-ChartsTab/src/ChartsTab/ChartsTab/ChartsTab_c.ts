import { Chart } from 'chart.js'
import { I } from '@ctx-core/combinators'
import { assign } from '@ctx-core/object'
import { subscribe_wait_timeout, writable$, Writable$ } from '@ctx-core/store'
import { init_google_maps_promise_b } from '@menus/app'
import { innerWidth_lte_SCREEN_XS_MIN$_b } from '@menus/dom'
import type { InfoWindow, map_T, marker_T } from '@menus/google.maps'
import { DEFAULT_MAP_OPTIONS } from '@menus/maps'
import { notyf_error_b } from '@menus/notyf'
import { params_fireFlyID$_b } from '@menus/page'
import {
	API_CHARTS_map_payload_T, ro_httpClient_b, RoRequestQuery, API_CHARTS_menucount_payload_T,
} from '@menus/ro-http'
import { ro_restaurant$_b } from '@menus/ro-restaurant'
import type { MapInfo, MapInfoCoordinates, MenuCounts } from '@menus/ro-shared-models'
import { ro_login_user$_b, ro_login_user$_T } from '@menus/ro-user-common'
import { BaseController } from '@menus/shared-ui-lib'
import { deep_clone, getMetersByMiles, getOtherRestMapIcon, log } from '@menus/util'
import {
	ACTIVE_REST_MARKER_ZINDEX, chartColorsArray, colors, MAX_REST_SELECTION_LIMIT, REST_MARKER_ZINDEX, timeout_ms,
} from '@menus/web-config'
import type { ro_restaurant_ui_ChartsTab_Ctx } from '../../ro_restaurant_ui_ChartsTab_Ctx.js'
import { CHART_COLORS_ARRAY_REST_START_INDEX } from '../CHART_COLORS_ARRAY_REST_START_INDEX.js'
import { charts_other_rest_a$_b } from '../charts_other_rest_a$_b.js'
import { charts_proximity$_b } from '../charts_proximity$_b.js'
import type { OtherRest } from '../OtherRest.js'
import ChartsTab_marker_content from './ChartsTab_marker_content.svelte'
export const REST_ICON = '/assets/img/ro/restaurant-map-orange.svg'
export const OTHER_REST_ICON = getOtherRestMapIcon(colors.brandSuccess)
export const OTHER_REST_ACTIVE_ICON = getOtherRestMapIcon(colors.brandPrimary)
const Controller_name = 'ChartsTab_c'
export class ChartsTab_c extends BaseController<ro_restaurant_ui_ChartsTab_Ctx> {
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly charts_map$:Writable$<HTMLDivElement> = writable$(null)
	readonly charts_other_rest_a$ = charts_other_rest_a$_b(this.ctx)
	readonly charts_proximity$ = charts_proximity$_b(this.ctx)
	readonly init_google_maps_promise = init_google_maps_promise_b(this.ctx)
	readonly innerWidth_lte_SCREEN_XS_MIN$ = innerWidth_lte_SCREEN_XS_MIN$_b(this.ctx)
	readonly mapInfo$:Writable$<MapInfo> = writable$(null)
	readonly MenuCounts$:Writable$<MenuCounts> = writable$(null)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly params_fireFlyID$ = params_fireFlyID$_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly ro_login_user$:ro_login_user$_T = ro_login_user$_b(this.ctx)
	readonly ro_restaurant$ = ro_restaurant$_b(this.ctx)
	charts_other_rest_a_FFID_a:string[] = []
	mapInfoWindow:InfoWindow = null
	rest_map_markers:marker_T[] = []
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		if (typeof sessionStorage !== 'undefined' && sessionStorage) {
			const charts_other_rest_a_FFID_a = sessionStorage.getItem('charts_other_rest_a_FFID_a')
			if (charts_other_rest_a_FFID_a) {
				this.charts_other_rest_a_FFID_a = JSON.parse(charts_other_rest_a_FFID_a)
			}
		}
		this.unsubscribers.push(
			this.charts_proximity$.subscribe(this.load_data),
		)
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly load_data = async ()=>{
		this.busy$.$ = true
		try {
			const requestData = new RoRequestQuery()
			await subscribe_wait_timeout(this.ro_restaurant$, I, timeout_ms)
			const ro_login_user = await subscribe_wait_timeout(this.ro_login_user$, I, timeout_ms)
			RoRequestQuery.fill_login_user(requestData, ro_login_user)
			requestData.ff = this.params_fireFlyID$.$
			requestData.proximity = this.charts_proximity$.$
			const [mapInfo, MenuCounts] = await Promise.all([
				this.ro_httpClient.API_CHARTS_map(deep_clone(requestData)),
				this.ro_httpClient.API_CHARTS_menucount(deep_clone(requestData)),
			]) as [
				API_CHARTS_map_payload_T, API_CHARTS_menucount_payload_T,
			]
			// Chart Map Info
			this.mapInfo$.$ = mapInfo
			// Chart Menu Count
			const { YourMenuCount, OtherMenuAvg } = MenuCounts
			const DiffPercentage = (100.0 * (YourMenuCount - OtherMenuAvg) / OtherMenuAvg)
			MenuCounts.DiffPercentageText =
				DiffPercentage > 0.0
				? `${DiffPercentage.toFixed(2)}%`
				: DiffPercentage < 0.0
					? `${DiffPercentage.toFixed(2)}%`
					: 'equals the average'
			MenuCounts.DiffPercentageHeaderText =
				DiffPercentage > 0.0
				? 'Difference Above the Average'
				: DiffPercentage < 0.0
					? 'Difference Below the Average'
					: 'Your Menu Density'
			this.MenuCounts$.$ = MenuCounts
		} finally {
			this.busy$.$ = false
		}
		log(this.ctx, Controller_name, 'loadChartsTab')
		await this.init_map_and_charts()
		log(this.ctx, Controller_name, 'Chart JS', typeof Chart)
	}
	readonly init_map_and_charts = async ()=>{
		await this.init_google_maps_promise
		await this.init_map()
		const { charts_other_rest_a_FFID_a } = this
		for (let i = 0; i < charts_other_rest_a_FFID_a.length; i++) {
			const fireFlyID = charts_other_rest_a_FFID_a[i]
			const marker = this.rest_map_markers.find(
				marker=>marker.FireFlyID === fireFlyID)
			if (marker) {
				await this.select_other_rest(marker, i)
			}
		}
		this.charts_other_rest_a$.refresh()
	}
	readonly init_map = async ()=>{
		await this.init_google_maps_promise
		const mapInfo = await subscribe_wait_timeout(this.mapInfo$, I, timeout_ms)
		const { YourCoordinate, OthersCoordinate } = mapInfo
		log(this.ctx, Controller_name, 'YourCoordinate', YourCoordinate)
		const map_options = deep_clone(DEFAULT_MAP_OPTIONS)
		const YourCoordinate_Latitude = YourCoordinate?.Latitude
		const YourCoordinate_Longitude = YourCoordinate?.Longitude
		const center =
			(YourCoordinate_Latitude && YourCoordinate_Longitude)
			? {
				lat: YourCoordinate_Latitude,
				lng: YourCoordinate_Longitude,
			} as google.maps.LatLngLiteral
			: map_options.center
		map_options.center = center
		map_options.scrollwheel = false
		map_options.disableDoubleClickZoom = true
		map_options.zoomControl = true
		const charts_proximity = parseInt(this.charts_proximity$.$.toString(), 10)
		map_options.zoom = 16 - (charts_proximity / 3)
		const charts_map = await subscribe_wait_timeout(this.charts_map$, I, timeout_ms)
		const map = new google.maps.Map(charts_map, map_options) as map_T
		new google.maps.Marker({
			position: center,
			map,
			icon: {
				url: REST_ICON,
				size: new google.maps.Size(40, 40),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(20, 21)
			},
			zIndex: 101,
		})
		this.rest_map_markers = []
		// Add markers to map if it is a browser
		for (const coordinate of OthersCoordinate as MapInfoCoordinates[]) {
			// Check if Rest is Already Active
			const charts_other_rest = this.charts_other_rest_a$.$.find(a=>a.FireFlyID === coordinate.FireFlyID)
			const marker = new google.maps.Marker({
				position: {
					lat: parseFloat(coordinate.Latitude.toString()),
					lng: parseFloat(coordinate.Longitude.toString())
				},
				map,
				icon: this.icon_(charts_other_rest),
				zIndex: REST_MARKER_ZINDEX,
			}) as marker_T
			assign(marker, coordinate)
			marker.addListener('mouseover', async ()=>{
				await this.onmouseover_marker(marker, map)
			})
			marker.addListener('click', ()=>{
				this.onclick_marker(marker, map, null)
			})
			marker.addListener('touchdown', ()=>{
				this.onclick_marker(marker, map, null)
			})
			this.rest_map_markers.push(marker)
		}
		// Add circle overlay and bind to marker
		new google.maps.Circle({
			map,
			center,
			radius: getMetersByMiles(this.charts_proximity$.$),    // Converting miles to meters
			strokeColor: colors.brandSuccess,
			strokeOpacity: 1,
			strokeWeight: 3,
			fillColor: colors.brandSuccess,
			fillOpacity: 0.19,
		})
	}
	readonly icon_ = (other_rest?)=>{
		return other_rest ? OTHER_REST_ACTIVE_ICON : OTHER_REST_ICON
	}
	private onclick_marker = async (marker:marker_T, map:google.maps.Map, color_idx?:number)=>{
		if (this.mapInfoWindow?.marker !== marker) {
			return await this.onmouseover_marker(marker, map, color_idx)
		}
		log(this.ctx, 'onclick_marker', marker, color_idx)
		const charts_other_rest_a = this.charts_other_rest_a$.$
		if (color_idx === null) {
			color_idx = charts_other_rest_a.length
		}
		color_idx += CHART_COLORS_ARRAY_REST_START_INDEX + 1
		const { FireFlyID } = marker
		const chart_other_rest = charts_other_rest_a.find(r=>r.FireFlyID === FireFlyID)
		if (chart_other_rest) {
			marker.setIcon(OTHER_REST_ICON)
			const index = charts_other_rest_a.indexOf(chart_other_rest)
			if (~index) {
				charts_other_rest_a.splice(index, 1)
				this.charts_other_rest_a$.$ = charts_other_rest_a
				log(this.ctx, 'onclick_marker => Delete selected', marker)
			}
		} else {
			await this.select_other_rest(marker, color_idx)
		}
		this.charts_other_rest_a_FFID_a = charts_other_rest_a.map(r=>r.FireFlyID)
		sessionStorage.setItem('charts_other_rest_a_FFID_a', JSON.stringify(this.charts_other_rest_a_FFID_a))
		log(this.ctx, Controller_name, 'charts_other_rest_a_FFID_a', this.charts_other_rest_a_FFID_a)
	}
	private readonly select_other_rest = async (marker:marker_T, color_idx?:number)=>{
		log(this.ctx, 'select_other_rest', marker, color_idx)
		const charts_other_rest_a = this.charts_other_rest_a$.$
		if (color_idx === null) {
			color_idx = charts_other_rest_a.length
		}
		color_idx += CHART_COLORS_ARRAY_REST_START_INDEX + 1
		const { FireFlyID } = marker
		if (charts_other_rest_a.find(r=>r.FireFlyID === FireFlyID)) {
			return
		}
		if (charts_other_rest_a.length >= MAX_REST_SELECTION_LIMIT) {
			this.notyf_error(`You can select max ${MAX_REST_SELECTION_LIMIT} restaurants at a time.`)
			return
		}
		marker.setIcon(OTHER_REST_ACTIVE_ICON)
		log(this.ctx, 'select_other_rest => setIcon', chartColorsArray[color_idx])
		// const charts_other_rest = assign({ busy: true, marker }, marker) as OtherRest
		const charts_other_rest = assign({ busy: false, marker }, marker) as OtherRest
		charts_other_rest_a.push(charts_other_rest)
		this.charts_other_rest_a$.$ = charts_other_rest_a
		log(this.ctx, 'select_other_rest => Selected', marker)
	}
	private readonly onmouseover_marker = async (marker:marker_T, map:google.maps.Map, color_idx?:number)=>{
		log(this.ctx, Controller_name, 'onmouseover_marker', marker)
		marker.setZIndex(ACTIVE_REST_MARKER_ZINDEX)
		if (this.mapInfoWindow) {
			this.mapInfoWindow.close()
			this.mapInfoWindow.components?.[0]?.$destroy()
		}
		const content:HTMLDivElement = document.createElement('div')
		const maxWidth = this.innerWidth_lte_SCREEN_XS_MIN$.$ ? 270 : null
		const options = {
			content,
			maxWidth,
			pixelOffset: new google.maps.Size(0, -30),
			position: marker.getPosition(),
		}
		const mapInfoWindow = new google.maps.InfoWindow(options) as InfoWindow
		this.mapInfoWindow = mapInfoWindow
		mapInfoWindow.setOptions(options)
		mapInfoWindow.open({ map })
		mapInfoWindow.components = [new ChartsTab_marker_content({
			target: content,
			props: {
				ctx: this.ctx,
				marker,
				maxWidth,
				onclick_marker: (_evt:MouseEvent)=>this.onclick_marker(marker, map, color_idx),
			},
		})]
		mapInfoWindow.marker = marker
		mapInfoWindow.content = content
	}
}
