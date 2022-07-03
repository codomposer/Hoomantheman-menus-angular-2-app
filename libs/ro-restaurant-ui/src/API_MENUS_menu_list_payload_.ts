import { API_MENUS_menu_list_T, RoRequestQuery } from '@menus/ro-http'
export async function API_MENUS_menu_list_payload_(
	API_MENUS_menu_list:API_MENUS_menu_list_T, fireFlyID:string, params_HeadingID:number
) {
	const requestData = new RoRequestQuery()
	requestData.ff = fireFlyID
	requestData.hid = params_HeadingID
	return await API_MENUS_menu_list(requestData)
}
