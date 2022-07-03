import type { OrderResult } from '@menus/shared-order'
import type { API_error_T } from '@menus/api'
export interface add_order_body_T {
	Coupons:string[]
}
export type add_order_payload_T = OrderResult|API_error_T
