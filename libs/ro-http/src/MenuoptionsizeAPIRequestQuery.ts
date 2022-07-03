import type { RoMenuoptionsize_I } from '@menus/ro-shared-models'
import { RoRequestQuery } from './RoRequestQuery.js'
export class MenuoptionsizeAPIRequestQuery extends RoRequestQuery {
	public name:string // Name
	public des:string // Description
	public price:number // Price
	public enabled:boolean // Enabled
	public isdefault:boolean // Is_Default
	public static fillMenuoptionsize_I(requestData:MenuoptionsizeAPIRequestQuery, ro_menuoptionsize:RoMenuoptionsize_I) {
		requestData.name = ro_menuoptionsize.Name
		requestData.des = ro_menuoptionsize.Description
		requestData.price = ro_menuoptionsize.Price
		requestData.enabled = ro_menuoptionsize.Enabled || false
		requestData.isdefault = ro_menuoptionsize.Is_Default || false
	}
}
