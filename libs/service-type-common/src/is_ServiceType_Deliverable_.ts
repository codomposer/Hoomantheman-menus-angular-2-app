import { CATERING_SERVICE_TYPE_ID, DELIVERY_SERVICE_TYPE_ID, ServiceTypeId } from './ServiceTypeId.js'
import type { ServiceType } from './ServiceType.js'
export function is_ServiceType_Deliverable_(
	ServiceTypeID:string|ServiceType|number
):boolean {
	return !!(
		~[
			DELIVERY_SERVICE_TYPE_ID, CATERING_SERVICE_TYPE_ID
		].indexOf(ServiceTypeId[ServiceTypeID])
	)
}
