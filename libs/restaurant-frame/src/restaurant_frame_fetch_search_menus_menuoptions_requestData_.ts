import { SearchMenuRequestQuery } from '@menus/search-menu-common'
import type { Menuitem_I, Menuoptionsize_I } from '@menus/consumer-menu'
export function restaurant_frame_fetch_search_menus_menuoptions_requestData_(
	menuitem:Menuitem_I, selected_menuoptionsize:Menuoptionsize_I
):SearchMenuRequestQuery {
	const requestData = new SearchMenuRequestQuery()
	requestData.Menus_SourceID = menuitem.Menus_SourceID
	requestData.option = 0
	requestData.menuitemid = menuitem.MenuItemID
	requestData.zid = selected_menuoptionsize ? selected_menuoptionsize.id : null
	return requestData
}
