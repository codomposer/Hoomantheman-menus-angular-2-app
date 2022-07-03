import { neq_ } from '@ctx-core/function'
import { I } from '@ctx-core/combinators'
import { subscribe_wait_for_timeout, Writable$, writable$ } from '@ctx-core/store'
import { BaseController } from '@menus/shared-ui-lib'
import type { CustomerReview } from '@menus/ro-shared-models'
import { log } from '@menus/util'
import { ro_httpClient_b, RoRequestQuery } from '@menus/ro-http'
import { params_fireFlyID$_b } from '@menus/page'
import { timeout_ms } from '@menus/web-config'
import type { ro_restaurant_ui_CustomerReviewsTab_Ctx } from '../ro_restaurant_ui_CustomerReviewsTab_Ctx.js'
const Controller_name = 'CustomerReviewsTab_c'
export class CustomerReviewsTab_c extends BaseController<ro_restaurant_ui_CustomerReviewsTab_Ctx> {
	readonly params_fireFlyID$ = params_fireFlyID$_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly data$:Writable$<CustomerReview[]> = writable$([])
	readonly export_url$:Writable$<string> = writable$('')
	readonly page$:Writable$<number> = writable$(1)
	readonly pageSize$:Writable$<number> = writable$(25)
	readonly search$:Writable$<string> = writable$('')
	readonly TotalPages$:Writable$<number> = writable$(0)
	readonly TotalRow$:Writable$<number> = writable$(0)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.load_data().then()
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly load_data = async ()=>{
		this.busy$.$ = true
		try {
			const requestData = new RoRequestQuery()
			const params_fireFlyID = await subscribe_wait_for_timeout(this.params_fireFlyID$, I, timeout_ms)
			const search = await subscribe_wait_for_timeout(this.search$, neq_(null), timeout_ms)
			const page = await subscribe_wait_for_timeout(this.page$, neq_(null), timeout_ms)
			const pageSize = await subscribe_wait_for_timeout(this.pageSize$, neq_(null), timeout_ms)
			RoRequestQuery.fill_fireFlyID(requestData, params_fireFlyID)
			RoRequestQuery.fill_search(requestData, search)
			RoRequestQuery.fill_page(requestData, page)
			RoRequestQuery.fill_pageSize(requestData, pageSize)
			const request = await this.ro_httpClient.API_CUSTOMER_review_request_(requestData)
			this.export_url$.$ = `${request.url}&export=1`
			const payload = await this.ro_httpClient.API_CUSTOMER_review(requestData)
			this.data$.$ = payload.Data
			this.TotalPages$.$ = payload.Pagination.TotalPages
			this.TotalRow$.$ = payload.Pagination.TotalRow
			log(this.ctx, Controller_name, 'API_CUSTOMER_review', payload)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly customer_review_search_text_Enter = async ()=>{
		log(this.ctx, Controller_name, 'customer_review_search_text_Enter()')
		this.page$.$ = 1
		await this.load_data()
	}
}
