import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$, } from '@ctx-core/store'
import type { UserAddress } from '@menus/user-address-common'
import { userAddress$_b } from './userAddress$_b.js'
import type { consumer_user_address_Ctx } from './consumer_user_address_Ctx.js'
const key = 'userAddress_text$'
export const userAddress_text$_b:B<consumer_user_address_Ctx, typeof key> = be_(key, ctx=>{
	const userAddress$ = userAddress$_b(ctx)
	return derived$(userAddress$, userAddress_text_) as userAddress_text$_T
})
export const userAddress_text_ =
	(userAddress:UserAddress|undefined)=>(userAddress as UserAddress)?.Address || ''
export type userAddress_text$_T = Readable$<string>
