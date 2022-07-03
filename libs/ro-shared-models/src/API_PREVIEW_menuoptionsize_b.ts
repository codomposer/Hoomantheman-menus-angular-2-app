import { B, be_ } from '@ctx-core/object'
import { API_PREVIEW_menuoptionsize_payload_T, ro_httpClient_b, RoRequestQuery } from '@menus/ro-http'
import type { ro_shared_models_Ctx } from './ro_shared_models_Ctx.js'
const key = 'API_PREVIEW_menuoptionsize'
export const API_PREVIEW_menuoptionsize_b:B<ro_shared_models_Ctx, typeof key> = be_(key, ctx=>{
	const ro_httpClient = ro_httpClient_b(ctx)
	return API_PREVIEW_menuoptionsize as API_PREVIEW_menuoptionsize_T
	async function API_PREVIEW_menuoptionsize(
		fireFlyID:string,
		MenuitemID:number,
	) {
		try {
			const requestData = new RoRequestQuery()
			requestData.ff = fireFlyID
			requestData.mid = MenuitemID
			return await ro_httpClient.API_PREVIEW_menuoptionsize(requestData) as API_PREVIEW_menuoptionsize_payload_T
		} catch (err) {
			console.error(err)
			throw err
		}
	}
})
export type API_PREVIEW_menuoptionsize_T = (
	fireFlyID:string,
	MenuitemID:number,
	MenuitemsizeID?:number
)=>Promise<API_PREVIEW_menuoptionsize_payload_T>
