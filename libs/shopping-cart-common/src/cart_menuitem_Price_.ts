import type { MenuCartitem_I } from '@menus/consumer-menu'
export function cart_menuitem_Price_(menu_cartitem:MenuCartitem_I):number {
	return (
		menu_cartitem.selected_menuoptionsize
		? menu_cartitem.selected_menuoptionsize.Price
		: menu_cartitem.menuitem.Price
	)
}
