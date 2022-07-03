import type { schedule_n1_T } from './schedule_n1_T.js'
export interface RestaurantHours_I {
	WorkingHours:RestaurantHour_I[]
	DeliveryHours:RestaurantHour_I[]
	CateringHours:RestaurantHour_I[]
}
export interface RestaurantHour_I {
	Timezone:string
	DayID:number
	DayName:string
	Date:string
	Time:RestaurantHourTime_I[]
}
export interface RestaurantHourCtx_I extends RestaurantHour_I {
	local_minute_tick:Date
	schedule_n1_a:schedule_n1_T[]
}
export interface RestaurantHourTime_I {
	Start:string
	End:string
	Start_ISO:string
	End_ISO:string
	TzOffsetHours:number
	TzOffsetMinutes:number
	TzOffsetSeconds:number
	TzOffsetMilliSeconds:number
}
