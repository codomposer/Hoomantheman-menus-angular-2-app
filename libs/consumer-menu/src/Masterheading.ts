import { assign } from '@ctx-core/object'
import type { SearchMenuitem_I } from '@menus/search-menu-common'
import { Heading } from './Heading.js'
import type { Masterheading_I } from './Masterheading_I.js'
export class Masterheading implements Masterheading_I {
	constructor(attributes:Partial<Masterheading_I> = {}) {
		assign(this, attributes, {
			heads:
				attributes.heads
				? attributes.heads.map(head=>new Heading(head))
				: this.heads
		})
	}
	public ItemCount:number
	public MasterHeading:string
	public Menus_SourceID:number
	public Mhid:number
	// ui
	public heads:Heading[] = []
	public menuitems:SearchMenuitem_I[]
}
