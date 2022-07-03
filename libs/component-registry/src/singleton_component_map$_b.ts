import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { component_registry_Ctx } from './component_registry_Ctx.js'
const key = 'singleton_component_map$'
export const singleton_component_map$_b:B<component_registry_Ctx, typeof key> = be_(key, ()=>
	writable$<Map<object, object>>(new Map<object, object>()) as singleton_component_map$_T
)
export type singleton_component_map$_T = Writable$<Map<object, object>>
