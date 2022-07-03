import { is_new_o_ } from '@menus/util'
import { APIRequest } from '@menus/api'
import { ro_login_user$_b, Ro_User } from '@menus/ro-user-common'
import { fetch_api_request_b } from '@menus/http'
import type { PlatformSettings } from '@menus/platform-settings'
import { login_user$_T } from '@menus/user-common'
import { CouponAPIRequestQuery } from './CouponAPIRequestQuery.js'
import { DeliveryZoneAPIRequestQuery } from './DeliveryZoneAPIRequestQuery.js'
import { HeadAPIRequestQuery } from './HeadAPIRequestQuery.js'
import { MasterheadingAPIRequestQuery } from './MasterheadingAPIRequestQuery.js'
import {
	API_BILLING_path, API_CHARTS_path, API_COUPONS_path, API_CUSTOMER_path, API_MENUS_path, API_PAGES_TEXT_path,
	API_PAYMENT_METHODS_path, API_PLATFORM_path, API_PREVIEW_path, API_REQUEST_DEMO_path, API_RESET_path,
	API_RESTAURANT_path
} from './paths.js'
import { PaymentMethodAPIRequestQuery } from './PaymentMethodAPIRequestQuery.js'
import { ro_fetch_b } from './ro_fetch_b.js'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
import { ro_request__b } from './ro_request__b.js'
import { RoRequestQuery } from './RoRequestQuery.js'
import type { RoRequestQuery_I } from './RoRequestQuery_I.js'
import type {
	API_BILLING_cancel_next_subscription_payload_T, API_BILLING_upgrade_payload_T, API_CHARTS_compare_payload_T,
	API_CHARTS_cuisine_payload_T, API_CHARTS_map_payload_T, API_CHARTS_menucompetition_payload_T,
	API_CHARTS_menucount_payload_T, API_CHARTS_missingmenu_payload_T, API_CHARTS_resttype_payload_T,
	API_CHARTS_segment_payload_T, API_COUPONS_add_payload_T, API_COUPONS_del_payload_T, API_COUPONS_list_payload_T,
	API_COUPONS_menuitem_payload_T, API_COUPONS_update_payload_T, API_CUSTOMER_review_payload_T,
	API_MENUS_heading_add_payload_T, API_MENUS_heading_del_payload_T, API_MENUS_heading_info_payload_T,
	API_MENUS_heading_list_payload_T, API_MENUS_heading_sort_body_T, API_MENUS_heading_sort_payload_T,
	API_MENUS_heading_update_payload_T, API_MENUS_image_del_payload_T, API_MENUS_image_upload_payload_T,
	API_MENUS_masterheading_add_payload_T, API_MENUS_masterheading_del_payload_T, API_MENUS_masterheading_info_payload_T,
	API_MENUS_masterheading_list_payload_T, API_MENUS_masterheading_sort_payload_T,
	API_MENUS_masterheading_update_payload_T, API_MENUS_menu_sort_payload_T, API_MENUS_menuoption_list_payload_T,
	API_MENUS_menusize_add_payload_T, API_MENUS_menusize_del_payload_T, API_MENUS_menusize_list_payload_T,
	API_MENUS_menusize_sort_payload_T, API_MENUS_menusize_update_payload_T, API_MENUS_optiongroup_list_payload_T,
	API_MENUS_sizelookup_payload_T, API_PAGES_TEXT_about_payload_T, API_PAGES_TEXT_privacy_payload_T,
	API_PAGES_TEXT_return_payload_T, API_PAGES_TEXT_terms_payload_T, API_PAYMENT_METHODS_add_payload_T,
	API_PAYMENT_METHODS_del_payload_T, API_PAYMENT_METHODS_list_payload_T, API_PAYMENT_METHODS_update_payload_T,
	API_PLATFORM_IMAGE_flyer_focus_del_payload_T, API_PLATFORM_IMAGE_flyer_focus_upload_payload_T,
	API_PLATFORM_IMAGE_flyer_mobile_del_payload_T, API_PLATFORM_IMAGE_flyer_mobile_upload_payload_T,
	API_PLATFORM_info_info_payload_T, API_PLATFORM_info_update_payload_T, API_PREVIEW_menuitem_payload_T,
	API_PREVIEW_menuoptions_payload_T, API_PREVIEW_menuoptionsize_payload_T, API_RESET_forgot_payload_T,
	API_RESET_reset_payload_T, API_RESET_verify_email_payload_T, API_RESTAURANT_dzone_add_payload_T,
	API_RESTAURANT_dzone_list_payload_T, API_RESTAURANT_dzone_update_payload_T, API_RESTAURANT_enable_payload_T,
	API_RESTAURANT_enableordering_payload_T, API_RESTAURANT_info_payload$_T, API_RESTAURANT_schedule_body_T,
	API_RESTAURANT_schedule_payload_T, API_RESTAURANT_status_payload_T, API_RESTAURANT_terms_payload_T,
	API_RESTAURANT_update_body_T, API_RESTAURANT_update_payload_T, itunes_lookup_bundle_payload_T,
	requestDemo_payload_T, save_API_COUPONS_data_T, save_API_COUPONS_payload_T, save_API_MENUS_heading_params_T,
	save_API_MENUS_heading_payload_T, save_API_MENUS_masterheading_payload_T, save_API_PAYMENT_METHODS_data_T,
	save_API_PAYMENT_METHODS_payload_T, save_API_RESTAURANT_dzone_data_T, save_API_RESTAURANT_dzone_payload_T,
	saveMasterheading_data_T, updateMasterheadingSortOrder_body_T,
} from './types.js'
import { API_PLATFORM_IMAGE_b } from './API_PLATFORM_IMAGE_b'
export class RoHttpClient<Out extends unknown = unknown> {
	constructor(public ctx:ro_http_Ctx<Out>) {}
	readonly ro_fetch = ro_fetch_b(this.ctx)
	readonly ro_login_user:login_user$_T<Ro_User> = ro_login_user$_b(this.ctx)
	readonly ro_request_ = ro_request__b(this.ctx)
	readonly fetch_api_request = fetch_api_request_b(this.ctx)
	/**
	 * Itunes Lookup
	 */
	itunes_lookup_bundle = (bundleId?)=>{
		const fetch_api_request = fetch_api_request_b<itunes_lookup_bundle_payload_T>(this.ctx)
		const request = new APIRequest()
		request.url = `https://itunes.apple.com/lookup?bundleId=${bundleId}`
		request.method = 'GET'
		return fetch_api_request(request) as Promise<itunes_lookup_bundle_payload_T>
	}
	/**
	 * Customer
	 */
	API_CUSTOMER_review = async (requestData)=>/*region*/ {
		const fetch_api_request = fetch_api_request_b<API_CUSTOMER_review_payload_T>(this.ctx)
		return await fetch_api_request(
			await this.API_CUSTOMER_review_request_(requestData)
		) as API_CUSTOMER_review_payload_T
	}
	API_CUSTOMER_review_request_ = (requestData)=>{
		requestData.qt = 'review'
		return this.ro_request_({
			apiURL: API_CUSTOMER_path,
			requestData
		})
	}//endregion
	/**
	 * Reset
	 */
	API_RESET_forgot = async (requestData)=>{
		requestData.qt = 'forgot'
		return await this.ro_fetch({
			apiURL: API_RESET_path,
			requestData,
			ignoreLogin: true
		}) as API_RESET_forgot_payload_T
	}
	API_RESET_reset = (requestData)=>{
		requestData.qt = 'reset'
		return this.ro_fetch({
			apiURL: API_RESET_path,
			requestData,
			ignoreLogin: true
		}) as Promise<API_RESET_reset_payload_T>
	}
	API_RESET_verify_email = (requestData)=>{
		requestData.qt = 'verify_email'
		return this.ro_fetch({
			apiURL: API_RESET_path,
			requestData,
			cache: true,
			ignoreLogin: true
		}) as Promise<API_RESET_verify_email_payload_T>
	}
	/**
	 * Request DEMO
	 */
	API_REQUEST_DEMO = (requestData)=>{
		return this.ro_fetch({
			apiURL: API_REQUEST_DEMO_path,
			requestData,
			ignoreLogin: true
		}) as Promise<requestDemo_payload_T>
	}
	/**
	 * Platform
	 */
	API_PLATFORM_info_info = (requestData)=>{
		requestData.qt = 'info'
		requestData.act = 'info'
		return this.ro_fetch({
			apiURL: API_PLATFORM_path,
			requestData,
		}) as Promise<API_PLATFORM_info_info_payload_T>
	}
	API_PLATFORM_info_update = (requestData, body:PlatformSettings)=>{
		requestData.qt = 'info'
		requestData.act = 'update'
		requestData.IncludeIntroPages = true
		return this.ro_fetch({
			apiURL: API_PLATFORM_path,
			requestData,
			requestMethod: 'POST',
			body: JSON.stringify(body),
		}) as Promise<API_PLATFORM_info_update_payload_T>
	}
	/**
	 * Dynamic Pages Text
	 */
	API_PAGES_TEXT_about = (requestData)=>{
		requestData.qt = 'about'
		return this.ro_fetch({
			apiURL: API_PAGES_TEXT_path,
			requestData,
		}) as Promise<API_PAGES_TEXT_about_payload_T>
	}
	API_PAGES_TEXT_privacy = (requestData)=>{
		requestData.qt = 'privacy'
		return this.ro_fetch({
			apiURL: API_PAGES_TEXT_path,
			requestData,
		}) as Promise<API_PAGES_TEXT_privacy_payload_T>
	}
	API_PAGES_TEXT_return = (requestData)=>{
		requestData.qt = 'return'
		return this.ro_fetch({
			apiURL: API_PAGES_TEXT_path,
			requestData,
		}) as Promise<API_PAGES_TEXT_return_payload_T>
	}
	API_PAGES_TEXT_terms = (requestData)=>{
		requestData.qt = 'terms'
		return this.ro_fetch({
			apiURL: API_PAGES_TEXT_path,
			requestData,
		}) as Promise<API_PAGES_TEXT_terms_payload_T>
	}
	/**
	 * feature-marketing-banner
	 */
	API_PLATFORM_IMAGE_flyer_focus_upload = (requestData, formData:FormData)=>{
		requestData.qt = 'flyer'
		requestData.act = 'upload'
		return API_PLATFORM_IMAGE_b(this.ctx)(requestData, formData) as Promise<API_PLATFORM_IMAGE_flyer_focus_upload_payload_T>
	}
	API_PLATFORM_IMAGE_flyer_focus_del = (requestData)=>{
		requestData.qt = 'flyer'
		requestData.act = 'del'
		return API_PLATFORM_IMAGE_b(this.ctx)(
			requestData, null
		) as Promise<API_PLATFORM_IMAGE_flyer_focus_del_payload_T>
	}
	API_PLATFORM_IMAGE_flyer_mobile_upload = (requestData, formData:FormData)=>{
		requestData.qt = 'flyer_mobile'
		requestData.act = 'upload'
		return API_PLATFORM_IMAGE_b(this.ctx)(requestData, formData) as Promise<API_PLATFORM_IMAGE_flyer_mobile_upload_payload_T>
	}
	API_PLATFORM_IMAGE_flyer_mobile_del = (requestData)=>{
		requestData.qt = 'flyer_mobile'
		requestData.act = 'del'
		return API_PLATFORM_IMAGE_b(this.ctx)(
			requestData, null
		) as Promise<API_PLATFORM_IMAGE_flyer_mobile_del_payload_T>
	}
 /**
	 * Billing
	 */
	API_BILLING_upgrade = (requestData)=>{
		requestData.qt = 'upgrade'
		return this.ro_fetch({
			apiURL: API_BILLING_path,
			requestData,
		}) as Promise<API_BILLING_upgrade_payload_T>
	}
	API_BILLING_cancel_next_subscription = (requestData)=>{
		requestData.qt = 'cancel_next_subscription'
		return this.ro_fetch({
			apiURL: API_BILLING_path,
			requestData,
		}) as Promise<API_BILLING_cancel_next_subscription_payload_T>
	}
	/**
	 * Payment Methods
	 */
	API_PAYMENT_METHODS_list = (requestData)=>{
		requestData.qt = 'list'
		return this.ro_fetch({
			apiURL: API_PAYMENT_METHODS_path,
			requestData,
		}) as Promise<API_PAYMENT_METHODS_list_payload_T>
	}
	API_PAYMENT_METHODS_del = (requestData)=>{
		requestData.qt = 'del'
		return this.ro_fetch({
			apiURL: API_PAYMENT_METHODS_path,
			requestData,
		}) as Promise<API_PAYMENT_METHODS_del_payload_T>
	}
	private API_PAYMENT_METHODS_add = (requestData)=>{
		requestData.qt = 'add'
		return this.ro_fetch({
			apiURL: API_PAYMENT_METHODS_path,
			requestData,
		}) as Promise<API_PAYMENT_METHODS_add_payload_T>
	}
	private API_PAYMENT_METHODS_update = (requestData)=>{
		requestData.qt = 'update'
		return this.ro_fetch({
			apiURL: API_PAYMENT_METHODS_path,
			requestData,
		}) as Promise<API_PAYMENT_METHODS_update_payload_T>
	}
	save_API_PAYMENT_METHODS = (data:save_API_PAYMENT_METHODS_data_T)=>{
		const paymentMethod = data.paymentMethod
		const requestData = new PaymentMethodAPIRequestQuery()
		let request
		if (is_new_o_(paymentMethod)) {
			PaymentMethodAPIRequestQuery.fillPaymentMethodForCreate(requestData, paymentMethod)
			request = this.API_PAYMENT_METHODS_add(requestData)
		} else {
			PaymentMethodAPIRequestQuery.fillPaymentMethodForUpdate(requestData, paymentMethod)
			request = this.API_PAYMENT_METHODS_update(requestData)
		}
		return request as Promise<save_API_PAYMENT_METHODS_payload_T>
	}
	/**
	 * Restaurant
	 */
	API_RESTAURANT_info = (requestData:RoRequestQuery)=>{
		requestData.qt = 'info'
		return this.ro_fetch({
			apiURL: API_RESTAURANT_path,
			requestData,
		}) as Promise<API_RESTAURANT_info_payload$_T>
	}
	API_RESTAURANT_terms = (requestData)=>{
		requestData.qt = 'terms'
		return this.ro_fetch({
			apiURL: API_RESTAURANT_path,
			requestData,
		}) as Promise<API_RESTAURANT_terms_payload_T>
	}
	API_RESTAURANT_update = (requestData, body:API_RESTAURANT_update_body_T)=>{
		requestData.qt = 'update'
		return this.ro_fetch({
			apiURL: API_RESTAURANT_path,
			requestData,
			requestMethod: 'POST',
			body: JSON.stringify(body),
		}) as Promise<API_RESTAURANT_update_payload_T>
	}
	API_RESTAURANT_schedule = (requestData, body:API_RESTAURANT_schedule_body_T)=>{
		requestData.qt = 'schedule'
		return this.ro_fetch({
			apiURL: API_RESTAURANT_path,
			requestData,
			requestMethod: 'POST',
			body: JSON.stringify(body),
		}) as Promise<API_RESTAURANT_schedule_payload_T>
	}
	API_RESTAURANT_status = (requestData)=>{
		requestData.qt = 'status'
		return this.ro_fetch({
			apiURL: API_RESTAURANT_path,
			requestData,
		}) as Promise<API_RESTAURANT_status_payload_T>
	}
	API_RESTAURANT_enableordering = (requestData)=>{
		requestData.qt = 'enableordering'
		return this.ro_fetch({
			apiURL: API_RESTAURANT_path,
			requestData,
		}) as Promise<API_RESTAURANT_enableordering_payload_T>
	}
	API_RESTAURANT_enable = (requestData)=>{
		requestData.qt = 'enable'
		return this.ro_fetch({
			apiURL: API_RESTAURANT_path,
			requestData,
		}) as Promise<API_RESTAURANT_enable_payload_T>
	}
	API_RESTAURANT_dzone_list = (requestData)=>{
		requestData.qt = 'dzone'
		requestData.act = 'list'
		return this.ro_fetch({
			apiURL: API_RESTAURANT_path,
			requestData,
		}) as Promise<API_RESTAURANT_dzone_list_payload_T>
	}
	save_API_RESTAURANT_dzone = (data:save_API_RESTAURANT_dzone_data_T)=>{
		const fireFlyID = data.fireFlyID
		const deliveryZoneItem = data.deliveryZoneItem
		const requestData = new DeliveryZoneAPIRequestQuery()
		DeliveryZoneAPIRequestQuery.fill_fireFlyID(requestData, fireFlyID)
		DeliveryZoneAPIRequestQuery.fillDeliveryZone(requestData, deliveryZoneItem)
		let request
		if (is_new_o_(deliveryZoneItem)) {
			request = this.API_RESTAURANT_dzone_add(requestData)
		} else {
			DeliveryZoneAPIRequestQuery.fill_ID(requestData, deliveryZoneItem.ID)
			request = this.API_RESTAURANT_dzone_update(requestData)
		}
		return request as Promise<save_API_RESTAURANT_dzone_payload_T>
	}
	private API_RESTAURANT_dzone_add = (requestData)=>{
		requestData.qt = 'dzone'
		requestData.act = 'add'
		return this.ro_fetch({
			apiURL: API_RESTAURANT_path,
			requestData,
		}) as Promise<API_RESTAURANT_dzone_add_payload_T>
	}
	private API_RESTAURANT_dzone_update = (requestData)=>{
		requestData.qt = 'dzone'
		requestData.act = 'update'
		return this.ro_fetch({
			apiURL: API_RESTAURANT_path,
			requestData,
		}) as Promise<API_RESTAURANT_dzone_update_payload_T>
	}
	API_RESTAURANT_dzone_del = (requestData)=>{
		requestData.qt = 'dzone'
		requestData.act = 'del'
		return this.ro_fetch({
			apiURL: API_RESTAURANT_path,
			requestData,
		})
	}
	/**
	 * Menus
	 */
	API_MENUS_masterheading_list = (requestData)=>{
		requestData.qt = 'masterheading'
		requestData.act = 'list'
		return this.ro_fetch({
			apiURL: API_MENUS_path,
			requestData,
		}) as Promise<API_MENUS_masterheading_list_payload_T>
	}
	save_API_MENUS_masterheading = async (data:saveMasterheading_data_T)=>{
		const { fireFlyID, ro_masterheading } = data
		const requestData = new MasterheadingAPIRequestQuery()
		MasterheadingAPIRequestQuery.fill_fireFlyID(requestData, fireFlyID)
		MasterheadingAPIRequestQuery.fill_ro_masterheading(requestData, ro_masterheading)
		let payload
		if (is_new_o_(ro_masterheading)) {
			payload = this.API_MENUS_masterheading_add(requestData)
		} else {
			MasterheadingAPIRequestQuery.fill_ID(requestData, ro_masterheading.ID)
			payload = this.API_MENUS_masterheading_update(requestData)
		}
		return payload as Promise<save_API_MENUS_masterheading_payload_T>
	}
	private API_MENUS_masterheading_add = (requestData)=>{
		requestData.qt = 'masterheading'
		requestData.act = 'add'
		return this.ro_fetch({
			apiURL: API_MENUS_path,
			requestData,
		}) as Promise<API_MENUS_masterheading_add_payload_T>
	}
	private API_MENUS_masterheading_update = (requestData)=>{
		requestData.qt = 'masterheading'
		requestData.act = 'update'
		return this.ro_fetch({
			apiURL: API_MENUS_path,
			requestData,
		}) as Promise<API_MENUS_masterheading_update_payload_T>
	}
	API_MENUS_masterheading_del = (requestData)=>{
		requestData.qt = 'masterheading'
		requestData.act = 'del'
		return this.ro_fetch({
			apiURL: API_MENUS_path,
			requestData,
		}) as Promise<API_MENUS_masterheading_del_payload_T>
	}
	API_MENUS_masterheading_sort = (requestData, body:updateMasterheadingSortOrder_body_T)=>{
		requestData.qt = 'masterheading'
		requestData.act = 'sort'
		return this.ro_fetch({
			apiURL: API_MENUS_path,
			requestData,
			requestMethod: 'POST',
			body: JSON.stringify(body),
		}) as Promise<API_MENUS_masterheading_sort_payload_T>
	}
	API_MENUS_masterheading_info = (requestData)=>{
		requestData.qt = 'masterheading'
		requestData.act = 'info'
		return this.ro_fetch({
			apiURL: API_MENUS_path,
			requestData,
		}) as Promise<API_MENUS_masterheading_info_payload_T>
	}
	/* Schedule */
	API_MENUS_heading_list = (requestData)=>{
		requestData.qt = 'heading'
		requestData.act = 'list'
		return this.ro_fetch({
			apiURL: API_MENUS_path,
			requestData,
		}) as Promise<API_MENUS_heading_list_payload_T>
	}
	API_MENUS_heading_info = (requestData)=>{
		requestData.qt = 'heading'
		requestData.act = 'info'
		return this.ro_fetch({
			apiURL: API_MENUS_path,
			requestData,
		}) as Promise<API_MENUS_heading_info_payload_T>
	}
	/* Master Heading */
	save_API_MENUS_heading = (data:save_API_MENUS_heading_params_T)=>{
		const { fireFlyID, MasterheadingID, head } = data
		const requestData = new HeadAPIRequestQuery()
		HeadAPIRequestQuery.fill_fireFlyID(requestData, fireFlyID)
		HeadAPIRequestQuery.fill_ro_head(requestData, head)
		let request
		if (is_new_o_(head)) {
			HeadAPIRequestQuery.fill_MasterheadingID(requestData, MasterheadingID)
			request = this.API_MENUS_heading_add(requestData)
		} else {
			HeadAPIRequestQuery.fill_ID(requestData, head.ID)
			request = this.API_MENUS_heading_update(requestData)
		}
		return request as Promise<save_API_MENUS_heading_payload_T>
	}
	private API_MENUS_heading_add = (requestData)=>{
		requestData.qt = 'heading'
		requestData.act = 'add'
		return this.ro_fetch({
			apiURL: API_MENUS_path,
			requestData,
		}) as Promise<API_MENUS_heading_add_payload_T>
	}
	private API_MENUS_heading_update = (requestData)=>{
		requestData.qt = 'heading'
		requestData.act = 'update'
		return this.ro_fetch({
			apiURL: API_MENUS_path,
			requestData,
		}) as Promise<API_MENUS_heading_update_payload_T>
	}
	API_MENUS_heading_del = (requestData)=>{
		requestData.qt = 'heading'
		requestData.act = 'del'
		return this.ro_fetch({
			apiURL: API_MENUS_path,
			requestData,
		}) as Promise<API_MENUS_heading_del_payload_T>
	}
	API_MENUS_heading_sort = (requestData, body:API_MENUS_heading_sort_body_T)=>{
		requestData.qt = 'heading'
		requestData.act = 'sort'
		return this.ro_fetch({
			apiURL: API_MENUS_path,
			requestData,
			requestMethod: 'POST',
			body: JSON.stringify(body),
		}) as Promise<API_MENUS_heading_sort_payload_T>
	}
	/* Heading */
	API_MENUS_image_upload = (requestData, formData:FormData)=>{
		requestData.qt = 'image'
		requestData.act = 'upload'
		return this.ro_fetch({
			apiURL: API_MENUS_path,
			requestData,
			requestMethod: 'POST',
			body: formData,
		}) as Promise<API_MENUS_image_upload_payload_T>
	}
	API_MENUS_image_del = (requestData)=>{
		requestData.qt = 'image'
		requestData.act = 'del'
		return this.ro_fetch({
			apiURL: API_MENUS_path,
			requestData,
		}) as Promise<API_MENUS_image_del_payload_T>
	}
	API_MENUS_menu_sort = (requestData, body)=>{
		requestData.qt = 'menu'
		requestData.act = 'sort'
		return this.ro_fetch({
			apiURL: API_MENUS_path,
			requestData,
			requestMethod: 'POST',
			body: JSON.stringify(body),
		}) as Promise<API_MENUS_menu_sort_payload_T>
	}
	API_MENUS_sizelookup = (requestData)=>{
		requestData.qt = 'sizelookup'
		return this.ro_fetch({
			apiURL: API_MENUS_path,
			requestData,
		}) as Promise<API_MENUS_sizelookup_payload_T>
	}
	API_MENUS_menusize_list = (requestData)=>{
		requestData.qt = 'menusize'
		requestData.act = 'list'
		return this.ro_fetch({
			apiURL: API_MENUS_path,
			requestData,
		}) as Promise<API_MENUS_menusize_list_payload_T>
	}
	API_MENUS_menusize_add = (requestData)=>{
		requestData.qt = 'menusize'
		requestData.act = 'add'
		return this.ro_fetch({
			apiURL: API_MENUS_path,
			requestData,
		}) as Promise<API_MENUS_menusize_add_payload_T>
	}
	/* Menu Item */
	API_MENUS_menusize_update = (requestData)=>{
		requestData.qt = 'menusize'
		requestData.act = 'update'
		return this.ro_fetch({
			apiURL: API_MENUS_path,
			requestData,
		}) as Promise<API_MENUS_menusize_update_payload_T>
	}
	API_MENUS_menusize_del = (requestData)=>{
		requestData.qt = 'menusize'
		requestData.act = 'del'
		return this.ro_fetch({
			apiURL: API_MENUS_path,
			requestData,
		}) as Promise<API_MENUS_menusize_del_payload_T>
	}
	API_MENUS_menusize_sort = (requestData, body)=>{
		requestData.qt = 'menusize'
		requestData.act = 'sort'
		return this.ro_fetch({
			apiURL: API_MENUS_path,
			requestData,
			requestMethod: 'POST',
			body: JSON.stringify(body),
		}) as Promise<API_MENUS_menusize_sort_payload_T>
	}
	API_MENUS_menuoption_list = (requestData)=>{
		requestData.qt = 'menuoption'
		requestData.act = 'list'
		return this.ro_fetch({
			apiURL: API_MENUS_path,
			requestData,
		}) as Promise<API_MENUS_menuoption_list_payload_T>
	}
	API_MENUS_optiongroup_list = (requestData)=>{
		requestData.qt = 'optiongroup'
		requestData.act = 'list'
		return this.ro_fetch({
			apiURL: API_MENUS_path,
			requestData
		}) as Promise<API_MENUS_optiongroup_list_payload_T>
	}
	/**
	 * Coupons
	 */
	API_COUPONS_list = (requestData)=>{
		requestData.qt = 'list'
		return this.ro_fetch({
			apiURL: API_COUPONS_path,
			requestData,
		}) as Promise<API_COUPONS_list_payload_T>
	}
	private API_COUPONS_add = (requestData, menuitems:string[])=>{
		requestData.qt = 'add'
		return this.ro_fetch({
			apiURL: API_COUPONS_path,
			requestData,
			requestMethod: 'POST',
			body: JSON.stringify({
				menuitems,
			}),
		}) as Promise<API_COUPONS_add_payload_T>
	}
	private API_COUPONS_update = (requestData, menuitems:string[])=>{
		requestData.qt = 'update'
		return this.ro_fetch({
			apiURL: API_COUPONS_path,
			requestData,
			requestMethod: 'POST',
			body: JSON.stringify({
				menuitems,
			}),
		}) as Promise<API_COUPONS_update_payload_T>
	}
	save_API_COUPONS = (data:save_API_COUPONS_data_T)=>{
		const { fireFlyID, ro_coupon } = data
		const requestData = new CouponAPIRequestQuery()
		CouponAPIRequestQuery.fill_fireFlyID(requestData, fireFlyID)
		CouponAPIRequestQuery.fillCoupon(requestData, ro_coupon)
		let request
		if (is_new_o_(ro_coupon)) {
			request = this.API_COUPONS_add(requestData, ro_coupon.MenuItems)
		} else {
			CouponAPIRequestQuery.fill_ID(requestData, ro_coupon.ID)
			request = this.API_COUPONS_update(requestData, ro_coupon.MenuItems)
		}
		return request as Promise<save_API_COUPONS_payload_T>
	}
	API_COUPONS_del = (requestData)=>{
		requestData.qt = 'del'
		return this.ro_fetch({
			apiURL: API_COUPONS_path,
			requestData,
		}) as Promise<API_COUPONS_del_payload_T>
	}
	API_COUPONS_menuitem = (requestData)=>{
		requestData.qt = 'menuitem'
		return this.ro_fetch({
			apiURL: API_COUPONS_path,
			requestData,
		}) as Promise<API_COUPONS_menuitem_payload_T>
	}
	/**
	 * Preview
	 */
	API_PREVIEW_menuitem = (requestData)=>{
		requestData.qt = 'menuitem'
		return this.ro_fetch({
			apiURL: API_PREVIEW_path,
			requestData,
		}) as Promise<API_PREVIEW_menuitem_payload_T>
	}
	API_PREVIEW_menuoptionsize = (requestData)=>{
		requestData.qt = 'menuoptionsize'
		return this.ro_fetch({
			apiURL: API_PREVIEW_path,
			requestData,
		}) as Promise<API_PREVIEW_menuoptionsize_payload_T>
	}
	API_PREVIEW_menuoptions = (requestData:RoRequestQuery_I)=>{
		requestData.qt = 'menuoptions'
		return this.ro_fetch({
			apiURL: API_PREVIEW_path,
			requestData,
		}) as Promise<API_PREVIEW_menuoptions_payload_T>
	}
	/**
	 * Charts
	 */
	API_CHARTS_map = (requestData)=>{
		requestData.qt = 'map'
		requestData.mod = 1
		return this.ro_fetch({
			apiURL: API_CHARTS_path,
			requestData,
			cache: true,
		}) as Promise<API_CHARTS_map_payload_T>
	}
	API_CHARTS_compare = (requestData)=>{
		requestData.qt = 'compare'
		requestData.mod = 1
		return this.ro_fetch({
			apiURL: API_CHARTS_path,
			requestData,
			cache: true,
		}) as Promise<API_CHARTS_compare_payload_T>
	}
	API_CHARTS_menucount = (requestData)=>{
		requestData.qt = 'menucount'
		requestData.mod = 1
		return this.ro_fetch({
			apiURL: API_CHARTS_path,
			requestData,
			cache: true,
		}) as Promise<API_CHARTS_menucount_payload_T>
	}
	API_CHARTS_resttype = (requestData)=>{
		requestData.qt = 'resttype'
		requestData.mod = 1
		return this.ro_fetch({
			apiURL: API_CHARTS_path,
			requestData,
			cache: true,
		}) as Promise<API_CHARTS_resttype_payload_T>
	}
	API_CHARTS_segment = (requestData)=>{
		requestData.qt = 'segment'
		requestData.mod = 1
		return this.ro_fetch({
			apiURL: API_CHARTS_path,
			requestData,
			cache: true,
		}) as Promise<API_CHARTS_segment_payload_T>
	}
	API_CHARTS_cuisine = (requestData)=>{
		requestData.qt = 'cuisine'
		requestData.mod = 1
		return this.ro_fetch({
			apiURL: API_CHARTS_path,
			requestData,
			cache: true,
		}) as Promise<API_CHARTS_cuisine_payload_T>
	}
	API_CHARTS_menucompetition = (requestData)=>{
		requestData.qt = 'menucompetition'
		requestData.mod = 1
		return this.ro_fetch({
			apiURL: API_CHARTS_path,
			requestData,
			cache: true,
		}) as Promise<API_CHARTS_menucompetition_payload_T>
	}
	API_CHARTS_missingmenu = (requestData)=>{
		requestData.qt = 'missingmenu'
		requestData.mod = 1
		return this.ro_fetch({
			apiURL: API_CHARTS_path,
			requestData,
			cache: true,
		}) as Promise<API_CHARTS_missingmenu_payload_T>
	}
}
