import type { Order } from '@menus/shared-order'
import { order_status_r_StatusID } from '@menus/web-config'
export function order_is_declined_(order:Order):boolean {
	return !!(~[
		order_status_r_StatusID.CC_PRE_DECLINED,
		order_status_r_StatusID.CC_DECLINED,
		order_status_r_StatusID.PX_DECLINED,
		order_status_r_StatusID.DISPATCH_DECLINED,
	].indexOf(order.StatusID))
}
