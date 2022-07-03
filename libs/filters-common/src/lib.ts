import { SERVICE_TYPE_DINEIN } from '@menus/service-type-common'
export type DeliveryCharge = number
export type MinOrder = number
// Filters
export const FILTER_USER_ADDRESS = 'FILTER_USER_ADDRESS'
export const FILTER_KEYWORDS = 'FILTER_KEYWORDS'
export const FILTER_VIEW_MODE = 'FILTER_VIEW_MODE'
export const FILTER_CUISINE = 'FILTER_CUISINE'
export const FILTER_SERVICE_TYPE = 'FILTER_SERVICE_TYPE'
export const FILTER_MIN_PRICE = 'FILTER_MIN_PRICE'
export const FILTER_MAX_PRICE = 'FILTER_MAX_PRICE'
export const FILTER_DELIVERY_FEE = 'FILTER_DELIVERY_FEE'
export const FILTER_MIN_ORDER = 'FILTER_MIN_ORDER'
export const FILTER_PROXIMITY = 'FILTER_PROXIMITY'
export const FILTER_DEFAULT_VALUES = {
	SERVICE_TYPE: SERVICE_TYPE_DINEIN,
	MIN_PRICE: 0,
	MAX_PRICE: 1000,
	PRICE_LIMIT: 1000,
	PROXIMITY: 10,
	PROXIMITY_LIMIT: 100,
	DELIVERY_FEE: null,
	MIN_ORDER: null,
	DELIVERY_FEE_STEP: 3,
	MIN_ORDER_STEP: 3,
}
export const DELIVERY_STEPS_TEXT = ['FREE', '$3 max', '$5 max', 'All']
export const DELIVERY_STEPS_VAL = [0, 3, 5, null]
export const MIN_ORDER_STEPS_TEXT = ['$15 max', '$25 max', '$50 max', 'All']
export const MIN_ORDER_STEPS_VAL = [15, 25, 50, null]
