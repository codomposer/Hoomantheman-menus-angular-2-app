import type { RoMasterheading_I } from '@menus/ro-shared-models'
import { RoRequestQuery } from './RoRequestQuery.js'
export class MasterheadingAPIRequestQuery extends RoRequestQuery {
	public name:string // Name
	public des:string // Description
	public ot:string // Opening Time
	public ct:string // Closing Time
	public enabled:boolean // Enabled
	public diningin:boolean // Is Dining In
	public catering:boolean // Is Catering
	public delivery:boolean // Is Delivery
	public pickup:boolean // Is Pickup
	public static fill_ro_masterheading = (requestData:MasterheadingAPIRequestQuery, ro_masterheading:RoMasterheading_I)=>{
		if (ro_masterheading.Name) requestData.name = ro_masterheading.Name
		if (ro_masterheading.Description) requestData.des = ro_masterheading.Description
		if (ro_masterheading.Opening_Time) requestData.ot = ro_masterheading.Opening_Time
		if (ro_masterheading.Closing_Time) requestData.ct = ro_masterheading.Closing_Time
		requestData.enabled = ro_masterheading.Enabled || false
		if (ro_masterheading.IsDiningIn) requestData.diningin = ro_masterheading.IsDiningIn
		if (ro_masterheading.IsCatering) requestData.catering = ro_masterheading.IsCatering
		if (ro_masterheading.IsDelivery) requestData.delivery = ro_masterheading.IsDelivery
		if (ro_masterheading.IsPickup) requestData.pickup = ro_masterheading.IsPickup
	}
}
