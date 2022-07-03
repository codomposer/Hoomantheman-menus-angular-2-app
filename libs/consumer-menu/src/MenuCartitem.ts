import type { Menuitem_I } from './Menuitem_I.js'
import type { Menuoptionsize_I } from './Menuoptionsize_I.js'
import type { Menuoption_I } from './Menuoption_I.js'
import type { MenuCartitem_I } from './MenuCartitem_I.js'
export class MenuCartitem implements MenuCartitem_I {
	menuitem:Menuitem_I
	menuoptions:Menuoption_I[]
	cartCount:number
	subTotal:number
	quantity:number
	selected_menuoptionsize:Menuoptionsize_I
	menuoptionsizes:Menuoptionsize_I[]
	suggestion:string
}
