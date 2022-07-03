import type { Menuitem_I } from '@menus/consumer-menu'
import { SearchMenuRequestQuery } from '@menus/search-menu-common'
export function restaurant_frame_fetch_search_menus_menuoptionsize_requestData_(
	menuitem:Menuitem_I
):SearchMenuRequestQuery {
	const requestData = new SearchMenuRequestQuery()
	requestData.menuitemid = menuitem.MenuItemID
	requestData.Menus_SourceID = menuitem.Menus_SourceID
	return requestData
}
