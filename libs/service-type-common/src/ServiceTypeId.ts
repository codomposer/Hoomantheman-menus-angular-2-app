import { ServiceType } from './ServiceType.js'
export interface ServiceTypeId extends Record<string, ServiceTypeId_T> {
	[ServiceType.SERVICE_TYPE_ALL]:0
	[ServiceType.SERVICE_TYPE_DINEIN]:1
	'Dine in':1
	1:1
	[ServiceType.SERVICE_TYPE_CATERING]:2
	Catering:2
	2:2
	[ServiceType.SERVICE_TYPE_DELIVERY]:3
	Delivery:3
	3:3
	[ServiceType.SERVICE_TYPE_PICKUP]:4
	Pickup:4
	4:4
}
export const ServiceTypeId:ServiceTypeId = {
	[ServiceType.SERVICE_TYPE_ALL]: 0,
	[ServiceType.SERVICE_TYPE_DINEIN]: 1,
	'Dine in': 1,
	1: 1,
	[ServiceType.SERVICE_TYPE_CATERING]: 2,
	Catering: 2,
	2: 2,
	[ServiceType.SERVICE_TYPE_DELIVERY]: 3,
	Delivery: 3,
	3: 3,
	[ServiceType.SERVICE_TYPE_PICKUP]: 4,
	Pickup: 4,
	4: 4
}
export const ALL_SERVICE_TYPE_ID = 0
export const DINEIN_SERVICE_TYPE_ID = 1
export const CATERING_SERVICE_TYPE_ID = 2
export const DELIVERY_SERVICE_TYPE_ID = 3
export const PICKUP_SERVICE_TYPE_ID = 4
export type ServiceTypeId_T = 0|1|2|3|4
