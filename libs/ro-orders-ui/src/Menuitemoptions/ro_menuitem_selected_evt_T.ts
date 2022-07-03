import type { MenuCartitem_I } from '@menus/consumer-menu'
export interface ro_menuitem_selected_evt_data_T {
	menu_cartitem:MenuCartitem_I
	action:string
}
export type ro_menuitem_selected_evt_T = CustomEvent<ro_menuitem_selected_evt_data_T>
