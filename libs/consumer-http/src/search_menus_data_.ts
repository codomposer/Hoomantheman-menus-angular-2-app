import { SearchMenuRequestQuery, SearchMenuRequestQuery_I } from '@menus/search-menu-common'
import { ServiceTypeId } from '@menus/service-type-common'
export function search_menus_data_(
	data:SearchMenuRequestQuery_I = new SearchMenuRequestQuery()
):SearchMenuRequestQuery {
	// Update the value to appropriate ID for API
	if (typeof ServiceTypeId[data.menuType] !== 'undefined') {
		data.menuType = ServiceTypeId[data.menuType]
	}
	return data
}
