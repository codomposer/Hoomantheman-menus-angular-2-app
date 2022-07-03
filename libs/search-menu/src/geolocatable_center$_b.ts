import { B, be_, clone } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { userAddress$_b } from '@menus/consumer-user-address'
import { Geolocatable_I, default_geolocatable } from '@menus/geolocatable'
import type { search_menu_Ctx } from './search_menu_Ctx.js'
const key = 'geolocatable_center$'
export const geolocatable_center$_b:B<search_menu_Ctx, typeof key> = be_(key, (ctx)=>{
	const userAddress$ = userAddress$_b(ctx)
	return derived$(userAddress$, userAddress=>{
		return userAddress || clone(default_geolocatable)
	})
})
export type geolocatable_center$_T = Readable$<Geolocatable_I>
