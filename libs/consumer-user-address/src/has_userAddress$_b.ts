import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { userAddress$_b } from './userAddress$_b.js'
import type { consumer_user_address_Ctx } from './consumer_user_address_Ctx.js'
const key = 'has_userAddress$'
export const has_userAddress$_b:B<consumer_user_address_Ctx, typeof key> = be_(key, ctx=>
	derived$(userAddress$_b(ctx),
		userAddress=>!!userAddress
	) as has_userAddress$_T
)
export type has_userAddress$_T = Readable$<boolean>
