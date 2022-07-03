import type { SortDetail } from '@menus/sort-shared'
export function set_list_SortID(list:SortDetail[]) {
	for (let i = 0; i < list.length; i += 1) {
		const item = list[i]
		item.SortID = i
	}
}
