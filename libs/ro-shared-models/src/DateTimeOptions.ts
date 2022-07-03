import type { DateTimeOptions_I } from './DateTimeOptions_I'
export class DateTimeOptions implements DateTimeOptions_I {
	public mode?:'single'|'multiple'|'range'|'time'
	public enableTime?:boolean
	public enableSeconds?:boolean
	public noCalendar?:boolean
	public defaultDate?:any
	public onChange?:any
	public minDate?:string
	public hide_clear?:boolean
}
