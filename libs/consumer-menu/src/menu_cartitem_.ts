import type { MenuCartitem_I } from './MenuCartitem_I.js'
import type { Menuitem_I } from './Menuitem_I.js'
import type { MenuCartitem } from './MenuCartitem.js'
export function menu_cartitem_(menuitem:Menuitem_I):MenuCartitem {
	return {
		menuitem,
		quantity: 0,
		menuoptions: [],
		menuoptionsizes: [],
		selected_menuoptionsize: null,
		cartCount: 0,
		subTotal: 0,
		suggestion: '',
	} as MenuCartitem_I
}
