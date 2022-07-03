export interface HourDayDetails extends HourDayDetails_I {
	ID:number
	Opening_Time:string
	Closing_Time:string
	Enabled:boolean
}
export interface HourDayDetails_I {
	edit_mode:boolean
	dayIDFrom:number
	dayIDTo:number
}
