import { isDefined } from '@menus/util'
import type { DeliveryZoneItem } from '@menus/ro-shared-models'
import { RoRequestQuery } from './RoRequestQuery.js'
export class DeliveryZoneAPIRequestQuery extends RoRequestQuery {
	public name:string // Name
	public des:string // Description
	public enabled:boolean // Enabled
	public mtype:number
	public dc:number
	public minorder:string
	public minpax:number
	public poly:string
	public radius:string
	public ztype:number
	public ptd:string
	public pth:string
	public ptm:string
	public static fillDeliveryZone = (requestData:DeliveryZoneAPIRequestQuery, deliveryZone:DeliveryZoneItem)=>{
		if (isDefined(deliveryZone.Name)) requestData.name = deliveryZone.Name
		if (isDefined(deliveryZone.Description)) requestData.des = deliveryZone.Description
		requestData.enabled = deliveryZone.Enabled || false
		if (isDefined(deliveryZone.ServiceTypeID)) requestData.mtype = deliveryZone.ServiceTypeID
		if (isDefined(deliveryZone.DeliveryCharge)) requestData.dc = deliveryZone.DeliveryCharge
		if (isDefined(deliveryZone.MinimumOrderCost)) requestData.minorder = deliveryZone.MinimumOrderCost
		if (isDefined(deliveryZone.MinimumPax)) requestData.minpax = deliveryZone.MinimumPax
		if (isDefined(deliveryZone.PolygonData)) requestData.poly = deliveryZone.PolygonData
		if (isDefined(deliveryZone.CircleRadius)) requestData.radius = deliveryZone.CircleRadius
		if (isDefined(deliveryZone.ZoneType)) requestData.ztype = deliveryZone.ZoneType
		if (isDefined(deliveryZone.PreparationTime_Days)) requestData.ptd = deliveryZone.PreparationTime_Days
		if (isDefined(deliveryZone.PreparationTime_Hours)) requestData.pth = deliveryZone.PreparationTime_Hours
		if (isDefined(deliveryZone.PreparationTime_Minutes)) requestData.ptm = deliveryZone.PreparationTime_Minutes
	}
}
