import { B, be_ } from '@ctx-core/object'
import { API_PREVIEW_menuoptions_payload_T, ro_httpClient_b, RoRequestQuery } from '@menus/ro-http'
import type { ro_shared_models_Ctx } from './ro_shared_models_Ctx.js'
const key = 'API_PREVIEW_menuoptions'
export const API_PREVIEW_menuoptions_b:B<ro_shared_models_Ctx, typeof key> = be_(key, ctx=>{
	const ro_httpClient = ro_httpClient_b(ctx)
	return API_PREVIEW_menuoptions as API_PREVIEW_menuoptions_T
	async function API_PREVIEW_menuoptions(
		fireFlyID:string,
		menuitem_id:number,
		menuoptionsize_id?:number
	) {
		try {
			const zid = menuoptionsize_id
			const requestData = new RoRequestQuery()
			requestData.ff = fireFlyID
			requestData.mid = menuitem_id
			requestData.zid = zid
			return await ro_httpClient.API_PREVIEW_menuoptions(requestData) as API_PREVIEW_menuoptions_payload_T
		} catch (err) {
			console.error(err)
			throw err
		}
	}
})
export type API_PREVIEW_menuoptions_T = (
	fireFlyID:string,
	MenuitemID:number,
	MenuitemsizeID?:number
)=>Promise<API_PREVIEW_menuoptions_payload_T>
