import { last_ } from '@ctx-core/array'
import { RestaurantHour_I } from '@menus/restaurant-hours-lib'
import { millis_ } from '@menus/date'
export function is_business_day_(hour:RestaurantHour_I, compare_millis:number):boolean {
	const Opening_Time_millis = millis_(hour.Time[0].Start_ISO)
	const Closing_Time_millis = millis_(last_(hour.Time).End_ISO)
	return (
		Opening_Time_millis <= compare_millis
		&& compare_millis >= Closing_Time_millis
	)
}
