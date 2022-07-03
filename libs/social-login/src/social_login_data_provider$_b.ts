import type { nullish } from '@ctx-core/function'
import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { social_login_data$_b } from './social_login_data$_b.js'
import type { SocialLoginData_I } from './Auth.js'
import type { social_login_Ctx } from './social_login_Ctx.js'
const key = 'social_login_data_provider$'
export const social_login_data_provider$_b:B<social_login_Ctx, typeof key> = be_(key, ctx=>{
	const social_login_data = social_login_data$_b(ctx)
	return derived$(social_login_data, $social_login_data=>
		($social_login_data as SocialLoginData_I)?.provider
	) as social_login_data_provider$_T
})
export type social_login_data_provider$_T = Readable$<string|nullish>
