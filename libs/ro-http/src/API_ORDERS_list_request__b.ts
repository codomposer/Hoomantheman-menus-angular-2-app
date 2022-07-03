import { B, be_ } from '@ctx-core/object'
import { APIRequest } from '@menus/api'
import { ro_http_Ctx } from './ro_http_Ctx.js'
import { RoRequestQuery_I } from './RoRequestQuery_I.js'
import { API_ORDERS_path } from './paths.js'
import { ro_request__b } from './ro_request__b.js'
const key = 'API_ORDERS_list_request_'
export const API_ORDERS_list_request__b:B<ro_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_request_ = ro_request__b(ctx)
	return API_ORDERS_list_request_ as API_ORDERS_list_request__T
	async function API_ORDERS_list_request_(requestData:RoRequestQuery_I) {
		requestData.qt = 'list'
		return ro_request_({
			apiURL: API_ORDERS_path,
			requestData,
		})
	}
})
export type API_ORDERS_list_request__T = (requestData:RoRequestQuery_I)=>Promise<APIRequest>
