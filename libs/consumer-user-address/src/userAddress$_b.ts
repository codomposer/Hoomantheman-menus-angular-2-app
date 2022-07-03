import { tup } from '@ctx-core/array'
import { event_log$_b } from '@ctx-core/event-log'
import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$, Writable$, writable$ } from '@ctx-core/store'
import { consumer_login_user$_b } from '@menus/consumer-user-common'
import type { UserAddress } from '@menus/user-address-common'
import type { consumer_user_address_Ctx } from './consumer_user_address_Ctx.js'
import { default_userAddress$_b } from './default_userAddress$_b.js'
import { pending_userAddress$_b } from './pending_userAddress$_b.js'
const key = 'userAddress$'
export const userAddress$_b:B<consumer_user_address_Ctx, typeof key> = be_(key, ctx=>{
	const consumer_login_user$ = consumer_login_user$_b(ctx)
	const { AuthCode$, isLoggedIn$ } = consumer_login_user$
	const default_userAddress$ = default_userAddress$_b(ctx)
	const event_log$ = event_log$_b(ctx)
	const pending_userAddress$ = pending_userAddress$_b(ctx)
	const userAddress$ = writable$<UserAddress>(undefined) 
	
	derived$(
		tup(pending_userAddress$, default_userAddress$),
		([pending_userAddress, default_userAddress])=>{
			if(pending_userAddress && default_userAddress === null) {
				userAddress$.set(pending_userAddress);
			} else if(default_userAddress && pending_userAddress === null) {
				userAddress$.set(default_userAddress);
			} else if(pending_userAddress === null && default_userAddress === null) {
				userAddress$.set(null);
			}
		}
	).subscribe(() => { })

	userAddress$.subscribe(userAddress=>{
		event_log$.add({ userAddress })
	})

	return userAddress$
})
export type userAddress$_T = Writable$<UserAddress|undefined>
