import type { CityCtx } from '@menus/address'
export interface get_cities_requestData_T {
	qtype?:string
	city?:string
}
export interface get_cities_payload_T {
	City:CityCtx[]
}
