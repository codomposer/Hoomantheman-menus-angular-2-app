import type { RoMenuitem_I } from '@menus/ro-shared-models'
import { RoRequestQuery } from './RoRequestQuery.js'
export class MenuitemAPIRequestQuery extends RoRequestQuery {
	public name:string // Name
	public des:string // Description
	public price:number // Price
	public ss:boolean // Is_Single_Size
	public sortid:number // Sort ID
	public showimageingallery:boolean // Show Image In Gallery
	public static fill_menuitem(requestData:MenuitemAPIRequestQuery, menuitem:RoMenuitem_I) {
		requestData.name = menuitem.Name
		requestData.des = menuitem.Description
		requestData.price = menuitem.Price
		requestData.ss = menuitem.Is_Single_Size
		requestData.sortid = menuitem.SortID
		requestData.enabled = menuitem.Enabled || false
		requestData.showimageingallery = menuitem.ShowImageInGallery || false
	}
}
