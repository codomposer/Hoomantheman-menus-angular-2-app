import { _b, B } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { RoOrder } from '@menus/ro-shared-models'
import { ServiceType, ServiceTypeID_r_ServiceType } from '@menus/service-type-common'
import { order_info$_b } from '@menus/ro-restaurant-ui'
import type { ro_orders_ui_Ctx } from '../ro_orders_ui_Ctx.js'
const key = 'EditOrder_c_serviceType$'
export const EditOrder_c_serviceType$_b:B<ro_orders_ui_Ctx, typeof key> = _b(key, ctx=>{
	const order_info$ = order_info$_b(ctx)
	return derived$(order_info$, (order_info:RoOrder)=>{
		return ServiceTypeID_r_ServiceType[order_info?.OrderDetail?.ServiceTypeID]
	})
})
export type EditOrder_c_serviceType$_T = Readable$<ServiceType>
