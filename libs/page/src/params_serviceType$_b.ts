import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { page_params$_b } from '@ctx-core/sapper'
import type { ServiceType } from '@menus/service-type-common'
import type { page_Ctx } from './page_Ctx.js'
const key = 'params_serviceType$'
export const params_serviceType$_b:B<page_Ctx, typeof key> = be_(key, ctx=>{
	const page_params$ = page_params$_b(ctx)
	return derived$(page_params$,
		page_params=>page_params?.serviceType
	) as params_serviceType$_T
})
export type params_serviceType$_T = Readable$<ServiceType>
