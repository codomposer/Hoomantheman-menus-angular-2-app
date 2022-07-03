import type { WebConfig } from './WebConfig.js'
import { ENV_LIVE } from './ENV_LIVE.js'
export function images_host_(webConfig:WebConfig) {
	return webConfig.ENV === ENV_LIVE ? 'https://live.images.menu.com' : 'https://dev.images.menu.com'
}
