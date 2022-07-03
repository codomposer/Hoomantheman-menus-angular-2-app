import { B, be_ } from '@ctx-core/object'
import { notyf_error_b } from '@menus/notyf'
import { userAddress_isValid_ } from './userAddress_isValid_.js'
import type { UserAddress } from './UserAddress.js'
import { user_address_common_Ctx } from './user_address_common_Ctx.js'
const key = 'validate_userAddress'
export const validate_userAddress_b:B<user_address_common_Ctx, typeof key> = be_(key, ctx=>{
	const notyf_error = notyf_error_b(ctx)
	return validate_userAddress as validate_userAddress_T
	async function validate_userAddress(userAddress:UserAddress):Promise<boolean> {
		if (!userAddress_isValid_(userAddress)) {
			await notyf_error('Please enter a recognized address or location')
		} else {
			return true
		}
		return false
	}
})
export type validate_userAddress_T = (userAddress:UserAddress)=>Promise<boolean>
