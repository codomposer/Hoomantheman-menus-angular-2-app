import type { Modal_I } from '@menus/modal'
import type { RoCoupon } from '@menus/ro-shared-models'
import { RoRestaurant_I } from '@menus/ro-restaurant'
export interface SaveCouponModal_open_T {
	fireFlyID:string
	ro_coupon:RoCoupon
	ro_restaurant:RoRestaurant_I
}
export type SaveCouponModal_close_T = RoCoupon
export interface SaveCouponModal_I
	extends Modal_I<SaveCouponModal_open_T, SaveCouponModal_close_T> {}
