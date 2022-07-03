import type { SortDetail } from '@menus/sort-shared'
export class DeliveryZoneItem implements SortDetail {
	public ID:number
	public Name = ''
	public Description = ''
	public Enabled = false
	public ZoneType:number = 1
	public MasterHeadingID:number
	public ServiceTypeID:number
	public MinimumOrderCost = ''
	public MinimumPax:number
	public DeliveryCharge:number = NaN
	public PreparationTime_Days:string = ''
	public PreparationTime_Hours:string = ''
	public PreparationTime_Minutes:string = ''
	public PolygonData:string
	public CircleRadius = ''
	public SortID:number
	public Is_Deleted:false
}
