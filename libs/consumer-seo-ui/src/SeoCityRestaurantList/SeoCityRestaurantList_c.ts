import { Writable$, writable$ } from '@ctx-core/store'
import type { CityCtx, ZipCtx } from '@menus/address'
import { api_src_, getStringCoordinate } from '@menus/api'
import { consumer_http_client_b, fetch_search_menus_menu_b } from '@menus/consumer-http'
import type { MapMarkerEvent, MapView_I } from '@menus/consumer-search-ui'
import { pending_userAddress$_b } from '@menus/consumer-user-address'
import type { InfoWindow } from '@menus/google.maps'
import { navigating_goto_b } from '@menus/page'
import { Restaurant, Restaurant_I } from '@menus/restaurant'
import { SearchMenuitem_I, SearchMenuRequestQuery } from '@menus/search-menu-common'
import { SERVICE_TYPE_DINEIN, ServiceTypeId } from '@menus/service-type'
import { BaseController } from '@menus/shared-ui-lib'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import { geocoded_userAddress_, UserAddress } from '@menus/user-address-common'
import { url_slug_, log, unslug } from '@menus/util'
import { ACTIVE_REST_MARKER_ZINDEX } from '@menus/web-config'
import type { breadcrumb_T } from '../breadcrumb_T.js'
import type { consumer_seo_ui_Ctx } from '../consumer_seo_ui_Ctx.js'
const Controller_name = 'SeoCityRestaurantList_c'
export class SeoCityRestaurantList_c extends BaseController<consumer_seo_ui_Ctx> {
	readonly fetch_search_menus_menu = fetch_search_menus_menu_b(this.ctx)
	readonly breadcrumbList$:refresh_writable_T<breadcrumb_T[]> = refresh_writable_([])
	readonly busyZip$:Writable$<boolean> = writable$(false)
	readonly city$:Writable$<string> = writable$(null)
	readonly city_ctx$:Writable$<CityCtx> = writable$(null)
	readonly consumer_http_client = consumer_http_client_b(this.ctx)
	readonly linksContainer$:Writable$<HTMLDivElement> = writable$(null)
	readonly mapView$:Writable$<MapView_I> = writable$(null)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly pending_userAddress = pending_userAddress$_b(this.ctx)
	readonly page$:Writable$<number> = writable$(1)
	readonly pageSize$:Writable$<number> = writable$(100)
	readonly sticky$ = writable$<boolean>(false)
	readonly TotalPages$:Writable$<number> = writable$(0)
	readonly TotalRow$:Writable$<number> = writable$(0)
	readonly restaurants$:Writable$<Restaurant_I[]> = writable$([])
	readonly restaurants_busy$:Writable$<boolean> = writable$(false)
	readonly zipcode$:Writable$<number> = writable$(null)
	readonly zipcode_ctx$:Writable$<ZipCtx> = writable$(null)
	markers = null
	mapInfoWindow:InfoWindow = null
	get map() {return this.mapView$.$.map}
	get mapMarkers() {return this.mapView$.$.mapMarkers}
	get active_mapMarker() {return this.mapView$.$.active_mapMarker}
	async onMount() {
		log(this.ctx, Controller_name, 'QueryParams_I')
		await super.onMount()
		this.ctx[Controller_name] = this
		this.init_breadcrumbs()
		this.busyZip$.$ = true
		try {
			const unslug_city = unslug(this.city$.$)
			const payload = await this.consumer_http_client.get_cities({ city: unslug_city })
			const cities = payload.City
			if (cities.length) {
				this.city_ctx$.$ = cities[0]
				const zipcode = this.zipcode$.$
				if (zipcode) {
					const list = this.city_ctx$.$.ZipInfo.filter(z=>z.Zip === zipcode)
					if (list.length) {
						this.zipcode_ctx$.$ = list[0]
						await this.load_data()
					}
				}
			}
			log(this.ctx, Controller_name, 'get_cities()', payload)
		} finally {
			this.busyZip$.$ = false
		}
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
	}
	private init_breadcrumbs() {
		log(this.ctx, Controller_name, 'init_breadcrumbs')
		const city = this.city$.$
		const zipcode = this.zipcode$.$
		const breadcrumbList = this.breadcrumbList$.$
		if (city) {
			breadcrumbList.push({
				name: `${unslug(city)}`,
				url: `/city/${city}`,
			})
		}
		if (zipcode) {
			breadcrumbList.push({
				name: `${zipcode}`,
				url: `/city/${city}/${zipcode}/menu/page/1`,
			})
		}
		this.breadcrumbList$.refresh()
	}
	onscroll() {
		if (!this.linksContainer$.$) return
		const { top, height } = this.linksContainer$.$.getBoundingClientRect()
		this.sticky$.$ = (top + height) < 0
	}
	load_restaurants() {
		const requestData = new SearchMenuRequestQuery()
		requestData.page = this.page$.$
		requestData.pageSize = this.pageSize$.$
		requestData.menuType = ServiceTypeId[SERVICE_TYPE_DINEIN]
		const $zipcode_ctx = this.zipcode_ctx$.$
		requestData.coordinate = getStringCoordinate(
			$zipcode_ctx.Latitude, $zipcode_ctx.Longitude
		)
		requestData.zip = $zipcode_ctx.Zip.toString()
		requestData.proximity = 10
		return this.fetch_search_menus_menu(requestData)
	}
	readonly load_data = async ()=>{
		this.restaurants_busy$.$ = true
		try {
			const responseList = await this.load_restaurants()
			// Dishes
			const restaurantsResponse = responseList[0]
			this.TotalPages$.$ = restaurantsResponse.Pagination.TotalPage
			this.TotalRow$.$ = restaurantsResponse.Pagination.TotalRow
			this.restaurants$.$ = restaurantsResponse.Data.map(
				attributes=>new Restaurant(attributes)
			)
		} finally {
			this.restaurants_busy$.$ = false
		}
	}
	readonly set_active = async (active_item, mapMarker)=>{
		await this.mapView$.$.set_active(active_item, mapMarker)
	}
	unset_active_item() {
		this.mapView$.$.unset_active_item()
	}
	readonly onmouseoverMapMarker = async (event:CustomEvent<MapMarkerEvent>)=>{
		await this.onmouseoverMarker(event.detail)
	}
	readonly onmouseoutMapMarker = (event:CustomEvent<MapMarkerEvent>)=>{
		this.onmouseoutMarker(event.detail)
	}
	readonly onmouseovercomponent = async ({ index })=>{
		await this.onmouseoverMarker({
			mapMarker: this.mapMarkers[index],
			item: this.restaurants$.$[index],
			index,
		} as Partial<MapMarkerEvent>)
	}
	readonly onmouseoutcomponent = async ({ index })=>{
		await this.onmouseoutMarker({
			mapMarker: this.mapMarkers[index],
			item: this.restaurants$.$[index],
			index,
		})
	}
	readonly gotoRestaurantUrl = async (restaurant:SearchMenuitem_I)=>{
		await this.navigating_goto(this.getRestaurantUrl(restaurant))
	}
	getRestaurantUrl(restaurant:SearchMenuitem_I):string {
		return `/restaurant/dine-in/${url_slug_(restaurant.CuisineName)}/${
			url_slug_(restaurant.RestaurantName)}-${url_slug_(restaurant.Address)}/${restaurant.FFID}`
	}
	readonly searchForDishes = async ()=>{
		let pending_userAddress:UserAddress|undefined
		const zipcode_ctx = this.zipcode_ctx$.$, city_ctx = this.city_ctx$.$
		if (zipcode_ctx) {
			pending_userAddress =
				await geocoded_userAddress_({
					name: zipcode_ctx.Zip.toString()
				})
		} else if (city_ctx) {
			pending_userAddress =
				await geocoded_userAddress_({
					name: city_ctx.City
				})
		}
		if (pending_userAddress) {
			this.pending_userAddress.$ = pending_userAddress
			await this.gotoSearch()
		}
	}
	gotoSearch() {
		return this.navigating_goto('/search')
	}
	private onmouseoverMarker = async (event:Partial<MapMarkerEvent>)=>{
		const { mapMarker, item } = event
		log(this.ctx, Controller_name, 'onmouseoverMarker', mapMarker)
		const restaurant = item
		const active_mapMarker = this.active_mapMarker
		if (active_mapMarker === mapMarker) return
		else if (active_mapMarker) {
			this.onmouseoutMarker(active_mapMarker)
		}
		await this.set_active(item, mapMarker)
		restaurant.is_selected = true
		mapMarker.setZIndex(ACTIVE_REST_MARKER_ZINDEX)
		if (this.mapInfoWindow) {
			this.mapInfoWindow.close()
		}
		const content = document.createElement('div')
		content.style.cursor = 'pointer'
		content.innerHTML = `
<div class="clearfix">
${
			(restaurant.MenuImageExist || restaurant.RestImageExist)
			? `<div style="float: left; width: 60px; height: 60px; background: url('${api_src_(restaurant.FileName)}'); background-repeat: no-repeat; background-size: contain; background-position: center;"></div>`
			: `<div style="float: left; padding: 10px; background-color: rgba(69, 90, 100, 0.05);"><div class="cuisine-icon-47 item-cuisine-icon" style="width: 40px; height: 40px; background-size: contain; background-position: center;"></div></div>`
		}
  <div style="float: left;">
    <h3 style="padding-left: 10px; margin-top: 15px;">${restaurant.RestaurantName}</h3>
    <div style="color: $brand-success; text-align: center; font-weight: bold;">View Menu</div>
  </div>
</div>
    `.trim()
		this.mapInfoWindow = new google.maps.InfoWindow({
			content,
			pixelOffset: new google.maps.Size(0, -30),
			position: mapMarker.getPosition(),
		}) as InfoWindow
		this.mapInfoWindow.open(this.map)
		content.addEventListener('click', async ()=>{
			await this.gotoRestaurantUrl(restaurant)
		})
		this.mapInfoWindow.content = content
	}
	private onmouseoutMarker(event) {
		const { item: restaurant } = event
		if (restaurant) restaurant.is_selected = false
		this.unset_active_item()
	}
}
