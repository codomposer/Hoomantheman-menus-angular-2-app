import { B, be_ } from '@ctx-core/object'
import type { Writable$ } from '@ctx-core/store'
import { writable$ } from '@ctx-core/store'
import type { ExtendedGeolocatable_I } from '@menus/geolocatable'
import type { maps_Ctx } from './maps_Ctx.js'
const key = 'map_center$'
export const map_center$_b:B<maps_Ctx, typeof key> = be_(key, ()=>{
	return writable$(null) as map_center$_T
})
export type map_center$_T = Writable$<ExtendedGeolocatable_I>
