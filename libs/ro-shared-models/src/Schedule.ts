import type { RestHours } from './RestHours.js'
export interface Schedule {
	DeliveryHours:RestHours[]
	PickupHours:RestHours[]
	CateringHours:RestHours[]
	DiningHours:RestHours[]
}
