export interface marker_T extends google.maps.Marker {
	FireFlyID:string
	Latitude:number|string
	Longitude:number|string
	RestLogo?:string
	Name:string
	EnableOnlineOrdering?:boolean
}
