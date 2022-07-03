import { B, be_ } from '@ctx-core/object'
import { log } from '@menus/util'
import { SEOAPIRequestQuery } from '@menus/consumer-seo'
import { consumer_http_client_b } from '@menus/consumer-http'
import type { PopularDish } from '@menus/search-menu-common'
import type { CityCtx } from '@menus/address'
import type { home_ui_Ctx } from './home_ui_Ctx.js'
const LOG_TAG = 'load_home_data_T_b.js'
const key = 'load_home_data'
export const load_home_data_b:B<home_ui_Ctx, typeof key> = be_(key, ctx=>{
	const consumer_http_client = consumer_http_client_b(ctx)
	return load_home_data
	async function load_home_data() {
		const [cities, popular_dishes] = await Promise.all([
			load_cities(), load_popular_dishes()
		])
		return { cities, popular_dishes }
	}
	async function load_cities() {
		const citiesPayload = await consumer_http_client.get_cities({})
		log(ctx, LOG_TAG, 'get_cities()')
		return citiesPayload.City
	}
	async function load_popular_dishes() {
		const requestData = new SEOAPIRequestQuery()
		const popular_dishesPayload = await consumer_http_client.get_popular_dishes(requestData)
		log(ctx, LOG_TAG, 'get_popular_dishes()')
		return popular_dishesPayload.Data
	}
})
export interface load_home_data_payload_T {
	cities:CityCtx[]
	popular_dishes:PopularDish[]
}
export type load_home_data_T = ()=>Promise<load_home_data_payload_T>
