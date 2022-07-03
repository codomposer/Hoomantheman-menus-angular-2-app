import { is_ServiceType_Deliverable_, PICKUP_SERVICE_TYPE_ID } from '@menus/service-type-common'
import { is_DeliveryMode_DELIVERY_COMPANY_, is_DeliveryMode_restaurant_ } from '@menus/web-config'
export function deliver_text_(ServiceTypeID:number, DeliveryModeID:number):string {
	if (ServiceTypeID === PICKUP_SERVICE_TYPE_ID) {
		return 'Pickup by customer at'
	} else if (is_ServiceType_Deliverable_(ServiceTypeID)) {
		if (is_DeliveryMode_restaurant_(DeliveryModeID)) {
			return 'Delivery By Restaurant: '
		} else {
			if (is_DeliveryMode_DELIVERY_COMPANY_(DeliveryModeID)) {
				return 'Pickup By Delivery Company: '
			} else {
				return 'Delivery: '
			}
		}
	}
	return ''
}
