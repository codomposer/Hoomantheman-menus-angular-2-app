import { writable$, Writable$ } from '@ctx-core/store'
import { notyf_error_b } from '@menus/notyf'
import { BaseModalController } from '@menus/modal'
import { navigating_goto_b } from '@menus/page'
import { Restaurant } from '@menus/restaurant'
import { fetch_API_REGISTRATION_search_b, RoRequestQuery } from '@menus/ro-http'
import { log } from '@menus/util'
import type { ro_signup_ui_Ctx } from '../../ro_signup_ui_Ctx.js'
import { continue_restaurant_list_step_b } from '../continue_restaurant_list_step_b.js'
import { rest_name$_b } from '../rest_name$_b.js'
import { selected_rest$_b } from '../selected_rest$_b.js'
import { Signup_zip_code$_b } from '../Signup_zip_code$_b'
import {
	Signup_STEP_REST_LIST_restaurant_name_modal_close_T, Signup_STEP_REST_LIST_restaurant_name_modal_open_T
} from './Signup_STEP_REST_LIST_restaurant_name_modal_I.js'
const Controller_name = 'Signup_STEP_REST_LIST_restaurant_name_modal_c'
export class Signup_STEP_REST_LIST_restaurant_name_modal_c extends BaseModalController</*@formatter:off*/
  Signup_STEP_REST_LIST_restaurant_name_modal_open_T, Signup_STEP_REST_LIST_restaurant_name_modal_close_T,
	ro_signup_ui_Ctx
>/*@formatter:on*/ {
	readonly continue_restaurant_list_step = continue_restaurant_list_step_b(this.ctx)
	readonly fetch_API_REGISTRATION_search = fetch_API_REGISTRATION_search_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly rest_list$:Writable$<Restaurant[]> = writable$([])
	readonly rest_name$ = rest_name$_b(this.ctx)
	readonly search_rest_busy$:Writable$<boolean> = writable$(false)
	readonly selected_rest$ = selected_rest$_b(this.ctx)
	readonly Signup_zip_code$ = Signup_zip_code$_b(this.ctx)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.unsubscribers.push(
			this.rest_name$.subscribe(()=>{
				this.search_restaurant()
			})
		)
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly before_open_modal = async (_data:Signup_STEP_REST_LIST_restaurant_name_modal_open_T)=>{
	}
	readonly choose_restaurant = (restaurant:Restaurant)=>{
		log(this.ctx, Controller_name, 'choose_restaurant()', restaurant)
		this.selected_rest$.$ = restaurant
		this.rest_name$.$ = this.selected_rest$.$.Name
		this.close().then()
	}
	readonly search_restaurant = async ()=>{
		log(this.ctx, Controller_name, 'search_restaurant()', this.Signup_zip_code$.$)
		this.search_rest_busy$.$ = true
		try {
			const requestData = new RoRequestQuery()
			requestData.z = this.Signup_zip_code$.$
			requestData.rn = this.rest_name$.$
			const payload = await this.fetch_API_REGISTRATION_search(requestData)
			this.rest_list$.$ =
				'Data' in payload
				? payload?.Data.map(attributes=>new Restaurant(attributes))
				: []
			log(this.ctx, Controller_name, 'searchRegRest', payload)
		} finally {
			this.search_rest_busy$.$ = false
		}
	}
}
