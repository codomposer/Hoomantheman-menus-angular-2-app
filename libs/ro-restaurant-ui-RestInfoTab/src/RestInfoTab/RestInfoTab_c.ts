import { tup } from '@ctx-core/array'
import { I } from '@ctx-core/combinators'
import { run } from '@ctx-core/function'
import { deep_clone, omit } from '@ctx-core/object'
import { derived$, Readable$, subscribe_wait_timeout, writable$, Writable$ } from '@ctx-core/store'
import type { StateCtx } from '@menus/address'
import type { Sortable_click_item_evt_T, Sortable_sort_evt_T } from '@menus/dnd'
import { image_, readAsDataURL } from '@menus/dom'
import type { CheckBox_change_evt_T } from '@menus/form-ui'
import { notyf_error_b, notyf_success_b, notyf_warn_b } from '@menus/notyf'
import { params_fireFlyID$_b } from '@menus/page'
import type { Restaurant } from '@menus/restaurant'
import { ro_states$_b } from '@menus/ro-address'
import {
	API_MENUS_dzone_sort_b, API_RESTAURANT_image_del_b, API_RESTAURANT_image_upload_b,
	API_RESTAURANT_info_payload$_T as http_API_RESTAURANT_info_payload_T, API_RESTAURANT_update_payload_T,
	ro_httpClient_b, RoRequestQuery, success_API_RESTAURANT_info_payload_T
} from '@menus/ro-http'
import { API_RESTAURANT_info_payload$_b, RoRestaurant_I, ro_restaurant$_b } from '@menus/ro-restaurant'
import { SubscriptionCheckoutModal_I, ro_restaurant_ui_Ctx } from '@menus/ro-restaurant-ui'
import type { RestContractModal_I } from '@menus/ro-restaurant-ui-RestContractModal'
import type { SaveDeliveryZoneModal_I } from '@menus/ro-restaurant-ui-SaveDeliveryZoneModal'
import type { Holiday } from '@menus/ro-shared-models'
import {
	add_restHour, DayDetails_Closing_Time_errors_2, DayDetails_Closing_Time_errors__T, DayDetails_Opening_Time_errors_2,
	DayDetails_Opening_Time_errors__T, DeliveryZoneItem, HourDayDetails, init_restHours, RestHours, set_list_SortID,
	update_dayID
} from '@menus/ro-shared-models'
import { globalSettings_Subscription$_b } from '@menus/ro-user'
import { DeliveryMode, DeliveryMode_I, ro_login_user$_b, ro_login_user$_T, Subscription } from '@menus/ro-user-common'
import { BaseController, confirmModal$_b } from '@menus/shared-ui'
import { SORT_ERROR_MSG } from '@menus/sort-shared'
import { refresh_writable_, refresh_mixin_T, refresh_writable_T } from '@menus/store'
import { getBytesByMb, log } from '@menus/util'
import { RO_ALLOWED_IMG_TYPES, RO_MAX_IMG_SIZE, STATUS_ERROR, STATUS_SUCCESS, timeout_ms } from '@menus/web-config'
const Controller_name = 'RestInfoTab_c'
export class RestInfoTab_c extends BaseController<ro_restaurant_ui_Ctx> {
	readonly activeNavItemID$:Writable$<string> = writable$(first_scrollSectionID)
	readonly API_MENUS_dzone_sort = API_MENUS_dzone_sort_b(this.ctx)
	readonly API_RESTAURANT_info_payload$ = API_RESTAURANT_info_payload$_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly CIStateList$:refresh_writable_T<StateCtx[]> = refresh_writable_([])
	readonly clone_DeliveryHours$:Writable$<RestHours[]> = writable$([])
	readonly clone_DeliveryZone$:Writable$<DeliveryZoneItem[]> = writable$([])
	readonly clone_Holidays$:Writable$<Holiday[]> = writable$([])
	readonly clone_restarant$:Writable$<Restaurant> = writable$(null)
	readonly clone_WorkingHours$:Writable$<RestHours[]> = writable$([])
	readonly confirmModal$ = confirmModal$_b(this.ctx)
	readonly DeliveryHours$:refresh_writable_T<RestHours[]> = refresh_writable_([])
	readonly DeliveryModes$:Writable$<DeliveryMode[]> = writable$([])
	readonly DeliveryZone$:refresh_writable_T<DeliveryZoneItem[]> = refresh_writable_([])
	readonly EnableOnlineOrdering_busy$:Writable$<boolean> = writable$(false)
	readonly globalSettings_Subscription$ = globalSettings_Subscription$_b(this.ctx)
	readonly Holidays$:refresh_writable_T<Holiday[]> = refresh_writable_([])
	readonly in_API_RESTAURANT_image_del = API_RESTAURANT_image_del_b(this.ctx)
	readonly in_API_RESTAURANT_image_upload = API_RESTAURANT_image_upload_b(this.ctx)
	readonly isNavFixed$:Writable$<boolean> = writable$(false)
	readonly nextSubscription$:Writable$<Subscription> = writable$(null)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly notyf_warn = notyf_warn_b(this.ctx)
	readonly params_fireFlyID$ = params_fireFlyID$_b(this.ctx)
	readonly restContractModal$:Writable$<RestContractModal_I> = writable$(null)
	readonly restImageInput$:Writable$<HTMLInputElement> = writable$(null)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly ro_login_user$:ro_login_user$_T = ro_login_user$_b(this.ctx)
	readonly ro_restaurant$ = ro_restaurant$_b(this.ctx)
	readonly ro_states$ = ro_states$_b(this.ctx)
	readonly saveDeliveryZoneModal$:Writable$<SaveDeliveryZoneModal_I> = writable$(null)
	readonly stateList$:refresh_writable_T<StateCtx[]> = refresh_writable_([])
	readonly subscription$:refresh_writable_T<Subscription> = refresh_writable_(null)
	readonly subscriptionCheckoutModal$:Writable$<SubscriptionCheckoutModal_I> = writable$(null)
	readonly SubscriptionID$:Writable$<number> = writable$(null)
	readonly WorkingHours$:refresh_writable_T<RestHours[]> = refresh_writable_([])
	readonly DeliveryHours_DayDetails_Opening_Time_errors_$:Readable$<DayDetails_Opening_Time_errors__T> = derived$(this.DeliveryHours$,//region
		(DeliveryHours:RestHours[])=>{
			return DayDetails_Opening_Time_errors_2(DeliveryHours)
		})//endregion
	readonly DeliveryHours_DayDetails_Closing_Time_errors_$:Readable$<DayDetails_Closing_Time_errors__T> = derived$(this.DeliveryHours$,//region
		(DeliveryHours:RestHours[])=>{
			return DayDetails_Closing_Time_errors_2(DeliveryHours)
		})//endregion
	readonly WorkingHours_DayDetails_Opening_Time_errors_$:Readable$<DayDetails_Opening_Time_errors__T> = derived$(this.WorkingHours$,//region
		(WorkingHours:RestHours[])=>{
			return DayDetails_Opening_Time_errors_2(WorkingHours)
		})//endregion
	readonly WorkingHours_DayDetails_Closing_Time_errors_$:Readable$<DayDetails_Opening_Time_errors__T> = derived$(this.WorkingHours$,//region
		(WorkingHours:RestHours[])=>{
			return DayDetails_Closing_Time_errors_2(WorkingHours)
		})//endregion
	readonly selected_DeliveryMode$:Readable$<DeliveryMode_I> = derived$(tup(this.DeliveryModes$, this.ro_restaurant$),//region
		([DeliveryModes, ro_restaurant])=>{
			const DeliveryModeID = ro_restaurant?.DeliveryModeID
			if (!DeliveryModeID || !DeliveryModes) return
			return DeliveryModes.find(delivery_mode=>delivery_mode.ID === DeliveryModeID)
		}
	)//endregion
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.unsubscribers.push(
			this.API_RESTAURANT_info_payload$.subscribe(this.onchange_API_RESTAURANT_info_payload),
			this.DeliveryHours$.subscribe(DeliveryHours=>update_dayID(DeliveryHours)),
			this.Holidays$.subscribe(this.validate_dates_Holidays),
			this.WorkingHours$.subscribe(WorkingHours=>update_dayID(WorkingHours)),
		)
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly onchange_API_RESTAURANT_info_payload = async (API_RESTAURANT_info_payload:http_API_RESTAURANT_info_payload_T)=>{
		if (!API_RESTAURANT_info_payload) {
			return
		}
		this.busy$.$ = true
		try {
			await this.init_restInfoTab()
			const ro_restaurant = await subscribe_wait_timeout(this.ro_restaurant$, I, timeout_ms)
			this.stateList$.$ = await this.stateList_(ro_restaurant.State)
			this.CIStateList$.$ = await this.stateList_(ro_restaurant.CI_State)
		} finally {
			this.busy$.$ = false
		}
		await this.init_page()
	}
	readonly init_page = async ()=>{
		log(this.ctx, Controller_name, 'init_page()', new Date().getTime())
		await subscribe_wait_timeout(this.ro_login_user$.ready$, I, timeout_ms)
		await subscribe_wait_timeout(this.ro_restaurant$, I, timeout_ms)
	}
	readonly open_subscriptionCheckoutModal = async ()=>{
		try {
			const ro_restaurant = this.ro_restaurant$.$
			const result = await this.subscriptionCheckoutModal$.$.open({
				fireFlyID: this.params_fireFlyID$.$,
				currentSubscription: this.subscription$.$,
				nextSubscription: this.nextSubscription$.$,
				nextSubscriptionStartDate: ro_restaurant.Owner_NextSubscriptionStartDate,
				Subscription_Expired: ro_restaurant.Subscription_Expired,
				Subscription_Expiration: ro_restaurant.Subscription_Expiration,
			})
			if (result) {
				this.subscription$.$ = result.subscription
				this.busy$.$ = true
				try {
					await this.init_restInfoTab()
				} finally {
					this.busy$.$ = false
				}
			}
		} catch (err) {
			console.error(err)
			throw err
		}
	}
	readonly init_restInfoTab = async ()=>{
		const [globalSettings_Subscription, API_RESTAURANT_info_payload, ro_restaurant] = await Promise.all([
			subscribe_wait_timeout(this.globalSettings_Subscription$, I, timeout_ms),
			subscribe_wait_timeout(this.API_RESTAURANT_info_payload$, I, timeout_ms),
			subscribe_wait_timeout(this.ro_restaurant$, I, timeout_ms),
		]) as [
			Subscription[], success_API_RESTAURANT_info_payload_T, RoRestaurant_I
		]
		this.nextSubscription$.$ = null
		for (const globalSettings_Subscription_i of globalSettings_Subscription || []) {
			if (globalSettings_Subscription_i.ID === ro_restaurant.SubscriptionID) {
				this.subscription$.$ = globalSettings_Subscription_i
			}
			if (globalSettings_Subscription_i.ID === ro_restaurant.Owner_NextSubscriptionID) {
				this.nextSubscription$.$ = globalSettings_Subscription_i
			}
		}
		ro_restaurant.ConfirmAccountNumber = ro_restaurant.AccountNumber
		this.ro_restaurant$.$ = ro_restaurant
		this.clone_restarant$.$ = deep_clone(ro_restaurant)
		const WorkingHours = API_RESTAURANT_info_payload.WorkingHours || []
		init_restHours(WorkingHours)
		this.WorkingHours$.$ = WorkingHours
		this.clone_WorkingHours$.$ = deep_clone(WorkingHours)
		const DeliveryHours = API_RESTAURANT_info_payload.DeliveryHours || []
		init_restHours(DeliveryHours)
		this.DeliveryHours$.$ = DeliveryHours
		this.clone_DeliveryHours$.$ = deep_clone(DeliveryHours)
		this.DeliveryModes$.$ = API_RESTAURANT_info_payload.DeliveryModes || []
		const $Holidays = API_RESTAURANT_info_payload.Holidays || []
		this.Holidays$.$ = $Holidays
		this.clone_Holidays$.$ = deep_clone($Holidays)
		const DeliveryZone = API_RESTAURANT_info_payload.DeliveryZone || []
		this.DeliveryZone$.$ = DeliveryZone
		this.clone_DeliveryZone$.$ = deep_clone(DeliveryZone)
	}
	readonly EnableOnlineOrdering_true = async ()=>{
		log(this.ctx, Controller_name, 'EnableOnlineOrdering_true')
		this.EnableOnlineOrdering_busy$.$ = true
		try {
			const requestData = new RoRequestQuery()
			RoRequestQuery.fill_fireFlyID(requestData, this.params_fireFlyID$.$)
			const payload = await this.ro_httpClient.API_RESTAURANT_enableordering(requestData)
			const ro_restaurant = this.ro_restaurant$.$
			ro_restaurant.EnableOnlineOrdering = true
			this.ro_restaurant$.$ = ro_restaurant
			this.clone_restarant$.$ = deep_clone(ro_restaurant)
			await this.notyf_success('Ordering has been enabled.')
			log(this.ctx, Controller_name, 'EnableOnlineOrdering_true', payload)
		} finally {
			this.EnableOnlineOrdering_busy$.$ = false
		}
	}
	readonly onitemclick_deliveryZoneList = async (evt:Sortable_click_item_evt_T<DeliveryZoneItem>)=>{
		await this.open_saveDeliveryZoneModal(evt.detail.item)
	}
	readonly open_saveDeliveryZoneModal = async (deliveryZoneItem?:DeliveryZoneItem)=>{
		await this.saveDeliveryZoneModal$.$.open({
			fireFlyID: this.params_fireFlyID$.$,
			restInfo: this.ro_restaurant$.$,
			deliveryZoneItem,
			DeliveryZone: this.DeliveryZone$.$,
		})
		this.DeliveryZone$.refresh()
	}
	readonly onchange_deliveryZone_Enabled = async (
		evt:CheckBox_change_evt_T, deliveryZoneItem:DeliveryZoneItem
	)=>{
		deliveryZoneItem.Enabled = evt.detail as boolean
		this.DeliveryZone$.refresh()
	}
	readonly API_RESTAURANT_dzone_del = async (index, deliveryZoneItem:DeliveryZoneItem)=>{
		log(this.ctx, Controller_name, 'API_RESTAURANT_dzone_del()', deliveryZoneItem)
		const confirm = await this.confirmModal$.$.open({
			message: `Are you sure you want to delete ${deliveryZoneItem.Name}?`,
		})
		if (confirm) {
			const requestData = new RoRequestQuery()
			RoRequestQuery.fill_fireFlyID(requestData, this.params_fireFlyID$.$)
			const payload = await this.ro_httpClient.API_RESTAURANT_dzone_del(requestData)
			this.DeliveryZone$.$.splice(index, 1)
			this.DeliveryZone$.refresh()
			console.log('API_RESTAURANT_dzone_del', payload)
		}
	}
	readonly onsort_deliveryZoneList = async (evt:Sortable_sort_evt_T<DeliveryZoneItem[]>)=>{
		const DeliveryZone = evt.detail.out_list
		log(this.ctx, Controller_name, 'finalize_dnd_deliveryZoneList', evt, DeliveryZone)
		const rollback_value = this.DeliveryZone$.$
		const rollback = ()=>{
			this.notyf_error(SORT_ERROR_MSG)
			this.DeliveryZone$.$ = rollback_value
		}
		set_list_SortID(this.DeliveryZone$.$)
		this.DeliveryZone$.$ = DeliveryZone
		try {
			const requestData = new RoRequestQuery()
			RoRequestQuery.fill_fireFlyID(requestData, this.params_fireFlyID$.$)
			const body = {
				SortDetails: []
			}
			for (const deliveryZoneItem of this.DeliveryZone$.$) {
				if (deliveryZoneItem.ID > 0) {
					body.SortDetails.push({
						ID: deliveryZoneItem.ID,
						SortID: deliveryZoneItem.SortID,
					})
				}
			}
			const payload = await this.API_MENUS_dzone_sort(requestData, body)
			if (payload.Status !== 'success') {
				rollback()
			}
			log(this.ctx, Controller_name, 'API_MENUS_dzone_sort', payload)
		} catch (err) {
			rollback()
			throw err
		}
	}
	readonly state_errors_ = ($stateList, label)=>{
		return ($stateList || []).find(s=>s.is_selected) ? [] : [`${label} is required.`]
	}
	readonly DeliveryTime_Max_errors_ = ()=>{
		const ro_restaurant = this.ro_restaurant$.$
		return (
			(!ro_restaurant || (ro_restaurant.DeliveryTime_Max > ro_restaurant.DeliveryTime_Min))
			? []
			: [`Delivery/Catering Time (Max) must be greater than to Delivery/Catering Time (Min)`]
		)
	}
	readonly PickupTime_Max_errors_ = ()=>{
		const ro_restaurant = this.ro_restaurant$.$
		return (
			(!ro_restaurant || (ro_restaurant.PickupTime_Max > ro_restaurant.PickupTime_Min))
			? []
			: [`Pickup Time (Max) must be greater than to Pickup Time (Min)`]
		)
	}
	readonly API_RESTAURANT_update = async ()=>{
		log(this.ctx, Controller_name, 'API_RESTAURANT_update')
		this.ro_restaurant$.refresh({
			State: (this.stateList$.$.find(s=>s.is_selected) as StateCtx).State,
			CI_State: (this.CIStateList$.$.find(s=>s.is_selected) as StateCtx).State,
		})
		const ro_restaurant = this.ro_restaurant$.$
		let accepted_tos = false
		if (!ro_restaurant.Terms) {
			accepted_tos = await this.restContractModal$.$.open({
				ro_restaurant,
				subscription: this.subscription$.$,
			})
			this.ro_restaurant$.refresh()
			if (!accepted_tos) {
				log(this.ctx, Controller_name, 'API_RESTAURANT_update|!accepted_tos')
				return
			}
		}
		this.busy$.$ = true
		try {
			const [
				restInfoResponse, restHoursResponse,
			] = await Promise.all([
				run(()=>{
					const requestData = new RoRequestQuery()
					RoRequestQuery.fill_fireFlyID(requestData, this.params_fireFlyID$.$)
					const cleaned_$restaurant = omit(ro_restaurant, 'FileName')
					return this.ro_httpClient.API_RESTAURANT_update(requestData, cleaned_$restaurant)
				}),
				run(()=>{
					const requestData = new RoRequestQuery()
					RoRequestQuery.fill_fireFlyID(requestData, this.params_fireFlyID$.$)
					requestData.SubscriptionID = this.SubscriptionID$.$
					return this.ro_httpClient.API_RESTAURANT_schedule(requestData, {
						DeliveryHours: this.DeliveryHours$.$,
						WorkingHours: this.WorkingHours$.$,
						Holidays: this.Holidays$.$,
						DeliveryZone: this.DeliveryZone$.$,
					})
				}),
			]) as [API_RESTAURANT_update_payload_T, success_API_RESTAURANT_info_payload_T]
			this.clone_restarant$.$ = deep_clone(ro_restaurant)
			this.WorkingHours$.$ = restHoursResponse.WorkingHours
			init_restHours(this.WorkingHours$.$)
			this.clone_WorkingHours$.$ = deep_clone(this.WorkingHours$.$)
			this.DeliveryHours$.$ = restHoursResponse.DeliveryHours
			init_restHours(this.DeliveryHours$.$)
			this.clone_DeliveryHours$.$ = deep_clone(this.DeliveryHours$.$)
			this.Holidays$.$ = restHoursResponse.Holidays || []
			this.clone_Holidays$.$ = deep_clone(this.Holidays$.$)
			this.DeliveryZone$.$ = restHoursResponse.DeliveryZone || []
			this.clone_DeliveryZone$.$ = deep_clone(this.DeliveryZone$.$)
			if (restInfoResponse.Status === STATUS_ERROR) {
				await this.notyf_error('Unable to save, Form contains some errors.')
			} else {
				await this.notyf_success(`${ro_restaurant.Name} has been updated.`)
			}
			if (accepted_tos) {
				const requestData2 = new RoRequestQuery()
				RoRequestQuery.fill_fireFlyID(requestData2, this.params_fireFlyID$.$)
				const payload = await this.ro_httpClient.API_RESTAURANT_terms(requestData2)
				if (payload.Status === STATUS_SUCCESS) {
					ro_restaurant.Terms = true
					this.ro_restaurant$.refresh()
					this.clone_restarant$.$ = deep_clone(ro_restaurant)
				}
			}
			log(this.ctx, Controller_name, 'API_RESTAURANT_schedule')
		} finally {
			this.busy$.$ = false
		}
	}
	readonly save_API_RESTAURANT_enable = async ()=>{
		const requestData2 = new RoRequestQuery()
		const ro_restaurant = this.ro_restaurant$.$
		const params_fireFlyID = this.params_fireFlyID$.$
		requestData2.enabled = ro_restaurant.Enabled
		RoRequestQuery.fill_fireFlyID(requestData2, params_fireFlyID)
		const payload = await this.ro_httpClient.API_RESTAURANT_enable(requestData2)
		const Enabled_str = ro_restaurant.Enabled ? 'enabled' : 'disabled'
		if (payload.Status === STATUS_SUCCESS) {
			await this.notyf_success(`${ro_restaurant.Name} has been ${Enabled_str}.`)
		} else {
			await this.notyf_error(`Unable to ${Enabled_str} online ordering. Please try again or notify support.`)
			this.ro_restaurant$.refresh({ Enabled: !ro_restaurant.Enabled })
		}
	}
	readonly add_restHour = (
		refresh_store:refresh_mixin_T<unknown>, beforeIndex, hours:RestHours, edit_mode?:boolean
	)=>{
		if (!this.ro_restaurant$.$.Enabled) return
		add_restHour(beforeIndex, hours, edit_mode)
		refresh_store.refresh()
	}
	readonly delete_hour = (refresh_store:refresh_mixin_T<unknown>, index:number, hours:RestHours)=>{
		if (!this.ro_restaurant$.$.Enabled) return
		hours.DayDetails = hours.DayDetails || []
		hours.DayDetails.splice(index, 1)
		refresh_store.refresh()
	}
	readonly push_Holiday = ()=>{
		this.add_Holiday(this.Holidays$.$.length, true)
	}
	readonly add_Holiday = (before_index:number, edit_mode?:boolean)=>{
		if (!this.ro_restaurant$.$.Enabled) return
		const index = before_index || 0
		const Holidays = this.Holidays$.$
		Holidays.splice(
			index + 1, 0, {
				Name: '',
				Enabled: false,
				edit_mode: edit_mode || false,
			})
		this.Holidays$.$ = Holidays
	}
	readonly validate_dates_Holidays = ()=>{
		log(this.ctx, Controller_name, 'validate_dates_Holidays')
		const Holidays = this.Holidays$.$
		let change = false
		for (const Holiday of Holidays) {
			let start_date_error:string, end_date_error:string
			if (Holiday.Date_Start > Holiday.Date_End) {
				start_date_error = `Value can't be greater then closing time`
				Holiday.edit_mode = true
			}
			for (const item of Holidays) {
				if (Holiday.ID !== item.ID) {
					if (Holiday.Date_Start >= item.Date_Start && Holiday.Date_Start <= item.Date_End) {
						start_date_error = `Value is conflicting with other time`
						Holiday.edit_mode = true
					}
					if (Holiday.Date_End >= item.Date_Start && Holiday.Date_End <= item.Date_End) {
						end_date_error = `Value is conflicting with other time`
						Holiday.edit_mode = true
					}
				}
			}
			if (!Holiday.Date_Start) {
				start_date_error = `Value is required`
				Holiday.edit_mode = true
			}
			if (!Holiday.Date_End) {
				end_date_error = `Value is required`
				Holiday.edit_mode = true
			}
			if (Holiday.start_date_error !== start_date_error) {
				Holiday.start_date_error = start_date_error
				change = true
			}
			if (Holiday.end_date_error !== end_date_error) {
				Holiday.end_date_error = end_date_error
				change = true
			}
		}
		if (change) {
			this.Holidays$.refresh()
		}
	}
	readonly delete_Holiday = (index:number)=>{
		if (!this.ro_restaurant$.$.Enabled) return
		this.Holidays$.$.splice(index, 1)
		this.Holidays$.refresh()
	}
	readonly toggle_item_edit_mode = (store:refresh_writable_T<RestHours[]>, details:HourDayDetails)=>{
		if (!this.ro_restaurant$.$.Enabled) return
		if (this.ro_restaurant$.$.EnableOnlineOrdering) {
			details.edit_mode = !details.edit_mode
			store.refresh()
		}
	}
	readonly scrollTo = (elementID:string)=>{
		const element = document.getElementById(elementID)
		if (!element) {
			console.warn(`elementID ${elementID} not rendered`)
			return
		}
		const headerOffset = 65 // height of header
		const topPaddingOffset = 24 // height of header
		window.scrollTo({ top: element.offsetTop - headerOffset - topPaddingOffset, behavior: 'smooth' })
	}
	readonly API_RESTAURANT_image_upload = async ()=>{
		log(this.ctx, Controller_name, 'API_RESTAURANT_image_upload')
		const inputElement = this.restImageInput$.$
		const files_length:number = inputElement.files.length
		const form_data = new FormData()
		if (!files_length) {
			return
		}
		// a file was selected
		const file = inputElement.files.item(0)
		if (RO_ALLOWED_IMG_TYPES.indexOf(file.type) === -1) {
			inputElement.value = ''
			await this.notyf_error('Invalid file format. Only PNG and JPG are allowed.')
			return
		}
		if (file.size > getBytesByMb(RO_MAX_IMG_SIZE)) {
			inputElement.value = ''
			await this.notyf_error(`File size can't be greater then ${RO_MAX_IMG_SIZE}MB.`)
			return
		}
		const src = await readAsDataURL(file)
		const image = await image_(src)
		const { width, height } = image
		if (!width || !height) {
			await this.notyf_error(`Image must have a width & height > 0. Image is ${width}x${height}.`)
			return
		}
		if (width < height) {
			await this.notyf_error(`Image width must be >= height. Image is ${width}x${height}.`)
			return
		}
		form_data.append('file[]', file)
		const requestData = new RoRequestQuery()
		RoRequestQuery.fill_fireFlyID(requestData, this.params_fireFlyID$.$)
		const payload = await this.in_API_RESTAURANT_image_upload(requestData, form_data)
		if (payload.Status === STATUS_SUCCESS) {
			const ro_restaurant = this.ro_restaurant$.$
			ro_restaurant.FileName = payload.FileName
			ro_restaurant.RestImageExist = true
			this.ro_restaurant$.$ = ro_restaurant
			this.clone_restarant$.$ = deep_clone(ro_restaurant)
		}
		log(this.ctx, Controller_name, 'API_RESTAURANT_image_upload', { payload, form_data })
	}
	readonly API_RESTAURANT_image_del = async ()=>{
		log(this.ctx, Controller_name, 'API_RESTAURANT_image_del')
		this.restImageInput$.$.value = ''
		this.busy$.$ = true
		try {
			const requestData = new RoRequestQuery()
			RoRequestQuery.fill_fireFlyID(requestData, this.params_fireFlyID$.$)
			const payload = await this.in_API_RESTAURANT_image_del(requestData)
			if (payload.Status === STATUS_SUCCESS) {
				const ro_restaurant = this.ro_restaurant$.$
				ro_restaurant.FileName = null
				ro_restaurant.RestImageExist = false
				this.ro_restaurant$.$ = ro_restaurant
				this.clone_restarant$.$ = deep_clone(ro_restaurant)
			}
			log(this.ctx, Controller_name, 'API_RESTAURANT_image_del', payload)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly stateList_ = async (selected_State:string)=>{
		const ro_states = await subscribe_wait_timeout(this.ro_states$, I, timeout_ms)
		const stateList:StateCtx[] = deep_clone(ro_states)
		const selected_stateList_item = stateList.find(s=>s.State === selected_State)
		if (selected_stateList_item) {
			selected_stateList_item.is_selected = true
		}
		return stateList
	}
	readonly onscroll_window = ()=>{
		const { scrollY } = window
		this.isNavFixed$.$ = scrollY > 330
		for (const navItem of nav_item_a) {
			if (!navItem.scrollSectionID) continue
			const elementID = navItem.scrollSectionID
			const element = document.getElementById(elementID)
			if (element) {
				const topDistance = element.offsetTop
				if ((topDistance - 100) < scrollY) {
					this.activeNavItemID$.$ = element.getAttribute('id')
				}
			}
		}
	}
	readonly modify_contact_customer_support = async ()=>{
		await this.notyf_warn('To modify, please contact customer support.')
	}
}
export const RestaurantDetails_label = 'Restaurant Details'
export const RestaurantAddress_label = 'Restaurant Address'
export const Contacts_label = 'Restaurant Contacts'
export const ContactDetails_label = 'Contact Details'
export const OrderSettings_label = 'Order Settings'
export const Holidays_label = 'Holidays'
export const WorkingHours_label = 'Working Hours (Dine-in/Pickup)'
export const DeliveryHours_label = 'Delivery/Catering Hours'
export const Delivery_label = 'Delivery Settings'
export const nav_item_a = [
	{
		heading: 'Restaurant Info',
	}, {
		label: RestaurantDetails_label,
		scrollSectionID: 'RestInfoTab_RestaurantDetails',
	}, {
		label: RestaurantAddress_label,
		scrollSectionID: 'RestInfoTab_RestaurantAddress',
	}, {
		label: Contacts_label,
		scrollSectionID: 'RestInfoTab_Contacts',
	}, {
		label: ContactDetails_label,
		scrollSectionID: 'RestInfoTab_ContactDetails',
	}, {
		label: 'Tax Settings',
		scrollSectionID: 'RestInfoTab_TaxSettings',
	}, {
		label: OrderSettings_label,
		scrollSectionID: 'RestInfoTab_OrderSettings',
	}, {
		label: Delivery_label,
		scrollSectionID: 'RestInfoTab_Delivery',
	}, {
		label: WorkingHours_label,
		scrollSectionID: 'RestInfoTab_WorkingHours',
	}, {
		label: DeliveryHours_label,
		scrollSectionID: 'RestInfoTab_DeliveryHours',
	}, {
		label: Holidays_label,
		scrollSectionID: 'RestInfoTab_Holidays',
	}
] as NavItem[]
const first_scrollSectionID = nav_item_a.find(navItem=>navItem.scrollSectionID).scrollSectionID
interface NavItem {
	heading?:string
	class?:string
	label?:string
	scrollSectionID?:string
}
