import { derived$, Readable$, writable$, Writable$ } from '@ctx-core/store'
import { url_friendly_names$_b } from '@menus/breadcrumb'
import {
	consumer_http_client_b, consumer_http_client_T, fetch_search_menus_menuitems_b, search_menus_menuitems_payload_T,
	search_menus_menuname_payload_T
} from '@menus/consumer-http'
import type { Menuitem_I } from '@menus/consumer-menu'
import type { DishType_I } from '@menus/dish'
import {
	query_cuisineID$_b, query_fireFlyID$_b, query_keywords$_b, query_lat$_b, query_lng$_b, query_proximity$_b,
} from '@menus/page'
import { ro_httpClient_b, RoRequestQuery, success_API_RESTAURANT_info_payload_T } from '@menus/ro-http'
import { RoRestaurant_I } from '@menus/ro-restaurant'
import { Path } from '@menus/route'
import { SearchDishType, SearchMenuRequestQuery } from '@menus/search-menu-common'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import { SERVICE_TYPE_DINEIN, ServiceTypeId } from '@menus/service-type-common'
import { BaseController } from '@menus/shared-ui-lib'
import { log } from '@menus/util'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
const Controller_name = 'Ro_Menuitems_c'
export class Ro_Menuitems_c extends BaseController<ro_menu_ui_Ctx> {
	readonly consumer_http_client:consumer_http_client_T = consumer_http_client_b(this.ctx)
	readonly fetch_search_menus_menuitems = fetch_search_menus_menuitems_b(this.ctx)
	readonly query_cuisineID$ = query_cuisineID$_b(this.ctx)
	readonly query_fireFlyID$ = query_fireFlyID$_b(this.ctx)
	readonly query_keywords$ = query_keywords$_b(this.ctx)
	readonly query_lat$ = query_lat$_b(this.ctx)
	readonly query_lng$ = query_lng$_b(this.ctx)
	readonly query_proximity$ = query_proximity$_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly url_friendly_names$ = url_friendly_names$_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly can_load_more_menuitems$:Writable$<boolean> = writable$(false)
	readonly dish_chips_div$:Writable$<HTMLDivElement> = writable$(null)
	readonly dishTypes$:refresh_writable_T<SearchDishType[]> = refresh_writable_([])
	readonly is_overflow_dish_chips$:Writable$<boolean> = writable$(false)
	readonly load_more_menuitems_busy$:Writable$<boolean> = writable$(false)
	readonly menuitem_page$:Writable$<number> = writable$(null)
	readonly menuitems$:Writable$<Menuitem_I[]> = writable$([])
	readonly menuitems_busy$:Writable$<boolean> = writable$(false)
	readonly ro_restaurant$:Writable$<RoRestaurant_I> = writable$(null)
	readonly keywords$:Readable$<string[]> = derived$(this.query_keywords$,//region
		(query_keywords)=>{
			return query_keywords ? query_keywords.split(',') : []
		}
	)//endregion
	readonly keywords_label$:Readable$<string> = derived$(this.keywords$,//region
		(keywords)=>{
			return keywords.join(' - ')
		}
	)//endregion
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		// Query Params
		this.url_friendly_names$.$.set(
			`/${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}/[A-Z0-9]+/${Path.RO.MENU_ITEMS}`,
			this.keywords_label$.$
		)
		this.url_friendly_names$.$.set(
			`/${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}/[A-Z0-9]+/${Path.RO.MENU_ITEMS}[A-Za-z0-9\?=&]+$`,
			this.keywords_label$.$
		)
		await this.load_data()
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly load_data = async ()=>{
		log(this.ctx, Controller_name, 'load_data()')
		this.busy$.$ = true
		try {
			const [
				API_RESTAURANT_info_payload,
				search_menus_menuname_payload,
				search_menus_menuitems_payload,
			] = await Promise.all([
				this.API_RESTAURANT_info(),
				this.search_menus_menuname(),
				this.search_menus_menuitems(false),
			]) as [
				success_API_RESTAURANT_info_payload_T,
				search_menus_menuname_payload_T,
				search_menus_menuitems_payload_T,
			]
			// Rest Info
			this.ro_restaurant$.$ = API_RESTAURANT_info_payload.Data
			const query_fireFlyID = this.query_fireFlyID$.$
			if (query_fireFlyID) {
				this.url_friendly_names$.$.set(
					`/${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}/${query_fireFlyID}`,
					this.ro_restaurant$.$.Name
				)
			}
			// Dish Types
			this.dishTypes$.$ = search_menus_menuname_payload.Table
			setTimeout(()=>{
				this.check_overflow_dish_chips()
			}, 100)
			// Menu Items
			this.menuitems$.$ = search_menus_menuitems_payload.Data
		} finally {
			this.busy$.$ = false
		}
	}
	readonly check_overflow_dish_chips = ()=>{
		if (this.dish_chips_div$.$) {
			const element:HTMLElement = this.dish_chips_div$.$
			this.is_overflow_dish_chips$.$ = element.scrollHeight > element.clientHeight
		}
	}
	readonly API_RESTAURANT_info = async ()=>{
		const requestData = new RoRequestQuery()
		RoRequestQuery.fill_fireFlyID(requestData, this.query_fireFlyID$.$)
		return await this.ro_httpClient.API_RESTAURANT_info(requestData)
	}
	readonly search_menus_menuname = async ()=>{
		this.is_overflow_dish_chips$.$ = false
		const requestData = new SearchMenuRequestQuery()
		requestData.restaurantid = 0
		const keywords = this.keywords$.$
		const query_cuisineID = this.query_cuisineID$.$
		const query_fireFlyID = this.query_fireFlyID$.$
		const query_proximity = this.query_proximity$.$
		const query_lat = this.query_lat$.$
		const query_lng = this.query_lng$.$
		if (keywords && keywords.length > 0) {
			requestData.keywords = keywords.join('|')
		}
		requestData.menuType = ServiceTypeId[SERVICE_TYPE_DINEIN]
		if (query_cuisineID) {
			requestData.cuisineID = query_cuisineID
		}
		if (query_fireFlyID) {
			requestData.ff = query_fireFlyID
		}
		if (query_proximity) {
			requestData.proximity = query_proximity
		}
		if (query_lat && query_lng) {
			requestData.coordinate = `${query_lng},${query_lat}`
		}
		return await this.consumer_http_client.search_menus_menuname(requestData)
	}
	readonly search_menus_menuitems = async (loadMore:boolean)=>{
		if (loadMore) {
			this.menuitem_page$.$++
		} else {
			this.init_menuitems()
		}
		const requestData = new SearchMenuRequestQuery()
		requestData.restaurantid = 0
		const keywords = this.keywords$.$
		const query_cuisineID = this.query_cuisineID$.$
		const query_fireFlyID = this.query_fireFlyID$.$
		const query_proximity = this.query_proximity$.$
		const query_lat = this.query_lat$.$
		const query_lng = this.query_lng$.$
		if (keywords && keywords.length > 0) {
			requestData.keywords = keywords.join('|')
		}
		requestData.menuType = ServiceTypeId[SERVICE_TYPE_DINEIN]
		if (query_cuisineID) {
			requestData.cuisineID = query_cuisineID
		}
		if (query_fireFlyID) {
			requestData.ff = query_fireFlyID
		}
		if (query_proximity) {
			requestData.proximity = query_proximity
		}
		if (query_lat && query_lng) {
			requestData.coordinate = `${query_lng},${query_lat}`
		}
		requestData.termsinclude =
			this.dishTypes$.$
				.filter(d=>d.active)
				.map(d=>d.Name)
				.join('|')
		requestData.page = this.menuitem_page$.$
		requestData.pageSize = 30
		return await this.fetch_search_menus_menuitems(requestData)
	}
	readonly init_menuitems = ()=>{
		this.menuitems$.$ = []
		this.menuitem_page$.$ = 1
		this.load_more_menuitems_busy$.$ = false
		this.can_load_more_menuitems$.$ = true
	}
	readonly loadMore_menuitems = async ()=>{
		if (!this.load_more_menuitems_busy$.$ && this.can_load_more_menuitems$.$) {
			this.load_more_menuitems_busy$.$ = true
			const search_menus_menuitems_payload = await this.search_menus_menuitems(true)
			const menuitems = search_menus_menuitems_payload.Data
			if (menuitems.length > 0) {
				this.menuitems$.$ = this.menuitems$.$.concat(menuitems)
			} else {
				this.can_load_more_menuitems$.$ = false
				this.load_more_menuitems_busy$.$ = false
				log(this.ctx, Controller_name, 'loadMore_menuitems => search_menus_menuitems_payload', search_menus_menuitems_payload)
			}
		}
		log(this.ctx, Controller_name, 'loadMore_menuitems()', this.can_load_more_menuitems$.$)
	}
	readonly choose_dishType = async (dishType:DishType_I)=>{
		dishType.active = !dishType.active
		this.dishTypes$.refresh()
		this.menuitems_busy$.$ = true
		const search_menus_menuitems_payload = await this.search_menus_menuitems(false)
		this.menuitems$.$ = search_menus_menuitems_payload.Data
		this.menuitems_busy$.$ = false
	}
}
