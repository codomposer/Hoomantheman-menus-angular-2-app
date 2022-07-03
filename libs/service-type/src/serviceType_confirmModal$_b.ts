import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { ConfirmModal_I } from '@menus/shared-ui'
import type { service_type_Ctx } from './service_type_Ctx.js'
const key = 'serviceType_confirmModal$'
export const serviceType_confirmModal$_b:B<service_type_Ctx, typeof key> = be_(key, ()=>
	writable$(null) as serviceType_confirmModal$_T
)
export type serviceType_confirmModal$_T = Writable$<ConfirmModal_I>
