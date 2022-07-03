import type { PageOrientation, PageSize } from 'pdfmake/interfaces.js'
import { writable$, Writable$ } from '@ctx-core/store'
import { BaseModalController } from '@menus/modal'
import { APIRequestQuery } from '@menus/api'
import { notyf_error_b } from '@menus/notyf'
import { createPdf } from '@menus/pdfmake'
import {
	API_LIST_cuisine_b, API_LIST_cuisine_payload_item_T, API_LIST_segment_b, API_LIST_segment_payload_item_T,
	API_RESTAURANT_accept_terms_b, RoRequestQuery
} from '@menus/ro-http'
import { RoRestaurant_I } from '@menus/ro-restaurant'
import type { ro_restaurant_ui_Ctx } from '@menus/ro-restaurant-ui'
import { globalSettings$_b, Subscription } from '@menus/ro-user'
import { STATUS_SUCCESS } from '@menus/web-config'
import { print_pdf } from '@menus/web-cordova'
import type { RestContractModal_close_T, RestContractModal_open_T } from './RestContractModal_I'
const Controller_name = 'RestContractModal_c.js'
export class RestContractModal_c
	extends BaseModalController<RestContractModal_open_T, RestContractModal_close_T, ro_restaurant_ui_Ctx> {
	readonly API_LIST_cuisine = API_LIST_cuisine_b(this.ctx)
	readonly API_LIST_segment = API_LIST_segment_b(this.ctx)
	readonly API_RESTAURANT_accept_terms = API_RESTAURANT_accept_terms_b(this.ctx)
	readonly cuisine_a$:Writable$<API_LIST_cuisine_payload_item_T[]> = writable$([])
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly ro_restaurant$:Writable$<RoRestaurant_I> = writable$(null)
	readonly segment_a$:Writable$<API_LIST_segment_payload_item_T[]> = writable$([])
	readonly subscription$:Writable$<Subscription> = writable$(null)
	readonly today$:Writable$<string> = writable$((new Date()).toISOString())
	readonly globalSettings$ = globalSettings$_b(this.ctx)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		const [cuisine_a, segment_a] = await Promise.all([
			this.API_LIST_cuisine(new RoRequestQuery()), this.API_LIST_segment(new RoRequestQuery())
		])
		this.cuisine_a$.$ = cuisine_a
		this.segment_a$.$ = segment_a
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly before_open_modal = async ({ ro_restaurant, subscription }:RestContractModal_open_T)=>{
		this.ro_restaurant$.$ = ro_restaurant
		this.subscription$.$ = subscription
	}
	readonly print_tos = async ()=>{
		await this.print_pdf('tos.pdf', this.globalSettings$.$.TOS)
	}
	readonly print_privacy_policy = async ()=>{
		await this.print_pdf('privacy_policy.pdf', this.globalSettings$.$.PrivacyPolicy)
	}
	readonly print_pdf = async (filename:string, html:string)=>{
		const div = document.createElement('div')
		div.innerHTML = html
		const text = div.innerText
			.replace(/\n+/g, '\n')
			.replace(/\t/g, '')
			.trim()
		const content = text.split('\n').map(text=>text.trim())
		const dd = {
			pageSize: 'LETTER' as PageSize,
			pageOrientation: 'landscape' as PageOrientation,
			pageMargins: 5,
			content,
		}
		await print_pdf(filename, createPdf(dd))
	}
	readonly accept_terms = async (accepted:boolean)=>{
		if (!accepted) {
			await this.notyf_error('All Terms must be accepted to continue...')
			return
		}
		const requestData = new APIRequestQuery()
		const ro_restaurant = this.ro_restaurant$.$
		const response = await this.API_RESTAURANT_accept_terms(requestData, {
			FireFlyID: ro_restaurant.FireFlyID,
			SegmentID: ro_restaurant.SegmentID,
			CuisineID: ro_restaurant.CuisineID,
			Sell_Alcohol: ro_restaurant.Sell_Alcohol,
		})
		if (response.Status === STATUS_SUCCESS) {
			await this.close(accepted)
		} else {
			await this.notyf_error(response.Code)
		}
	}
}
