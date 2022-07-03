import flatpickr from 'flatpickr'
import type { DateOption } from 'flatpickr/dist/types/options'
import type { Instance } from 'flatpickr/dist/types/instance'
import { I } from '@ctx-core/combinators'
import { clone } from '@ctx-core/object'
import { derived$, Readable$, subscribe_wait_timeout, writable$, Writable$ } from '@ctx-core/store'
import { deep_equal } from '@menus/fast-deep-equal'
import type { DateTimeOptions_I } from '@menus/ro-shared-models'
import { BaseController } from '@menus/shared-ui-lib'
import { log } from '@menus/util'
import { timeout_ms } from '@menus/web-config'
import type { form_ui_Ctx } from '../form_ui_Ctx.js'
import type { DateTime_I } from './DateTime_I.js'
export const DATE_FORMAT = 'Y-m-d'
export const TIME_FORMAT = 'H:i:S'
const Controller_name = 'DateTime_c'
export class DateTime_c extends BaseController<form_ui_Ctx> implements DateTime_I {
	instance:Instance
	readonly disabled$:Writable$<boolean> = writable$(false)
	readonly in_datetime$:Writable$<HTMLInputElement> = writable$(undefined)
	readonly in_options$:Writable$<DateTimeOptions_I> = writable$({})
	readonly in_value$:Writable$<DateOption|DateOption[]> = writable$(undefined)
	readonly out_value$:Writable$<DateOption|DateOption[]> = writable$(undefined)
	readonly out_options$:Readable$<DateTimeOptions_I> = derived$(this.in_options$,//region
		(in_options, set)=>{
			const out_options = this.out_options$.$
			const out_in_options = clone(in_options, {
				defaultDate: this.in_value$.$,
				onChange: this.flatpickr_onChange,
			})
			if (!deep_equal(out_in_options, out_options)) {
				set(out_in_options)
			}
		})//endregion
	async onMount() {
		await super.onMount()
		const this_a = this.ctx[Controller_name] ||= []
		this_a.push(this)
		this.unsubscribers.push(
			this.in_value$.subscribe((in_value:DateOption|DateOption[])=>{
				if (in_value !== this.out_value$.$) this.out_value$.$ = in_value
			}),
			this.out_options$.subscribe(this.onchange_out_options)
		)
	}
	async onDestroy() {
		const this_a = this.ctx[Controller_name] || []
		const index = this_a.indexOf(this)
		if (~index) this_a.splice(index, 1)
		await super.onDestroy()
		this.instance?.destroy()
	}
	readonly clear = ()=>{
		if (!this.disabled$.$) {
			this.instance?.clear()
		}
	}
	readonly onclick_datetime = (_evt:MouseEvent)=>{
		this.instance.open()
	}
	previous_$out_options:DateTimeOptions_I
	readonly onchange_out_options = async ()=>{
		await this.load_flatpickr()
	}
	readonly load_flatpickr = async ()=>{
		const in_datetime = await subscribe_wait_timeout(this.in_datetime$, I, timeout_ms)
		const out_options = this.out_options$.$
		if (this.destroyed || deep_equal(this.previous_$out_options, out_options)) return
		this.previous_$out_options = out_options
		this.instance?.destroy()
		this.instance = flatpickr(in_datetime, this.out_options$.$)
	}
	get outputFormat() {
		const out_options = this.out_options$.$
		return (
			(out_options.enableTime && out_options.noCalendar)
			? TIME_FORMAT
			: out_options.enableTime
				? `${DATE_FORMAT}T${TIME_FORMAT}`
				: DATE_FORMAT
		)
	}
	readonly flatpickr_onChange = (selectedDates:Date[], dateStr:string, instance:Instance)=>{
		let out_value:string|string[]
		if (this.out_options$.$?.mode === 'range') {
			out_value = instance.selectedDates.flatMap(date=>
				instance.formatDate(date, this.outputFormat)
			)
		} else {
			out_value =
				instance.selectedDates.length
				? instance.formatDate(instance.selectedDates[0], this.outputFormat)
				: undefined
		}
		this.out_value$.$ = out_value
		setTimeout(()=>this.dispatch('change', out_value))
		log(this.ctx, Controller_name, 'flatpickr_onChange', selectedDates, this.out_value$.$, dateStr, instance)
	}
}
