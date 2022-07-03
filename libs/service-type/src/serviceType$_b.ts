import { neql_, run } from '@ctx-core/function'
import { B, be_ } from '@ctx-core/object'
import { subscribe_wait_timeout, Writable$ } from '@ctx-core/store'
import { event_log$_b } from '@ctx-core/event-log'
import { idb_writable_ } from '@menus/idb'
import { params_serviceType$_b, query_serviceType$_b } from '@menus/page'
import type { ServiceType } from '@menus/service-type-common'
import { timeout_ms } from '@menus/web-config'
import type { service_type_Ctx } from './service_type_Ctx.js'
const key = 'serviceType$'
export const serviceType$_b:B<service_type_Ctx, typeof key> = be_(key, ctx=>{
	const event_log$ = event_log$_b(ctx)
	const params_serviceType$ = params_serviceType$_b(ctx)
	const query_serviceType$ = query_serviceType$_b(ctx)
	const serviceType$ = idb_writable_<ServiceType>('serviceType',
		serviceType=>{
			const params_serviceType = params_serviceType$.$
			return params_serviceType ? params_serviceType : serviceType
		})
	serviceType$.subscribe(serviceType=>{
		event_log$.add({ serviceType })
	})
	run(async ()=>{
		await subscribe_wait_timeout(serviceType$.ready$, neql_(undefined), timeout_ms)
		params_serviceType$.subscribe(refresh)
		query_serviceType$.subscribe(refresh)
	}).then()
	return serviceType$ as serviceType$_T
	function refresh() {
		const params_serviceType = params_serviceType$.$
		const query_serviceType = query_serviceType$.$
		if (query_serviceType) {
			serviceType$.set(query_serviceType)
		} else if (params_serviceType) {
			serviceType$.set(params_serviceType)
		}
	}
})
export type serviceType$_T = Writable$<ServiceType>
