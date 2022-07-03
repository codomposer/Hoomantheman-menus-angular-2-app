import type { ro_http_Ctx } from '@menus/ro-http'
import type { API_PREVIEW_menuoptions_T } from './API_PREVIEW_menuoptions_b.js'
import type { API_PREVIEW_menuoptionsize_T } from './API_PREVIEW_menuoptionsize_b.js'
export interface ro_shared_models_Ctx
	extends ro_http_Ctx {
	API_PREVIEW_menuoptions?:API_PREVIEW_menuoptions_T
	API_PREVIEW_menuoptionsize?:API_PREVIEW_menuoptionsize_T
}
