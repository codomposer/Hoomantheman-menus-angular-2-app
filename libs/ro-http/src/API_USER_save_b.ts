import { B, be_ } from '@ctx-core/object'
import { Ro_User } from '@menus/ro-user-common'
import { is_new_o_ } from '@menus/util'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
import { API_USER_path } from './paths.js'
import type {
	API_USER_addbyowner_payload_T, API_USER_update_payload_T, save_API_USER_data_T, save_API_USER_payload_T
} from './types.js'
import { ro_fetch_b } from './ro_fetch_b.js'
import type { RoRequestQuery_I } from './RoRequestQuery_I.js'
import { RoRequestQuery } from './RoRequestQuery.js'
const key = 'API_USER_save'
export const API_USER_save_b:B<ro_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_fetch = ro_fetch_b(ctx)
	return API_USER_save as API_USER_save_T
	function API_USER_save(data:save_API_USER_data_T) {
		const user:Ro_User = data.user
		const requestData = new RoRequestQuery()
		RoRequestQuery.fill_save_user(requestData, user)
		const promise =
			is_new_o_(user)
			? API_USER_addbyowner(requestData)
			: API_USER_update(requestData)
		return promise as Promise<save_API_USER_payload_T>
	}
	async function API_USER_addbyowner(requestData:Partial<RoRequestQuery_I>) {
		requestData.qt = 'addbyowner'
		return await ro_fetch({
			apiURL: API_USER_path,
			requestData,
		}) as Promise<API_USER_addbyowner_payload_T>
	}
	async function API_USER_update(requestData) {
		requestData.qt = 'update'
		return await ro_fetch({
			apiURL: API_USER_path,
			requestData,
		}) as Promise<API_USER_update_payload_T>
	}
})
export type API_USER_save_T = (requestData:save_API_USER_data_T)=>Promise<save_API_USER_payload_T>
