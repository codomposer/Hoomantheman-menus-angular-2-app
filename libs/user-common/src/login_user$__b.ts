import { tup } from '@ctx-core/array'
import { event_log$_b } from '@ctx-core/event-log'
import type { nullish } from '@ctx-core/function'
import { be_, assign, B } from '@ctx-core/object'
import { derived$, Readable$, writable$, Writable$ } from '@ctx-core/store'
import { idb_writable_, idb_writable_T } from '@menus/idb'
import { mixin_refresh, refresh_mixin_T } from '@menus/store'
import type { user_common_Ctx } from './user_common_Ctx.js'
import type { UserWithLogin_I } from './UserWithLogin_I.js'
export function login_user$__b<user_T extends UserWithLogin_I, Ctx extends user_common_Ctx>(
	key_:login_user$__b_key__T<Ctx>
):B<Ctx, keyof Ctx, login_user$_T<user_T>> {
	const login_user$_key = key_('login_user$') as keyof Ctx
	return be_<Ctx, keyof Ctx, login_user$_T<user_T>>(login_user$_key, ctx=>{
		const event_log$ = event_log$_b(ctx)
		const login_user$:login_user$_T<user_T> = mixin_refresh(
			idb_writable_<user_T|nullish>(
				key_(login_user$_key.toString()) as string,
				login_user=>{
					return login_user ?? null
				}
			)
		) as login_user$_T<user_T>
		login_user$.subscribe(login_user=>{
			event_log$.add({ [`${login_user$_key}`]: login_user })
		})
		const isLoggedIn$:isLoggedIn$_T = derived$(tup(login_user$, login_user$.ready$),
			([login_user, ready])=>
				ready ? !!login_user : null
		)
		isLoggedIn$.subscribe(isLoggedIn=>{
			event_log$.add({ [`${login_user$_key}.isLoggedIn`]: isLoggedIn })
		})
		const isLoggedOut$:isLoggedOut$_T = derived$(isLoggedIn$,
			isLoggedIn=>isLoggedIn === false
		)
		isLoggedOut$.subscribe(isLoggedOut=>{
			event_log$.add({ [`${login_user$_key}.isLoggedOut`]: isLoggedOut })
		})
		const logout_time$:logout_time$_T = writable$(undefined)
		logout_time$.subscribe(logout_time=>{
			event_log$.add({ [`${login_user$_key}.login_time`]: logout_time })
		})
		const AuthCode$:AuthCode$_T = derived$(login_user$, login_user=>
			(login_user as user_T)?.AuthCode
		)
		return assign(login_user$, {
			logout,
			isLoggedIn$,
			isLoggedOut$,
			logout_time$,
			AuthCode$,
		}) as login_user$_T<user_T>
		function logout() {
			login_user$.set(null)
		}
	})
}
export type login_user$__b_key__T<Ctx extends object> = (subkey:string)=>keyof Ctx
export type isLoggedIn$_T = Readable$<boolean>
export type isLoggedOut$_T = Readable$<boolean>
export type logout_time$_T = Writable$<number>
export type AuthCode$_T = Readable$<string>
export interface login_user$_T<user_T extends UserWithLogin_I> extends idb_writable_T<user_T|nullish>,
	refresh_mixin_T<user_T|nullish> {
	logout:()=>void
	isLoggedIn$:isLoggedIn$_T
	isLoggedOut$:isLoggedOut$_T
	logout_time$:logout_time$_T
	AuthCode$:AuthCode$_T
}
