import { round } from '@ctx-core/number'
import type { MenuCartitem_I } from '@menus/consumer-menu'
import { cart_menuitem_Price_ } from '@menus/shopping-cart-common'
export function calculate_menuitem_subTotal(menu_cartitem:MenuCartitem_I) {
	let subTotal = menu_cartitem.quantity * cart_menuitem_Price_(menu_cartitem)
	// checks if item has options, then apply there prices
	for (const menuitemOption of (menu_cartitem.menuoptions || [])) {
		// For single select items
		if (menuitemOption.Is_Single_Select) {
			if (
				typeof menuitemOption.selected_OptionItem !== 'undefined'
				&& menuitemOption.selected_OptionItem
			) {
				subTotal += menu_cartitem.quantity * menuitemOption.selected_OptionItem.Price
			}
		} else {
			// For multi select items
			for (const menuoptionitem of menuitemOption.OptionItems) {
				if (menuoptionitem.is_selected) {
					subTotal += menu_cartitem.quantity * menuoptionitem.Price
				}
			}
		}
	}
	return round(subTotal)
}
