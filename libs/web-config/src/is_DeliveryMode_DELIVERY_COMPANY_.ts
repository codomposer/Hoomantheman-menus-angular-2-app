import { DELIVERY_MODE_DELIVERY_COMPANY } from './DELIVERY_MODE.js'
export function is_DeliveryMode_DELIVERY_COMPANY_(DeliveryModeID:number):boolean {
	return !!~[DELIVERY_MODE_DELIVERY_COMPANY].indexOf(DeliveryModeID)
}
