import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import { event_log$_b } from '@ctx-core/event-log'
import type { location_T } from '@menus/geolocatable'
import { default_system_location } from '@menus/geolocatable'
import { user_address_common_Ctx } from './user_address_common_Ctx.js'
const key = 'default_location$'
export const default_location$_b:B<user_address_common_Ctx, typeof key> = be_(key, ctx=>{
		const event_log$ = event_log$_b(ctx)
		const default_location$ = writable$<location_T>(
			default_system_location
		) as default_location$_T
		default_location$.subscribe(default_location=>
			event_log$.add({ default_location })
		)
		return default_location$
	}
)
export type default_location$_T = Writable$<location_T>
