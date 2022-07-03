import type { RoHeading_I } from '@menus/ro-shared-models'
import { RoRequestQuery } from './RoRequestQuery.js'
export class HeadAPIRequestQuery extends RoRequestQuery {
	public name:string // Name
	public des:string // Description
	public enabled:boolean // Enabled
	public static fill_ro_head = (requestData:HeadAPIRequestQuery, ro_head:RoHeading_I)=>{
		if (ro_head.Name) requestData.name = ro_head.Name
		if (ro_head.Description) requestData.des = ro_head.Description
		requestData.enabled = ro_head.Enabled || false
	}
}
