import { BaseRestaurantCard } from '@menus/restaurant'
import type { Menuitem_I } from './Menuitem_I.js'
import type { Menuoption_I } from './Menuoption_I.js'
import type { Menuoptionsize_I } from './Menuoptionsize_I.js'
export class Menuitem extends BaseRestaurantCard implements Menuitem_I {
	// ui
	public isOpen:boolean
	public sub_menuitems:Menuitem_I[] = []
	public suggestion:string
	public mapInfoWindow:any
	public menuoptionsizes:Menuoptionsize_I[]
	public menuoptions:Menuoption_I[]
	public subTotal:number
	public quantity:number
	public menuoptionsize:Menuoptionsize_I
}
