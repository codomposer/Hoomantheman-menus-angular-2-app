import type { nullish } from '@ctx-core/function'
import { B, be_ } from '@ctx-core/object'
import { tup } from '@ctx-core/array'
import { derived$, Readable$ } from '@ctx-core/store'
import type { UserPayment_I } from '@menus/user-payment-common'
import { userPayments$_b } from './userPayments$_b.js'
import type { user_payment_Ctx } from './user_payment_Ctx.js'
const key = 'default_userPayment$'
export const default_userPayment$_b:B<user_payment_Ctx, typeof key> = be_(key, ctx=>{
	const userPayments$ = userPayments$_b(ctx)
	const { userPayments_busy$ } = userPayments$
	return derived$(tup(userPayments$, userPayments_busy$), ([userPayments, userPayments_busy])=>{
		if (userPayments_busy) return undefined
		return (userPayments?.filter(u=>u.Is_Default) || [])[0] || null
	}) as default_userPayment$_T
})
export type default_userPayment$_T = Readable$<UserPayment_I|nullish>
