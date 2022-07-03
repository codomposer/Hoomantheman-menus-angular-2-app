import type { Modal_I } from '@menus/modal'
import type { Subscription } from '@menus/ro-user-common'
import { RoRestaurant_I } from '@menus/ro-restaurant'
export interface RestContractModal_open_T {
	ro_restaurant:RoRestaurant_I,
	subscription:Subscription
}
export type RestContractModal_close_T = boolean
export interface RestContractModal_I
	extends Modal_I<RestContractModal_open_T, RestContractModal_close_T> {}
