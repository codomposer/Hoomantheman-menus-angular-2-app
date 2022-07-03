import { B, be_ } from '@ctx-core/object'
import { API_RESTAURANT_path } from './paths.js'
import { ro_fetch_b } from './ro_fetch_b.js'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
import { RoRequestQuery_I } from './RoRequestQuery_I.js'
import type { API_RESTAURANT_image_upload_payload_T } from './types.js'
const key = 'API_RESTAURANT_image_upload'
export const API_RESTAURANT_image_upload_b:B<ro_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_fetch = ro_fetch_b(ctx)
	return API_RESTAURANT_image_upload as API_RESTAURANT_image_upload_T
	async function API_RESTAURANT_image_upload(requestData:Partial<RoRequestQuery_I>, formData:FormData) {
		requestData.qt = 'image'
		requestData.act = 'upload'
		return await ro_fetch({
			apiURL: API_RESTAURANT_path,
			requestData,
			requestMethod: 'POST',
			body: formData,
		}) as Promise<API_RESTAURANT_image_upload_payload_T>
	}
})
export type API_RESTAURANT_image_upload_T = (requestData:Partial<RoRequestQuery_I>, formData:FormData)=>
	Promise<API_RESTAURANT_image_upload_payload_T>
