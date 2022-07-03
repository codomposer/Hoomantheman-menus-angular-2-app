import type { WebConfig } from './WebConfig.js'
import { ENV_LIVE } from './ENV_LIVE.js'
export function IS_ENV_LIVE_(webConfig:WebConfig):boolean {
	return webConfig.ENV === ENV_LIVE
}
