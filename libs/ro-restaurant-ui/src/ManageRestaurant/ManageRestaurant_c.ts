import { neq_ } from '@ctx-core/function'
import { noinit_subscribe, subscribe_wait_timeout, writable$, Writable$ } from '@ctx-core/store'
import { query_str_ } from '@ctx-core/uri'
import type { QueryParams } from '@menus/api'
import { navigating_goto_b } from '@menus/page'
import { page_query$_b } from '@ctx-core/sapper'
import type { changepage_evt_T } from '@menus/pagination-ui'
import { API_RESTAURANT_list_b, RoRequestQuery } from '@menus/ro-http'
import { ro_login_user$_b, ro_login_user$_T } from '@menus/ro-user-common'
import type { RoRestaurant_I } from '@menus/ro-restaurant'
import { BaseController } from '@menus/shared-ui-lib'
import { log } from '@menus/util'
import { timeout_ms } from '@menus/web-config'
import type { ro_restaurant_ui_Ctx } from '../ro_restaurant_ui_Ctx.js'
export const PAGINATION_ID = 'MANAGE_REST_PAGINATION_ID'
const Controller_name = 'ManageRestaurant_c'
export class ManageRestaurant_c extends BaseController<ro_restaurant_ui_Ctx> {
	readonly API_RESTAURANT_list = API_RESTAURANT_list_b(this.ctx)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	lastPageQuery = {};
	listRequestData = new RoRequestQuery()
	readonly page_query$ = page_query$_b(this.ctx)
	readonly ro_login_user$:ro_login_user$_T = ro_login_user$_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly restaurant_a$:Writable$<RoRestaurant_I[]> = writable$([])
	readonly search$:Writable$<string> = writable$('')
	readonly page$:Writable$<number> = writable$(1)
	readonly pageSize$:Writable$<number> = writable$(50)
	readonly TotalPages$:Writable$<number> = writable$(0)
	readonly TotalRow$:Writable$<number> = writable$(0)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this

		this.init_page_query()

		this.unsubscribers.push(
			noinit_subscribe(this.page_query$, (page_query: any)=>{
				// Avoids duplicate calls if multiple query params are changed at the same time
				if(this.isRequestChanged(this.lastPageQuery, page_query)) {
					this.lastPageQuery = page_query
					this.load_data().then()
				}
			}),
			noinit_subscribe(this.page$, () => this.navigate_and_load_data()),
			noinit_subscribe(this.pageSize$, () => {
				this.page$.$ = 1
				this.navigate_and_load_data()
			}),
		)

		this.load_data().then()
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly init_page_query = () => {
		if(this.page_query$.$) {
			if(this.page_query$.$.search) {
				this.search$.$ = this.page_query$.$.search as string
			}

			if(this.page_query$.$.page) {
				this.page$.$ = Number(this.page_query$.$.page)
			}

			if(this.page_query$.$.pageSize) {
				this.pageSize$.$ = Number(this.page_query$.$.pageSize)
			}
		}
	}
	readonly search = (searchText: string) => {
		this.search$.$ = searchText
		this.page$.$ = 1
		this.navigate_and_load_data()
	}
	readonly navigate_and_load_data = async ()=>{
		const query = {} as QueryParams
		query.page = this.page$.$
		query.pageSize = this.pageSize$.$
		const search = this.search$.$ || ''
		if (search) {
			query.search = search
		}

		await this.navigating_goto([
			`/backoffice/manage-restaurant`,
			query_str_(query),
		])
	}

	readonly isRequestChanged = (request1: any, request2: any) => {
		return JSON.stringify(request1) !== JSON.stringify(request2)
	}

	readonly create_get_restaurants_request = async () => {
		const requestData = new RoRequestQuery()

		const ro_login_user = await subscribe_wait_timeout(this.ro_login_user$, neq_(null), timeout_ms)

		RoRequestQuery.fill_login_user(requestData, ro_login_user)
		RoRequestQuery.fill_page(requestData, this.page_query$.$.page as string)
		RoRequestQuery.fill_pageSize(requestData, this.page_query$.$.pageSize as string)
		
		if (this.page_query$.$.search) {
			RoRequestQuery.fill_search(requestData, this.page_query$.$.search as string)
		}

		return requestData
	}

	readonly load_data = async ()=>{
		log(this.ctx, Controller_name, 'load_data()')

		const requestData = await this.create_get_restaurants_request()

		if(this.isRequestChanged(this.listRequestData, requestData)) {
			this.busy$.$ = true

			try {
				this.listRequestData = requestData

				const payload = await this.API_RESTAURANT_list(requestData)
				this.restaurant_a$.$ = payload.Data
				this.TotalPages$.$ = payload?.Pagination?.TotalPages
				this.TotalRow$.$ = payload?.Pagination?.TotalRow
				log(this.ctx, Controller_name, 'API_RESTAURANT_list', payload)
			} finally {
				this.busy$.$ = false
			}
		}
	}
}
