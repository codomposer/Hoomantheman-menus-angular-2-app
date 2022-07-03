export interface idfa_T {
	getInfo():Promise<Idfa_info_T>
	requestPermission():any
	trackingPermission:boolean
	TRACKING_PERMISSION_AUTHORIZED:boolean
	TRACKING_PERMISSION_NOT_DETERMINED:boolean
}
export interface Idfa_info_T {
	trackingLimited:boolean
	trackingPermission:boolean
}
