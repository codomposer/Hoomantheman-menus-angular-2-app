import { assign } from '@ctx-core/object'
import { RestaurantCartitem } from './RestaurantCartitem'
import type { RestaurantCartitem_I } from './RestaurantCartitem_I.js'
export function restaurant_cartitem_(props:Partial<RestaurantCartitem_I>):RestaurantCartitem {
	const restaurant_cartitem = new RestaurantCartitem()
	return assign(restaurant_cartitem, props) as RestaurantCartitem
}
