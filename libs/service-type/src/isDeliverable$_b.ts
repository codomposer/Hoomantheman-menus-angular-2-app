import type { nullish } from '@ctx-core/function'
import { B, be_ } from '@ctx-core/object'
import { Readable$, derived$ } from '@ctx-core/store'
import { ServiceType } from '@menus/service-type-common'
import { serviceType$_b } from './serviceType$_b.js'
import type { service_type_Ctx } from './service_type_Ctx.js'
const key = 'isDeliverable$'
export const isDeliverable$_b:B<service_type_Ctx, typeof key> = be_(key, ctx=>{
	const serviceType$ = serviceType$_b(ctx)
	return derived$(serviceType$, isDeliverable_)
})
export function isDeliverable_(serviceType:ServiceType|nullish) {
	if (!serviceType) return
	return (
		serviceType === ServiceType.SERVICE_TYPE_DELIVERY
		|| serviceType === ServiceType.SERVICE_TYPE_CATERING
	)
}
export type isDeliverable$_T = Readable$<boolean>
