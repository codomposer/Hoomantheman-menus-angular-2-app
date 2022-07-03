import { compose, nullish } from '@ctx-core/function'
import { be_, assign } from '@ctx-core/object'
import type { B } from '@ctx-core/object'
import { I } from '@ctx-core/combinators'
import { idb_writable_, idb_writable_T } from '@menus/idb'
import { consumer_login_user$_b } from '@menus/consumer-user-common'
import type { SocialLoginData_I } from './Auth.js'
import type { social_login_Ctx } from './social_login_Ctx.js'
const key = 'social_login_data$'
export const social_login_data$_b:B<social_login_Ctx, typeof key> = be_(key, ctx=>{
	const login_user$ = consumer_login_user$_b(ctx)
	const social_login_data = idb_writable_('$social_login_data', I) as social_login_data$_T
	const unsubscribe = login_user$.subscribe(login_user=>{
		if (login_user === null) {
			social_login_data.set(null)
		}
	})
	return assign(social_login_data, {
		destroy: compose<void>(social_login_data.destroy, unsubscribe)
	})
})
export interface social_login_data$_T extends idb_writable_T<SocialLoginData_I|nullish> {
	destroy():void
}
