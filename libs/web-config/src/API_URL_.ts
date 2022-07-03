import type { WebConfig } from './WebConfig.js'
import { SERVER_URL_ } from './SERVER_URL_.js'
export function API_URL_(webConfig:WebConfig):string {
	return `${SERVER_URL_(webConfig)}/api`
}
