import { DELIVERY_MODE_RESTAURANT, DELIVERY_MODE_RESTOWNER } from './DELIVERY_MODE.js'
export function is_DeliveryMode_restaurant_(DeliveryModeID:number):boolean {
	return !!~[DELIVERY_MODE_RESTAURANT, DELIVERY_MODE_RESTOWNER].indexOf(DeliveryModeID)
}
