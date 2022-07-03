import { B, be_ } from '@ctx-core/object'
import { fetch_api_request_b } from '@menus/http'
import type { CartCoupon_I } from '@menus/shopping-cart'
import type { GetVisibleCouponsRequestQuery } from './GetVisibleCouponsRequestQuery.js'
import type { consumer_http_Ctx } from './consumer_http_Ctx.js'
import { fetch_get_visible_coupons_request__b } from './fetch_get_visible_coupons_request__b.js'
const key = 'fetch_get_visible_coupons'
export const fetch_get_visible_coupons_b:B<consumer_http_Ctx, typeof key> = be_(key, ctx=>{
	const fetch_api_request = fetch_api_request_b(ctx)
	const fetch_get_visible_coupons_request_ = fetch_get_visible_coupons_request__b(ctx)
	return fetch_get_visible_coupons as fetch_get_visible_coupons_T
	async function fetch_get_visible_coupons(data:GetVisibleCouponsRequestQuery) {
		return (
			await fetch_api_request(
				await fetch_get_visible_coupons_request_(data)
			)
		) as get_visible_coupons_payload_T
	}
})
export type fetch_get_visible_coupons_T =
	(data:GetVisibleCouponsRequestQuery)=>Promise<get_visible_coupons_payload_T>
export interface get_visible_coupons_payload_T {
	Status:string
	Data:CartCoupon_I[]
}
