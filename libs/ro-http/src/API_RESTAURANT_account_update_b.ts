import { B, be_ } from '@ctx-core/object'
import type { RestaurantAccountInformation } from '@menus/ro-shared-models'
import { API_RESTAURANT_path } from './paths.js'
import { ro_fetch_b } from './ro_fetch_b'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
import type { RoRequestQuery_I } from './RoRequestQuery_I.js'
import type { API_RESTAURANT_account_update_payload_T } from './types.js'
const key = 'API_RESTAURANT_account_update'
export const API_RESTAURANT_account_update_b:B<ro_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_fetch = ro_fetch_b(ctx)
	return API_RESTAURANT_account_update as API_RESTAURANT_account_update_T
	async function API_RESTAURANT_account_update(requestData:Partial<RoRequestQuery_I>, body:RestaurantAccountInformation) {
		requestData.qt = 'account'
		requestData.act = 'update'
		return await ro_fetch({
			apiURL: API_RESTAURANT_path,
			requestData,
			requestMethod: 'POST',
			body: JSON.stringify(body),
		}) as Promise<API_RESTAURANT_account_update_payload_T>
	}
})
export type API_RESTAURANT_account_update_T =
	(requestData:Partial<RoRequestQuery_I>, body:RestaurantAccountInformation)=>
		Promise<API_RESTAURANT_account_update_payload_T>
