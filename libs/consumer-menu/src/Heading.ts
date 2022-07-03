import { assign } from '@ctx-core/object'
import { Menuitem } from './Menuitem.js'
import type { Heading_I } from './Heading_I.js'
import type { Menuitem_I } from './Menuitem_I.js'
export class Heading implements Heading_I {
	constructor(attributes:Partial<Heading_I>) {
		assign(this, attributes, {
			menuitems:
				attributes.menuitems
				? attributes.menuitems.map(menuitem=>new Menuitem(menuitem))
				: this.menuitems
		})
	}
	public Mhid:number
	public MasterHeading:string
	public Hid:number
	public Heading:string
	public ItemCount:number
	public Menus_SourceID:number
	// ui
	public menuitems:Menuitem_I[] = []
	public element:HTMLElement
}
