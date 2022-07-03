import { API_MENUS_menusize_list_payload_T, ro_httpClient_T, RoRequestQuery } from '@menus/ro-http'
export async function API_MENUS_menusize_list_payload_(
	ro_httpClient:ro_httpClient_T, fireFlyID:string, menuitemID:number
):Promise<API_MENUS_menusize_list_payload_T> {
	const requestData = new RoRequestQuery()
	RoRequestQuery.fill_fireFlyID(requestData, fireFlyID)
	RoRequestQuery.fill_menuitemID(requestData, menuitemID)
	return await ro_httpClient.API_MENUS_menusize_list(requestData)
}
