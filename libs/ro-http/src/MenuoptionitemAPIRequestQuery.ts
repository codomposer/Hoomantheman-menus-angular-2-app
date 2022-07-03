import type { RoMenuoptionitem_I } from '@menus/ro-shared-models'
import { RoRequestQuery } from './RoRequestQuery.js'
export class MenuoptionitemAPIRequestQuery extends RoRequestQuery {
	public name:string // Name
	public price:number
	public enabled:boolean
	public isdefault:boolean
	public SizeDetails:any
	public static fill_menuoptionitem(requestData:MenuoptionitemAPIRequestQuery, ro_menuoptionitem:RoMenuoptionitem_I) {
		if (ro_menuoptionitem.Name) requestData.name = ro_menuoptionitem.Name
		if (ro_menuoptionitem.Price) requestData.price = ro_menuoptionitem.Price
		requestData.enabled = ro_menuoptionitem.Enabled || false
		requestData.isdefault = ro_menuoptionitem.Is_Default || false
	}
}
