import { tup } from '@ctx-core/array'
import { assign } from '@ctx-core/object'
import { page_query$_b } from '@ctx-core/sapper'
import { derived$, Readable$, writable$, Writable$ } from '@ctx-core/store'
import { api_src_, getStringCoordinate } from '@menus/api'
import { consumer_http_client_b, fetch_search_menus_menu_b } from '@menus/consumer-http'
import { Menuitem } from '@menus/consumer-menu'
import type { MapMarkerEvent, MapView_I } from '@menus/consumer-search-ui'
import { SEOAPIRequestQuery } from '@menus/consumer-seo'
import { userAddress$_b } from '@menus/consumer-user-address'
import { DishZipSeo } from '@menus/dish'
import { default_system_location } from '@menus/geolocatable'
import { InfoWindow } from '@menus/google.maps'
import { assign_to_query_str__b, navigating_goto_b } from '@menus/page'
import { SearchMenuRequestQuery } from '@menus/search-menu-common'
import { SERVICE_TYPE_DINEIN } from '@menus/service-type'
import { BaseController, LocationAutocomplete_I } from '@menus/shared-ui'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import { log } from '@menus/util'
import type { breadcrumb_T } from '../breadcrumb_T.js'
import type { consumer_seo_ui_Ctx } from '../consumer_seo_ui_Ctx.js'
import { page_query$_T } from '@ctx-core/sapper/src/page_query$_b'
const Controller_name = 'SeoDishMenuItemList_c'
export class SeoDishMenuItemList_c extends BaseController<consumer_seo_ui_Ctx> {
	readonly assign_to_query_str_ = assign_to_query_str__b(this.ctx)
	readonly breadcrumbList$:refresh_writable_T<breadcrumb_T[]> = refresh_writable_([])
	readonly busyZip$:Writable$<boolean> = writable$(false)
	readonly consumer_http_client = consumer_http_client_b(this.ctx)
	readonly dish$:Writable$<string> = writable$<string>(undefined)
	readonly dishZipSeo$:Writable$<DishZipSeo> = writable$(null)
	readonly DishZipSeo_a$:Writable$<DishZipSeo[]> = writable$([])
	readonly fetch_search_menus_menu = fetch_search_menus_menu_b(this.ctx)
	readonly linksContainer$:Writable$<HTMLDivElement> = writable$(null)
	readonly locationAutocomplete$:Writable$<LocationAutocomplete_I> = writable$(null)
	readonly mapView$:Writable$<MapView_I> = writable$(null)
	readonly menuitems$:Writable$<Menuitem[]> = writable$([])
	readonly menuitems_busy$:Writable$<boolean> = writable$(false)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly page_query$:page_query$_T = page_query$_b(this.ctx)
	readonly page$:Writable$<number> = writable$(1)
	readonly pageSize$:Writable$<number> = writable$(100)
	readonly paginationBaseUrl$:Writable$<string> = writable$(null)
	readonly sticky$:Writable$<boolean> = writable$(false)
	readonly toggleLocationAutocomplete$:Writable$<boolean> = writable$(false)
	readonly TotalPages$:Writable$<number> = writable$(0)
	readonly TotalRow$:Writable$<number> = writable$(0)
	readonly userAddress$ = userAddress$_b(this.ctx)
	readonly zipcode$:Writable$<number> = writable$(null)
	readonly showLocationAutocomplete$:Readable$<boolean> = derived$(tup(this.toggleLocationAutocomplete$, this.dishZipSeo$),//region
		([toggleLocationAutocomplete, dishZipSeo]:[boolean, DishZipSeo])=>{
			return !!(toggleLocationAutocomplete || !dishZipSeo)
		})//endregion
	get mapMarkers() { return this.mapView$.$.mapMarkers}
	get active_mapMarker() { return this.mapView$.$.active_mapMarker}
	get map() { return this.mapView$.$.map}
	userMarker:google.maps.Marker = null
	mapInfoWindow:InfoWindow = null
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		const dish = this.dish$.$
		this.init_breadcrumbs()
		const zipcode = this.zipcode$.$
		this.paginationBaseUrl$.$ = `/dish/${dish}${zipcode ? `/${zipcode}` : ''}`
		this.busyZip$.$ = true
		try {
			const requestData = new SEOAPIRequestQuery()
			requestData.search = dish
			const payload = await this.consumer_http_client.dishzipseo(requestData)
			const DishZipSeo_a = payload.Data.map(datum=>
				new DishZipSeo(
					assign(datum, {
						dish: this.dish$.$,
						active: false, // Set `false` because of `cache`
					})
				)
			)
			this.DishZipSeo_a$.$ = DishZipSeo_a
			const list =
				zipcode
				? DishZipSeo_a.filter(d=>d.ZipCode === zipcode)
				: []
			if (list.length) {
				const dishZipSeo = list[0]
				dishZipSeo.active = true
				this.dishZipSeo$.$ = dishZipSeo
			}
		} finally {
			this.busyZip$.$ = false
		}
		this.load_data().then()
	};
	async onDestroy() {
		if (this.ctx[Controller_name] === this) {
			delete this.ctx[Controller_name]
		}
		await super.onDestroy()
	}
	init_breadcrumbs() {
		log(this.ctx, Controller_name, 'init_breadcrumbs')
		const breadcrumbList = []
		const dish = this.dish$.$
		if (dish) {
			breadcrumbList.push({
				name: dish,
				url: `/dish/${dish}/page/1`,
			})
		}
		const zipcode = this.zipcode$.$
		if (zipcode) {
			breadcrumbList.push({
				name: `${zipcode}`,
			})
		}
		this.breadcrumbList$.$ = breadcrumbList
	};
	onscroll() {
		if (!this.linksContainer$.$) return
		const { top, height } = this.linksContainer$.$.getBoundingClientRect()
		this.sticky$.$ = (top + height) < 0
	}
	load_data = async ()=>{
		log(this.ctx, 'load_data')
		this.menuitems_busy$.$ = true
		try {
			if (this.userMarker) {
				this.userMarker.setMap(null)
			}
			const payload = await this.load_menuItems()
			log(this.ctx, Controller_name, 'searchMenuItems()', payload)
			this.TotalPages$.$ = payload.Pagination.TotalPages
			this.TotalRow$.$ = payload.Pagination.TotalRow
			this.menuitems$.$ = payload.Data.map(attributes=>new Menuitem(attributes))
		} finally {
			this.menuitems_busy$.$ = false
		}
	}
	load_menuItems() {
		log(this.ctx, 'load_menuItems')
		const requestData = new SearchMenuRequestQuery()
		const dishZipSeo = this.dishZipSeo$.$
		const userAddress = this.userAddress$.$
		assign(requestData, {
			page: this.page$.$,
			pageSize: this.pageSize$.$,
			menuType: SERVICE_TYPE_DINEIN,
			sort: 6, // Sort by popular item first, then restaurants that are open
			proximity: 10,
			keywords: this.dish$.$,
			zipcode: dishZipSeo ? dishZipSeo.ZipCode : this.zipcode$.$,
			coordinate:
				dishZipSeo
				? getStringCoordinate(dishZipSeo.Latitude, dishZipSeo.Longitude)
				: userAddress
					? getStringCoordinate(userAddress.Latitude, userAddress.Longitude)
					: getStringCoordinate(default_system_location.lat, default_system_location.lng)
		})
		return this.fetch_search_menus_menu(requestData)
	};
	onclickChangeLocation() {
		this.toggleLocationAutocomplete$.$ = true
		setTimeout(()=>this.locationAutocomplete$.$.focus(), 100)
	}
	onmouseover = async ({ index })=>{
		await this.onmouseoverMarker({
			mapMarker: this.mapMarkers[index],
			item: this.menuitems$[index],
			index,
		})
	}
	onmouseout() {
		this.onmouseoutMarker()
	}
	gotoRestaurantUrl(menuitem:Menuitem) {
		return this.navigating_goto(
			this.getRestaurantDetailsUrl(menuitem)
		)
	}
	getSearchMenuMapView() {
		return `/search${this.assign_to_query_str_({ keywords: this.dish$.$ })}`
	}
	gotoSearchMenuMapView() {
		return this.navigating_goto(
			this.getSearchMenuMapView()
		)
	}
	getRestaurantDetailsUrl(menuitem:Menuitem) {
		return `/restaurant/${SERVICE_TYPE_DINEIN}/${menuitem.CuisineName}/${menuitem.RestaurantName}/${menuitem.FFID}`
	}
	onmouseoverMapMarker = async (event:CustomEvent<MapMarkerEvent>)=>{
		await this.onmouseoverMarker(event.detail)
	}
	onmouseoutMapMarker = ()=>{
		this.onmouseoutMarker()
	}
	set_active = async (item, mapMarker)=>{
		await this.mapView$.$.set_active(item, mapMarker)
	}
	unsetActiveItem = ()=>{
		this.mapView$.$.unset_active_item()
	}
	private onmouseoverMarker = async (event)=>{
		const { mapMarker, item: menuitem } = event
		if (this.active_mapMarker === mapMarker) return
		else if (this.active_mapMarker) {
			this.onmouseoutMarker()
		}
		await this.set_active(menuitem, mapMarker)
		if (this.mapInfoWindow) {
			this.mapInfoWindow.close()
		}
		const content = document.createElement('div')
		content.style.cursor = 'pointer'
		content.innerHTML = `
<div class="clearfix">
${
			(menuitem.MenuImageExist || menuitem.RestImageExist)
			? `<div style="float: left; width: 60px; height: 60px; background: url('${api_src_(menuitem.FileName)}'); background-repeat: no-repeat; background-size: contain; background-position: center;"></div>`
			: `<div style="float: left; padding: 10px; background-color: rgba(69, 90, 100, 0.05);"><div class="cuisine-icon-47 item-cuisine-icon" style="width: 40px; height: 40px; background-size: contain; background-position: center;"></div></div>`
		}
  <div style="float: left;">
    <h3 style="padding-left: 10px; margin-top: 15px;">${menuitem.RestaurantName}</h3>
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
			await this.gotoRestaurantUrl(menuitem)
		})
	}
	private onmouseoutMarker() {
		this.unsetActiveItem()
	}
}
