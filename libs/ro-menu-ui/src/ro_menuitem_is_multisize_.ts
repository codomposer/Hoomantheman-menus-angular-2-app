import type { RoMenuitem_I } from '@menus/ro-shared-models'
export function ro_menuitem_is_multisize_(ro_menuitem:RoMenuitem_I) {
	return (
		ro_menuitem
		? ro_menuitem.Is_Single_Size
			? ro_menuitem.Price === 0
			: true
		: false
	)
}
