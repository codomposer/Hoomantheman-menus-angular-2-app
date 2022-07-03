import { DELIVERY_MODE_NO_DELIVERY, DELIVERY_MODE_DELIVERY_COMPANY } from '@menus/web-config'
import type { DeliveryMode_I } from './DeliveryMode_I.js'
export function DeliveryMode_HasDeliveryZone_(delivery_mode:DeliveryMode_I):boolean {
	return (
		delivery_mode
		? !~[DELIVERY_MODE_NO_DELIVERY, DELIVERY_MODE_DELIVERY_COMPANY].indexOf(delivery_mode.ID)
		: false
	)
}
