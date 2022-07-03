import type { WebConfig } from './WebConfig.js'
import { API_URL_ } from './API_URL_.js'
import { API_KEY } from './API_KEY.js'
export function gps_url_(host:string, webConfig:WebConfig):string {
	return `${API_URL_(webConfig)}/b/gps.aspx?key=${API_KEY}&website=${host}&IncludeIntroPages=false&IncludeSettings=true&includesocialids=true&includeappicon=true`
}
