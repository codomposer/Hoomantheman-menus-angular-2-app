import type { Modal_I } from '@menus/modal'
import type { DeliveryZoneItem } from '@menus/ro-shared-models'
import { RoRestaurant_I } from '@menus/ro-restaurant'
export interface SaveDeliveryZoneModal_open_T {
	fireFlyID:string
	restInfo:RoRestaurant_I
	deliveryZoneItem?:DeliveryZoneItem
	DeliveryZone:DeliveryZoneItem[]
}
export type SaveDeliveryZoneModal_close_T = boolean
export interface SaveDeliveryZoneModal_I
	extends Modal_I<SaveDeliveryZoneModal_open_T, SaveDeliveryZoneModal_close_T> {}
