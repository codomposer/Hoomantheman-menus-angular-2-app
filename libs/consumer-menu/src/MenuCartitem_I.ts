import type { Menuitem_I } from './Menuitem_I.js'
import type { Menuoptionsize_I } from './Menuoptionsize_I.js'
import type { Menuoption_I } from './Menuoption_I.js'
export interface MenuCartitem_I extends MenuCartitem_input_I {
	cartCount:number
	subTotal:number
	suggestion:string
}
export interface MenuCartitem_input_I {
	menuitem:Menuitem_I
	quantity:number
	menuoptions:Menuoption_I[]
	menuoptionsizes:Menuoptionsize_I[]
	selected_menuoptionsize:Menuoptionsize_I
}
