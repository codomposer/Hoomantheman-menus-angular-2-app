import { SEOAPIRequestQuery } from '@menus/consumer-seo'
import type { DishZipSeo } from '@menus/dish'
export function dishzipseo_requestData_(requestData = new SEOAPIRequestQuery()) {
	requestData.qtype = 'dishzipseo'
	return requestData
}
export interface dishzipseo_payload_T {
	Data:DishZipSeo[]
	Status:string
}
