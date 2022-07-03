import type {
	API_CHARTS_compare_payload_T, API_CHARTS_menucompetition_payload_T, API_CHARTS_missingmenu_payload_T,
	API_CHARTS_resttype_payload_T, API_CHARTS_segment_payload_T
} from '@menus/ro-http'
export interface OtherRest {
	id?:number
	FireFlyID?:string
	Name?:string
	Data?:API_CHARTS_resttype_payload_T
	marker?:any
	API_CHARTS_compare_payload?:API_CHARTS_compare_payload_T
	API_CHARTS_menucompetition_payload?:API_CHARTS_menucompetition_payload_T
	API_CHARTS_missingmenu_payload?:API_CHARTS_missingmenu_payload_T
	API_CHARTS_segment_payload?:API_CHARTS_segment_payload_T
	API_CHARTS_resttype_payload?:API_CHARTS_resttype_payload_T
	busy:boolean
}
