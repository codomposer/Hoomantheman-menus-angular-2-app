import type { RoMenuoption_I } from '@menus/ro-shared-models'
import { RoRequestQuery } from './RoRequestQuery.js'
export class MenuoptionAPIRequestQuery extends RoRequestQuery {
	public name:string // Name
	public des:string // Description
	public ss:boolean // Is_Single_Size
	public min_select:number
	public max_select:number
	public qs:boolean
	public min_quantity:number
	public max_quantity:number
	public enabled:boolean
	public static fill_ro_menuoption(requestData:MenuoptionAPIRequestQuery, ro_menuoption:RoMenuoption_I) {
		if (ro_menuoption.Name) requestData.name = ro_menuoption.Name
		const des = ro_menuoption.Description
		if (des) requestData.des = des
		if (ro_menuoption.Is_Single_Select) requestData.ss = ro_menuoption.Is_Single_Select
		if (ro_menuoption.Minimum_Select) requestData.min_select = ro_menuoption.Minimum_Select
		if (ro_menuoption.Maximum_Select) requestData.max_select = ro_menuoption.Maximum_Select
		if (ro_menuoption.Is_Quantity_Select) requestData.qs = ro_menuoption.Is_Quantity_Select
		if (ro_menuoption.Minimum_Quantity) requestData.min_quantity = ro_menuoption.Minimum_Quantity
		if (ro_menuoption.Maximum_Quantity) requestData.max_quantity = ro_menuoption.Maximum_Quantity
		requestData.enabled = ro_menuoption.Enabled || false
	}
}
