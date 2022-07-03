import { assign } from '@ctx-core/object'
import type { Menuitem_I } from '@menus/consumer-menu'
import {
	SERVICE_TYPE_CATERING, SERVICE_TYPE_DELIVERY, SERVICE_TYPE_DINEIN, SERVICE_TYPE_PICKUP
} from '@menus/service-type-common'
import type { RestaurantCartitem_I } from './RestaurantCartitem'
export function assign_menuitem_restaurant_cartitem(restaurant_cartitem:RestaurantCartitem_I, menuitem:Menuitem_I) {
	return assign(
		restaurant_cartitem, {
			fireFlyID: menuitem.FFID,
			ZipCode: menuitem.ZipCode,
			RestaurantName: menuitem.RestaurantName,
			CuisineName: menuitem.CuisineName,
			FFID: menuitem.FFID,
			Address: menuitem.Address,
			Availability: menuitem.Availability,
			FileName: menuitem.FileName,
			RestImageExist: menuitem.RestImageExist,
			RestImage: menuitem.RestImage,
			ETA: menuitem.ETA,
			ETAMin: menuitem.ETAMin,
			ETAMax: menuitem.ETAMax,
			MinOrder: menuitem.MinOrder,
			DeliveryModeID: menuitem.DeliveryModeID,
			menusServiceFee:
				menuitem.PayMenusServiceFee
				? menuitem.MenusServiceFee
				: 0,
			serviceTypes: [
				...(menuitem.isDiningIn ? [SERVICE_TYPE_DINEIN] : []),
				...(menuitem.isCatering ? [SERVICE_TYPE_CATERING] : []),
				...(menuitem.isDelivery ? [SERVICE_TYPE_DELIVERY] : []),
				...(menuitem.isPickup ? [SERVICE_TYPE_PICKUP] : []),
			],
		}
	)
}
