import { I } from '@ctx-core/combinators'
import { has_dom } from '@ctx-core/dom'
import { isNumber } from '@ctx-core/number'
import { derived$, Readable$, subscribe_wait_timeout, writable$, Writable$ } from '@ctx-core/store'
import { init_google_maps_promise_b } from '@menus/app'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import { navigating_goto_b, query_plan$_b } from '@menus/page'
import { page_query$_b, page_query$_T } from '@ctx-core/sapper'
import { Restaurant } from '@menus/restaurant'
import {
	API_REGISTRATION_register_b, API_REGISTRATION_resend_b, API_REGISTRATION_verify_b, API_REGISTRATION_verify_email_b,
	API_USER_pass_b, fetch_API_REGISTRATION_new_b, fetch_API_REGISTRATION_search_b, ro_httpClient_b, RoRequestQuery
} from '@menus/ro-http'
import { globalSettings$_b } from '@menus/ro-user'
import { Path } from '@menus/route'
import { BaseController } from '@menus/shared-ui-lib'
import { isEmail, log } from '@menus/util'
import { STATUS_ERROR, STATUS_SUCCESS, timeout_ms } from '@menus/web-config'
import type { ro_signup_ui_Ctx } from '../ro_signup_ui_Ctx.js'
import { continue_restaurant_list_step_b } from './continue_restaurant_list_step_b'
import { owner_email$_b } from './owner_email$_b'
import { rest_name$_b } from './rest_name$_b.js'
import { rest_phone$_b } from './rest_phone$_b.js'
import { selected_rest$_b } from './selected_rest$_b.js'
import { Signup_email$_b } from './Signup_email$_b'
import { Signup_fireFlyID$_b } from './Signup_fireFlyID$_b.js'
import { Signup_step$_b } from './Signup_step$_b.js'
import { Signup_token$_b } from './Signup_token$_b'
import {
	STEP_ERROR_LINK, STEP_SENT_EMAIL, STEP_SET_PASSWORD, STEP_SUCCESS, STEP_VERIFY_CODE, STEP_VERIFY_EMAIL,
	STEP_VERIFY_PHONE, STEP_ZIPCODE
} from './STEP.js'
import { verify_signup_token$_b } from './verify_signup_token$_b'
const Controller_name = 'Signup_c'
export class Signup_c extends BaseController<ro_signup_ui_Ctx> {
	captcha_code = ''
	autocomplete:google.maps.places.Autocomplete
	readonly page_query$:page_query$_T = page_query$_b(this.ctx)
	readonly API_REGISTRATION_register_busy$:Writable$<boolean> = writable$(false)
	readonly API_REGISTRATION_resend = API_REGISTRATION_resend_b(this.ctx)
	readonly API_REGISTRATION_verify_email = API_REGISTRATION_verify_email_b(this.ctx)
	readonly API_USER_pass = API_USER_pass_b(this.ctx)
	readonly authCode$:Writable$<string> = writable$('')
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly confirm_password$:Writable$<string> = writable$('')
	readonly continue_restaurant_list_step = continue_restaurant_list_step_b(this.ctx)
	readonly fetch_API_REGISTRATION_new = fetch_API_REGISTRATION_new_b(this.ctx)
	readonly fetch_API_REGISTRATION_search = fetch_API_REGISTRATION_search_b(this.ctx)
	readonly globalSettings$ = globalSettings$_b(this.ctx)
	readonly in_API_REGISTRATION_register = API_REGISTRATION_register_b(this.ctx)
	readonly in_API_REGISTRATION_verify = API_REGISTRATION_verify_b(this.ctx)
	readonly init_google_maps_promise = init_google_maps_promise_b(this.ctx)
	readonly is_captcha_verified$:Writable$<boolean> = writable$(false)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly new_password$:Writable$<string> = writable$('')
	readonly newRest_Address$:Writable$<void|google.maps.places.PlaceResult> = writable$(null)
	readonly newRest_Address_str$:Writable$<string> = writable$(null)
	readonly newRest_Address_str_input$:Writable$<HTMLInputElement> = writable$(null)
	readonly newRest_Address_str_payload_errors$ = writable$<string[]>([])
	readonly newRest_customerName$:Writable$<string> = writable$(null)
	readonly newRest_Email$:Writable$<string> = writable$(null)
	readonly newRest_Name$:Writable$<string> = writable$(null)
	readonly newRest_Phone$:Writable$<string> = writable$(null)
	readonly newRest_Title$:Writable$<string> = writable$(null)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly owner_email$ = owner_email$_b(this.ctx)
	readonly query_plan$ = query_plan$_b(this.ctx)
	readonly rest_name$ = rest_name$_b(this.ctx)
	readonly rest_phone$ = rest_phone$_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly selected_plan$:Writable$<number> = writable$(null)
	readonly selected_rest$ = selected_rest$_b(this.ctx)
	readonly Signup_email$ = Signup_email$_b(this.ctx)
	readonly Signup_fireFlyID$ = Signup_fireFlyID$_b(this.ctx)
	readonly Signup_step$ = Signup_step$_b(this.ctx)
	readonly Signup_token$ = Signup_token$_b(this.ctx)
	readonly userID$:Writable$<number> = writable$(null)
	readonly verify_code$:Writable$<string> = writable$('')
	readonly verify_code_request_errors$:Writable$<string[]> = writable$([])
	readonly verify_phone_busy$:Writable$<boolean> = writable$(false)
	readonly verify_signup_resend_count$:Writable$<number> = writable$(0)
	readonly verify_signup_token$ = verify_signup_token$_b(this.ctx)
	readonly step_verify_signup_index$:Readable$<number> = derived$(this.Signup_step$,//region
		(step)=>{
			return (
				(step === STEP_ZIPCODE)
				? 0
				: (step === STEP_SUCCESS || step === STEP_SENT_EMAIL)
					? 2
					: 1
			)
		}
	)//endregion
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		const globalSettings = await subscribe_wait_timeout(this.globalSettings$, I, timeout_ms)
		if (globalSettings.Subscription?.length) {
			const query_plan = this.query_plan$.$
			this.selected_plan$.$ =
				isNumber(query_plan)
				? query_plan
				: this.globalSettings$.$.Subscription[0].ID
		}
		if (this.Signup_fireFlyID$.$) {
			await this.search_rest_by_fireFlyID()
		} else {
			this.Signup_step$.$ = STEP_ZIPCODE
		}
		this.unsubscribers.push(
			this.verify_code$.subscribe(()=>this.verify_code_request_errors$.$ = [])
		)
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly search_rest_by_fireFlyID = async ()=>{
		const Signup_email = this.Signup_email$.$
		const Signup_fireFlyID = this.Signup_fireFlyID$.$
		const Signup_token = this.Signup_token$.$
		log(this.ctx, 'search_rest_by_fireFlyID', Signup_fireFlyID, Signup_email)
		// Search Rest based on Signup_fireFlyID
		const requestData = new RoRequestQuery()
		requestData.ff = Signup_fireFlyID
		const payload = await this.fetch_API_REGISTRATION_search(requestData)
		// If rest found then, make it selected
		if (payload.Status === STATUS_SUCCESS && payload.Data.length > 0) {
			this.selected_rest$.$ = new Restaurant(payload.Data[0])
			this.verify_signup_token$.$ = Signup_token
			// if Signup_email is passed then, and register it
			this.owner_email$.$ = Signup_email || ''
			if (isEmail(Signup_email)) {
				this.rest_phone$.$ = this.selected_rest$.$.Phone
				this.Signup_step$.$ = STEP_VERIFY_PHONE
			} else {
				this.continue_restaurant_list_step()
			}
		} else {
			if (payload.Status === STATUS_ERROR && payload.Code === 'REST_ALREADY_REGISTERED') {
				await this.notyf_error('Restaurant is already registered. Please login to your account')
				await this.navigating_goto(`/${Path.RO.BASE}/${Path.RO.LOGIN}`)
			} else {
				this.Signup_step$.$ = STEP_ERROR_LINK
			}
		}
		log(this.ctx, Controller_name, 'searchRegRest', payload)
	}
	readonly init_address_autocomplete = async ()=>{
		if (!has_dom) return
		await this.init_google_maps_promise
		const newRest_Address_str_input = await subscribe_wait_timeout(
			this.newRest_Address_str_input$, I, timeout_ms)
		this.autocomplete = new google.maps.places.Autocomplete(
			newRest_Address_str_input,
			{ types: ['geocode'] },
		)
		this.autocomplete.addListener('place_changed', async ()=>{
			this.newRest_Address$.$ = this.autocomplete.getPlace()
		})
		log(this.ctx, Controller_name, 'init_autocomplete_location()')
	}
	readonly grecaptcha_onverification = (evt:CustomEvent<string>)=>{
		const captcha_code = evt.detail
		if (captcha_code) {
			this.is_captcha_verified$.$ = true
			this.captcha_code = captcha_code
		} else {
			this.is_captcha_verified$.$ = false
			this.captcha_code = ''
		}
		log(this.ctx, Controller_name, 'setVerified()', captcha_code)
	}
	readonly continue_email_step = async (resend:boolean)=>{
		if (!resend) {
			this.verify_signup_resend_count$.$ = 0
		}
		this.verify_phone_busy$.$ = true
		try {
			const requestData = new RoRequestQuery()
			requestData.ff = this.selected_rest$.$.FireFlyID
			requestData.e = this.owner_email$.$
			requestData.plan = this.selected_plan$.$
			const payload = await this.API_REGISTRATION_verify_email(requestData)
			this.Signup_step$.$ = STEP_VERIFY_EMAIL
			if (resend) {
				await this.notyf_success('Email send successfully.')
				this.verify_signup_resend_count$.$++
			}
			log(this.ctx, Controller_name, 'API_REGISTRATION_verify_email', payload)
		} finally {
			this.verify_phone_busy$.$ = false
		}
	}
	readonly resend_code = async ()=>{
		this.busy$.$ = true
		try {
			const requestData = new RoRequestQuery()
			requestData.ff = this.selected_rest$.$.FireFlyID
			requestData.e = this.owner_email$.$
			await this.API_REGISTRATION_resend(requestData)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly continue_new_password_step = async ()=>{
		this.busy$.$ = true
		try {
			const requestData = new RoRequestQuery()
			requestData.uid = this.userID$.$
			requestData.authcode = this.authCode$.$
			requestData.np = this.new_password$.$
			const payload = await this.API_USER_pass(requestData, { ignoreLogin: true })
			this.Signup_step$.$ = STEP_SUCCESS
			log(this.ctx, Controller_name, 'change_password', payload)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly continue_success_step = async ()=>{
		await this.navigating_goto(`/${Path.RO.BASE}/${Path.RO.LOGIN}`)
	}
	readonly continue_sent_email_step = async ()=>{
		await this.navigating_goto(`/${Path.RO.BASE}/${Path.RO.LOGIN}`)
	}
	readonly API_REGISTRATION_register = async ()=>{
		log(this.ctx, Controller_name, 'API_REGISTRATION_register()')
		this.API_REGISTRATION_register_busy$.$ = true
		try {
			const requestData = new RoRequestQuery()
			requestData.ff = this.selected_rest$.$.FireFlyID
			requestData.e = this.owner_email$.$
			requestData.token = this.verify_signup_token$.$
			requestData.x = this.captcha_code
			requestData.plan = this.selected_plan$.$
			const payload = await this.in_API_REGISTRATION_register(requestData)
			this.Signup_step$.$ =
				(payload.Status === STATUS_SUCCESS)
				? STEP_VERIFY_CODE
				: STEP_ERROR_LINK
			log(this.ctx, Controller_name, 'API_REGISTRATION_register', payload)
		} finally {
			this.API_REGISTRATION_register_busy$.$ = false
		}
	}
	readonly API_REGISTRATION_new = async ()=>{
		log(this.ctx, Controller_name, 'API_REGISTRATION_new()')
		this.busy$.$ = true
		try {
			const newRest_Address = this.newRest_Address$.$ as google.maps.places.PlaceResult
			const requestData = new RoRequestQuery()
			requestData.rn = this.newRest_Name$.$
			requestData.t = this.newRest_Title$.$
			requestData.a = newRest_Address?.formatted_address
			requestData.z =
				newRest_Address?.address_components?.find(
					ac=>ac.types.find(t=>t === 'postal_code')
				)?.long_name
			requestData.n = this.newRest_customerName$.$
			requestData.e = this.newRest_Email$.$
			requestData.p = this.newRest_Phone$.$
			requestData.plan = this.selected_plan$.$
			const payload = await this.fetch_API_REGISTRATION_new(requestData)
			if (payload.Status === STATUS_SUCCESS) {
				this.rest_phone$.$ = this.newRest_Phone$.$
				this.Signup_step$.$ = STEP_SENT_EMAIL
			} else if (payload.Status === STATUS_ERROR && payload.Message === 'validate parameters') {
				const { Phone } = this.globalSettings$.$.CustomerService
				this.newRest_Address_str_payload_errors$.$ = [
					`Address is not recognized. Please try again or contact us at <a href="tel://${Phone}">${Phone}</a>.`
				]
				const newRest_Address_unsubscriber = this.newRest_Address$.subscribe(subscribed_newRest_Address=>{
					if (subscribed_newRest_Address !== newRest_Address) {
						this.newRest_Address_str_payload_errors$.$ = []
						setTimeout(()=>newRest_Address_unsubscriber(), 0)
					}
				})
				this.unsubscribers.push(newRest_Address_unsubscriber)
			}
			log(this.ctx, Controller_name, 'API_REGISTRATION_new', payload)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly API_REGISTRATION_verify = async ()=>{
		log(this.ctx, Controller_name, 'verify_phone()')
		this.busy$.$ = true
		try {
			const requestData = new RoRequestQuery()
			requestData.ff = this.selected_rest$.$.FireFlyID
			requestData.e = this.owner_email$.$
			requestData.c = this.verify_code$.$
			const payload = await this.in_API_REGISTRATION_verify(requestData)
			if (payload.Status === STATUS_SUCCESS) {
				if (payload.Code === 'MSG_NEW_USER') {
					this.authCode$.$ = payload.AuthCode
					this.userID$.$ = payload.UserID
					this.Signup_step$.$ = STEP_SET_PASSWORD
				} else {
					this.Signup_step$.$ = STEP_SUCCESS
				}
			} else {
				this.verify_code_request_errors$.$ = [payload.Message || 'Error: Please contact customer support']
			}
			log(this.ctx, Controller_name, 'API_REGISTRATION_verify', payload)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly onclick_goback = async ()=>{
		const page_query = this.page_query$.$
		const returnUrl = page_query.returnUrl || '/backoffice'
		await this.navigating_goto(returnUrl)
	}
}
