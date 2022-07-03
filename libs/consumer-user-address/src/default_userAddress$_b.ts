import { B, be_, assign, nullish_or_ } from '@ctx-core/object'
import { queue_ } from '@ctx-core/queue'
import { derived$, Readable$ } from '@ctx-core/store'
import { consumer_http_client_b } from '@menus/consumer-http'
import { UserAddressAPIRequestQuery } from '@menus/consumer-user-common'
import { notyf_success_b } from '@menus/notyf'
import { userAddress_eq_, UserAddress } from '@menus/user-address-common'
import type { consumer_user_address_Ctx } from './consumer_user_address_Ctx.js'
import { userAddress_a$_b } from './userAddress_a$_b.js'
const key = 'default_userAddress$'
export const default_userAddress$_b:B<consumer_user_address_Ctx, typeof key> = be_(key, ctx=>{
	const consumer_http_client = consumer_http_client_b(ctx)
	const notyf_success = notyf_success_b(ctx)
	const userAddress_a$ = userAddress_a$_b(ctx)
	const queue = queue_(1)
	const default_userAddress$ = derived$(userAddress_a$, userAddress_a=>{
		if (!userAddress_a) {
			return nullish_or_(userAddress_a, ()=>null)
		}
		for (const userAddress of userAddress_a) {
			if (userAddress.Is_Default) {
				return userAddress
			}
		}
		return false
	})
	return assign(default_userAddress$, {
		save
	}) as default_userAddress$_T
	async function save(default_userAddress:UserAddress) {
		await queue.add(async ()=>{
			const userAddress_a = userAddress_a$.$ as UserAddress[]
			const current_default_userAddress = userAddress_a.find(userAddress=>userAddress.Is_Default)
			if (userAddress_eq_(current_default_userAddress, default_userAddress)) {
				return
			}
			const requestData = new UserAddressAPIRequestQuery()
			requestData.a = default_userAddress.ID
			const payload = await consumer_http_client.save_default_userAddress(requestData)
			if (payload.Code === 'SET_DEFAULT_DELIVERY_ADDRESS') {
				const userAddress = userAddress_a.find(userAddress=>userAddress.ID === default_userAddress.ID)
				if (current_default_userAddress) {
					current_default_userAddress.Is_Default = false
				}
				userAddress.Is_Default = true
				userAddress_a$.refresh()
				await userAddress_a$.reload()
				await notyf_success('Successfully changed default delivery address')
			}
		})
	}
})
export interface default_userAddress$_T extends Readable$<UserAddress> {
	save(userAddress:UserAddress):Promise<void>
}
