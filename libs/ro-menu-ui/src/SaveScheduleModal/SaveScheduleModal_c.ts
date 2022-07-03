import { tup } from '@ctx-core/array'
import { derived$, Readable$, writable$, Writable$ } from '@ctx-core/store'
import { BaseModalController } from '@menus/modal'
import {
	add_restHour, DateTimeOptions, DayDetails_Closing_Time_errors_2, DayDetails_Closing_Time_errors__T,
	DayDetails_Opening_Time_errors_2, DayDetails_Opening_Time_errors__T, init_restHours, RoMasterheading_I, Schedule,
} from '@menus/ro-shared-models'
import { log } from '@menus/util'
import { API_MENUS_sched_add_b, fetch_API_MENUS_sched_list_b, ro_httpClient_b, RoRequestQuery } from '@menus/ro-http'
import { notyf_error_b } from '@menus/notyf'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import type { SaveScheduleModal_close_T, SaveScheduleModal_open_T, SaveScheduleModal_I } from './SaveScheduleModal_I.js'
export const TAB_DELIVERY_HOURS = 'DeliveryHours'
export const TAB_PICKUP_HOURS = 'PickupHours'
export const TAB_CATERING_HOURS = 'CateringHours'
export const TAB_DINING_HOURS = 'DiningHours'
export const dt_options = {
	enableTime: true,
	noCalendar: true,
} as DateTimeOptions
const Controller_name = 'SaveScheduleModal_c.js'
export class SaveScheduleModal_c
	extends BaseModalController<SaveScheduleModal_open_T, SaveScheduleModal_close_T, ro_menu_ui_Ctx>
	implements SaveScheduleModal_I {
	readonly activeTab$:Writable$<string> = writable$(null)
	readonly API_MENUS_sched_add = API_MENUS_sched_add_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly fetch_API_MENUS_sched_list = fetch_API_MENUS_sched_list_b(this.ctx)
	readonly fireFlyID$:Writable$<string> = writable$(null)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly ro_masterheading$:Writable$<RoMasterheading_I> = writable$(null)
	readonly schedule$:Writable$<Schedule> = writable$(null)
	readonly schedule_DayDetails_Opening_Time_errors_2$:Readable$<_DayDetails_Opening_Time_errors_2schedule_T> = derived$(this.schedule$,//region
		(schedule)=>{
			return schedule && {
				DeliveryHours: DayDetails_Opening_Time_errors_2(schedule.DeliveryHours),
				PickupHours: DayDetails_Opening_Time_errors_2(schedule.PickupHours),
				CateringHours: DayDetails_Opening_Time_errors_2(schedule.CateringHours),
				DiningHours: DayDetails_Opening_Time_errors_2(schedule.DiningHours),
			} as _DayDetails_Opening_Time_errors_2schedule_T
		}
	)//endregion
	readonly schedule_DayDetails_Closing_Time_errors$ = derived$(this.schedule$,//region
		(schedule)=>{
			return schedule && {
				DeliveryHours: DayDetails_Closing_Time_errors_2(schedule.DeliveryHours),
				PickupHours: DayDetails_Closing_Time_errors_2(schedule.PickupHours),
				CateringHours: DayDetails_Closing_Time_errors_2(schedule.CateringHours),
				DiningHours: DayDetails_Closing_Time_errors_2(schedule.DiningHours),
			} as _DayDetails_Closing_Time_errors_schedule_T
		}
	) as Readable$<_DayDetails_Closing_Time_errors_schedule_T>//endregion
	readonly invalidTabs$ = derived$(//region
		tup(this.schedule$, this.schedule_DayDetails_Opening_Time_errors_2$, this.schedule_DayDetails_Closing_Time_errors$),
		(args)=>{
			return {
				DeliveryHours:
					this.day_invalid_('DeliveryHours', args),
				PickupHours:
					this.day_invalid_('PickupHours', args),
				CateringHours:
					this.day_invalid_('CateringHours', args),
				DiningHours:
					this.day_invalid_('DiningHours', args),
			}
		}
	) as Readable$<InvalidTabs>
	day_invalid_(
		key:string,
		[schedule, schedule_DayDetails_Opening_Time_errors_2, schedule_DayDetails_Closing_Time_errors]:invalidTabs_args_T
	):boolean {
		return schedule && (
			schedule[key].some(
				RestHours=>
					RestHours.DayDetails.some(DayDetails=>
						schedule_DayDetails_Opening_Time_errors_2[key](DayDetails)?.length)
					|| RestHours.DayDetails.some(DayDetails=>
						schedule_DayDetails_Closing_Time_errors[key](DayDetails)?.length)
			)
		)
	}//endregion
	readonly valid$:Readable$<boolean> = derived$(this.invalidTabs$,//region
		(invalidTabs)=>{
			return Object.keys(invalidTabs).every(key=>!invalidTabs[key])
		}
	)//endregion
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly before_open_modal = async (data:SaveScheduleModal_open_T)=>{
		const fireFlyID = data.fireFlyID
		const ro_masterheading = data.ro_masterheading
		this.fireFlyID$.$ = fireFlyID
		this.ro_masterheading$.$ = ro_masterheading
		const activeTab =
			ro_masterheading.IsDelivery
			? TAB_DELIVERY_HOURS
			: ro_masterheading.IsPickup
				? TAB_PICKUP_HOURS
				: ro_masterheading.IsCatering
					? TAB_CATERING_HOURS
						? ro_masterheading.IsDiningIn
						: TAB_DINING_HOURS
					: null
		if (activeTab) {
			this.activeTab$.$ = activeTab as string
		}
		this.load_data().then()
	}
	readonly load_data = async ()=>{
		log(this.ctx, Controller_name, 'load_data()')
		this.busy$.$ = true
		try {
			const requestData = new RoRequestQuery()
			RoRequestQuery.fill_fireFlyID(requestData, this.fireFlyID$.$)
			RoRequestQuery.fill_MasterheadingID(requestData, this.ro_masterheading$.$.ID)
			const payload = await this.fetch_API_MENUS_sched_list(requestData)
			const schedule = payload
			init_restHours(schedule.DiningHours)
			init_restHours(schedule.CateringHours)
			init_restHours(schedule.DeliveryHours)
			init_restHours(schedule.PickupHours)
			this.schedule$.$ = schedule
			log(this.ctx, Controller_name, 'API_MENUS_sched_list', payload)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly add_restHour = (beforeIndex, item, edit_mode?:boolean)=>{
		add_restHour(beforeIndex, item, edit_mode)
	}
	readonly deleteHour = (index, item)=>{
		item.DayDetails = item.DayDetails || []
		item.DayDetails.splice(index, 1)
	}
	readonly save = async (close_modal?:boolean)=>{
		log(this.ctx, Controller_name, 'save')
		if (!this.valid$.$) {
			this.notyf_error('Form contains some errors.')
			return
		}
		this.busy$.$ = true
		try {
			const requestData = new RoRequestQuery()
			RoRequestQuery.fill_fireFlyID(requestData, this.fireFlyID$.$)
			RoRequestQuery.fill_MasterheadingID(requestData, this.ro_masterheading$.$.ID)
			const schedule = this.schedule$.$
			const payload = await this.API_MENUS_sched_add(requestData, {
				DeliveryHours: schedule.DeliveryHours,
				CateringHours: schedule.CateringHours,
				PickupHours: schedule.PickupHours,
				DiningHours: schedule.DiningHours,
			})
			schedule.DeliveryHours = payload.DeliveryHours
			schedule.CateringHours = payload.CateringHours
			schedule.PickupHours = payload.PickupHours
			schedule.DiningHours = payload.DiningHours
			init_restHours(schedule.DiningHours)
			init_restHours(schedule.CateringHours)
			init_restHours(schedule.DeliveryHours)
			init_restHours(schedule.PickupHours)
			this.schedule$.$ = schedule
			log(this.ctx, Controller_name, 'API_MENUS_sched_add', payload)
		} finally {
			this.busy$.$ = false
		}
		if (close_modal) {
			this.close().then()
		}
	}
}
export interface InvalidTabs {
	DeliveryHours:boolean
	PickupHours:boolean
	CateringHours:boolean
	DiningHours:boolean
}
export interface _DayDetails_Opening_Time_errors_2schedule_T {
	DeliveryHours:DayDetails_Opening_Time_errors__T
	PickupHours:DayDetails_Opening_Time_errors__T
	CateringHours:DayDetails_Opening_Time_errors__T
	DiningHours:DayDetails_Opening_Time_errors__T
}
export interface _DayDetails_Closing_Time_errors_schedule_T {
	DeliveryHours:DayDetails_Closing_Time_errors__T
	PickupHours:DayDetails_Closing_Time_errors__T
	CateringHours:DayDetails_Closing_Time_errors__T
	DiningHours:DayDetails_Closing_Time_errors__T
}
export type invalidTabs_args_T = [
	Schedule, _DayDetails_Opening_Time_errors_2schedule_T, _DayDetails_Closing_Time_errors_schedule_T
]
