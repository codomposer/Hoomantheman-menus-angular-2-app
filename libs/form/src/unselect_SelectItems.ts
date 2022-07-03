import type { SelectItem } from './SelectItem.js'
export function unselect_SelectItems(items:SelectItem[]) {
	for (const item of items) {
		item.is_selected = false
	}
	return items
}
