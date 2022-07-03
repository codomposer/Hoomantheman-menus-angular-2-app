import { query_str_ } from '@ctx-core/uri'
import { derived$, Readable$, writable$, Writable$ } from '@ctx-core/store'
import { BaseController } from '@menus/shared-ui-lib'
import { log } from '@menus/util'
import { SERVICE_TYPE_DINEIN, ServiceTypeId } from '@menus/service-type-common'
import {
	navigating_goto_b, params_other_fireFlyID$_b, query_cuisineID$_b, query_cuisineName$_b,
	query_fireFlyID$_b, query_keywords$_b, query_lat$_b, query_lng$_b, query_proximity$_b
} from '@menus/page'
import { url_friendly_names$_b, url_regex_friendly_names$_b } from '@menus/breadcrumb'
import { Path } from '@menus/route'
import { ro_httpClient_b, RoRequestQuery, success_API_RESTAURANT_info_payload_T } from '@menus/ro-http'
import { SearchMenuRequestQuery } from '@menus/search-menu-common'
import { consumer_http_client_b, KEYWORD_SEPARATOR, search_dish_payload_T } from '@menus/consumer-http'
import type { DishType_I } from '@menus/dish'
import type { QueryParams_I } from '@menus/api'
import type { RoRestaurant_I } from '@menus/ro-restaurant'
import type { ro_restaurant_dishes_ui_Ctx } from '../ro_restaurant_dishes_ui_Ctx.js'
const Controller_name = 'RestaurantDishes_c'
export class RestaurantDishes_c extends BaseController<ro_restaurant_dishes_ui_Ctx> {
	readonly consumer_http_client = consumer_http_client_b(this.ctx)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly params_other_fireFlyID$ = params_other_fireFlyID$_b(this.ctx)
	readonly query_cuisineID$ = query_cuisineID$_b(this.ctx)
	readonly query_cuisineName$ = query_cuisineName$_b(this.ctx)
	readonly query_fireFlyID$ = query_fireFlyID$_b(this.ctx)
	readonly query_lat$ = query_lat$_b(this.ctx)
	readonly query_lng$ = query_lng$_b(this.ctx)
	readonly query_keywords$ = query_keywords$_b(this.ctx)
	readonly query_proximity$ = query_proximity$_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly url_friendly_names$ = url_friendly_names$_b(this.ctx)
	readonly url_regex_friendly_names$ = url_regex_friendly_names$_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly can_search_dish_a$:Writable$<boolean> = writable$(false)
	readonly dishes$:Writable$<DishType_I[]> = writable$([])
	readonly dish_page$:Writable$<number> = writable$(null)
	readonly search_dish_busy$:Writable$<boolean> = writable$(false)
	readonly ro_restaurant$:Writable$<RoRestaurant_I> = writable$(null)
	readonly title$:Writable$<string> = writable$(null)
	readonly query_keywords_a$:Readable$<string[]> = derived$(this.query_keywords$,//region
		(query_keywords)=>{
			return query_keywords ? query_keywords.split(',') : []
		}
	)//endregion
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		await this.load_data()
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly load_data = async ()=>{
		log(this.ctx, Controller_name, 'load_data')
		// Query Params
		let title:string
		if (this.query_cuisineName$.$) {
			title = this.query_cuisineName$.$
		} else if (this.query_keywords$.$.length > 0) {
			title = ''
			for (let i = 0; i < this.query_keywords$.$.length; i++) {
				const keyword = this.query_keywords$.$[i]
				title += keyword
				if (i < this.query_keywords$.$.length - 1) {
					title += ' - '
				}
			}
		}
		this.title$.$ = title
		const url_regex_friendly_names = this.url_regex_friendly_names$.$
		url_regex_friendly_names.set(
			new RegExp(`/${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}/[A-Z0-9]+/${Path.RO.DISHES}`),
			this.title$.$
		)
		url_regex_friendly_names.set(
			new RegExp(`/${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}/[A-Z0-9]+/${Path.RO.DISHES}[A-Za-z0-9\?=&]+$`),
			this.title$.$
		)
		this.busy$.$ = true
		try {
			const [
				API_RESTAURANT_info_payload,
				search_dish_payload,
			] = await Promise.all([
				this.API_RESTAURANT_info(this.params_other_fireFlyID$.$),
				this.search_dish(false),
			]) as [
				success_API_RESTAURANT_info_payload_T,
				search_dish_payload_T,
			]
			// Rest Info
			this.ro_restaurant$.$ = API_RESTAURANT_info_payload.Data
			this.url_friendly_names$.$.set(
				`/${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}/${this.params_other_fireFlyID$.$}`,
				this.ro_restaurant$.$.Name
			)
			// Dish Items
			this.dishes$.$ = search_dish_payload.Data
		} finally {
			this.busy$.$ = false
		}
	}
	readonly API_RESTAURANT_info = async (fireFlyID:string)=>{
		const requestData = new RoRequestQuery()
		RoRequestQuery.fill_fireFlyID(requestData, fireFlyID)
		return await this.ro_httpClient.API_RESTAURANT_info(requestData)
	}
	readonly init_dishes = ()=>{
		this.dishes$.$ = []
		this.dish_page$.$ = 1
		this.search_dish_busy$.$ = false
		this.can_search_dish_a$.$ = true
	}
	readonly search_dish = async (loadMore:boolean)=>{
		if (loadMore) {
			this.dish_page$.$++
		} else {
			this.init_dishes()
		}
		const requestData = new SearchMenuRequestQuery()
		requestData.menuType = ServiceTypeId[SERVICE_TYPE_DINEIN]
		if (this.query_keywords$.$) {
			requestData.keywords = this.query_keywords_a$.$.join(KEYWORD_SEPARATOR)
		}
		if (this.query_cuisineID$.$) {
			requestData.cuisineID = this.query_cuisineID$.$
		}
		if (this.query_fireFlyID$.$) {
			requestData.ff = this.query_fireFlyID$.$
		}
		if (this.query_proximity$.$) {
			requestData.proximity = this.query_proximity$.$
		}
		if (this.query_lat$.$ && this.query_lng$.$) {
			requestData.coordinate = `${this.query_lng$.$},${this.query_lat$.$}`
		}
		requestData.page = this.dish_page$.$
		requestData.pageSize = 30
		return await this.consumer_http_client.search_dish(requestData)
	}
	readonly load_next_search_dish = async ()=>{
		if (!this.search_dish_busy$.$ && this.can_search_dish_a$.$) {
			this.search_dish_busy$.$ = true
			const search_dish_payload = await this.search_dish(true)
			const dishes = search_dish_payload.Data
			if (dishes.length > 0) {
				this.dishes$.$ = this.dishes$.$.concat(dishes)
			} else {
				this.can_search_dish_a$.$ = false
			}
			this.search_dish_busy$.$ = false
			log(this.ctx, Controller_name, 'load_next_search_dish => response', search_dish_payload)
		}
		log(this.ctx, Controller_name, 'load_next_search_dish()', this.can_search_dish_a$.$)
	}
	readonly select_dish = async (dish:DishType_I)=>{
		const query_params:QueryParams_I = {}
		query_params.keywords = dish.DishName
		query_params.lat = this.query_lat$.$
		query_params.lng = this.query_lng$.$
		query_params.proximity = this.query_proximity$.$
		await this.navigating_goto([
			Path.RO.BASE,
			Path.RO.MANAGE_RESTAURANT, this.params_other_fireFlyID$.$,
			Path.RO.MENU_ITEMS,
			query_str_(query_params)
		])
	}
}
