import { neq_ } from '@ctx-core/function'
import { subscribe_wait_timeout } from '@ctx-core/store'
import { APIRequest, APIRequestQuery } from '@menus/api'
import { OrderDetailsAPIRequestQuery, OrderItemsDetailsAPIRequestQuery, } from '@menus/consumer-order'
import type { RateOrderItemAPIRequestQuery } from '@menus/consumer-order-common'
import type { SEOAPIRequestQuery } from '@menus/consumer-seo'
import {
	ChangePasswordAPIRequestQuery, ForgotPasswordAPIRequestQuery, LoginAPIRequestQuery, RegisterAPIRequestQuery,
	ResetPasswordAPIRequestQuery, SoldOutActionAPIRequestQuery, TaxRateAPIRequestQuery, UserAPIRequestQuery,
	CloseAccountAPIRequestQuery, consumer_login_user$_b, UserAddressAPIRequestQuery, ValidateCouponCodeRequestQuery,
} from '@menus/consumer-user-common'
import { consumer_request_url__b, fetch_api_request_b, fetch_api_request_T } from '@menus/http'
import type { SearchMenuRequestQuery_I } from '@menus/search-menu-common'
import type { UserAddress, } from '@menus/user-address-common'
import { UserPaymentAPIRequestQuery } from '@menus/user-payment-common'
import { is_new_o_ } from '@menus/util'
import { timeout_ms, WebConfig } from '@menus/web-config'
import {
	search_menus_autosuggest_requestData_, search_menus_autosuggest_payload_T
} from './search_menus_autosuggest_requestData_.js'
import {
	fetch_search_menus_menuitems_requestData_
} from './fetch_search_menus_menuitems_requestData_.js'
import { search_dish_requestData_, search_dish_payload_T } from './search_dish_requestData_.js'
import type { search_menus_dishseo_payload_T } from './search_menus_dishseo_requestData_.js'
import { search_menus_dishseo_requestData_ } from './search_menus_dishseo_requestData_.js'
import type { search_menus_heading_payload_T } from './search_menus_heading_requestData_.js'
import { search_menus_heading_requestData_ } from './search_menus_heading_requestData_.js'
import type { search_menus_restaurants_payload_T } from './search_menus_restaurants_requestData_.js'
import { search_menus_restaurants_requestData_ } from './search_menus_restaurants_requestData_.js'
import { search_menus_menu_requestData_ } from './search_menus_menu_requestData_.js'
import type { search_menus_servicetype_payload_T } from './search_menus_servicetype_requestData_.js'
import { search_menus_servicetype_requestData_ } from './search_menus_servicetype_requestData_.js'
import {
	search_menus_wordfilter_requestData_, search_menus_wordfilter_payload_T
} from './search_menus_wordfilter_requestData_.js'
import type { search_menus_menuname_payload_T } from './search_menus_menuname_requestData_.js'
import { search_menus_menuname_requestData_ } from './search_menus_menuname_requestData_.js'
import type { search_menus_deliveryfee_payload_T } from './search_menus_deliveryfee_requestData_.js'
import { search_menus_deliveryfee_requestData_ } from './search_menus_deliveryfee_requestData_.js'
import {
	search_rest_alphabets_requestData_, search_rest_alphabets_payload_T
} from './search_rest_alphabets_requestData_.js'
import type { get_security_question_payload_T } from './get_security_question.js'
import type { get_service_fee_payload_T } from './get_service_fee.js'
import type { set_default_userPayment_payload_T } from './set_default_userPayment.js'
import type { register_payload_T } from './register.js'
import type { update_SoldOutAction_payload_T } from './update_SoldOutAction.js'
import type { get_userAddresses_payload_T } from './get_userAddresses.js'
import {
	search_dish_alphabets_requestData_, search_dish_alphabets_payload_T
} from './search_dish_alphabets_requestData_.js'
import type { delete_userPayments_payload_T } from './delete_userPayments.js'
import { dishzipseo_requestData_, dishzipseo_payload_T } from './dishzipseo_requestData_.js'
import type { send_forgot_password_payload_T } from './send_forgot_password.js'
import type { verify_phone_payload_T } from './verify_phone.js'
import type { delete_review_image_payload_T } from './delete_review_image.js'
import type { get_past_order_details_payload_T } from './get_past_order_details.js'
import type { change_password_payload_T } from './change_password.js'
import type { save_default_userAddress_payload_T } from './save_default_userAddress.js'
import type { save_userAddress_payload_T } from './save_userAddress.js'
import type { verify_email_payload_T } from './verify_email.js'
import type { get_app_settings_payload_T } from './get_app_settings.js'
import type { search_cuisine_payload_T } from './search_cuisine_requestData_.js'
import type { get_past_order_items_details_payload_T } from './get_past_order_items_details.js'
import type { reset_password_payload_T } from './reset_password.js'
import type { close_account_T } from './close_account.js'
import type { get_tax_rate_payload_T } from './get_tax_rate.js'
import type { validate_coupon_code_payload_T } from './validate_coupon_code.js'
import type { get_popular_dishes_payload_T } from './get_popular_dishes.js'
import type { delete_userPayment_payload_T } from './delete_userPayment.js'
import { search_cuisine_requestData_ } from './search_cuisine_requestData_.js'
import type { get_userPayments_payload_T } from './get_userPayments.js'
import type { get_cities_payload_T, get_cities_requestData_T } from './get_cities.js'
import type { save_userPayment_payload_T } from './save_userPayment.js'
import type { verify_requestData_T } from './verify.js'
import type { get_past_orders_payload_T } from './get_past_orders.js'
import type { login_payload_T } from './login.js'
import type { rate_order_item_payload_T } from './rate_order_item.js'
import type { upload_review_image_payload_T } from './upload_review_image.js'
import { search_menus_request__b } from './search_menus_request__b.js'
import type { consumer_http_Ctx } from './consumer_http_Ctx.js'
export const KEYWORD_SEPARATOR = '|'
export class ConsumerHttpClient {
	constructor(public ctx:consumer_http_Ctx) {}
	readonly consumer_login_user$ = consumer_login_user$_b(this.ctx)
	readonly consumer_request_url_ = consumer_request_url__b(this.ctx)
	readonly fetch_api_request:fetch_api_request_T = fetch_api_request_b(this.ctx)
	readonly search_menus_request_ = search_menus_request__b(this.ctx)
	readonly webConfig:WebConfig = this.ctx.webConfig
	/**
	 * Get Security Question
	 */
	get_security_question = async (data:APIRequestQuery)=>{
		return (
			await this.fetch_api_request(
				await this.get_security_question_request_(data)
			)
		) as get_security_question_payload_T
	}
	get_security_question_request_ = async (data:APIRequestQuery)=>{
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/sq.aspx', data })
		request.method = 'GET'
		return request
	}
	/**
	 * Register user
	 */
	register = async (data:RegisterAPIRequestQuery)=>{
		return (
			await this.fetch_api_request(
				await this.register_request_(data)
			)
		) as register_payload_T
	}
	register_request_ = async (data:RegisterAPIRequestQuery)=>{
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/a.aspx', data })
		request.method = 'GET'
		return request
	}
	send_verification_code = async (data:RegisterAPIRequestQuery)=>{
		return (
			await this.fetch_api_request(
				await this.send_verification_code_request_(data)
			)
		) as verify_phone_payload_T
	}
	send_verification_code_request_ = async (data:RegisterAPIRequestQuery)=>{
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/svc.aspx', data })
		request.method = 'GET'
		return request
	}
	/**
	 * Verify Phone
	 */
	verify_phone = async (data:verify_requestData_T)=>{
		return (
			await this.fetch_api_request(
				await this.verify_phone_request_(data)
			)
		) as verify_phone_payload_T
	}
	verify_phone_request_ = async (data:verify_requestData_T)=>{
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/vp.aspx', data })
		request.method = 'GET'
		return request
	}
	/**
	 * Verify Email
	 */
	verify_email = async (data:verify_requestData_T)=>{
		return (
			await this.fetch_api_request(
				await this.verify_email_request_(data)
			)
		) as verify_email_payload_T
	}
	verify_email_request_ = async (data:verify_requestData_T)=>{
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/v.aspx', data })
		request.method = 'GET'
		return request
	}
	/**
	 * Change Password
	 */
	change_password = async (data:ChangePasswordAPIRequestQuery)=>{
		return (
			await this.fetch_api_request(
				await this.change_password_request_(data)
			)
		) as change_password_payload_T
	}
	change_password_request_ = async (data:ChangePasswordAPIRequestQuery)=>{
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/b.aspx', data })
		request.method = 'GET'
		return request
	}
	/**
	 * Forgot Password
	 */
	send_forgot_password = async (data:ForgotPasswordAPIRequestQuery)=>{
		return (
			await this.fetch_api_request(
				await this.send_forgot_password_request_(data)
			)
		) as send_forgot_password_payload_T
	}
	send_forgot_password_request_ = async (data:ForgotPasswordAPIRequestQuery)=>{
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/fp.aspx', data })
		request.method = 'GET'
		return request
	}
	/**
	 * Reset Password
	 */
	reset_password = async (data:ResetPasswordAPIRequestQuery)=>{
		return (
			await this.fetch_api_request(
				await this.reset_password_request_(data)
			)
		) as reset_password_payload_T
	}
	reset_password_request_ = async (data:ResetPasswordAPIRequestQuery)=>{
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/z.aspx', data })
		request.method = 'GET'
		return request
	}
	close_account = async (data:CloseAccountAPIRequestQuery)=>{
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/rcd.aspx', data })
		request.method = 'GET'
		return (
			await this.fetch_api_request(request)
		) as close_account_T
	}
	/**
	 * Get Tax Rate
	 */
	get_tax_rate = async (data:TaxRateAPIRequestQuery)=>{
		return (
			await this.fetch_api_request(
				await this.get_tax_rate_request_(data)
			)
		) as get_tax_rate_payload_T
	}
	get_tax_rate_request_ = async (data:TaxRateAPIRequestQuery)=>{
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/gtr.aspx', data })
		request.method = 'GET'
		return request
	}
	/**
	 * Get Service Fee
	 */
	get_service_fee = async ()=>{
		return (
			await this.fetch_api_request(
				await this.get_service_fee_request_()
			)
		) as get_service_fee_payload_T
	}
	get_service_fee_request_ = async ()=>{
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/sfr.aspx' })
		return request
	}
	/**
	 * Rate order item
	 */
	rate_order_item = async (data:RateOrderItemAPIRequestQuery)=>{
		return (
			await this.fetch_api_request(
				await this.rate_order_item_request_(data)
			)
		) as rate_order_item_payload_T
	}
	rate_order_item_request_ = async (data:RateOrderItemAPIRequestQuery)=>{
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/acf.aspx', data })
		request.method = 'GET'
		return request
	}
	/**
	 * Upload Review Image
	 */
	upload_review_image = async (data:RateOrderItemAPIRequestQuery, formData:FormData)=>{
		return (
			await this.fetch_api_request(
				await this.upload_review_image_request_(data, formData)
			)
		) as upload_review_image_payload_T
	}
	upload_review_image_request_ = async (data:RateOrderItemAPIRequestQuery, formData:FormData)=>{
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/cfu_mi.aspx', data })
		request.body = JSON.stringify(formData)
		request.method = 'POST'
		return request
	}
	/**
	 * Delete Review Image
	 */
	delete_review_image = async (data:RateOrderItemAPIRequestQuery)=>{
		return (
			await this.fetch_api_request(
				await this.delete_review_image_request_(data)
			)
		) as delete_review_image_payload_T
	}
	delete_review_image_request_ = async (data:RateOrderItemAPIRequestQuery)=>{
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/cfu_mi_r.aspx', data })
		request.method = 'GET'
		return request
	}
	/**
	 * Coupons
	 */
	validate_coupon_code = async (data:ValidateCouponCodeRequestQuery)=>{
		return (
			await this.fetch_api_request(
				await this.validate_coupon_code_request_(data)
			)
		) as validate_coupon_code_payload_T
	}
	validate_coupon_code_request_ = async (data:APIRequestQuery)=>{
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/vcc.aspx', data })
		request.method = 'POST'
		return request
	}
	// Searches all the dishes
	search_dish = async (data:SearchMenuRequestQuery_I)=>{
		return (
			await this.fetch_api_request(
				await this.search_dish_request_(data)
			)
		) as search_dish_payload_T
	}
	search_dish_request_ = (data:SearchMenuRequestQuery_I)=>{
		return this.search_menus_request_(
			search_dish_requestData_(data)
		)
	}
	// Searches all the dish alphabets
	search_dish_alphabets = async (data:SearchMenuRequestQuery_I)=>{
		return (
			await this.fetch_api_request(
				await this.search_dish_alphabets_request_(data)
			)
		) as search_dish_alphabets_payload_T
	}
	search_dish_alphabets_request_ = (data:SearchMenuRequestQuery_I)=>{
		return this.search_menus_request_(
			search_dish_alphabets_requestData_(data)
		)
	}
	// Searches all the $cuisines
	search_cuisine = async (data:SearchMenuRequestQuery_I)=>{
		return (
			await this.fetch_api_request(
				await this.search_cuisine_request_(data)
			)
		) as search_cuisine_payload_T
	}
	search_cuisine_request_ = (data:SearchMenuRequestQuery_I)=>{
		return this.search_menus_request_(
			search_cuisine_requestData_(data)
		)
	}
	// Searches all the restaurants alphabets
	search_rest_alphabets = async (data:SearchMenuRequestQuery_I)=>{
		return (
			await this.fetch_api_request(
				await this.search_rest_alphabets_request_(data)
			)
		) as search_rest_alphabets_payload_T
	}
	search_rest_alphabets_request_ = (data:SearchMenuRequestQuery_I)=>{
		return this.search_menus_request_(
			search_rest_alphabets_requestData_(data)
		)
	}
	// Searches all the restaurants
	search_menus_menu = async (data:SearchMenuRequestQuery_I)=>{
		return (
			await this.fetch_api_request(
				await this.search_menus_menu_request_(data)
			)
		) as search_menus_restaurants_payload_T
	}
	search_menus_menu_request_ = (data:SearchMenuRequestQuery_I)=>{
		return this.search_menus_request_(
			search_menus_menu_requestData_(data)
		)
	}
	// Searches all the restaurants for map
	search_menus_restaurants = async (data:SearchMenuRequestQuery_I)=>{
		return (
			await this.fetch_api_request(
				await this.search_menus_restaurants_request_(data)
			)
		) as search_menus_restaurants_payload_T
	}
	search_menus_restaurants_request_ = (data:SearchMenuRequestQuery_I)=>{
		return this.search_menus_request_(
			search_menus_restaurants_requestData_(data)
		)
	}
	// Searches seo dishes
	search_menus_dishseo = async (data:SearchMenuRequestQuery_I)=>{
		return (
			await this.fetch_api_request(
				await this.search_menus_dishseo_request_(data)
			)
		) as search_menus_dishseo_payload_T
	}
	search_menus_dishseo_request_ = (data:SearchMenuRequestQuery_I)=>{
		return this.search_menus_request_(
			search_menus_dishseo_requestData_(data)
		)
	}
	search_menus_heading = async (data:SearchMenuRequestQuery_I)=>{
		return (
			await this.fetch_api_request(
				await this.search_menus_heading_request_(data)
			)
		) as search_menus_heading_payload_T
	}
	search_menus_heading_request_ = (data:SearchMenuRequestQuery_I)=>{
		return this.search_menus_request_(
			search_menus_heading_requestData_(data)
		)
	}
	// Get all the menu item types
	search_menus_menuname = async (data:SearchMenuRequestQuery_I)=>{
		return (
			await this.fetch_api_request(
				await this.search_menus_menuname_request_(data)
			)
		) as search_menus_menuname_payload_T
	}
	search_menus_menuname_request_ = (data:SearchMenuRequestQuery_I)=>{
		return this.search_menus_request_(
			search_menus_menuname_requestData_(data)
		)
	}

	search_menus_menuitems = async (data:SearchMenuRequestQuery_I)=>{
		return (
			await this.fetch_api_request(
				await this.search_menus_menuitems_request_(data)
			)
		) as search_menus_restaurants_payload_T
	}

	search_menus_menuitems_request_ = async (data:SearchMenuRequestQuery_I)=>{
		return (
			this.search_menus_request_(
				fetch_search_menus_menuitems_requestData_(data)
			)
		)
	}
	// Get autosuggest search list
	search_menus_autosuggest = async (data:SearchMenuRequestQuery_I)=>{
		return (
			await this.fetch_api_request(
				await this.search_menus_autosuggest_request_(data)
			)
		) as search_menus_autosuggest_payload_T
	}
	search_menus_autosuggest_request_ = (data:SearchMenuRequestQuery_I)=>{
		return this.search_menus_request_(
			search_menus_autosuggest_requestData_(data)
		)
	}
	// Get keywords type
	search_menus_wordfilter = async (data:SearchMenuRequestQuery_I)=>{
		return (
			await this.fetch_api_request(
				await this.search_menus_wordfilter_request_(data)
			)
		) as search_menus_wordfilter_payload_T
	}
	search_menus_wordfilter_request_ = (data:SearchMenuRequestQuery_I)=>{
		return this.search_menus_request_(
			search_menus_wordfilter_requestData_(data)
		)
	}
	/**
	 * Get Delivery Fee
	 */
	search_menus_deliveryfee = async (data:SearchMenuRequestQuery_I)=>{
		return (
			await this.fetch_api_request(
				await this.search_menus_deliveryfee_request_(data)
			)
		) as search_menus_deliveryfee_payload_T
	}
	search_menus_deliveryfee_request_ = (data:SearchMenuRequestQuery_I)=>{
		return this.search_menus_request_(
			search_menus_deliveryfee_requestData_(data)
		)
	}
	/**
	 * Get Available Service Types
	 */
	search_menus_servicetype = async (data:SearchMenuRequestQuery_I)=>{
		return (
			await this.fetch_api_request(
				await this.search_menus_servicetype_request_(data)
			)
		) as search_menus_servicetype_payload_T
	}
	search_menus_servicetype_request_ = (data:SearchMenuRequestQuery_I)=>{
		return this.search_menus_request_(
			search_menus_servicetype_requestData_(data)
		)
	}
	/**
	 * Get Cities
	 */
	get_cities = async (data:get_cities_requestData_T)=>{
		return (
			await this.fetch_api_request(
				await this.get_cities_request_(data)
			)
		) as get_cities_payload_T
	}
	get_cities_request_ = async (data:get_cities_requestData_T)=>{
		data.qtype = 'city'
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/seo.aspx', data })
		request.method = 'GET'
		return request
	}
	/**
	 * Popular Dishes
	 */
	get_popular_dishes = async (data:SEOAPIRequestQuery)=>{
		return (
			await this.fetch_api_request(
				await this.get_popular_dishes_request_(data)
			)
		) as get_popular_dishes_payload_T
	}
	get_popular_dishes_request_ = async (data:SEOAPIRequestQuery)=>{
		data.qtype = 'dishperzip'
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/seo.aspx', data })
		request.method = 'GET'
		return request
	}
	/**
	 * Login the user
	 */
	login = async (data:LoginAPIRequestQuery)=>{
		return (
			await this.fetch_api_request(
				await this.login_request_(data)
			)
		) as login_payload_T
	}
	login_request_ = async (data:LoginAPIRequestQuery)=>{
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/l.aspx', data })
		request.method = 'GET'
		return request
	}
	/**
	 * Dish Zip Codes
	 */
	dishzipseo = async (data:SEOAPIRequestQuery)=>{
		return (
			await this.fetch_api_request(
				await this.dishzipseo_request_(data)
			)
		) as dishzipseo_payload_T
	}
	dishzipseo_request_ = async (data:SEOAPIRequestQuery)=>{
		dishzipseo_requestData_(data)
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/seo.aspx', data })
		request.method = 'GET'
		return request
	}
	/**
	 * Gets all the addresses of login user
	 */
	get_userAddresses = async (data:UserAPIRequestQuery)=>{
		return (
			await subscribe_wait_timeout(this.consumer_login_user$, neq_(null), timeout_ms)
			? (
				await this.fetch_api_request(
					await this.get_userAddresses_request_(data)
				)
			) as get_userAddresses_payload_T
			: null
		)
	}
	get_userAddresses_request_ = async (data:UserAPIRequestQuery)=>{
		UserAPIRequestQuery.fill_login_user(data, this.consumer_login_user$.$)
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/h.aspx', data })
		request.method = 'GET'
		return request
	}
	/**
	 * Add address of login user
	 */
	_addUserAddress = async (data:UserAddressAPIRequestQuery)=>{
		return (
			await subscribe_wait_timeout(this.consumer_login_user$, neq_(null), timeout_ms)
			? (
				await this.fetch_api_request(
					await this.addUserAddress_request_(data)
				)
			) : null
		)
	}
	addUserAddress_request_ = async (data:UserAddressAPIRequestQuery)=>{
		UserAPIRequestQuery.fill_login_user(data, this.consumer_login_user$.$)
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/i.aspx', data })
		request.method = 'GET'
		return request
	}
	/**
	 * Update address of login user
	 */
	updateUserAddress_ = async (data:UserAddressAPIRequestQuery)=>{
		return (
			await subscribe_wait_timeout(this.consumer_login_user$, neq_(null), timeout_ms)
			? (
				await this.fetch_api_request(
					await this.updateUserAddress_request_(data)
				)
			) : null
		)
	}
	updateUserAddress_request_ = async (data:UserAddressAPIRequestQuery)=>{
		UserAPIRequestQuery.fill_login_user(data, this.consumer_login_user$.$)
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/k.aspx', data })
		request.method = 'GET'
		return request
	}
	/**
	 * Save address of login user
	 */
	save_userAddress = async (userAddress:UserAddress)=>{
		const request = await this.save_userAddress_request_(userAddress)
		return (
			await this.fetch_api_request(request)
		) as save_userAddress_payload_T
	}
	save_userAddress_request_ = async (userAddress:UserAddress)=>{
		const data = new UserAddressAPIRequestQuery()
		await subscribe_wait_timeout(this.consumer_login_user$.ready$, neq_(null), timeout_ms)
		UserAddressAPIRequestQuery.fill_userAddress(data, userAddress)
		const request =
			is_new_o_(userAddress)
			? await this.addUserAddress_request_(data)
			: await this.updateUserAddress_request_(data)
		return request
	}
	/**
	 * Set default user address
	 */
	save_default_userAddress = async (data:UserAddressAPIRequestQuery)=>{
		return (
			await subscribe_wait_timeout(this.consumer_login_user$, neq_(null), timeout_ms)
			? (
				await this.fetch_api_request(
					await this.save_default_userAddress_request_(data)
				)
			) as save_default_userAddress_payload_T
			: null
		)
	}
	save_default_userAddress_request_ = async (data:UserAddressAPIRequestQuery)=>{
		UserAPIRequestQuery.fill_login_user(data, this.consumer_login_user$.$)
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/m.aspx', data })
		request.method = 'GET'
		return request
	}
	/**
	 * Delete address of login user
	 */
	delete_userAddress = async (data:UserAddressAPIRequestQuery)=>{
		return (
			await subscribe_wait_timeout(this.consumer_login_user$, neq_(null), timeout_ms)
			? (
				await this.fetch_api_request(
					await this.delete_userPayments_request_(data)
				)
			) as delete_userPayments_payload_T
			: null
		)
	}
	delete_userPayments_request_ = async (data:UserAddressAPIRequestQuery)=>{
		UserAPIRequestQuery.fill_login_user(data, this.consumer_login_user$.$)
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/j.aspx', data })
		request.method = 'GET'
		return request
	}
	/**
	 * Gets all the payments method of login user
	 */
	get_userPayments = async (data:UserAPIRequestQuery)=>{
		await subscribe_wait_timeout(this.consumer_login_user$.ready$, neq_(null), timeout_ms)
		return (
			await this.fetch_api_request(
				await this.get_userPayments_request_(data)
			)
		) as get_userPayments_payload_T
	}
	get_userPayments_request_ = async (data:UserAPIRequestQuery)=>{
		UserAPIRequestQuery.fill_login_user(data, this.consumer_login_user$.$)
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/e.aspx', data })
		request.method = 'GET'
		return request
	}
	/**
	 * Save the payment method of login user
	 */
	addUserPayment_ = async (data:UserPaymentAPIRequestQuery)=>{
		return (
			await subscribe_wait_timeout(this.consumer_login_user$, neq_(null), timeout_ms)
			? (
				await this.fetch_api_request(
					await this.addUserPayment_request_(data)
				)
			) : null
		)
	}
	addUserPayment_request_ = async (data:UserPaymentAPIRequestQuery)=>{
		UserPaymentAPIRequestQuery.fill_login_user(data, this.consumer_login_user$.$)
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/o.aspx', data })
		request.method = 'GET'
		return request
	}
	/**
	 * Update the payment method of login user
	 */
	updateUserPayment_ = async (data:UserPaymentAPIRequestQuery)=>{
		return (
			await subscribe_wait_timeout(this.consumer_login_user$, neq_(null), timeout_ms)
			? (
				await this.fetch_api_request(
					await this.updateUserPayment_request_(data)
				)
			) : null
		)
	}
	updateUserPayment_request_ = async (data:UserPaymentAPIRequestQuery)=>{
		UserPaymentAPIRequestQuery.fill_login_user(data, this.consumer_login_user$.$)
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/ubi.aspx', data })
		request.method = 'GET'
		return request
	}
	/**
	 * Save payment of login user
	 */
	save_userPayment = async (data)=>{
		return (
			await this.fetch_api_request(
				await this.save_userPayment_request_(data)
			)
		) as save_userPayment_payload_T
	}
	save_userPayment_request_ = async (in_data)=>{
		const userPayment = in_data.userPayment
		const data = new UserPaymentAPIRequestQuery()
		let request
		if (is_new_o_(userPayment)) {
			UserPaymentAPIRequestQuery.fill_userPayment_for_create(data, userPayment)
			request = await this.addUserPayment_request_(data)
		} else {
			UserPaymentAPIRequestQuery.fill_userPayment_for_update(data, userPayment)
			request = await this.updateUserPayment_request_(data)
		}
		return request
	}
	/**
	 * Delete the payment method of login user
	 */
	delete_userPayment = async (data:UserPaymentAPIRequestQuery)=>{
		return (
			await subscribe_wait_timeout(this.consumer_login_user$, neq_(null), timeout_ms)
			? (
				await this.fetch_api_request(
					await this.delete_userPayment_request_(data)
				)
			) as delete_userPayment_payload_T
			: null
		)
	}
	delete_userPayment_request_ = async (data:UserPaymentAPIRequestQuery)=>{
		UserPaymentAPIRequestQuery.fill_login_user(data, this.consumer_login_user$.$)
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/p.aspx', data })
		request.method = 'GET'
		return request
	}
	/**
	 * Set default user payment
	 */
	set_default_userPayment = async (data:UserPaymentAPIRequestQuery)=>{
		return (
			await subscribe_wait_timeout(this.consumer_login_user$, neq_(null), timeout_ms)
			? (
				await this.fetch_api_request(
					await this.set_default_userPayment_request_(data)
				)
			) as set_default_userPayment_payload_T
			: null
		)
	}
	set_default_userPayment_request_ = async (data:UserPaymentAPIRequestQuery)=>{
		UserPaymentAPIRequestQuery.fill_login_user(data, this.consumer_login_user$.$)
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/q.aspx', data })
		request.method = 'GET'
		return request
	}
	/**
	 * Update Sold Out Action
	 */
	update_SoldOutAction = async (data:SoldOutActionAPIRequestQuery)=>{
		return (
			await subscribe_wait_timeout(this.consumer_login_user$, neq_(null), timeout_ms)
			? (
				await this.fetch_api_request(
					await this.update_SoldOutAction_request_(data)
				)
			) as update_SoldOutAction_payload_T
			: null
		)
	}
	update_SoldOutAction_request_ = async (data:SoldOutActionAPIRequestQuery)=>{
		UserAPIRequestQuery.fill_login_user(data, this.consumer_login_user$.$)
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/ucs.aspx', data })
		request.method = 'GET'
		return request
	}
	/**
	 * Get Service Fee
	 */
	get_app_settings = async (data:APIRequestQuery)=>{
		return (
			await this.fetch_api_request(
				await this.get_app_settings_request_(data)
			)
		) as get_app_settings_payload_T
	}
	get_app_settings_request_ = async (data:APIRequestQuery)=>{
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/ggs.aspx', data })
		request.method = 'GET'
		return request
	}
	/**
	 * Get User Past orders
	 */
	get_past_orders = async (data:UserAPIRequestQuery)=>{
		const consumer_login_user =
			await subscribe_wait_timeout(this.consumer_login_user$, neq_(null), timeout_ms)
		OrderDetailsAPIRequestQuery.fill_login_user(data, consumer_login_user)
		return (
			await this.fetch_api_request(
				await this.get_past_orders_request_(data)
			)
		) as get_past_orders_payload_T
	}
	get_past_orders_request_ = async (data:UserAPIRequestQuery)=>{
		UserAPIRequestQuery.fill_login_user(data, this.consumer_login_user$.$)
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/w.aspx', data })
		request.method = 'GET'
		return request
	}
	/**
	 * Get Past order details
	 */
	get_past_order_details = async (data:UserAPIRequestQuery)=>{
		return (
			await this.fetch_api_request(
				await this.get_past_order_details_request_(data)
			)
		) as get_past_order_details_payload_T
	}
	get_past_order_details_request_ = async (data:UserAPIRequestQuery)=>{
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/go.aspx', data })
		request.method = 'GET'
		return request
	}
	/**
	 * Get Past order items details
	 */
	get_past_order_items_details = async (data:UserAPIRequestQuery)=>{
		const consumer_login_user =
			await subscribe_wait_timeout(this.consumer_login_user$, neq_(null), timeout_ms)
		if (!consumer_login_user) return
		OrderItemsDetailsAPIRequestQuery.fill_login_user(data, consumer_login_user)
		return (
			await this.fetch_api_request(
				await this.get_past_order_items_details_request_(data)
			)
		) as get_past_order_items_details_payload_T
	}
	get_past_order_items_details_request_ = async (data:UserAPIRequestQuery)=>{
		const request = new APIRequest()
		request.url = await this.consumer_request_url_({ path: '/b/x.aspx', data })
		request.method = 'GET'
		return request
	}
}
