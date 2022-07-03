import type { SearchMenuRequestQuery } from '@menus/search-menu-common'
import type { QueryParams_I } from '@menus/api'
export function compareSearchMenuQueryParams(
	requestData:SearchMenuRequestQuery,
	queryParams:QueryParams_I
) {
	let match = true
	let keyword1 = requestData.keywords
	let keyword2 = queryParams.keywords
	if (!keyword1) keyword1 = ''
	if (!keyword2) keyword2 = ''
	if (keyword1 !== keyword2) match = false
	return match
}
