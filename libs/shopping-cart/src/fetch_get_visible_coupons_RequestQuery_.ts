import { ServiceTypeId } from '@menus/service-type-common'
import type { GetVisibleCouponsRequestQuery } from '@menus/consumer-http'
import type { User } from '@menus/user-common'
import type { RestaurantCartitem_I } from './RestaurantCartitem'
export function fetch_get_visible_coupons_RequestQuery_(
	restaurant_cartitem:RestaurantCartitem_I, login_user:User
) {
	// create a request to send to get visible coupons for each restaurant
	const request = {
		a: restaurant_cartitem.FFID,
		b: ServiceTypeId[restaurant_cartitem.serviceType],
	} as GetVisibleCouponsRequestQuery
	// add auth code and customer id to the request if user is logged in
	if (login_user) {
		request.i = login_user.ID
		request.x = login_user.AuthCode
	}
	return request
}
